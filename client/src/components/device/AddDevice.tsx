import { Modal } from "../Modal";
import Form from "./Form";
import axios from "axios";
import { useElectronics } from "../../App";
import { useState } from "react";
import { defaultDevice } from "../../data/devices";

const AddComponent = () => {
  const [formData, setFormData] = useState<Device>(defaultDevice);

  const { API_URL, setResponse, setModal, devices, setDevices } =
    useElectronics();

  const addComponent = async () => {
    await axios
      .post(`${API_URL}/addDevice`, formData)
      .then((res) => {
        if (res.data.status === "inserted") {
          if (devices) {
            setDevices([
              {
                ...formData,
                id: res.data.insert_id,
                images: [{ image_id: null, image_url: "" }],
              },
              ...devices,
            ]);
          }

          setResponse(res.data);
          setModal(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal title="კომპონენტის დამატება">
      <Form
        setFormData={setFormData}
        formData={formData}
        submitFunction={addComponent}
        type="დამატება"
      />
    </Modal>
  );
};

export default AddComponent;
