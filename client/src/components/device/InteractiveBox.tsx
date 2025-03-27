import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import ExportExcel from "./ExportExcel";
import axios from "axios";
import { useElectronics } from "../../App";

type InteractiveBox = {
  searchQuery: QueryDevice;
  setSearchQuery: (query: QueryDevice) => void;
};

export const InteractiveBox = ({
  searchQuery,
  setSearchQuery,
}: InteractiveBox) => {
  const { API_URL } = useElectronics();
  const [allDevices, setAllDevices] = useState<Device[]>([]);

  const getAllDevices = async () => {
    await axios
      .get(`${API_URL}/getDevices`)
      .then((res) => {
        if (res.status == 200) {
          setAllDevices(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllDevices();
  }, []);

  return (
    <div className="mt-[2rem] flex justify-between item-center">
      <Pagination
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        devices={allDevices}
      />
      <ExportExcel devices={allDevices} />
    </div>
  );
};
