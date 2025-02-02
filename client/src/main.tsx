import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/firago/400.css";
import "@fontsource/firago/500.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
