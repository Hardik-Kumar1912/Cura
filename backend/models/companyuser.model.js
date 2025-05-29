import mongoose from "mongoose";

const companyUserSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true,
        minlength:4
    },
    phoneNumber:{
        type:String,
        required:true
    }
},{timestamps : true});

const CompanyUser = mongoose.model("CompanyUser", companyUserSchema);

export default CompanyUser;