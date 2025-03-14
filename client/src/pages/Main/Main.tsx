import NavigationLayout from "../../components/NavigationLayout";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="flex justify-start items-start bg-bgColorSecondary max-w-[192rem] mx-auto">
      <NavigationLayout />
      <>
        <Outlet />
      </>
    </main>
  );
};

export default Main;
