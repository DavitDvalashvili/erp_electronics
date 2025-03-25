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
            console.log(images);
            if (images[0].image_id === null) {
              setImages([
                {
                  image_id: res.data.insert_id,
                  image_url: previewUrl,
                  preview: true,
                },
              ]);
            } else {
              setImages([
                ...images,
                {
                  image_id: res.data.insert_id,
                  image_url: previewUrl,
                  preview: true,
                },
              ]);
            }
            setModal(null);
          }
          setResponse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const takePicture = () => {
    setTimeout(() => {
      if (videoRef.current) {
        const screenshot = videoRef?.current.getScreenshot();
        if (screenshot) {
          setPreviewUrl(screenshot);
          const photo = new File([screenshot], "photo.png", {
            type: "image/png",
          });
          setFile(photo);
        }
        setWebCamMode(false);
      }
    }, 100);
  };

  return (
    <Modal title="ფოტოს დამატება">
      <>
        <div className="">
          <img
            src={previewUrl}
            alt="PreviewComponent"
            className="h-[20rem] w-fit mb-4 mx-auto "
          />
          <button
            className="text-[1.6rem] rounded-default flex justify-center items-center
            bg-green text-white font-bold px-[3rem] py-3 mx-auto"
            onClick={() => addImage()}
          >
            დამატება
          </button>
        </div>
        <input
          type="file"
          ref={imageRef}
          onChange={handleChange}
          className=""
        />

        {!uploadImage && !webCamMode && (
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
            </div>
          </div>
        )}
        {webCamMode && (
          <div>
            <Webcam audio={false} width="100%" ref={videoRef} />
            <button
              className="text-[1.6rem] rounded-default flex justify-center items-center
            bg-green text-white font-bold px-[3rem] py-3 mx-auto"
              onClick={takePicture}
            >
              გადაღება
            </button>
          </div>
        )}
      </>
    </Modal>
  );
};

export default AddImage;
