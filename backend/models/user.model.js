import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true,
        minlength:4
    },
    pincode:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
},{timestamps : true});

const User = mongoose.model("User",userSchema);

export default User;