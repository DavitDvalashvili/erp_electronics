import { Modal } from "../Modal";
import axios from "axios";
import { useElectronics } from "../../App";
import { useNavigate } from "react-router-dom";

type DeleteDevice = {
  device: Device;
};

const DeleteDevice = ({ device }: DeleteDevice) => {
  const { API_URL, setResponse, setModal } = useElectronics();
  const navigate = useNavigate();

  const deleteDevice = async () => {
    await axios
      .delete(`${API_URL}/deleteDevice/${device.id}`)
      .then((res) => {
        if (res.data.status === "deleted") {
          setModal(null);
          navigate("/devices");
        }
        setResponse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal title="მოწყობილობის წაშლა">
      <p className="text-[1.6rem] text-textColor pb-4">
        ნამდვილად გსურთ მოწყობილობის წაშლა?
      </p>
      <div>
        <button
          className="text-[1.6rem] rounded-default flex justify-center items-center
         bg-green text-white font-bold px-[3rem] py-3 mx-auto"
          onClick={() => deleteDevice()}
        >
          წაშლა
        </button>
      </div>
    </Modal>
  );
};

export default DeleteDevice;
