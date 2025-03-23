import db from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Semua kolom harus diisi!" });
  }

  try {
    // Cek apakah username sudah ada
    const [existingEmail] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingEmail.length > 0) {
      return res.status(400).json({ message: "Email sudah digunakan!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashedPassword,
    ]);

    return res.status(201).json({ message: "Registrasi berhasil!" });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
}
