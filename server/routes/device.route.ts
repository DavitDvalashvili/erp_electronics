import {
  getDevices,
  getDevice,
  addDevice,
  updateDevice,
  deleteDevice,
  getFilterTerms,
  getComponent,
  deleteComponent,
  getComponentName,
  addComponents,
} from "../controllers/device.controller";
import { Router } from "express";

const deviceRouter = Router();

deviceRouter.get("/getDevices", getDevices);
deviceRouter.get("/getDevice/:id", getDevice);
deviceRouter.post("/addDevice", addDevice);
deviceRouter.post("/updateDevice/:id", updateDevice);
deviceRouter.delete("/deleteDevice/:id", deleteDevice);
deviceRouter.get("/device/getFilterTerms", getFilterTerms);
deviceRouter.get("/device/getComponent/:deviceId", getComponent);
deviceRouter.delete("/device/deleteComponent/:Id", deleteComponent);
deviceRouter.get("/device/getComponentName", getComponentName);
deviceRouter.post("/device/addComponents", addComponents);

export default deviceRouter;
