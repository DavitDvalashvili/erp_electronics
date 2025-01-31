import NavigationLayout from "../../components/NavigationLayout";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="flex justify-start items-start">
      <NavigationLayout />
      <>
        <Outlet />
      </>
    </main>
  );
};

export default Main;
