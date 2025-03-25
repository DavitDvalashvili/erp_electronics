import {
  getComponents,
  getComponent,
  addComponent,
  updateComponent,
  getFilterTerms,
  deleteComponent,
  addImage,
  deleteImage,
  addDocument,
} from "../controllers/component.controller";
import { uploadImage, uploadDocument } from "../middleware/Upload";
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
componentRouter.post("/addDocument", uploadDocument, addDocument);

export default componentRouter;
