import { Modal } from "../Modal";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { useElectronics } from "../../App";
import { useEffect } from "react";

type updateComponent = {
  currentComponent: Component;
  setCurrentComponent: Dispatch<SetStateAction<Component>>;
};

type Quantity = {
  increaseQuantity: number | string;
  decreaseQuantity: number | string;
  updatedQuantity: number | string;
};

const defaultQuantity = {
  increaseQuantity: "",
  decreaseQuantity: "",
  updatedQuantity: "",
};

const UpdateQuantity = ({
  currentComponent,
  setCurrentComponent,
}: updateComponent) => {
  const {
    API_URL,
    setResponse,
    setComponents,
    components,
    setModal,
    getNotifications,
  } = useElectronics();
  const [quantity, setQuantity] = useState<Quantity>(defaultQuantity);
  const [newQuantity, setNewQuantity] = useState<number>(0);

  useEffect(() => {
    if (quantity.updatedQuantity) {
      setNewQuantity(Number(quantity.updatedQuantity));
    } else {
      setNewQuantity(
        Number(currentComponent.available_quantity) +
          (Number(quantity.increaseQuantity)
            ? Number(quantity.increaseQuantity)
            : 0) -
          (Number(quantity.decreaseQuantity)
            ? Number(quantity.decreaseQuantity)
            : 0)
      );
    }
  }, [quantity]);

  const updateQuantity = async () => {
    const updatedComponent: Component = {
      ...currentComponent,
      available_quantity: newQuantity,
    };
    await axios
      .post(
        `${API_URL}/updateComponent/${currentComponent.id}`,
        updatedComponent
      )
      .then((res) => {
        if (res.data.status === "updated") {
          setComponents([
            updatedComponent,
            ...(components
              ? components.filter(
                  (component) => component.id !== updatedComponent.id
                )
              : []),
          ]);
          getNotifications();
          setCurrentComponent(updatedComponent);
          setModal(null);
          setQuantity(defaultQuantity);
        }
        setResponse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentComponent.available_quantity == newQuantity) {
      return;
    }
    if (newQuantity < 0) {
      return;
    }
    updateQuantity();
  };

  return (
    <Modal title="რაოდენობის განახლება">
      <div className="flex flex-col gap-4 pb-4 text-[1.6rem] pr-4">
        <div className="flex justify-between items-center">
          <span>რაოდენობა</span>
          <span className="text-bgColor font-bold ">
            {currentComponent.available_quantity}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>განახლებული რაოდენობა</span>
          <span className="text-bgColor font-bold ">{newQuantity}</span>
        </div>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          disabled={!!quantity.decreaseQuantity || !!quantity.updatedQuantity}
          type="number"
          name="quantity-increase"
          value={quantity.increaseQuantity}
          onChange={(e) => {
            setQuantity({
              ...quantity,
              increaseQuantity: parseInt(e.target.value),
            });
          }}
          placeholder="რაოდენობის ზრდა"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
        <input
          type="number"
          name="quantity-deacrease"
          disabled={!!quantity.increaseQuantity || !!quantity.updatedQuantity}
          value={quantity.decreaseQuantity}
          onChange={(e) => {
            setQuantity({
              ...quantity,
              decreaseQuantity: parseInt(e.target.value),
            });
          }}
          placeholder="რაოდენობის შემცირება"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
        <input
          type="number"
          name="quantity"
          disabled={!!quantity.increaseQuantity || !!quantity.decreaseQuantity}
          value={quantity.updatedQuantity}
          onChange={(e) => {
            setQuantity({
              ...quantity,
              updatedQuantity: parseInt(e.target.value),
            });
          }}
          placeholder="განახლებული რაოდენობა"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
        {newQuantity < 0 && (
          <p className="text-errorRed italic text-[1.3rem]">
            მიუთითეთ განსხვავებული რაოდენობა
          </p>
        )}
        <button
          type="submit"
          className="text-[1.6rem] rounded-default flex justify-center items-center
                            bg-green text-white font-bold px-[3rem] py-3 mx-auto"
          onClick={() => {}}
        >
          განახლება
        </button>
      </form>
    </Modal>
  );
};

export default UpdateQuantity;
