import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import db from "../../lib/db"; // Sesuaikan dengan koneksi database

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { email } = req.body;

    // 1. Periksa apakah email ada di database
    const user = await db("users").where({ email }).first();
    if (!user) return res.status(404).json({ message: "Email tidak ditemukan" });

    // 2. Buat token reset password (berlaku 1 jam)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // 3. Kirim email ke user dengan link reset password
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Masukkan email pengirim
            pass: process.env.EMAIL_PASS, // Masukkan password email pengirim
        },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Password",
        text: 'Klik link berikut untuk reset password: ${resetLink}',
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email reset password telah dikirim!" });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengirim email" });
    }
}






/*export default function handler(req, res) {
    if (req.method === "POST") {
      const { email } = req.body;
  
      // Simulasi cek email di database
      if (email === "asa283800@gmail.com") {
        return res.status(200).json({ message: "Email terkirim!" });
      } else {
        return res.status(400).json({ message: "Email tidak ditemukan!" });
      }
    }
  
    res.status(405).json({ message: "Method not allowed" });
  }
  */


