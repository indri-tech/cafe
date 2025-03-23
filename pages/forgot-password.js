import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Masukkan email"
                    className="border px-4 py-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
                    Kirim Link Reset
                </button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}