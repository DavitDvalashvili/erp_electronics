import { TbDeviceIpadBolt } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdFilterListAlt } from "react-icons/md";
import { useElectronics } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import ServerError from "../ServerError";
import FilterBox from "../../components/device/FilterBox";
import { FaSortAmountUpAlt } from "react-icons/fa";
import SearchBox from "../../components/SearchBox";
import { Link } from "react-router-dom";
import AddDevice from "../../components/device/AddDevice";
import UpdateQuantity from "../../components/device/UpdateQuantity";
import { defaultDevice, defaultQuery } from "../../data/devices";
import ResultNotFound from "../../components/ResultNotFound";
import { InteractiveBox } from "../../components/device/InteractiveBox";

const Devices = () => {
  const {
    API_URL,
    appStatus,
    setAppStatus,
    setDevices,
    devices,
    modal,
    setModal,
  } = useElectronics();

  const [searchQuery, setSearchQuery] = useState<QueryDevice>(defaultQuery);
  const [searchValue, setSearchValue] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [queryString, setQuerystring] = useState("");
  const [currentDevice, setCurrentDevice] = useState<Device>(defaultDevice);

  const getDevices = async () => {
    setAppStatus("Loading");
    await axios
      .get(`${API_URL}/getDevices?${queryString}`)
      .then((res) => {
        if (res.status == 200) {
          setDevices(res.data);
        }
        setAppStatus("Success");
      })
      .catch((error) => {
        console.log(error);
        setAppStatus("Server Error");
      });
  };

  useEffect(() => {
    const query: string[] = [];
    for (const key of Object.keys(searchQuery)) {
      if (searchQuery[key as keyof QueryDevice]) {
        query.push(`${key}=${searchQuery[key as keyof QueryDevice]}`);
      }
    }
    setQuerystring(query.join("&"));
  }, [searchQuery]);

  useEffect(() => {
    if (queryString) {
      getDevices();
    }
  }, [queryString]);

  const handleToggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.searchTerm !== searchValue) {
        setSearchQuery({
          ...searchQuery,
          searchTerm: searchValue,
        });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue]);

  if (appStatus === "Server Error") return <ServerError />;

  return (
    <section className=" bg-green-500 h-screen w-full overflow-y-scroll font-firago font-feature">
      <div className="fixed t-0 w-[calc(100vw-28.5rem)] xl:w-[calc(192rem-38.5rem)] bg-bgColorSecondary px-[5.6rem] pt-[4rem] pb-[3rem]">
        <div className="flex gap-8 ">
          <div className="bg-white rounded-default p-[1.2rem] flex gap-8 text-[1.8rem] font-bold items-center h-[5rem] w-fit ">
            <TbDeviceIpadBolt className="w-[3rem] h-[3rem]" />
            <span>მოწყობილობები</span>
          </div>

          <button
            className="bg-white rounded-default h-[5rem] text-[1.8rem] font-bold flex gap-8 items-center p-[1.2rem] cursor-pointer"
            onClick={() => {
              setModal("add");
            }}
          >
            <IoMdAddCircleOutline className="w-[2.5rem] h-[2.5rem]" />
            <span>მოწყბილობის დამატება</span>
          </button>

          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          <button
            className="bg-white rounded-default h-[5rem] text-[1.5rem] font-bold flex gap-8 items-center 
            p-[1.2rem] cursor-pointer"
            onClick={handleToggleFilter}
          >
            <MdFilterListAlt className="w-[2.5rem] h-[2.5rem]" />
            <span>{showFilter ? "ფილტრის დამალვა" : "ფილტრის გამოჩენა"}</span>
          </button>
        </div>
        <InteractiveBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {showFilter && (
          <FilterBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </div>
      {appStatus === "Loading" ? <Loading /> : null}
      {devices?.length === 0 ? (
        <ResultNotFound name="მოწყობილობა" />
      ) : (
        <div
          className={`grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6 font-medium text-textColor 
          text-[1.4rem] px-[5.6rem] pb-[4rem] ${showFilter ? "mt-[23.8rem]" : "mt-[18rem]"} `}
        >
          {devices?.map((device, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-[1rem] overflow-hidden "
            >
              <div className="flex justify-start items-center gap-8 font-bold text-[2rem] font-feature ">
                <img
                  src={
                    device.images[0]?.image_url
                      ? device.images[0]?.image_url.startsWith("blob:")
                        ? device.images[0]?.image_url
                        : `${API_URL}/files/images/${device.images[0]?.image_url}`
                      : "/device.svg"
                  }
                  alt="component"
                  className="h-[15rem] w-[18rem] rounded-[0.5rem]"
                />
                <h3>მოწყობილობები</h3>
              </div>
              <div className="mt-4 flex justify-between align-center pb-4">
                <h5>{device.name}</h5>
                <Link to={`/device/${device.id}`}>
                  <button
                    className="rounded-default flex justify-center items-center border text-textColor border-textColor px-3 py-1 
                  hover:text-white hover:bg-textColor duration-300 transition"
                  >
                    დეტალურად
                  </button>
                </Link>
              </div>
              <div className="flex flex-col gap-4  py-4 border-y-[0.1rem] border-textColor">
                <div className="flex justify-between items-center">
                  <span>რაოდენობა</span>
                  <span>{device.available_quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ერთეულის ღირებულება</span>
                  <span>{device.unit_cost}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex justify-between items-center">
                  <span>ელექტორნული კვება</span>{" "}
                  <span>{device.electrical_supply}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ზომა</span>
                  <span>{device.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>დანიშნულება</span>
                  <span>{device.purpose}</span>
                </div>
              </div>
              <button
                className="w-full h-[4rem] rounded-default flex justify-center items-center gap-4
                  font-bold border-green text-green hover:bg-green transition duration-300 hover:text-white border"
                onClick={() => {
                  setCurrentDevice(device);
                  setModal("update_quantity");
                }}
              >
                <span>რაოდენობის განახლება</span>
                <FaSortAmountUpAlt className="h-[2.4rem] mt-[-0.5rem]" />
              </button>
            </div>
          ))}
        </div>
      )}
      {modal === "add" && <AddDevice />}
      {modal === "update_quantity" && (
        <UpdateQuantity
          currentDevice={currentDevice}
          setCurrentDevice={setCurrentDevice}
        />
      )}
    </section>
  );
};

export default Devices;
