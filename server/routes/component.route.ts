import {
  getComponents,
  getComponent,
  addComponent,
  updateComponent,
  getFilterTerms,
  deleteComponent,
  addStorage,
  test,
} from "../controllers/component.controller";
import { Router } from "express";

const componentRouter = Router();

componentRouter.get("/getComponents", getComponents);
componentRouter.get("/getComponent/:id", getComponent);
componentRouter.post("/addComponent", addComponent);
componentRouter.post("/updateComponent/:id", updateComponent);
componentRouter.delete("/deleteComponent/:id", deleteComponent);
componentRouter.get("/component/getFilterTerms", getFilterTerms);
componentRouter.post("/addStorage/:id", addStorage);
componentRouter.get("/test", test);

export default componentRouter;
