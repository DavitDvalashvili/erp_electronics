import { RxComponent1 } from "react-icons/rx";
import { TbDeviceIpadBolt } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useElectronics } from "../App";

type ActivePage = "components" | "devices" | "notification" | "todo" | string;

const NavigationLayout = () => {
  const { NotificationCount } = useElectronics();
  const [activePage, setActivePage] = useState<ActivePage>("components");

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setActivePage(pathname.slice(1).split("/")[0]);
  }, [pathname]);

  return (
    <aside
      className=" h-screen min-w-[28rem] xl:min-w-[38rem] flex flex-col justify-start items-center py-[4rem] gap-[8rem]
      font-firago font-feature bg-white "
    >
      <div>
        <img
          src="/lsc.png"
          alt="logical_system_company"
          className="h-[12rem] w-[15rem] rounded-default shadow-lg"
        />
      </div>
      <nav className="w-full">
        <ul className="text-textColor text-[2rem] font-bold flex flex-col gap-[6rem]">
          <Link to="/components">
            <li
              className={`flex gap-8 py-4 rounded-default px-[3rem] xl:px-[6rem] ${activePage === "components" || activePage === "component" ? "bg-bgColor text-white" : "text-textColor"}`}
            >
              <RxComponent1 className="w-[3rem] h-[3rem]" />
              <span>კომპონენტები</span>
            </li>
          </Link>
          <Link to="/devices">
            <li
              className={`flex gap-8 py-4 rounded-default px-[3rem] xl:px-[6rem] ${activePage === "devices" || activePage === "device" ? "bg-bgColor text-white" : "text-textColor"}`}
            >
              <TbDeviceIpadBolt className="w-[3rem] h-[3rem]" />
              <span>მოწყობილობები</span>
            </li>
          </Link>
          <Link to="/notification">
            <li
              className={`flex gap-8 py-4 rounded-default px-[3rem] xl:px-[6rem] relative ${activePage === "notification" ? "bg-bgColor text-white" : "text-textColor"}`}
            >
              <div className="relative">
                <IoMdNotifications className="w-[3rem] h-[3rem]" />
                {NotificationCount > 0 && (
                  <span className="bg-errorRed absolute top-[-0.5rem] left-[1.5rem] px-3 rounded-full text-[1.2rem] text-white">
                    {NotificationCount}
                  </span>
                )}
              </div>
              <span>შეტყობინებები</span>
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default NavigationLayout;
