import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { getFilePlugin } from "@react-pdf-viewer/get-file";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useElectronics } from "../../App";
import { Modal } from "../Modal";

type pdfViewer = {
  component: Component;
};

const PdfViewer = ({ component }: pdfViewer) => {
  // Initialize PDF viewer plugins
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const getFilePluginInstance = getFilePlugin();
  const scrollModePluginInstance = scrollModePlugin();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const { API_URL } = useElectronics();

  console.log(`${API_URL}/files/pdf/${component?.data_sheet}`);

  return (
    <Modal title="DataSheet - ის ნახვა">
      <div className="h-[780px] mx-auto max-w-6xl border border-gray-300 rounded-lg shadow-md">
        <Viewer
          fileUrl={"https://localhost:4000/files/pdf/1733215917996-1.pdf"}
          plugins={[
            pageNavigationPluginInstance,
            getFilePluginInstance,
            scrollModePluginInstance,
            defaultLayoutPluginInstance,
          ]}
        />
      </div>
    </Modal>
  );
};

export default PdfViewer;
