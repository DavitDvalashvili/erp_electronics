import { MdOutlineCancel } from "react-icons/md";
import { useElectronics } from "../App";

export const Modal = ({ children, title }: Props) => {
  const { setModal } = useElectronics();
  return (
    <div className="w-screen h-screen bg-popupBackground flex justify-center items-center absolute z-20 top-0 left-0">
      <div className="rounded-primary p-8 bg-white rounded-default font-firago font-feature text-textColor">
        <div
          className="flex justify-between items-center text-[2rem] font-medium gap-8 mb-4"
          onClick={() => {
            setModal(null);
          }}
        >
          <h4>{title}</h4>
          <MdOutlineCancel className="w-[2.4rem] h-[2.4rem] text-textColor cursor-pointer hover:text-errorRed transition duration-300" />
        </div>
        {children}
      </div>
    </div>
  );
};
