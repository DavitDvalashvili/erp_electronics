import {
  getComponents,
  getComponent,
  addComponent,
  updateComponent,
  getFilterTerms,
  deleteComponent,
} from "../controllers/component.controller";
import { Router } from "express";

const componentRouter = Router();

componentRouter.get("/getComponents", getComponents);
componentRouter.get("/getComponent/:id", getComponent);
componentRouter.post("/addComponent", addComponent);
componentRouter.post("/updateComponent/:id", updateComponent);
componentRouter.get("/getFilterTerms", getFilterTerms);
componentRouter.delete("/deleteComponent/:id", deleteComponent);

export default componentRouter;
