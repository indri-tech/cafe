import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";



export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        } else {
            setIsLoggedIn(true);
        }
    }, []);

    
    /*const handleLogout = () => {
        setIsLoggedIn(false); // Ubah status ke false
        localStorage.removeItem("isLoggedIn"); // Hapus dari localStorage
        router.push("/register"); // Arahkan ke halaman register setelah logout
    };*/

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/auth");
    };
    

    return (
        <div className="p-6 bg-blue-100 min-h-screen">
            <div> <Navbar />  </div>

            <div className="mt-60">
            <h1 className="text-2xl font-bold">Dashboard Kasir</h1>
            <p>Login Status: {isLoggedIn ? "Login" : "Belum Login"}</p>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 mt-4"
            >
                Logout
            </button>
            </div>
        </div>
    );
}