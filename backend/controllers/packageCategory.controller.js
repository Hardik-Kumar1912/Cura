import PackageCategory from "../models/packageCategory.model.js";

export const getAllPackageCategories = async (req, res) => {
    try {
        const categories = await PackageCategory.find(); // Fetch all data
        res.status(200).json(categories);
    } catch (error) {
        console.log("Error in getAllPackageCategories controller : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};