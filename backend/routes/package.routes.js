import express from "express";
import { getAllPackages , createPackage , searchResults } from "../controllers/package.controller.js";

const router = express.Router();

router.get("/", getAllPackages);
router.post("/", createPackage);
router.get("/search", searchResults);

export default router;
