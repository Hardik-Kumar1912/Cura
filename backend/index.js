import express from "express"; 
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import CompanyPackageRoutes from "./routes/companyPackage.routes.js";
import packageCategoryRoutes from "./routes/packageCategory.routes.js";
import packageRoutes from "./routes/package.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import path from "path";
import cors from "cors";


dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/auth/company-packages",CompanyPackageRoutes);
app.use("/api/auth",packageCategoryRoutes);
app.use("/api/auth/packages",packageRoutes);
app.use("/api/auth", transactionRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
