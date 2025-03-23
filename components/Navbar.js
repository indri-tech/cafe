import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const [loginStatus, setLoginStatus] = useState(false);
    const [user, setUser] = useState(null);

// DR DASHBORAD 
    const [LoggedIn, setIsLoggedIn] = useState(false);
    //const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/auth");
        } else {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/auth");
    };
    


    /* Ambil data session user
    useEffect(() => {
        fetch("/api/session")
            .then((res) => res.json())
            .then((data) => setUser(data.user));
    }, []);
*/
    useEffect(() => {
        setLoginStatus(isLoggedIn);
    }, [isLoggedIn]);



    useEffect(() => {
        fetch("/api/session")
            .then((res) => res.json())
            .then((data) => {
                setUser(data.user);
                setLoginStatus(data.user ? true : false); // Update loginStatus berdasarkan session
            });
    }, []);



    const handleCasierClick = async (e) => {
        e.preventDefault(); // Mencegah default behavior dari link

        if (!isLoggedIn) {
            alert("Anda harus login terlebih dahulu!");
            router.push("/login"); // Arahkan ke halaman login jika belum login
            return;
        }

        const res = await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            sessionStorage.setItem("fromNavbar", "true"); // Simpan status
            router.push("/register"); // Pindah ke halaman register
        }
    };

    return (
        <nav className="absolute top-5 left-1/2 transform -translate-x-1/2 w-full max-w-7xl bg-white bg-opacity-90 shadow-lg rounded-full px-6 py-3 flex justify-between items-center z-10">
            {/* Logo */}
            <h1 className="text-xl font-bold text-gray-800">COFFIE CAFE</h1>

            {/* Menu */}
            <ul className="flex space-x-6 text-gray-700">
                <li><Link href="/cobavideo" className="hover:text-blue-600">Home</Link></li>
                <li><Link href="/harga2" className="hover:text-blue-600">Price of Coffee and Cake</Link></li>
                <li><Link href="/mainmeal" className="hover:text-blue-600">Price of Main Meal</Link></li>
                <li><Link href="/datapegawai" className="hover:text-blue-600">Data-Pegawai</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
                <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
                <li><Link href="/table-reservation" className="hover:text-blue-600">Table Reservation</Link></li>


            <button
                onClick={handleLogout}
                //className="bg-blue-200 text-blue-600 p-4 rounded-lg px-2 py-2 mt-2"
                className="bg-blue-200 hover:text-blue-600 rounded-lg"
            >
                Logout
            </button>
        
                
            </ul>
        </nav>
    );
}