import { Modal } from "../Modal";
import { useElectronics } from "../../App";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

type DeviceId = {
  deviceId: string | number | undefined;
};

type Component = {
  name: string;
  available_quantity: string | number;
  quantity_per_device: string | number;
  id: string | number;
};

export const Components = ({ deviceId }: DeviceId) => {
  const { API_URL, setAppStatus, setResponse, setModal } = useElectronics();
  const [components, setComponents] = useState<Component[]>([]);

  const getComponents = async () => {
    await axios
      .get(`${API_URL}/device/getComponent/${deviceId}`)
      .then((res) => {
        if (res.status == 200) {
          setComponents(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setAppStatus("Server Error");
      });
  };

  useEffect(() => {
    getComponents();
  }, []);

  const deleteComponent = async (id: number | string) => {
    console.log(`${API_URL}/device/deleteComponent/${id}`);
    await axios
      .delete(`${API_URL}/device/deleteComponent/${id}`)
      .then((res) => {
        if (res.data.status === "deleted") {
          setModal(null);
          setComponents(
            components?.filter((component) => component.id !== id) || null
          );
        }
        setResponse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal title="დაკავშირებული კომპონენტები">
      {components.length == 0 && (
        <p className="text-center text-textColor text-[1.4rem] py-2 font-medium ">
          მოწყობილობასთან კომპონენტი დაკავშირებული არ არის
        </p>
      )}
      {components.length > 0 && (
        <table className="table-auto w-full border-collapse border border-textColor text-textColor text-[1.4rem]">
          <thead>
            <tr>
              <th className="border text-textColor text-[1.4rem] max-w-[40rem] px-4 py-3 text-center">
                კომპონენტის დასახელება
              </th>
              <th className="border text-textColor text-[1.4rem] max-w-[20rem] px-4 py-3 text-center">
                ხელმისაწვდომი რაოდენობა
              </th>
              <th className="border text-textColor text-[1.4rem] max-w-[20rem] px-4 py-3 text-center">
                რაოდენობა ერთი მოწყობილობისათვის
              </th>
              <th className="border text-textColor text-[1.4rem] max-w-[20rem] px-4 py-3 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {components?.map((component, index) => (
              <tr key={index}>
                <td className="border text-textColor text-[1.4rem] font-medium py-2 px-4 text-left">
                  {component.name}
                </td>
                <td className="border text-textColor text-[1.4rem] font-medium py-2 text-center">
                  {component.available_quantity}
                </td>
                <td className="border text-textColor text-[1.2rem font-medium py-2 text-center">
                  {component.quantity_per_device}
                </td>
                <td className="border text-textColor text-[1.2rem font-medium py-2 text-center">
                  <button
                    className=" h-[3rem] w-[10rem] mx-4 rounded-default flex justify-center items-center gap-4
                                            border border-errorRed text-errorRed font-bold hover:bg-errorRed transition duration-300
                                            hover:text-white text-[1.3rem]"
                    onClick={() => {
                      deleteComponent(component.id);
                    }}
                  >
                    <span>წაშლა</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Modal>
  );
};
