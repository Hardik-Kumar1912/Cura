import CompanyPackage from "../models/companyPackage.model.js"; 
import Package from "../models/package.model.js";
import mongoose from "mongoose";

export const getCompanyPackagesByPackageId = async (req, res) => {
    try {
        let { packageId } = req.params;

        console.log("Package ID:", packageId);

        const companyPackages = await CompanyPackage.find({ package: packageId })
            .populate("package") 
            .populate("packageCategory"); 

        if (companyPackages.length === 0) {
            return res.status(404).json({ message: "No company packages found for this package ID" });
        }

        res.status(200).json(companyPackages);
    } catch (error) {
        console.log("Error in getCompanyPackagesByPackageId controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getCompanyPackagesByPackageName = async (req, res) => {
    try {
        const { packageName } = req.params;

        const packageData = await Package.findOne({ name: packageName });

        if (!packageData) {
            return res.status(404).json({ message: "Package not found" });
        }

        const companyPackages = await CompanyPackage.find({ package: packageData._id.toString() }) // Ensure _id is a string
            .populate("package")
            .populate("packageCategory");

        if (companyPackages.length === 0) {
            return res.status(404).json({ message: "No company packages found for this package name" });
        }

        res.status(200).json(companyPackages);
    } catch (error) {
        console.log("Error in getCompanyPackagesByPackageName controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


