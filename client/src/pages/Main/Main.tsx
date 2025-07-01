import NavigationLayout from "../../components/NavigationLayout";
import { Outlet } from "react-router-dom";
import Notification from "../../components/Notification";
import { useEffect } from "react";
import { useElectronics } from "../../App";
import axios from "axios";
import { components } from "react-select";
import ServerError from "../ServerError";
import Loading from "../Loading";

const Main = () => {
  const {
    response,
    setNotifications,
    setAppStatus,
    API_URL,
    appStatus,
    notifications,
  } = useElectronics();

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
  }, [components, notifications.length]);

  if (appStatus === "Server Error") return <ServerError />;
  if (appStatus === "Loading") return <Loading />;

  return (
    <main className="flex justify-start items-start bg-bgColorSecondary xl:max-w-[192rem] xl:mx-auto">
      <NavigationLayout />
      <>
        <Outlet />
      </>
      {response && <Notification />}
    </main>
  );
};

export default Main;
