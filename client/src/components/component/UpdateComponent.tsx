import { Modal } from "../Modal";
import { Dispatch, SetStateAction } from "react";
import Form from "./Form";
import { useState } from "react";
import { useElectronics } from "../../App";
import axios from "axios";

type updateComponent = {
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  component: Component;
};

const UpdateComponent = ({
  setShowUpdateModal,
  component,
}: updateComponent) => {
  const [formData, setFormData] = useState<Component>(component);
  const { API_URL, setResponse } = useElectronics();

  const updateComponent = async () => {
    await axios
      .post(`${API_URL}/addComponent`, formData)
      .then((res) => {
        if (res.data.status === "inserted") {
          setResponse(res.data);
          setShowUpdateModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal setShowModal={setShowUpdateModal} title="კომპონენტის დამატება">
      <Form
        setFormData={setFormData}
        formData={formData}
        submitFunction={updateComponent}
      />
    </Modal>
  );
};

export default UpdateComponent;
