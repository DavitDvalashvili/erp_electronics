import { IoCloseCircleOutline } from "react-icons/io5";

const PageNotFound = () => {
  return (
    <div
      className="w-full h-screen flex justify-center items-center flex-col gap-[2rem] text-[3rem] font-firago
      font-medium font-feature"
    >
      <IoCloseCircleOutline className="w-[12rem] h-[12rem] text-errorRed" />
      <p>გვერდი არ მოიძებნა</p>
    </div>
  );
};

export default PageNotFound;
