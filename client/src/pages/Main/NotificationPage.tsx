import { IoMdNotificationsOff } from "react-icons/io";
import { useElectronics } from "../../App";
import { IoMdNotifications } from "react-icons/io";
import axios from "axios";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { useEffect } from "react";

type Notification = {
  id: string | number;
  name: string;
  activeStatus: number | string;
};

export const NotificationPage = () => {
  const {
    setResponse,
    appStatus,
    setNotificationCount,
    notifications,
    setNotifications,
    components,
    setAppStatus,
  } = useElectronics();

  const { API_URL } = useElectronics();

  const updateNotification = async (notification: Notification) => {
    const updatedNotification = {
      ...notification,
      activeStatus: Number(!Boolean(notification.activeStatus)),
    };

    await axios
      .post(
        `${API_URL}/updateNotification/${notification.id}`,
        updatedNotification
      )
      .then((res) => {
        if (res.data.status === "updated") {
          setNotifications([
            ...notifications.filter((n) => n.id !== notification.id),
            updatedNotification,
          ]);
        }
        setResponse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteNotification = async (notification: Notification) => {
    await axios
      .delete(`${API_URL}/deleteNotification/${notification.id}`)
      .then((res) => {
        if (res.data.status === "deleted") {
          setNotifications([
            ...notifications.filter((n) => n.id !== notification.id),
          ]);
        }
        setResponse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNotifications = async () => {
    setAppStatus("Loading");
    await axios
      .get(`${API_URL}/getNotification`)
      .then((res) => {
        if (res.status == 200) {
          setNotifications(res.data);
        }
        setAppStatus("Success");
      })
      .catch((error) => {
        console.log(error);
        setAppStatus("Server Error");
      });
  };

  useEffect(() => {
    getNotifications();
  }, [components]);

  useEffect(() => {
    setNotificationCount(
      notifications.filter((notification) => notification.activeStatus === 1)
        .length
    );
  }, [notifications, components]);

  if (appStatus === "Loading") return <Loading />;
  if (appStatus === "Server Error") return <ServerError />;

  return (
    <section className=" bg-green-500 h-screen w-full overflow-y-scroll font-firago font-feature">
      <div className="fixed t-0 w-[calc(100vw-28.5rem)] xl:w-[calc(192rem-38.5rem)] bg-bgColorSecondary px-[5.6rem] pt-[4rem] pb-[3rem]">
        <div className="flex gap-8 ">
          <div className="bg-white rounded-default p-[1.2rem] flex gap-8 text-[1.8rem] font-bold items-center h-[5rem] w-fit ">
            <IoMdNotifications className="w-[3rem] h-[3rem]" />
            <span>შეტყობინებები</span>
          </div>
        </div>
        {notifications?.length === 0 && (
          <div className="mt-[-9rem] flex flex-col gap-8 justify-center items-center  text-textColor font-medium text-[3rem] w-full h-screen">
            <IoMdNotificationsOff className="w-[10rem] h-[10rem] text-errorRed" />
            <p>შეტყობინება არ მოიძებნა</p>
          </div>
        )}
        {notifications?.length > 0 && (
          <table className="table-auto  border-collapse text-[1.4rem] bg-white mt-8 mr-[20rem] rounded-default pb-8 overflow-hidden">
            <thead>
              <tr>
                <th className=" text-[1.4rem] max-w-8 px-8 py-8  text-center ">
                  #
                </th>
                <th className="text-[1.4rem]  px-4 py-8 text-center w-[25rem]">
                  კომპონენტი
                </th>
                <th className="  text-[1.4rem]  px-4 py-8 text-center ">
                  შეტყობინება
                </th>
              </tr>
            </thead>
            <tbody>
              {notifications?.map((notification, index) => (
                <tr key={index}>
                  <td
                    className={`text-[1.4rem] font-medium py-2 px-6 text-center ${notification.activeStatus ? "bg-[#c2dbff]" : ""}`}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={`${notification.activeStatus ? "bg-[#c2dbff]" : ""}  text-[1.4rem] font-medium py-2 px-4 text-left`}
                  >
                    {notification.name}
                  </td>
                  <td
                    className={`${notification.activeStatus ? "bg-[#c2dbff]" : ""} text-[1.4rem] font-medium py-2 text-left`}
                  >
                    კომპონენტის რაოდენობა დასაშვებზე ნაკლებია
                  </td>
                  <td
                    className={`${notification.activeStatus ? "bg-[#c2dbff]" : ""} px-[8rem] gap-8 flex justify-center py-4`}
                  >
                    <button
                      className=" h-[3rem] px-4  rounded-default
                    border border-bgColor text-bgColor font-bold hover:bg-bgColor transition duration-300
                    hover:text-white text-[1.3rem] w-[18.2rem]"
                      onClick={() => {
                        updateNotification(notification);
                      }}
                    >
                      {notification.activeStatus
                        ? "წაკითხულად მონიშვნა"
                        : "წაუკითხავად მონიშვნა"}
                    </button>
                    <button
                      className=" h-[3rem] px-4  rounded-default 
                    border border-errorRed text-errorRed font-bold hover:bg-errorRed transition duration-300
                     hover:text-white text-[1.3rem] w-[6.62rem]"
                      onClick={() => {
                        deleteNotification(notification);
                      }}
                    >
                      წაშლა
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};
