import { Modal } from "../Modal";
import { Dispatch, SetStateAction } from "react";
import Form from "./Form";
import { useState } from "react";
import { useElectronics } from "../../App";
import axios from "axios";

type updateDevice = {
  device: Device;
  setDevice: Dispatch<SetStateAction<Device>>;
};

const UpdateComponent = ({ device, setDevice }: updateDevice) => {
  const [formData, setFormData] = useState<Device>(device);
  const { API_URL, setResponse, setModal } = useElectronics();

  const updateDevice = async () => {
    await axios
      .post(`${API_URL}/updateDevice/${device.id}`, formData)
      .then((res) => {
        if (res.data.status === "updated") {
          setDevice(formData);
          setResponse(res.data);
          setModal(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal title="მოწყობილობის განახლება">
      <Form
        setFormData={setFormData}
        formData={formData}
        submitFunction={updateDevice}
        type="განახლება"
      />
    </Modal>
  );
};

export default UpdateComponent;
