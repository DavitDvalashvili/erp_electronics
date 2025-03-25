import { defaultComponent } from "../../pages/Main/Component";
import { Modal } from "../Modal";
import Form from "./Form";
import axios from "axios";
import { useElectronics } from "../../App";
import { useState } from "react";

const AddComponent = () => {
  const [formData, setFormData] = useState<Component>(defaultComponent);

  const { API_URL, setResponse, setModal, components, setComponents } =
    useElectronics();

  const addComponent = async () => {
    await axios
      .post(`${API_URL}/addComponent`, formData)
      .then((res) => {
        if (res.data.status === "inserted") {
          setComponents([
            {
              ...formData,
              id: res.data.insert_id,
              images: [{ image_id: null, image_url: "" }],
            },
            ...components,
          ]);
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
