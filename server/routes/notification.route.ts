import {
  getNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notification.controller";

import { Router } from "express";

const notificationRouter = Router();

notificationRouter.get("/getNotification", getNotification);
notificationRouter.post("/updateNotification/:id", updateNotification);
notificationRouter.delete("/deleteNotification/:id", deleteNotification);

export default notificationRouter;
