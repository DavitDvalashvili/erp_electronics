import axios from "axios";
import { useElectronics } from "../../App";
import { useEffect, useState } from "react";
import Select from "react-select";
import { FilterTerms } from "../../@types/component.types";

type FilterBoxProps = {
  searchQuery: QueryComponent;
  setSearchQuery: (query: QueryComponent) => void;
};

const defaultFilterTerms: FilterTerms = {
  cabinets: [],
  drawers: [],
  electrical_supplies: [],
  families: [],
  names: [],
  nominal_values: [],
  package_types: [],
  shelves: [],
};

const filterFields = [
  { key: "names", placeholder: "დასახელება..." },
  { key: "families", placeholder: "ოჯახის ტიპი..." },
  { key: "nominal_values", placeholder: "ნომინალური ღირებულება..." },
  { key: "package_types", placeholder: "პაკეტის ტიპი..." },
  { key: "electrical_supplies", placeholder: "ელექტრონული კვება..." },
  { key: "cabinets", placeholder: "კარადა..." },
  { key: "drawers", placeholder: "უჯრა..." },
  { key: "shelves", placeholder: "თარო..." },
];

const FilterBox = ({ searchQuery, setSearchQuery }: FilterBoxProps) => {
  const { API_URL } = useElectronics();
  const [filterTerms, setFilterTerms] =
    useState<FilterTerms>(defaultFilterTerms);

  const getFilterTerms = async () => {
    try {
      const res = await axios.get(`${API_URL}/component/getFilterTerms`);
      if (res.status === 200) {
        setFilterTerms(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilterTerms();
  }, []);

  const handleChange = (
    key: keyof QueryComponent,
    selectedOption: { label: string; value: string } | null
  ) => {
    setSearchQuery({
      ...searchQuery,
      [key]: selectedOption?.value || "",
    });
  };

  return (
    <div className="grid grid-cols-4 gap-[1rem] mt-8 text-[1.4rem] ">
      {filterFields.map((field) => (
        <Select
          key={field.key}
          className="basic-single w-full"
          classNamePrefix="select"
          isClearable
          isSearchable
          name={field.key}
          options={[...new Set(filterTerms[field.key as keyof FilterTerms])]
            .filter((elem) => elem !== "")
            .map((value) => ({
              label: value,
              value,
            }))}
          value={
            searchQuery[field.key as keyof FilterTerms]
              ? {
                  label: searchQuery[field.key as keyof FilterTerms],
                  value: searchQuery[field.key as keyof FilterTerms],
                }
              : null
          }
          onChange={(selectedOption) =>
            handleChange(field.key as keyof FilterTerms, selectedOption)
          }
          placeholder={field.placeholder}
        />
      ))}
    </div>
  );
};

export default FilterBox;
