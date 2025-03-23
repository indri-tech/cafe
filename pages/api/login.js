import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    // Cek apakah user ada di database
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Username tidak ditemukan!" });
    }

    const user = rows[0];

    // Cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah!" });
    }

    // Buat token
    const token = jwt.sign({ id: user.id, email: user.email }, "RAHASIA", {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login berhasil!", token, email });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
}
