import express from "express";
import { ScanController } from "../controllers/scanController";
import { userAuth } from "../middleware/auth";

export const scanRouter = express.Router();

scanRouter.post("/", userAuth, ScanController.startScan);
scanRouter.get("/:scanId", userAuth, ScanController.getScan);