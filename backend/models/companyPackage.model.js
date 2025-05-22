import mongoose from "mongoose";

const companyPackageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    noOfTests:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    tests:{
        type:String,
        required:true
    },
    package: {
        type: String,
        ref: "Package",  // Reference to the Package model
        required: true
    },
    packageCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PackageCategory",  // Reference to the PackageCategory model
    }
},{timestamps : true});

const CompanyPackage = mongoose.model("CompanyPackage",companyPackageSchema);

export default CompanyPackage;