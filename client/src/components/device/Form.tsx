import { useState } from "react";

type Form = {
  formData: Device;
  setFormData: (value: React.SetStateAction<Device>) => void;
  submitFunction: () => void;
  type: string;
};

const Form = ({ setFormData, formData, submitFunction, type }: Form) => {
  const [validationsMessage, setValidationsMessage] = useState<string | null>(
    null
  );

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name === "" || formData.available_quantity === "") {
      setValidationsMessage("გთხოვთ შეავსოთ ყველა სავალდებულო * ველი");
      return;
    } else {
      submitFunction();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 text-textColor text-[1.4rem]"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name">
          კომპონენტის დასახელება <span className="text-errorRed">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          placeholder="..."
          className={`w-[52rem] rounded-default border-[0.05rem] border-bgColor py-3 px-4  focus:outline-none
             ${validationsMessage && formData.name === "" ? "border-errorRed placeholder:text-errorRed" : ""}`}
        />
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="electronic_supply">ელექტრონული კვება</label>
          <input
            type="text"
            name="electronic_supply"
            value={formData.electrical_supply}
            onChange={(e) => {
              setFormData({ ...formData, electrical_supply: e.target.value });
            }}
            placeholder="..."
            className="w-full rounded-default border-[0.05rem] border-bgColor py-3 px-4  focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="nominal_value">ზომა</label>
          <input
            type="text"
            name="nominal_value"
            value={formData.size}
            onChange={(e) => {
              setFormData({ ...formData, size: e.target.value });
            }}
            placeholder="..."
            className="w-full rounded-default border-[0.05rem] border-bgColor py-3 px-4  focus:outline-none"
          />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="available_quantity">
            ხელმისაწვდომი რაოდენობა <span className="text-errorRed">*</span>
          </label>
          <input
            type="number"
            name="available_quantity"
            value={formData.available_quantity}
            onChange={(e) => {
              setFormData({ ...formData, available_quantity: e.target.value });
            }}
            placeholder="..."
            className={`w-full rounded-default border-[0.05rem] border-bgColor py-3 px-4  focus:outline-none
             ${validationsMessage && formData.available_quantity === "" ? "border-errorRed placeholder:text-errorRed" : ""}`}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="unit_cost">ერთეულის ღირებულება</label>
          <input
            type="number"
            name="unit_cost"
            value={formData.unit_cost}
            onChange={(e) => {
              setFormData({ ...formData, unit_cost: e.target.value });
            }}
            placeholder="..."
            className="w-full rounded-default border-[0.05rem] border-bgColor py-3 px-4  focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="purpose">დანიშნულება</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={(e) => {
            setFormData({ ...formData, purpose: e.target.value });
          }}
          placeholder="..."
          className="resize-none max-h-[15rem] w-[52rem] rounded-default border-[0.05rem] border-bgColor py-3 px-4  focus:outline-none"
        />
      </div>

      {validationsMessage && (
        <p className="text-[1.4rem] italic text-errorRed">
          {validationsMessage}
        </p>
      )}
      <button
        type="submit"
        className="text-[1.6rem] rounded-default flex justify-center items-center
         bg-green text-white font-bold px-[3rem] py-3 mx-auto mt-3"
      >
        {type}
      </button>
    </form>
  );
};

export default Form;
