import { Modal } from "../Modal";
import axios from "axios";
import { useElectronics } from "../../App";
import { useNavigate } from "react-router-dom";

type DeleteComponent = {
  component: Component;
};

const DeleteComponent = ({ component }: DeleteComponent) => {
  const { API_URL, setResponse, setModal } = useElectronics();
  const navigate = useNavigate();

  const deleteComponent = async () => {
    await axios
      .delete(`${API_URL}/deleteComponent/${component.id}`)
      .then((res) => {
        if (res.data.status === "deleted") {
          setModal(null);
          navigate("/components");
        }
        setResponse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Modal title="კომპონენტის წაშლა">
      <p className="text-[1.6rem] text-textColor pb-4">
        ნამდვილად გსურთ კომპონენტის წაშლა?
      </p>
      <div>
        <button
          className="text-[1.6rem] rounded-default flex justify-center items-center
         bg-green text-white font-bold px-[3rem] py-3 mx-auto"
          onClick={() => deleteComponent()}
        >
          წაშლა
        </button>
      </div>
    </Modal>
  );
};

export default DeleteComponent;
