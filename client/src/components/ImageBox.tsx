import { MdDeleteOutline } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { Dispatch, SetStateAction, useState } from "react";
import AddImage from "./AddImage";
import { useElectronics } from "../App";
import DeleteImage from "./DeleteImage";

interface images {
  images: Image[];
  setImages: Dispatch<SetStateAction<Image[]>>;
}

const ImageBox = ({ images, setImages }: images) => {
  const { modal, setModal, API_URL } = useElectronics();
  const [currentImage, setCurrentImage] = useState<Image | null>(null);

  return (
    <div className=" mt-8 grid grid-cols-5  gap-4">
      {images.length > 0 &&
        images[0].image_id &&
        images.map((image, index) => (
          <div
            key={index}
            className="rounded-default  p-4 flex flex-col justify-between gap-5 h-[25rem]"
          >
            <div className="h-full flex justify-center items-center w-full">
              <img
                src={
                  image.preview
                    ? image.image_url
                    : `${API_URL}/files/images/${image.image_url}`
                }
                alt="componentImage"
              />
            </div>
            <button
              className="h-[4rem] rounded-default flex justify-center items-center gap-4
            border border-errorRed text-errorRed font-bold hover:bg-errorRed transition duration-300
            hover:text-white text-[1.3rem] mx-auto px-8"
              onClick={() => {
                setModal("delete_image");
                setCurrentImage(image);
              }}
            >
              <span>წაშლა</span>
              <MdDeleteOutline className="h-[2.4rem] mt-[-0.5rem]" />
            </button>
          </div>
        ))}
      <div className="h-full flex justify-center items-center">
        <div
          className="rounded-default flex flex-col justify-center items-center gap-5  border-dashed border-2 
          border-bgColor cursor-pointer p-[2rem] text-textColor"
          onClick={() => {
            setModal("add_image");
          }}
        >
          <BiImageAdd className="w-[8rem] h-[8rem] " />
          <span className=" text-[1.4rem]">ფოტოს დამატება</span>
        </div>
      </div>
      {modal === "add_image" && (
        <AddImage images={images} setImages={setImages} />
      )}
      {modal === "delete_image" && (
        <DeleteImage
          images={images}
          setImages={setImages}
          currentImage={currentImage}
        />
      )}
    </div>
  );
};

export default ImageBox;
