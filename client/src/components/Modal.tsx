import { MdOutlineCancel } from "react-icons/md";

export const Modal = ({ setShowModal, children, title }: Props) => {
  return (
    <div className="w-screen h-screen bg-popupBackground flex justify-center items-center absolute top-0 left-0">
      <div className="rounded-primary p-8 bg-white rounded-default font-firago font-feature text-textColor">
        <div
          className="flex justify-between items-center text-[2rem] font-medium gap-8 mb-4"
          onClick={() => {
            setShowModal(false);
          }}
        >
          {" "}
          <h4>{title}</h4>
          <MdOutlineCancel className="w-[2.4rem] h-[2.4rem] text-textColor cursor-pointer hover:text-errorRed transition duration-300" />
        </div>
        {children}
      </div>
    </div>
  );
};
