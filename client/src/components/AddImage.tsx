import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRef } from "react";
import { useElectronics } from "../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Modal } from "./Modal";
import Webcam from "react-webcam";

interface images {
  images: Image[];
  setImages: Dispatch<SetStateAction<Image[]>>;
}

const AddImage = ({ images, setImages }: images) => {
  const { setModal, API_URL, setResponse } = useElectronics();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadImage, setUploadImage] = useState<boolean>(false);
  const [webCamMode, setWebCamMode] = useState<boolean>(false);
  const videoRef = useRef<Webcam>(null);
  const Id = useParams().id as string | number;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
    setUploadImage(true);
  };

  const addImage = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      await axios
        .post(`${API_URL}/addImage?id=${Id}`, formData)
        .then((res) => {
          if (res.data.status === "inserted") {
            if (images[0].image_id === null) {
              setImages([
                {
                  image_id: res.data.insert_id,
                  image_url: previewUrl,
                },
              ]);
            } else {
              setImages([
                ...images,
                {
                  image_id: res.data.insert_id,
                  image_url: previewUrl,
                },
              ]);
            }
            setModal(null);
          }
          setResponse(res.data);
          setFile(undefined);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const takePicture = () => {
    if (videoRef.current) {
      const imageSrc = videoRef.current.getScreenshot();
      if (imageSrc) {
        setPreviewUrl(imageSrc);

        // Convert base64 image to a Blob
        const byteString = atob(imageSrc.split(",")[1]);
        const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: mimeString });
        const photo = new File([blob], "photo.jpg", { type: mimeString });

        setFile(photo);
      }
      setWebCamMode(false);
    }
  };

  useEffect(() => {
    setFile(undefined);
  }, [Modal]);

  return (
    <Modal title="ფოტოს დამატება">
      <>
        {previewUrl && (
          <div className="px-4">
            <img
              src={previewUrl}
              alt="PreviewComponent"
              className="h-[30rem] w-fit mb-4 mx-auto rounded-default "
            />
            <button
              className="text-[1.6rem] rounded-default flex justify-center items-center
             bg-green text-white font-bold px-[3rem] py-3 mx-auto"
              onClick={() => addImage()}
            >
              დამატება
            </button>
          </div>
        )}

        {!webCamMode && !uploadImage && !file && (
          <div className="flex gap-8 p-4">
            <div
              className="rounded-default flex flex-col justify-center items-center gap-5  border-dashed border-2 
                  border-bgColor cursor-pointer p-[2rem] text-textColor"
              onClick={() => imageRef.current?.click()}
            >
              <BiImageAdd className="w-[8rem] h-[8rem] " />
              <span className=" text-[1.4rem]">ფოტოს დამატება</span>
            </div>
            <div className="h-full flex justify-center items-center">
              <div
                className="rounded-default flex flex-col justify-center items-center gap-5  border-dashed border-2 
              border-bgColor cursor-pointer p-[2rem] text-textColor"
                onClick={() => {
                  setWebCamMode(() => true);
                }}
              >
                <MdOutlineAddAPhoto className="w-[8rem] h-[8rem] " />
                <span className=" text-[1.4rem]">ფოტოს გადაღება</span>
              </div>
              <input
                type="file"
                ref={imageRef}
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>
        )}

        {webCamMode && (
          <div className="px-4 flex flex-col">
            <Webcam audio={false} ref={videoRef} className="w-[45.4rem]" />

            <button
              className="text-[1.6rem] rounded-default
             bg-bgColor text-white font-bold px-[3rem] py-3 mx-auto mt-4 flex justify-center gap-2 items-center"
              onClick={takePicture}
            >
              <span>გადაღება</span>
              <MdOutlineAddAPhoto className="mb-[0.3rem]" />
            </button>
          </div>
        )}
      </>
    </Modal>
  );
};

export default AddImage;
