import { getComponents } from "../controllers/component.controller";
import { Router } from "express";

const componentRouter = Router();

componentRouter.get("components", getComponents);

export default componentRouter;
