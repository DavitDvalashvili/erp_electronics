import { CgComponents } from "react-icons/cg";
import { PiDeviceMobileSpeakerFill } from "react-icons/pi";
import { IoMdNotifications } from "react-icons/io";
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
    <aside
      className=" h-screen min-w-[28rem] xl:min-w-[38rem] flex flex-col justify-start items-center py-[4rem] gap-[8rem]
      font-firago font-feature bg-white "
    >
      <div>
        <img
          src="/Logical_systems.png"
          alt="logical_system_company"
          className="h-[12rem] w-[15rem] rounded-default shadow-lg"
        />
      </div>
      <nav className="w-full">
        <ul className="text-textColor text-[2rem] font-bold flex flex-col gap-[6rem]">
          <Link to="/components">
            <li
              className={`flex gap-8 py-4 rounded-default px-[3rem] xl:px-[6rem] ${activePage === "components" ? "bg-bgColor text-white" : "text-textColor"}`}
            >
              <CgComponents className="w-[3rem] h-[3rem]" />
              <span>კომპონენტები</span>
            </li>
          </Link>
          <Link to="/devices">
            <li
              className={`flex gap-8 py-4 rounded-default px-[3rem] xl:px-[6rem] ${activePage === "devices" ? "bg-bgColor text-white" : "text-textColor"}`}
            >
              <PiDeviceMobileSpeakerFill className="w-[3rem] h-[3rem]" />
              <span>მოწყობილობები</span>
            </li>
          </Link>
          <Link to="/notification">
            <li
              className={`flex gap-8 py-4 rounded-default px-[3rem] xl:px-[6rem] ${activePage === "notification" ? "bg-bgColor text-white" : "text-textColor"}`}
            >
              <IoMdNotifications className="w-[3rem] h-[3rem]" />
              <span>შეტყობინებები</span>
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default NavigationLayout;
