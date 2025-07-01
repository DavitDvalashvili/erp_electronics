import { Dispatch, SetStateAction } from "react";
import { Modal } from "../Modal";
import axios from "axios";
import { useElectronics } from "../../App";

type updateStorage = {
  currentComponent: Component;
  setCurrentComponent: Dispatch<SetStateAction<Component>>;
};

const UpdateStorage = ({
  currentComponent,
  setCurrentComponent,
}: updateStorage) => {
  const { API_URL, setResponse, components, setComponents, setModal } =
    useElectronics();

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateStorage();
  };

  const updateStorage = async () => {
    await axios
      .post(
        `${API_URL}/updateComponent/${currentComponent.id}`,
        currentComponent
      )
      .then((res) => {
        if (res.data.status === "updated") {
          setComponents([
            currentComponent,
            ...components.filter(
              (component) => component.id !== currentComponent.id
            ),
          ]);
          setModal(null);
          console.log(res.data);
        }
        setResponse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal title="ადგილმდებარეობის განახლება">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-4">
          <label
            htmlFor="cabinet"
            className=" w-full rounded-default border-[0.1rem]  p-4 text-[1.6rem] "
          >
            კარადა
          </label>
          <input
            type="string"
            name="cabinet"
            value={currentComponent.cabinet}
            onChange={(e) => {
              setCurrentComponent({
                ...currentComponent,
                cabinet: e.target.value,
              });
            }}
            placeholder="..."
            className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          <label
            htmlFor="shelf"
            className=" w-full rounded-default border-[0.1rem]  p-4 text-[1.6rem] "
          >
            თარო
          </label>
          <input
            type="string"
            name="shelf"
            value={currentComponent.shelf}
            onChange={(e) => {
              setCurrentComponent({
                ...currentComponent,
                shelf: e.target.value,
              });
            }}
            placeholder="..."
            className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          <label
            htmlFor="drawer"
            className=" w-full rounded-default border-[0.1rem]  p-4 text-[1.6rem] "
          >
            უჯრა
          </label>
          <input
            type="string"
            name="drawer"
            value={currentComponent.drawer}
            onChange={(e) => {
              setCurrentComponent({
                ...currentComponent,
                drawer: e.target.value,
              });
            }}
            placeholder="..."
            className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="text-[1.6rem] rounded-default flex justify-center items-center
         bg-green text-white font-bold px-[3rem] py-3 mx-auto"
        >
          განახლება
        </button>
      </form>
    </Modal>
  );
};

export default UpdateStorage;
