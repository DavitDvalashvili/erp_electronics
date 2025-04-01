import { Modal } from "./Modal";

type Delete = {
  deleteFunction: () => void;
  name: "კომპონენტი" | "მოწყობილობა";
};

const DeleteForm = ({ deleteFunction, name }: Delete) => {
  return (
    <Modal title="კომპონენტის წაშლა">
      <p className="text-[1.6rem] text-textColor pb-4">
        {`ნამდვილად გსურთ ${name} წაშლა?`}
      </p>
      <div>
        <button
          className="text-[1.6rem] rounded-default flex justify-center items-center
         bg-green text-white font-bold px-[3rem] py-3 mx-auto"
          onClick={() => deleteFunction()}
        >
          წაშლა
        </button>
      </div>
    </Modal>
  );
};

export default DeleteForm;
