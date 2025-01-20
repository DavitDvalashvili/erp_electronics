import {
  getDevices,
  getDevice,
  addDevice,
  updateDevice,
  deleteDevice,
} from "../controllers/device.controller";
import { Router } from "express";

const deviceRouter = Router();

deviceRouter.get("/getDevices", getDevices);
deviceRouter.get("/getDevice/:id", getDevice);
deviceRouter.post("/addDevice", addDevice);
deviceRouter.post("/updateDevice/:id", updateDevice);
deviceRouter.delete("/deleteDevice/:id", deleteDevice);

export default deviceRouter;
