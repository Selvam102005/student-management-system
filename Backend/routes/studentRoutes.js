import express from "express";
import {
  insertStudent,
  deleteStudent,
  fetchStudents,
  commitTransaction,
  rollbackTransaction
} from "../controllers/studentcon.js";

const router = express.Router();

router.post("/insert", insertStudent);
router.post("/delete", deleteStudent);
router.get("/fetch", fetchStudents);
router.post("/commit", commitTransaction);
router.post("/rollback", rollbackTransaction);

export default router;