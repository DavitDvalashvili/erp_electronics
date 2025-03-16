import axios from "axios";
import { useElectronics } from "../../App";
import { useEffect, useState } from "react";
import Select from "react-select";
import { filterTerms } from "../../@types/component.types";
import { filterTermsComponent } from "../../@types/component.types";

type FilterBoxProps = {
  searchQuery: QueryComponent;
  setSearchQuery: (query: QueryComponent) => void;
};

const defaultFilterTerms: filterTermsComponent = {
  cabinet: [],
  drawer: [],
  electronicSupply: [],
  family: [],
  name: [],
  nominalValue: [],
  packageType: [],
  shelf: [],
};

const filterFields = [
  { key: "name", placeholder: "დასახელება..." },
  { key: "family", placeholder: "ოჯახის ტიპი..." },
  { key: "nominalValue", placeholder: "ნომინალური ღირებულება..." },
  { key: "packageType", placeholder: "პაკეტის ტიპი..." },
  { key: "electronicSupply", placeholder: "ელექტრონული კვება..." },
  { key: "cabinet", placeholder: "კარადა..." },
  { key: "drawer", placeholder: "უჯრა..." },
  { key: "shelf", placeholder: "თარო..." },
];

const FilterBox = ({ searchQuery, setSearchQuery }: FilterBoxProps) => {
  const { API_URL } = useElectronics();
  const [filterTerms, setFilterTerms] =
    useState<filterTermsComponent>(defaultFilterTerms);

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
          options={filterTerms[field.key as keyof filterTermsComponent].map(
            (value) => ({
              label: value,
              value,
            })
          )}
          value={
            searchQuery[field.key as keyof filterTerms]
              ? {
                  label: searchQuery[field.key as keyof filterTerms],
                  value: searchQuery[field.key as keyof filterTerms],
                }
              : null
          }
          onChange={(selectedOption) =>
            handleChange(field.key as keyof filterTerms, selectedOption)
          }
          placeholder={field.placeholder}
        />
      ))}
    </div>
  );
};

export default FilterBox;
