import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah pengguna sudah login
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      router.push("/dashboard"); // Redirect ke dashboard jika sudah login
    }
  }, [router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      router.push("/dashboard"); // Redirect ke dashboard setelah register
    } else {
      alert("Registrasi gagal!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      {!isLoggedIn ? (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Email"
            className="border p-2 w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            Register
          </button>
        </form>
      ) : (
        <p className="text-green-500">Anda sudah login, mengalihkan ke dashboard...</p>
      )}
    </div>
  );
}