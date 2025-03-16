import { defaultComponent } from "../../pages/Main/Component";
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState<Component>(defaultComponent);
  const [focusDate, setFocusDate] = useState<boolean>(false);
  const [validationsMessage, setValidationsMessage] = useState<string | null>(
    null
  );

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.available_quantity === "" ||
      formData.required_quantity === ""
    ) {
      setValidationsMessage("გთხოვთ შეავსოთ ყველა სავალდებულო * ველი");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
        }}
        placeholder="კომპონენტის დასახელება*"
        className={`w-[52rem] rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none
             ${validationsMessage && formData.name === "" ? "border-errorRed placeholder:text-errorRed" : ""}`}
      />
      <div className="flex gap-4 items-center">
        <input
          type="text"
          name="family"
          value={formData.family}
          onChange={(e) => {
            setFormData({ ...formData, family: e.target.value });
          }}
          placeholder="ოჯახის ტიპი"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
        <input
          type="text"
          name="package_type"
          value={formData.package_type}
          onChange={(e) => {
            setFormData({ ...formData, package_type: e.target.value });
          }}
          placeholder="კორპუსის ტიპი"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
      </div>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          name="nominal_value"
          value={formData.nominal_value}
          onChange={(e) => {
            setFormData({ ...formData, nominal_value: e.target.value });
          }}
          placeholder="ნომინალური ღირებულება"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
        <input
          type="text"
          name="electronic_supply"
          value={formData.electrical_supply}
          onChange={(e) => {
            setFormData({ ...formData, electrical_supply: e.target.value });
          }}
          placeholder="ელექტრონული კვება"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
      </div>
      <div className="flex gap-4 items-center">
        <input
          type="number"
          name="available_quantity"
          value={formData.available_quantity}
          onChange={(e) => {
            setFormData({ ...formData, available_quantity: e.target.value });
          }}
          placeholder="ხელმისაწვდომი რაოდენობა*"
          className={`w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none
             ${validationsMessage && formData.available_quantity === "" ? "border-errorRed placeholder:text-errorRed" : ""}`}
        />
        <input
          type="number"
          name="required_quantity"
          value={formData.required_quantity}
          onChange={(e) => {
            setFormData({ ...formData, required_quantity: e.target.value });
          }}
          placeholder="მინ. საჭირო რაოდენობა*"
          className={`w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none
            ${validationsMessage && formData.required_quantity === "" ? "border-errorRed placeholder:text-errorRed" : ""}`}
        />
      </div>
      <div className="flex gap-4 items-center">
        <input
          type="number"
          name="unit_cost"
          value={formData.unit_cost}
          onChange={(e) => {
            setFormData({ ...formData, unit_cost: e.target.value });
          }}
          placeholder="ერთეულის ღირებულება"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
        <input
          type="number"
          name="other_cost"
          value={formData.other_cost}
          onChange={(e) => {
            setFormData({ ...formData, other_cost: e.target.value });
          }}
          placeholder="სხვა ხარჯი"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
      </div>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          name="suppliers_name"
          value={formData.suppliers_name}
          onChange={(e) => {
            setFormData({ ...formData, suppliers_name: e.target.value });
          }}
          placeholder="მომწოდებელი"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
        <input
          type="text"
          name="suppliers_contact_details"
          value={formData.suppliers_contact_details}
          onChange={(e) => {
            setFormData({
              ...formData,
              suppliers_contact_details: e.target.value,
            });
          }}
          placeholder="მომწოდებლის საკონტაქტო"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
      </div>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          name="invoice_number"
          value={formData.invoice_number}
          onChange={(e) => {
            setFormData({ ...formData, invoice_number: e.target.value });
          }}
          placeholder="ინვოისის ნომერი"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
        <input
          type={focusDate ? "date" : "text"}
          name="receipt_date"
          value={formData.receipt_date}
          onFocus={() => setFocusDate(true)}
          onBlur={() => setFocusDate(false)}
          onChange={(e) => {
            setFormData({
              ...formData,
              receipt_date: e.target.value,
            });
          }}
          placeholder="მიღების თარიღი"
          className="w-full rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none cursor-pointer"
        />
      </div>
      <div className="flex gap-2 items-center w-full">
        <input
          type="text"
          name="cabinet"
          value={formData.cabinet}
          onChange={(e) => {
            setFormData({ ...formData, cabinet: e.target.value });
          }}
          placeholder="კარადა"
          className="w-[17rem] rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
        <input
          type="text"
          name="shelf"
          value={formData.shelf}
          onChange={(e) => {
            setFormData({ ...formData, shelf: e.target.value });
          }}
          placeholder="თარო"
          className="w-[17rem] rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
        <input
          type="text"
          name="drawer"
          value={formData.drawer}
          onChange={(e) => {
            setFormData({ ...formData, drawer: e.target.value });
          }}
          placeholder="უჯრა"
          className="w-[17rem] rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
        />
      </div>
      <textarea
        name="purpose"
        value={formData.purpose}
        onChange={(e) => {
          setFormData({ ...formData, purpose: e.target.value });
        }}
        placeholder="დანიშნულება"
        className="resize-none max-h-[15rem] w-[52rem] rounded-default border-[0.05rem] border-bgColor p-4 text-[1.6rem] focus:outline-none"
      />
      {validationsMessage && (
        <p className="text-[1.4rem] italic text-errorRed">
          {validationsMessage}
        </p>
      )}
      <button
        type="submit"
        className="text-[1.6rem] rounded-default flex justify-center items-center
                            bg-green text-white font-bold px-[3rem] py-3 mx-auto"
        onClick={() => {}}
      >
        დამატება
      </button>
    </form>
  );
};

export default Form;
