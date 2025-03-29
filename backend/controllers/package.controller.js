import Package from "../models/package.model.js";

export const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find().populate("packageCategory");
        res.status(200).json(packages);
    } catch (error) {
        console.log("Error in getAllPackages controller : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createPackage = async (req, res) => {
    try {
        const { name, bestPrice, packageCategory , noOfTests , tests} = req.body;

        if (!name || !bestPrice || !packageCategory || !noOfTests || !tests) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newPackage = new Package({
            name,
            bestPrice,
            packageCategory,
            noOfTests,
            tests
        });

        await newPackage.save();

        res.status(201).json({ message: "Package created successfully", newPackage });
    } catch (error) {
        console.log("Error in createPackage controller : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
