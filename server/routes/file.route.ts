import {
  addImage,
  deleteImage,
  addDocument,
} from "../controllers/file.controller";
import { uploadImage, uploadDocument } from "../middleware/Upload";
import { Router } from "express";

const fileRouter = Router();

fileRouter.post("/addImage", uploadImage, addImage);
fileRouter.delete("/deleteImage/:imageId", deleteImage);
fileRouter.post("/addDocument", uploadDocument, addDocument);

export default fileRouter;
