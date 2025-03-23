import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost", // Sesuaikan dengan host MySQL Anda
  user: "root", // Sesuaikan dengan user MySQL Anda
  password: "", // Sesuaikan dengan password MySQL Anda
  database: "kasir_roti", // Sesuaikan dengan database Anda
});

export default db;