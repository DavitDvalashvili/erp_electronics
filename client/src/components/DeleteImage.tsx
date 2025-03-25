import { Modal } from "./Modal";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import axios from "axios";
import { useElectronics } from "../App";

interface DeleteImage {
  images: Image[];
  setImages: Dispatch<SetStateAction<Image[]>>;
  currentImage: Image | null;
}

const DeleteImage = ({ images, setImages, currentImage }: DeleteImage) => {
  const { API_URL, setModal, setResponse } = useElectronics();

  const deleteImage = async () => {
    await axios
      .delete(`${API_URL}/deleteImage/${currentImage?.image_id}`)
      .then((res) => {
        if (res.data.status == "deleted") {
          if (images.length === 1) {
            setImages([
              { image_id: null, image_url: "" },
              ...images.filter((i) => i.image_id !== currentImage?.image_id),
            ]);
          } else {
            setImages([
              ...images.filter((i) => i.image_id !== currentImage?.image_id),
            ]);
          }
        }
        setModal(null);
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal title="სურათის წაშლა">
      <div className="flex flex-col gap-4 text-[]">
        <p className="text-[1.6rem] text-textColor pb-4">
          ნამდვილად გსურთ სურათის წაშლა?
        </p>
        <img
          src={
            currentImage?.preview
              ? currentImage?.image_url
              : `${API_URL}/files/images/${currentImage?.image_url}`
          }
          alt={`component ${currentImage?.image_id}`}
          className="h-[20em]"
        />
      </div>
      <button
        type="submit"
        className="text-[1.6rem] rounded-default flex justify-center items-center
                            bg-green text-white font-bold px-[3rem] py-3 mx-auto mt-4"
        onClick={() => deleteImage()}
      >
        წაშლა
      </button>
    </Modal>
  );
};

export default DeleteImage;
