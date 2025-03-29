import express from "express";
import { getCompanyPackagesByPackageId, getCompanyPackagesByPackageName } from "../controllers/companyPackage.contoller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/by-package-id/:packageId", protectRoute , getCompanyPackagesByPackageId);
router.get("/by-package-name/:packageName", protectRoute , getCompanyPackagesByPackageName);

export default router;
