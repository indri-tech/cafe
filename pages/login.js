import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Pastikan state benar
  const router = useRouter();

  useEffect(() => {
    // Cek apakah user sudah login dengan localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Ubah ke boolean true jika token ada
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true); // Update state setelah login
      router.push("/dashboard");
    } else {
      alert("Login gagal!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token saat logout
    setIsLoggedIn(false); // Set state ke false
    router.push("/login");
  };

  useEffect(() => {
    // Jika sudah login, redirect dari /login ke /dashboard
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{isLoggedIn ? "Anda sudah login" : "Login"}</h2>

      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="bg-green-500 text-white p-2 w-full">
            Login
          </button>
        </form>
      ) : (
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 w-full">
          Logout
        </button>
      )}
    </div>
  );
}
