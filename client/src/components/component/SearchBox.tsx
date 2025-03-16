import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

type SearchBoxProps = {
  searchQuery: QueryComponent;
  setSearchQuery: (query: QueryComponent) => void;
};

const SearchBox = ({ searchQuery, setSearchQuery }: SearchBoxProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

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

  return (
    <div className="h-[5rem] text-[1.8rem] flex justify-start items-center w-fit rounded-default overflow-hidden bg-white px-4 ml-auto">
      <input
        type="text"
        className="w-[20rem] h-full focus:outline-none placeholder:text-[1.6rem]"
        placeholder="კომპონენტის ძებნა.."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <IoSearch className="w-[2.5rem] h-[2.5rem] cursor-pointer" />
    </div>
  );
};

export default SearchBox;
