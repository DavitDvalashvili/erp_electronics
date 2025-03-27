import { MdSearchOff } from "react-icons/md";

type NameType = {
  name: "კომპონენტი" | "მოწყობილობა";
};

const ResultNotFound = ({ name }: NameType) => {
  return (
    <div
      className="w-full h-full flex justify-center items-center flex-col gap-[2rem] text-[3rem] font-firago
         font-medium font-feature mx-auto"
    >
      <MdSearchOff className="w-[12rem] h-[12rem] text-errorRed" />
      <p>{`${name} ვერ მოიძებნა`}</p>
    </div>
  );
};

export default ResultNotFound;
