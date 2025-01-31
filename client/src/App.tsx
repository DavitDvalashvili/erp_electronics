import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Home from "./pages/Main/Home";
import Components from "./pages/Main/Components";
import Devices from "./pages/Main/Devices";
import Device from "./pages/Main/Device";
import Component from "./pages/Main/Component";
import Todo from "./pages/Main/Todo";
import Notification from "./pages/Main/Notification";

import "./App.css";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/component/:id" element={<Component />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/device/:id" element={<Device />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/notification" element={<Notification />} />
          <Route />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
