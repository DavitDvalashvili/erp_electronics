import { getDevices, getDevice } from "../controllers/device.controller";
import { Router } from "express";

const deviceRouter = Router();

deviceRouter.get("/getDevices", getDevices);
deviceRouter.get("/getDevice/:id", getDevice);

export default deviceRouter;
