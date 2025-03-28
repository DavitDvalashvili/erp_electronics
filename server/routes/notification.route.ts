import { getNotification } from "../controllers/notification.controller";

import { Router } from "express";

const notificationRouter = Router();

notificationRouter.get("/getNotification", getNotification);

export default notificationRouter;
