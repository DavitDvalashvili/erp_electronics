import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/firago/400.css";
import "@fontsource/firago/500.css";
import "./index.css";
import App from "./App.tsx";
import { Worker } from "@react-pdf-viewer/core";

createRoot(document.getElementById("root")!).render(
  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    <StrictMode>
      <App />
    </StrictMode>
  </Worker>
);
