export default function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    res.setHeader("Set-Cookie", "token=; Path=/; HttpOnly; Max-Age=0"); // Hapus token dari cookies
    res.status(200).json({ message: "Logout berhasil" });
  }