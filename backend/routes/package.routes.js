import express from "express";
import { getAllPackages , createPackage } from "../controllers/package.controller.js";

const router = express.Router();

router.get("/", getAllPackages);
router.post("/", createPackage);

export default router;
