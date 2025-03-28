import { useElectronics } from "../../App";
import { IoMdNotifications } from "react-icons/io";

export const NotificationPage = () => {
  const { notifications, setNotifications } = useElectronics();

  console.log(notifications);

  return (
    <section className=" bg-green-500 h-screen w-full overflow-y-scroll font-firago font-feature">
      <div className="fixed t-0 w-[calc(100vw-28.5rem)] xl:w-[calc(192rem-38.5rem)] bg-bgColorSecondary px-[5.6rem] pt-[4rem] pb-[3rem]">
        <div className="flex gap-8 ">
          <div className="bg-white rounded-default p-[1.2rem] flex gap-8 text-[1.8rem] font-bold items-center h-[5rem] w-fit ">
            <IoMdNotifications className="w-[3rem] h-[3rem]" />
            <span>შეტყობინებები</span>
          </div>
        </div>
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
                  className={`text-[1.4rem] font-medium py-2 px-6 text-center ${notification.status ? "bg-[#c2dbff]" : ""}`}
                >
                  {index + 1}
                </td>
                <td
                  className={`${notification.status ? "bg-[#c2dbff]" : ""}  text-[1.4rem] font-medium py-2 px-4 text-left`}
                >
                  {notification.name}
                </td>
                <td
                  className={`${notification.status ? "bg-[#c2dbff]" : ""} text-[1.4rem] font-medium py-2 text-left`}
                >
                  კომპონენტის რაოდენობა დასაშვებზე ნაკლებია
                </td>
                <td
                  className={`${notification.status ? "bg-[#c2dbff]" : ""} px-[8rem] gap-8 flex justify-center py-4`}
                >
                  <button
                    className=" h-[3rem] px-4  rounded-default
                    border border-bgColor text-bgColor font-bold hover:bg-bgColor transition duration-300
                    hover:text-white text-[1.3rem]"
                  >
                    წაკითხულად მონიშვნა
                  </button>
                  <button
                    className=" h-[3rem] px-4  rounded-default 
                    border border-errorRed text-errorRed font-bold hover:bg-errorRed transition duration-300
                     hover:text-white text-[1.3rem]"
                  >
                    წაშლა
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
