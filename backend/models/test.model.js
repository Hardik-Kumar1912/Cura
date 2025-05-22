import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompanyUser",
        required: true,
    },
    noOfTests: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    tests: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const Test = mongoose.model("Test", testSchema);

export default Test;