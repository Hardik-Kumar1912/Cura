import express from "express";
import { getAllPackageCategories } from "../controllers/packageCategory.controller.js"; // Import controller

const router = express.Router();

router.get("/package-categories", getAllPackageCategories); // GET request

export default router;
