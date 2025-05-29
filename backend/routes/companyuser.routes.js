import express from "express"
import { getCompanyNameById } from "../controllers/companyuser.controller.js";

const router = express.Router();

router.get("/:id", getCompanyNameById);

export default router;