import NavigationLayout from "../../components/NavigationLayout";
import { Outlet } from "react-router-dom";
import Notification from "../../components/Notification";
import { useElectronics } from "../../App";
import { useEffect } from "react";
import { components } from "react-select";

const Main = () => {
  const { response, getNotifications, setNotificationCount, notifications } =
    useElectronics();

  useEffect(() => {
    getNotifications();
  }, [components]);

  useEffect(() => {
    setNotificationCount(
      notifications.filter((notification) => notification.activeStatus === 1)
        .length
    );
  }, [notifications, components]);

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
