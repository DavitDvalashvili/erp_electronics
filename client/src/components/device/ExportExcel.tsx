import XLSX from "xlsx-js-style";
import { RiFileExcelLine } from "react-icons/ri";
import { useElectronics } from "../../App";

type devices = {
  devices: Device[];
};

const ExportExcel = ({ devices }: devices) => {
  const { setAppStatus } = useElectronics();

  const handleExport = () => {
    setAppStatus("Loading");
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    const Data = [
      ["სახელი", "კვება", "ღირებულება", "რაოდენობა", "ზომა", "დანიშნულება"],
    ];

    for (const device of devices) {
      Data.push([
        device.name,
        device.electrical_supply,
        device.unit_cost.toString(),
        device.available_quantity.toString(),
        device.size,
        device.purpose,
      ]);
    }

    // Add the data to the worksheet first
    XLSX.utils.sheet_add_aoa(worksheet, Data);

    worksheet["!cols"] = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    // Get size of sheet
    const range = XLSX.utils.decode_range(worksheet["!ref"] ?? "");
    const rowCount = range.e.r;
    const columnCount = range.e.c;

    // Add formatting by looping through data in sheet
    for (let row = 0; row <= rowCount; row++) {
      for (let col = 0; col <= columnCount; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col });

        // Check if the cell exists before applying styles
        if (!worksheet[cellRef]) {
          worksheet[cellRef] = { v: "" };
        }

        // Add this format to every cell
        worksheet[cellRef].s = {
          alignment: {
            horizontal: "left",
            vertical: "center",
            wrapText: true,
          },
          font: {
            sz: 12,
          },
        };

        // Applying border if cell is in range
        if (col <= 15 && row <= 1 + devices.length) {
          worksheet[cellRef].s = {
            ...worksheet[cellRef].s,
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }

        if (col <= 15 && row < 1) {
          worksheet[cellRef].s = {
            ...worksheet[cellRef].s,
            alignment: {
              horizontal: "center",
            },
            font: {
              bold: true,
              color: { rgb: "FFFFFF" },
            },
            fill: {
              type: "pattern",
              pattern: "solid",
              fgColor: { rgb: "808080" },
            },
            border: {
              top: { style: "medium", color: { rgb: "000000" } },
              bottom: { style: "medium", color: { rgb: "000000" } },
              left: { style: "medium", color: { rgb: "000000" } },
              right: { style: "medium", color: { rgb: "000000" } },
            },
          };
        }
      }
    }

    // Create the workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Devices");

    // Export the file
    XLSX.writeFile(workbook, "Devices.xlsx");
    setAppStatus("Success");
  };

  return (
    <button
      onClick={handleExport}
      className="flex justify-center gap-2 items-center h-[4rem] px-6 bg-bgColor text-white rounded-default text-[1.4rem]"
    >
      <RiFileExcelLine />
      <span>ექსელის ჩამოტვირთვა</span>
    </button>
  );
};

export default ExportExcel;
