import { Router } from "express";
import { testController } from "../controllers/test.controller";

const testRoute = Router();

testRoute.get("test", testController);

export default testController;
