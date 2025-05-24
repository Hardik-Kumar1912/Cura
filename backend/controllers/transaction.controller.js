import Transaction from "../models/transaction.model.js";

// Controller to create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const { companyId, price, testName , customerId , category} = req.body;

    // Validate required fields
    if (!companyId || !price || !testName || !customerId || !category) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create and save the transaction
    const newTransaction = new Transaction({ companyId, price, testName , customerId , category });
    const savedTransaction = await newTransaction.save();

    return res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
