import { MdErrorOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useElectronics } from "../App";

const Notification = () => {
  const { response, setResponse } = useElectronics();

  setTimeout(() => {
    setResponse(null);
  }, 500);

  return (
    <div
      className="w-screen h-screen bg-popupBackground absolute top-0 left-0 z-20 flex justify-center items-center font-firago 
     font-feature font-medium"
    >
      {response?.status === "inserted" ||
      response?.status === "updated" ||
      response?.status === "deleted" ? (
        <div className="flex flex-col justify-center items-center gap-8 text-[2.5rem] bg-white px-[5rem] py-[3rem] rounded-default">
          <IoIosCheckmarkCircleOutline className="w-[10rem] h-[10rem] text-green" />
          <p>{response.message}</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8 text-[2.5rem] bg-white px-[5rem] py-[3rem] rounded-default">
          <MdErrorOutline className="w-[10rem] h-[10rem] text-errorRed" />
          <p>{response?.message}</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
