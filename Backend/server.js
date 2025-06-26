import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";
import { getConnection } from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", studentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    const connection = await getConnection();
    await connection.close(); 
    console.log(`✅ DB connected successfully`);
  } catch (error) {
    console.error(`❌ DB connection failed:`, error.message);
  }
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
