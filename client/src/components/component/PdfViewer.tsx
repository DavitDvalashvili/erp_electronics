import { useElectronics } from "../../App";
import { Modal } from "../Modal";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type pdfViewer = {
  component: Component;
  setComponent: Dispatch<SetStateAction<Component>>;
};

const PdfViewer = ({ component, setComponent }: pdfViewer) => {
  const documentRef = useRef<HTMLInputElement | null>(null);
  const Id = useParams().id as string | number;

  const { API_URL, setResponse } = useElectronics();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("document", file);
      await axios
        .post(`${API_URL}/addDocument?id=${Id}`, formData)
        .then((res) => {
          if (res.data.status === "inserted" || res.data.status === "updated") {
            setComponent({
              ...component,
              data_sheet: URL.createObjectURL(file),
            });
          }
          console.log(res.data);
          setResponse(res.data);
          if (documentRef.current) {
            documentRef.current.value = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log(`${API_URL}/files/documents/${component?.data_sheet}`);

  return (
    <Modal title="DataSheet - ის ნახვა">
      {!component.data_sheet && (
        <p className="text-textColor text-[1.6rem] font-medium text-center py-8">
          DataSheet ატვირთული არ არის
        </p>
      )}
      <div className=" flex flex-col justify-center items-center gap-4">
        {component.data_sheet && (
          <div>
            <iframe
              src={
                component?.data_sheet?.startsWith("blob:")
                  ? component.data_sheet
                  : `${API_URL}/files/documents/${component?.data_sheet}`
              }
              width="100%"
              title="PDF Viewer"
              className="w-[70rem] h-[70rem]"
            />
          </div>
        )}
        <input
          type="file"
          ref={documentRef}
          onChange={handleChange}
          className="hidden"
        />
        <button
          className="w-fit h-[4rem] bg-bgColor text-[1.4rem] font-bold text-white rounded-default px-8"
          onClick={() => {
            documentRef.current?.click();
          }}
        >
          {component.data_sheet
            ? "Data Sheet განახლება"
            : "Data Sheet ატვირთვა"}
        </button>
      </div>
    </Modal>
  );
};

export default PdfViewer;
