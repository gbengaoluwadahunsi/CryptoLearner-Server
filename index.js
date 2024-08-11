import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/authRoutes.js";
import admin from "./routes/adminRoute.js";

const app = express();
dotenv.config();

// Apply CORS middleware
app.use(cors());

// Apply body-parser middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Define routes after middleware
app.use("/todos", postRoutes);
app.use("/auth", authRoutes);
app.use("/admin", admin);

//conect to mongoDb databasee
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
  )
  .catch((error) => console.log(error.message));
