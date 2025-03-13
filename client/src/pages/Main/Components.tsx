import { CgComponents } from "react-icons/cg";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdFilterListAlt } from "react-icons/md";
import { useElectronics } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import ServerError from "../ServerError";
import { IoSearch } from "react-icons/io5";
import Pagination from "../../components/component/Pagination";
import FilterBox from "../../components/component/FilterBox";

const defaultQuery = {
  name: "",
  family: "",
  package_type: "",
  nominal_value: "",
  electrical_supply: "",
  suppliers_name: "",
  cabinet: "",
  shelf: "",
  drawer: "",
  searchTerm: "",
  page: 1,
  pageSize: 10,
};

const Components = () => {
  const { API_URL, appStatus, setAppStatus } = useElectronics();
  const [components, setComponents] = useState<Component[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<QueryComponent>(defaultQuery);

  const getComponents = async () => {
    setAppStatus("Loading");
    await axios
      .get(
        `${API_URL}/getComponents?name=${searchQuery.name}&family=${searchQuery.family}&package_type=${searchQuery.package_type}&nominal_value=${searchQuery.nominal_value}&electrical_supply=${searchQuery.electrical_supply}&suppliers_name=${searchQuery.suppliers_name}&cabinet=${searchQuery.cabinet}&shelf=${searchQuery.shelf}&drawer=${searchQuery.drawer}&searchTerm=${searchQuery.searchTerm}&page=${searchQuery.page}&pageSize=${searchQuery.pageSize}
        `
      )
      .then((res) => {
        if (res.status == 200) {
          setComponents(res.data);
        }
        setAppStatus("Success");
      })
      .catch((error) => {
        console.log(error);
        setAppStatus("Server Error");
      });
  };

  useEffect(() => {
    getComponents();
  }, [searchQuery]);

  if (appStatus === "Loading") return <Loading />;
  if (appStatus === "Server Error") return <ServerError />;

  return (
    <div className="py-[4rem] px-[5.6rem] bg-green-500 h-screen font-firago w-full">
      <div className="flex gap-8 ">
        <div className="bg-white rounded-default p-[1.2rem] flex gap-8 text-[1.8rem] font-bold items-center h-[5rem] w-fit ">
          <CgComponents className="w-[3rem] h-[3rem]" />
          <span>კომპონენტები</span>
        </div>

        <button className="bg-white rounded-default h-[5rem] text-[1.8rem] font-bold flex gap-8 items-center p-[1.2rem] cursor-pointer">
          <IoMdAddCircleOutline className="w-[2.5rem] h-[2.5rem]" />
          <span>კომპონენტის დამატება</span>
        </button>

        <div
          className="h-[5rem]  text-[1.8rem] flex justify-start items-center w-fit rounded-default 
          overflow-hidden bg-white px-4 ml-auto"
        >
          <input
            type="text"
            className="w-[20rem] h-full focus:outline-none placeholder:text-[1.6rem] "
            placeholder="კომპონენტის ძებნა.."
          />
          <IoSearch className="w-[2.5rem] h-[2.5rem] cursor-pointer" />
        </div>

        <button className="bg-white rounded-default h-[5rem] text-[1.5rem] font-bold flex gap-8 items-center p-[1.2rem] cursor-pointer">
          <MdFilterListAlt className="w-[2.5rem] h-[2.5rem]" />
          <span>ფილტრის გამოჩენა</span>
        </button>
      </div>
      <div className="mt-[2rem]">
        <Pagination searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <FilterBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex justify-start gap-2 flex-wrap ">
        {components?.map((elem) => (
          <div key={elem.id} className="bg-red-700 flex flex-col gap-8">
            <div>{elem.name}</div>
            <div>{elem.available_quantity}</div>
            <div>{elem.family}</div>
            <div>{elem.package_type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Components;
