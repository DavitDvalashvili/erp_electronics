import axios from "axios";
import Loading from "../Loading";
import ServerError from "../ServerError";
import { useElectronics } from "../../App";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperComponent from "../../components/SwiperComponent";
import UpdateDevice from "../../components/device/UpdateDevice";
import { ImDrawer } from "react-icons/im";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import UpdateQuantity from "../../components/device/UpdateQuantity";
import ImageBox from "../../components/ImageBox";
import DeleteDevice from "../../components/device/DeleteDevice";

export const defaultDevice: Device = {
  id: "",
  name: "",
  purpose: "",
  electrical_supply: "",
  size: "",
  unit_cost: "",
  available_quantity: "",
  images: [],
};

const Device = () => {
  const [device, setDevice] = useState<Device>(defaultDevice);
  const [images, setImages] = useState<Image[]>([]);
  const { API_URL, appStatus, setAppStatus, modal, setModal } =
    useElectronics();
  const { id } = useParams();

  const getDevice = async () => {
    setAppStatus("Loading");
    await axios
      .get(`${API_URL}/getDevice/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setDevice(res.data);
        }
        setAppStatus("Success");
      })
      .catch((error) => {
        console.log(error);
        setAppStatus("Server Error");
      });
  };

  useEffect(() => {
    getDevice();
  }, []);

  useEffect(() => {
    setImages(device.images);
  }, [device]);

  if (appStatus === "Server Error") return <ServerError />;
  if (appStatus === "Loading") return <Loading />;

  return (
    <section className="py-[4rem] px-[5.6rem] w-full h-screen  font-firago font-feature  overflow-y-scroll">
      <div className="grid grid-cols-3 gap-[3rem]">
        <div className="col-span-1 h-fit ">
          <SwiperComponent images={images} type="device" />
        </div>
        <div
          className="col-span-2  flex flex-col gap-[3rem] font-medium text-textColor 
          text-[1.4rem] "
        >
          <div className="mt-4 flex justify-between align-center bg-white p-8 rounded-[1rem]">
            <h5 className="mx-auto">{device.name}</h5>
          </div>
          <div className="grid grid-cols-2 gap-[3rem] ">
            <div className="bg-white p-8 rounded-[1rem]">
              <div className="flex flex-col gap-4 pb-4 border-b-[0.1rem] border-textColor">
                <div className="flex justify-between items-center">
                  <span>რაოდენობა</span>
                  <span>{device.available_quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ღირებულება</span>
                  <span>{device.unit_cost}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 ">
                <span>ზომა</span>
                <span>{device.size}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  className="w-full h-[4rem] rounded-default flex justify-center items-center gap-4
                            border border-textColor text-textColor font-bold hover:bg-textColor transition duration-300
                             hover:text-white text-[1.3rem]"
                  onClick={() => {
                    setModal("update_device");
                  }}
                >
                  <span>განახლება</span>

                  <GrUpdate className="h-[2.4rem] mt-[-0.5rem]" />
                </button>
                <button
                  className="w-full h-[4rem] rounded-default flex justify-center items-center gap-4
                            border border-errorRed text-errorRed font-bold hover:bg-errorRed transition duration-300
                            hover:text-white text-[1.3rem]"
                  onClick={() => {
                    setModal("delete_device");
                  }}
                >
                  <span>წაშლა</span>

                  <MdDeleteOutline className="h-[2.4rem] mt-[-0.5rem]" />
                </button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[1rem]">
              <div className="flex justify-between items-top mb-4 border-b-[0.1rem] pb-4 border-textColor h-[6.4rem] ">
                <span>დანიშნულება</span> <span>{device.purpose}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ელექტრონული კვება</span>
                <span>{device.electrical_supply}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  className="w-full h-[4rem] rounded-default flex justify-center items-center gap-4
                            border border-green text-green font-bold hover:bg-green transition duration-300 hover:text-white 
                            text-[1.3rem]"
                  onClick={() => {
                    setModal("update_position");
                  }}
                >
                  <span>ადგილის განახლება</span>

                  <ImDrawer className="h-[2.4rem] mt-[-0.5rem]" />
                </button>
                <button
                  className="w-full h-[4rem] rounded-default flex justify-center items-center gap-4
                            border border-green text-green font-bold hover:bg-green transition duration-300
                            hover:text-white text-[1.3rem]"
                  onClick={() => {
                    setModal("update_device_quantity");
                  }}
                >
                  <span>რაოდენობის განახლება</span>

                  <FaSortAmountUpAlt className="h-[2.4rem] mt-[-0.5rem]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageBox images={images} setImages={setImages} />
      {modal === "update_device" && (
        <UpdateDevice device={device} setDevice={setDevice} />
      )}
      {modal === "delete_device" && <DeleteDevice device={device} />}
      {modal === "update_device_quantity" && (
        <UpdateQuantity currentDevice={device} setCurrentDevice={setDevice} />
      )}
    </section>
  );
};

export default Device;
