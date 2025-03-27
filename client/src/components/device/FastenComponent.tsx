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

  const { API_URL, setAppStatus } = useElectronics();

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

  const handleChange = (selectedOption: any) => {
    setSelectedComponent(selectedOption);
  };

  return (
    <Modal title="კომპონენტთან მიბმა">
      <div>
        <Select
          className="basic-single w-full"
          classNamePrefix="select"
          isClearable
          isSearchable
          options={componentsNames}
          value={selectedComponent}
          onChange={handleChange}
          placeholder={"აირჩიე კომპონენტი"}
        />
        <div>
          <label htmlFor="componentAmount">
            რაოდენობა <span className="text-errorRed">*</span>
          </label>
          <input
            type="number"
            name="componentAmount"
            value={componentAmount}
            onChange={(e) => {
              setComponentAmount(e.target.value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
