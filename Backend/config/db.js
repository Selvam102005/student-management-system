import oracledb from "oracledb";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT,
};

export async function getConnection() {
  return await oracledb.getConnection(dbConfig);
}