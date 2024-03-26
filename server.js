import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import mongoose from "mongoose";
import path from "path";
// import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "local") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      credentials: true,
    })
  );
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(process.cwd(), "./frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(process.cwd(), "./", "frontend", "dist", "index.html")
    );
  });
}

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "local") {
      await mongoose.connect(process.env.LOCAL_DB_URI);
      console.log("Local Database is connected..");
    } else {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Production Database is connected..");
    }
  } catch (error) {
    console.log("Database connection failed. ::", error);
  }
};
connectDB();

// Server Listening
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
