import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./src/routes/authRoute.js"
import workExperienceRoute from "./src/routes/workExperienceRoute.js";
import skillRoute from "./src/routes/skillRoute.js"
import projectRoute from "./src/routes/projectRoute.js"
import awardRoute from "./src/routes/awardRoute.js"
import extraCurricularRoute from "./src/routes/extraCurricularRoute.js";
import socialRoute from "./src/routes/socialRoute.js"
import publicationRoute from "./src/routes/publicationRoute.js"

const app = express();
dotenv.config({ path: './src/config/.env' });

const Port = process.env.PORT || 8000;

//cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//regular express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/users", workExperienceRoute);
app.use("/users", skillRoute);
app.use("/users", projectRoute);
app.use("/users", awardRoute);
app.use("/users", extraCurricularRoute)
app.use("/users", socialRoute);
app.use("/users", publicationRoute);

app.get("/", (req, res) => {
  res.send("Healthcheck: uply");
});

const connectDB = async () => {
  if (!process.env.DB_URL) {
    console.error("MongoDB connection string (DB_URL) is missing in environment variables.");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};


app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
  connectDB();
});