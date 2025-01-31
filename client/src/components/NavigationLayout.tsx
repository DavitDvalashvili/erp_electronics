import { RxComponent1 } from "react-icons/rx";
import { PiDeviceMobileSpeakerFill } from "react-icons/pi";
import { IoMdNotifications } from "react-icons/io";
import { RiTodoFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type ActivePage = "components" | "devices" | "notification" | "todo" | string;

const NavigationLayout = () => {
  const [activePage, setActivePage] = useState<ActivePage>("components");

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setActivePage(pathname.slice(1));
  }, [pathname]);

  return (
    <div
      className=" h-screen w-[38rem] flex flex-col justify-start items-center py-[4rem] gap-[8rem]
      font-firago font-feature"
    >
      <div>
        <img
          src="/Logical_systems.png"
          alt="logical_system_company"
          className="h-[12rem] w-[15rem]"
        />
      </div>
      <nav className="w-full">
        <ul className="text-textColor text-[2rem] font-bold flex flex-col gap-[6rem]">
          <Link to="/components">
            <li
              className={`flex gap-8 py-4 rounded-default px-[6rem] ${activePage === "components" ? "bg-bgColor text-white" : "text-textColor"}`}
            >
              <RxComponent1 className="w-[3rem] h-[3rem]" />
              <span>კომპონენტები</span>
            </li>
          </Link>
          <Link to="/devices">
            <li
              className={`flex gap-8 py-4 rounded-default px-[6rem] ${activePage === "devices" ? "bg-bgColor text-white" : "text-textColor"}`}
            >
              <PiDeviceMobileSpeakerFill className="w-[3rem] h-[3rem]" />
              <span>მოწყობილობები</span>
            </li>
          </Link>
          <Link to="/notification">
            <li
              className={`flex gap-8 py-4 rounded-default px-[6rem] ${activePage === "notification" ? "bg-bgColor text-white" : "text-textColor"}`}
            >
              <IoMdNotifications className="w-[3rem] h-[3rem]" />
              <span>შეტყობინებები</span>
            </li>
          </Link>
          <Link to="/todo">
            <li
              className={`flex gap-8 py-4 rounded-default px-[6rem] ${activePage === "todo" ? "bg-bgColor text-white" : "text-textColor"}`}
            >
              <RiTodoFill className="w-[3rem] h-[3rem]" />
              <span>საყიდლები</span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationLayout;
