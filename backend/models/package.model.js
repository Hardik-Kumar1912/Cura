import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    noOfTests:{
        type:String,
        required:true
    },
    bestPrice:{
        type:String,
        required:true
    },
    tests:{
        type:String,
        required:true
    },
    packageCategory: {
        type: String,
        required: true, 
    },
    companyId: {
        type: "String",
        required: true,
    }
},{timestamps : true});

const Package = mongoose.model("Package",packageSchema);

export default Package;