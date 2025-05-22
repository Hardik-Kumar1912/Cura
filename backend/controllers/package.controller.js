import Package from "../models/package.model.js";
import Test from "../models/test.model.js";

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

export const searchResults = async (req, res) => {
  try {
    let { q, page = 1, limit = 20 } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    q = q.trim();
    const searchRegex = new RegExp(q, "i");

    // Search in Package
    const matchedPackages = await Package.find({
      $or: [
        { name: { $regex: searchRegex } },
        { tests: { $regex: searchRegex } }
      ]
    })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("packageCategory");

    // Search in Test
    const matchedTests = await Test.find({
      $or: [
        { name: { $regex: searchRegex } },
        { tests: { $regex: searchRegex } },
        { category: { $regex: searchRegex } }
      ]
    })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ packages: matchedPackages, tests: matchedTests });
  } catch (error) {
    console.error("Error in searchResults controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



