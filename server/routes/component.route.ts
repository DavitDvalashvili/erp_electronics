import {
  getComponents,
  getComponent,
  addComponent,
  updateComponent,
  getFilterTerms,
  deleteComponent,
  addImage,
  deleteImage,
} from "../controllers/component.controller";
import { uploadImage } from "../middleware/imageUpload";
import { Router } from "express";

const componentRouter = Router();

componentRouter.get("/getComponents", getComponents);
componentRouter.get("/getComponent/:id", getComponent);
componentRouter.post("/addComponent", addComponent);
componentRouter.post("/updateComponent/:id", updateComponent);
componentRouter.delete("/deleteComponent/:id", deleteComponent);
componentRouter.get("/component/getFilterTerms", getFilterTerms);
componentRouter.post("/addImage", uploadImage, addImage);
componentRouter.delete("/deleteImage/:imageId", deleteImage);

export default componentRouter;
