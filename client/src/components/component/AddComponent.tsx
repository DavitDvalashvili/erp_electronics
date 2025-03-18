import { defaultComponent } from "../../pages/Main/Component";
import { Modal } from "../Modal";
import { Dispatch, SetStateAction } from "react";
import Form from "./Form";
import axios from "axios";
import { useElectronics } from "../../App";
import { useState } from "react";

type addComponent = {
  setShowAddModal: Dispatch<SetStateAction<boolean>>;
  components: Component[];
  setComponents: Dispatch<SetStateAction<Component[]>>;
};

const AddComponent = ({
  setShowAddModal,
  components,
  setComponents,
}: addComponent) => {
  const [formData, setFormData] = useState<Component>(defaultComponent);

  const { API_URL, setResponse } = useElectronics();

  const addComponent = async () => {
    await axios
      .post(`${API_URL}/addComponent`, formData)
      .then((res) => {
        if (res.data.status === "inserted") {
          setComponents([
            {
              ...formData,
              id: res.data.insert_id,
              images: [{ image_id: null, image_url: null }],
            },
            ...components,
          ]);
          setResponse(res.data);
          setShowAddModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal setShowModal={setShowAddModal} title="კომპონენტის დამატება">
      <Form
        setFormData={setFormData}
        formData={formData}
        submitFunction={addComponent}
      />
    </Modal>
  );
};

export default AddComponent;
