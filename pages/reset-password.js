import { useState } from "react";
import { useRouter } from "next/router";

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query;
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, newPassword }),
        });

        const data = await res.json();
        setMessage(data.message);

        if (res.ok) {
            setTimeout(() => router.push("/login"), 2000); // Redirect ke login setelah 2 detik
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Masukkan password baru"
                    className="border px-4 py-2 w-full"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-2">
                    Ubah Password
                </button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}