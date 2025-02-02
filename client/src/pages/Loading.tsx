import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <div
      className="w-full h-screen flex justify-center items-center flex-col gap-[2rem] text-[3rem] font-firago
      font-feature font-medium text-textColor"
    >
      <VscLoading className="animate-spin w-[10rem] h-[10rem]" />
      <p>იტვირთება...</p>
    </div>
  );
};

export default Loading;
