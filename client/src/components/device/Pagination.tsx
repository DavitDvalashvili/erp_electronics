import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

type pagination = {
  searchQuery: QueryDevice;
  setSearchQuery: (query: QueryDevice) => void;
  devices: Device[];
};

const Pagination = ({ searchQuery, setSearchQuery, devices }: pagination) => {
  return (
    <div className="flex items-center justify-start gap-8">
      <div className="flex gap-4">
        <div
          className="w-[4rem] h-[4rem] rounded-default border-[0.05rem] border-bgColor 
          text-[2rem] font-medium  flex justify-center items-center 
          cursor-pointer hover:bg-bgColor hover:text-white"
          onClick={() => {
            if (searchQuery.page > 1) {
              setSearchQuery({ ...searchQuery, page: searchQuery.page - 1 });
            }
          }}
        >
          <MdKeyboardArrowLeft />
        </div>
        {Array.from(
          { length: Math.ceil(devices.length / searchQuery.pageSize) },
          (_, i) => i + 1
        )
          .filter((page) => {
            const currentPage = searchQuery.page;
            const totalPages = Math.ceil(devices.length / searchQuery.pageSize);

            if (currentPage <= 2) {
              return page <= 5;
            } else if (currentPage >= totalPages - 1) {
              return page >= totalPages - 4;
            } else {
              return page >= currentPage - 2 && page <= currentPage + 2;
            }
          })
          .map((page) => (
            <div
              key={page}
              onClick={() => {
                if (searchQuery.page !== page) {
                  setSearchQuery({ ...searchQuery, page });
                }
              }}
              className={`w-[4rem] h-[4rem] rounded-default border-[0.05rem] border-bgColor 
             text-[1.6rem] font-medium  justify-center items-center 
             cursor-pointer ${
               searchQuery.page === page
                 ? "bg-bgColor text-white"
                 : "text-textColor "
             } flex`}
            >
              <div>{page}</div>
            </div>
          ))}
        <div
          className="w-[4rem] h-[4rem] rounded-default border-[0.05rem] border-bgColor 
             text-[2rem] font-medium  flex justify-center items-center 
             cursor-pointer hover:bg-bgColor hover:text-white"
          onClick={() => {
            if (
              searchQuery.page <
              Math.ceil(devices.length / searchQuery.pageSize)
            ) {
              setSearchQuery({ ...searchQuery, page: searchQuery.page + 1 });
            }
          }}
        >
          <MdKeyboardArrowRight />
        </div>
      </div>

      <select
        name="pageSize"
        id="pageSize"
        value={searchQuery.pageSize}
        onChange={(e) => {
          setSearchQuery({
            ...searchQuery,
            pageSize: parseInt(e.target.value),
            page: 1,
          });
        }}
        className="w-[5rem] h-[4rem] rounded-default border-[0.05rem] border-bgColor 
             text-[1.8rem] font-medium focus:outline-none cursor-pointer bg-transparent"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default Pagination;
