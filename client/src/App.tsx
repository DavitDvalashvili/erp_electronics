import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./pages/Main/Main";
import Components from "./pages/Main/Components";
import Devices from "./pages/Main/Devices";
import Device from "./pages/Main/Device";
import Component from "./pages/Main/Component";
import Todo from "./pages/Main/Todo";
import Notification from "./pages/Main/Notification";
import { create } from "zustand";
import "./App.css";
import PageNotFound from "./pages/PageNotFound";

type AppStatus = "Success" | "Loading" | "Server Error" | null;

type UseElectronics = {
  API_URL: string;
  appStatus: AppStatus;
  setAppStatus: (appStatus: AppStatus) => void;
};

export const useElectronics = create<UseElectronics>((set) => ({
  API_URL: "http://localhost:4000",
  appStatus: "Loading",
  setAppStatus: (appStatus: AppStatus) => set({ appStatus }),
}));

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Navigate to="/components" replace />} />
          <Route path="/components" element={<Components />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/notification" element={<Notification />} />
        </Route>
        <Route path="/device/:id" element={<Device />} />
        <Route path="/component/:id" element={<Component />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
