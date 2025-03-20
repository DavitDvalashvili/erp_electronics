import axios from "axios";
//import Loading from "../Loading";
//import ServerError from "../ServerError";
import { useElectronics } from "../../App";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperComponent from "../../components/SwiperComponent";
import UpdateComponent from "../../components/component/UpdateComponent";

export const defaultComponent: Component = {
  id: "",
  family: "",
  name: "",
  purpose: "",
  package_type: "",
  nominal_value: "",
  electrical_supply: "",
  unit_cost: "",
  other_cost: "",
  available_quantity: "",
  required_quantity: "",
  suppliers_name: "",
  suppliers_contact_details: "",
  receipt_date: "",
  data_sheet: "",
  invoice_number: "",
  cabinet: "",
  drawer: "",
  shelf: "",
  images: [],
};

const Component = () => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [component, setComponent] = useState(defaultComponent);
  const { API_URL, setAppStatus } = useElectronics();
  const { id } = useParams();

  const getComponent = async () => {
    setAppStatus("Loading");
    await axios
      .get(`${API_URL}/getComponent/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setComponent(res.data);
        }
        setAppStatus("Success");
      })
      .catch((error) => {
        console.log(error);
        setAppStatus("Server Error");
      });
  };

  useEffect(() => {
    getComponent();
  }, []);

  return (
    <section className="py-[4rem] px-[5.6rem] w-full h-screen grid grid-cols-3 gap-[3rem] font-firago font-feature">
      <div className="col-span-1">
        <SwiperComponent images={component.images} />
      </div>
      <div
        className="col-span-2  flex flex-col gap-[3rem] font-medium text-textColor 
          text-[1.4rem]"
      >
        <div className="mt-4 flex justify-between align-center bg-white p-8 rounded-[1rem]">
          <h5 className="mx-auto">{component.name}</h5>
        </div>
        <div className="grid grid-cols-2 gap-[3rem] ">
          <div className="bg-white p-8 rounded-[1rem]">
            <div className="flex justify-between items-center  mb-4 ">
              <span>ოჯახი:</span> <span>{component.family}</span>
            </div>
            <div className="flex flex-col gap-4 py-4 border-y-[0.1rem] border-textColor">
              <div className="flex justify-between items-center">
                <span>კორპუსის ტიპი</span>
                <span>{component.package_type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ელ.კვება</span>
                <span>{component.electrical_supply}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ნომინალური ღირებულება</span>
                <span>{component.nominal_value}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex justify-between items-center">
                <span>ხელმ. რაოდენობა</span>
                <span>{component.available_quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>მინ. რაოდენობა</span>
                <span>{component.required_quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ერთეულის ღირებულება</span>
                <span>{component.unit_cost}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>სხვა ხარჯი</span>
                <span>{component.other_cost}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                className="w-full h-[4rem] rounded-default flex justify-center items-center gap-4
                            bg-textColor text-white font-bold "
                onClick={() => {
                  setShowUpdateModal(true);
                }}
              >
                <span>განახლება</span>

                {/* <ImDrawer className="h-[2.4rem] mt-[-0.5rem]" /> */}
              </button>
              <button
                className="w-full h-[4rem] rounded-default flex justify-center items-center gap-4
                            bg-errorRed text-white font-bold "
                // onClick={() => {
                //   setCurrentComponent(component);
                //   setShowStorageModal(true);
                // }}
              >
                <span>წაშლა</span>

                {/* <ImDrawer className="h-[2.4rem] mt-[-0.5rem]" /> */}
              </button>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[1rem]">
            <div className="flex justify-between items-center mb-4">
              <span>დანიშნულება:</span> <span>{component.purpose}</span>
            </div>
            <div className="flex flex-col gap-4 py-4 border-y-[0.1rem] border-textColor">
              <div className="flex justify-between items-center">
                <span>კარადა</span>
                <span>{component.cabinet}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>თარო</span>
                <span>{component.shelf}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>უჯრა</span>
                <span>{component.drawer}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex justify-between items-center">
                <span>მომწოდებლის სახელი</span>
                <span>{component.suppliers_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>მომწოდებლის საკონტაქტო</span>
                <span>{component.suppliers_contact_details}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>მოწოდების თარიღი</span>
                <span>{component.receipt_date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ინვოისის ნომერი</span>
                <span>{component.invoice_number}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                className="w-full h-[4rem] rounded-default flex justify-center items-center gap-4
                            bg-green text-white font-bold "
                // onClick={() => {
                //   setCurrentComponent(component);
                //   setShowStorageModal(true);
                // }}
              >
                <span>ადგილის განახლება</span>

                {/* <ImDrawer className="h-[2.4rem] mt-[-0.5rem]" /> */}
              </button>
              <button
                className="w-full h-[4rem] rounded-default flex justify-center items-center gap-4
                            bg-bgColor text-white font-bold "
                // onClick={() => {
                //   setCurrentComponent(component);
                //   setShowStorageModal(true);
                // }}
              >
                <span>რაოდენობის განახლება</span>

                {/* <ImDrawer className="h-[2.4rem] mt-[-0.5rem]" /> */}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showUpdateModal && (
        <UpdateComponent
          setShowUpdateModal={setShowUpdateModal}
          component={component}
        />
      )}
    </section>
  );
};

export default Component;
