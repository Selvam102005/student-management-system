import { getConnection } from "../config/db.js";
import oracledb from "oracledb";

let transactionConnection = null;

export const insertStudent = async (req, res) => {
  const { id, name, mark1, mark2, mark3, cgpa } = req.body;
  if (!id || !name || mark1 == null || mark2 == null || mark3 == null || cgpa == null)
    return res.status(400).json({ error: "All fields are required." });

  try {
    if (!transactionConnection) transactionConnection = await getConnection();

    await transactionConnection.execute(
      `INSERT INTO student (id, name, mark1, mark2, mark3, cgpa) 
       VALUES (:id, :name, :mark1, :mark2, :mark3, :cgpa)`,
      [id, name, mark1, mark2, mark3, cgpa]
    );

    res.json({ message: "Student inserted successfully! (Pending Commit)" });
  } catch (error) {
    if (error.errorNum === 1)
      res.status(400).json({ error: "Primary Key Violation: Student ID already exists." });
    else
      res.status(500).json({ error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "Student ID is required." });

  try {
    if (!transactionConnection) transactionConnection = await getConnection();

    await transactionConnection.execute(
      `DELETE FROM student WHERE id = :id`,
      [id]
    );

    res.json({ message: "Student deleted successfully! (Pending Commit)" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchStudents = async (req, res) => {
  const { table } = req.query;
  if (!table || !["student", "student_lateral"].includes(table))
    return res.status(400).json({ error: "Invalid table name." });

  try {
    const connection = await getConnection();
    const result = await connection.execute(
      `SELECT * FROM ${table}`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await connection.close();
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const commitTransaction = async (req, res) => {
  try {
    if (transactionConnection) {
      await transactionConnection.commit();
      await transactionConnection.close();
      transactionConnection = null;
      res.json({ message: "Transaction committed successfully!" });
    } else {
      res.status(400).json({ error: "No active transaction to commit." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const rollbackTransaction = async (req, res) => {
  try {
    if (transactionConnection) {
      await transactionConnection.rollback();
      await transactionConnection.close();
      transactionConnection = null;
      res.json({ message: "Transaction rolled back successfully!" });
    } else {
      res.status(400).json({ error: "No active transaction to rollback." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
