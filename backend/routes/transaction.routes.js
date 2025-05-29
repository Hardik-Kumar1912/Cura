import express from "express";
import { createTransaction, getTransactionsByUserId } from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/transactions", createTransaction);
router.get("/transactions/:customerId" , getTransactionsByUserId)

export default router;
