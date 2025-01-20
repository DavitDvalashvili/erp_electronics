import {
  getComponents,
  getComponent,
  addComponent,
} from "../controllers/component.controller";
import { Router } from "express";

const componentRouter = Router();

componentRouter.get("/components", getComponents);
componentRouter.get("/component/:id", getComponent);
componentRouter.post("/addComponent", addComponent);

export default componentRouter;
