import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    testName: {
        type: String,
        required: true,
    }
},{timestamps: true});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;