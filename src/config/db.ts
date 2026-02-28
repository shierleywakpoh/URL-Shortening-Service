import mysql, { PoolOptions, ResultSetHeader } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const access: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const conn = mysql.createPool(access);

/**
 * 
const sql =
  "CREATE TABLE urlShort (id INT AUTO_INCREMENT PRIMARY KEY,url VARCHAR(255) NOT NULL,shortUrl VARCHAR(255),createAt DATETIME DEFAULT CURRENT_TIMESTAMP,updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,accessCount INT DEFAULT 0)";

export async function createDB() {
  try {
    //await conn.query<ResultSetHeader>("CREATE DATABASE url_short");
    await conn.query<ResultSetHeader>(sql);
    console.log("create table");
  } catch (error) {
    console.error("failed to create table :", error);
  }
}
 */
