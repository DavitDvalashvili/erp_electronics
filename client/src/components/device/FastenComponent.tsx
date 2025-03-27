import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import axios from "axios";
import { useElectronics } from "../../App";
import Select from "react-select";

type DeviceId = {
  deviceId: string | number | undefined;
};

type ComponentNames = {
  name: string;
  id: string | number;
};

export const FastenComponent = ({ deviceId }: DeviceId) => {
  const [componentsNames, setComponentNames] = useState<ComponentNames[]>([]);
  const [componentAmount, setComponentAmount] = useState<number | string>("");
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentNames | null>(null);

  const { API_URL, setAppStatus, setResponse, setModal } = useElectronics();

  const getComponentNames = async () => {
    await axios
      .get(`${API_URL}/device/getComponentName`)
      .then((res) => {
        if (res.status === 200) {
          setComponentNames(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setAppStatus("Server Error");
      });
  };

  useEffect(() => {
    getComponentNames();
  }, []);

  const addComponent = async () => {
    if (!selectedComponent || !componentAmount) {
      setResponse({ status: "insert_error", message: "შეავსეთ ყველა ველი" });
      return;
    }

    await axios
      .post(`${API_URL}/device/addComponents`, null, {
        params: {
          device_id: deviceId,
          component_id: selectedComponent.id,
          component_per_device: componentAmount,
        },
      })
      .then((response) => {
        if (response.data.status === "inserted") {
          setModal(null);
        }
        setResponse(response.data);
      });
  };

  return (
    <Modal title="კომპონენტთან მიბმა">
      <div className="flex justify-start gap-8 w-[40rem] mt-4">
        <Select
          className="basic-single w-full text-[1.4rem]"
          classNamePrefix="select"
          isClearable
          isSearchable
          options={componentsNames.map((component) => ({
            value: component.id,
            label: component.name,
          }))}
          value={
            selectedComponent
              ? { value: selectedComponent.id, label: selectedComponent.name }
              : null
          }
          onChange={(newValue) => {
            if (newValue) {
              setSelectedComponent({
                id: newValue.value,
                name: newValue.label,
              });
            } else {
              setSelectedComponent(null);
            }
          }}
          placeholder={"აირჩიე კომპონენტი"}
        />
        <div>
          <input
            className="h-[3.8rem] w-[15rem] focus:outline-none border rounded-[0.4rem] border-gray-300 
            p-2 text-[1.4rem]"
            type="number"
            name="componentAmount"
            placeholder="რაოდენობა"
            value={componentAmount}
            onChange={(e) => {
              setComponentAmount(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        className="text-[1.6rem] rounded-default flex justify-center items-center
         bg-green text-white font-bold px-[3rem] py-3 mx-auto mt-8"
        onClick={() => addComponent()}
      >
        დამატება
      </button>
    </Modal>
  );
};
