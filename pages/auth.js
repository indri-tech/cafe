import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Tampilan Login/Register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 // const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Modal Forget Password
  const [resetEmail, setResetEmail] = useState(""); // Email untuk reset password
  const router = useRouter();

  // Cek jika user sudah login, redirect ke dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      router.push("/dashboard");
    }
  }, [router]);

  // Fungsi Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert("Login gagal!");
    }
  };

  // Fungsi Register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.status === 201) {
      alert("Registrasi berhasil! Silakan login.");
      setIsLogin(true); // Pindah ke Login
    } else {
      alert(data.message);
    }
  };

  // Fungsi Forget Password
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: resetEmail }),
    });

    if (res.status === 200) {
      alert("Link reset password telah dikirim ke email Anda.");
      setShowForgotPassword(false); // Tutup modal
    } else {
      alert("Email tidak terdaftar!");
    }
  };
 



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${isLogin ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${!isLogin ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form Login / Register */}
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Konfirmasi Password"
              className="border p-2 w-full mb-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit" className="bg-green-500 text-white p-2 w-full">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Tombol Lupa Password */}
        {isLogin && (
          <p
            className="text-blue-500 text-sm mt-2 cursor-pointer text-center"
            onClick={() => setShowForgotPassword(true)}
          >
            Lupa Password?
          </p>
        )}
      </div>

      {/* Modal Lupa Password */}
      {showForgotPassword && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold text-center mb-4">Lupa Password</h2>
            <form onSubmit={handleForgetPassword}>
              <input
                type="email"
                placeholder="Masukkan Email"
                className="border p-2 w-full mb-2"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                Kirim Link Reset
              </button>
            </form>
            <button
              className="mt-2 text-gray-600 w-full text-center"
              onClick={() => setShowForgotPassword(false)}
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
