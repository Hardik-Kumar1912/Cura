import mongoose from "mongoose";

const packageCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps : true});

const PackageCategory = mongoose.model("PackageCategory",packageCategorySchema);

export default PackageCategory;