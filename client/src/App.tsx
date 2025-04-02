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
import { create } from "zustand";
import { NotificationPage } from "./pages/Main/NotificationPage";
import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import axios from "axios";

type AppStatus = "Success" | "Loading" | "Server Error" | null;
type Response = ResponseStatus | null;

type Notification = {
  id: string | number;
  name: string;
  activeStatus: number | string;
};

type UseElectronics = {
  API_URL: string;
  response: Response;
  setResponse: (response: Response) => void;
  appStatus: AppStatus;
  setAppStatus: (appStatus: AppStatus) => void;
  modal: Modal;
  setModal: (modal: Modal) => void;
  components: Component[] | null;
  setComponents: (components: Component[]) => void;
  devices: Device[] | null;
  setDevices: (devices: Device[]) => void;
  notifications: Notification[];
  setNotifications: (notification: Notification[]) => void;
  getNotifications: () => void;
};

export const useElectronics = create<UseElectronics>((set, get) => ({
  API_URL: `${import.meta.env.VITE_API_URL}`,
  response: null,
  setResponse: (response: Response) => set({ response }),
  appStatus: "Loading",
  setAppStatus: (appStatus: AppStatus) => set({ appStatus }),
  modal: null,
  setModal: (modal: Modal) => set({ modal }),
  components: null,
  setComponents: (components: Component[]) => set({ components }),
  devices: null,
  setDevices: (devices: Device[]) => set({ devices }),
  notifications: [],
  setNotifications: (notifications: Notification[]) => set({ notifications }),

  getNotifications: async () => {
    const { API_URL, setAppStatus, setNotifications } = get();
    setAppStatus("Loading");
    try {
      const res = await axios.get(`${API_URL}/getNotification`);
      if (res.status === 200) {
        setNotifications(res.data);
      }
      setAppStatus("Success");
    } catch (error) {
      console.log(error);
      setAppStatus("Server Error");
    }
  },
}));

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Navigate to="/components" replace />} />
          <Route path="/components" element={<Components />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/device/:id" element={<Device />} />
          <Route path="/component/:id" element={<Component />} />
          <Route path="/notification" element={<NotificationPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
