import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import ExportExcel from "./ExportExcel";
import axios from "axios";
import { useElectronics } from "../../App";

type InteractiveBox = {
  searchQuery: QueryComponent;
  setSearchQuery: (query: QueryComponent) => void;
};

export const InteractiveBox = ({
  searchQuery,
  setSearchQuery,
}: InteractiveBox) => {
  const { API_URL } = useElectronics();
  const [allComponents, setAllComponents] = useState<Component[]>([]);

  const getAllComponents = async () => {
    await axios
      .get(`${API_URL}/getComponents`)
      .then((res) => {
        if (res.status == 200) {
          setAllComponents(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllComponents();
  }, []);

  return (
    <div className="mt-[2rem] flex justify-between item-center">
      <Pagination
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        components={allComponents}
      />
      <ExportExcel components={allComponents} />
    </div>
  );
};
