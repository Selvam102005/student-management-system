import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { getConnection } from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "Frontend", "build");

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    const connection = await getConnection();
    await connection.close();
    console.log(`✅ DB connected successfully`);
  } catch (error) {
    console.error(`❌ DB connection failed:`, error.message);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});
