import NavigationLayout from "../../components/NavigationLayout";
import { Outlet } from "react-router-dom";
import Notification from "../../components/Notification";
import { useEffect } from "react";
import { useElectronics } from "../../App";
import axios from "axios";
import { components } from "react-select";

const Main = () => {
  const { response, setNotifications, setAppStatus, API_URL } =
    useElectronics();

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
