import { MdOutlineErrorOutline } from "react-icons/md";

const ServerError = () => {
  return (
    <div
      className="w-full h-screen flex justify-center items-center flex-col gap-[2rem] text-[3rem] font-firago
      font-medium font-feature text-textColor "
    >
      <MdOutlineErrorOutline className=" w-[12rem] h-[12rem] text-errorRed" />
      <p>სერვერთან დაკავშირება ვერ მოხერხდა</p>
    </div>
  );
};

export default ServerError;
