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

export const getTransactionsByUserId = async (req, res) => {

  try {
    const { customerId } = req.params;

    // Validate userId
    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required." });
    }

    // Find transactions by userId
    const transactions = await Transaction.find({ customerId: customerId });

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found for this user." });
    }

    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
