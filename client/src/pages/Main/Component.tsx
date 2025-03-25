import axios from "axios";
//import Loading from "../Loading";
//import ServerError from "../ServerError";
import { useElectronics } from "../../App";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperComponent from "../../components/SwiperComponent";
import UpdateComponent from "../../components/component/UpdateComponent";
import { ImDrawer } from "react-icons/im";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import DeleteComponent from "../../components/component/DeleteComponent";
import UpdateStorage from "../../components/component/UpdateStorage";
import UpdateQuantity from "../../components/component/UpdateQuantity";
import ImageBox from "../../components/ImageBox";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import PdfViewer from "../../components/component/PdfViewer";

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
  const [component, setComponent] = useState(defaultComponent);
  const [images, setImages] = useState<Image[]>([]);
  const { API_URL, setAppStatus, modal, setModal } = useElectronics();
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

  useEffect(() => {
    setImages(component.images);
  }, [component]);

  return (
    <section className="py-[4rem] px-[5.6rem] w-full h-screen  font-firago font-feature  overflow-y-scroll">
      <div className="grid grid-cols-3 gap-[3rem]">
        <div className="col-span-1 h-fit ">
          <SwiperComponent images={images} />
        </div>
        <div
          className="col-span-2  flex flex-col gap-[3rem] font-medium text-textColor 
          text-[1.4rem] "
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
                            border border-textColor text-textColor font-bold hover:bg-textColor transition duration-300
                             hover:text-white text-[1.3rem]"
                  onClick={() => {
                    setModal("update_component");
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
                    setModal("delete_component");
                  }}
                >
                  <span>წაშლა</span>

                  <MdDeleteOutline className="h-[2.4rem] mt-[-0.5rem]" />
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
                    setModal("update_component_quantity");
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
      <div className="grid grid-cols-5 mt-8 ">
        <div className="h-full flex justify-center items-center">
          <div
            className=" h-full rounded-default flex flex-col justify-center items-center gap-5  border-2
          border-bgColor cursor-pointer p-[2rem] text-textColor"
            onClick={() => {
              setModal("view_pdf");
            }}
          >
            <MdOutlinePictureAsPdf className="w-[8rem] h-[8rem] " />
            <span className=" text-[1.4rem]">DataSheet-ის ნახვა</span>
          </div>
        </div>
      </div>
      {modal === "view_pdf" && (
        <PdfViewer component={component} setComponent={setComponent} />
      )}
      {modal === "update_component" && (
        <UpdateComponent component={component} setComponent={setComponent} />
      )}
      {modal === "delete_component" && (
        <DeleteComponent component={component} />
      )}
      {modal === "update_position" && (
        <UpdateStorage
          currentComponent={component}
          setCurrentComponent={setComponent}
        />
      )}
      {modal === "update_component_quantity" && (
        <UpdateQuantity currentComponent={component} />
      )}
    </section>
  );
};

export default Component;
