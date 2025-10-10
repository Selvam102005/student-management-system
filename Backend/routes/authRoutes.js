import express from "express";
import oracledb from "oracledb"; 
import { getConnection } from "../config/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT * FROM users WHERE username = :username AND password = :password`,
      [username, password],
      { outFormat: oracledb.OUT_FORMAT_OBJECT } 
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: `Welcome ${username}` });
    } else {
      res.json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Login route error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (connection) await connection.close();
  }
});

export default router;
