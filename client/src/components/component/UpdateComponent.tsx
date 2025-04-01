import { Modal } from "../Modal";
import { Dispatch, SetStateAction } from "react";
import Form from "./Form";
import { useState } from "react";
import { useElectronics } from "../../App";
import axios from "axios";

type updateComponent = {
  component: Component;
  setComponent: Dispatch<SetStateAction<Component>>;
};

const UpdateComponent = ({ component, setComponent }: updateComponent) => {
  const [formData, setFormData] = useState<Component>(component);
  const {
    API_URL,
    setResponse,
    setModal,
    setNotificationCount,
    NotificationCount,
  } = useElectronics();

  const updateComponent = async () => {
    await axios
      .post(`${API_URL}/updateComponent/${component.id}`, formData)
      .then((res) => {
        if (res.data.status === "updated") {
          if (formData.available_quantity < formData.required_quantity) {
            setNotificationCount(NotificationCount + 1);
          } else {
            setNotificationCount(NotificationCount - 1);
          }
          setComponent(formData);
          setResponse(res.data);
          setModal(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal title="კომპონენტის განახლება">
      <Form
        setFormData={setFormData}
        formData={formData}
        submitFunction={updateComponent}
        type="განახლება"
      />
    </Modal>
  );
};

export default UpdateComponent;
