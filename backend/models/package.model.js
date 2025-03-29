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
        type: mongoose.Schema.Types.ObjectId,
        ref: "PackageCategory", 
        required: true
    }
},{timestamps : true});

const Package = mongoose.model("Package",packageSchema);

export default Package;