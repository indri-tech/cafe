
import React from "react";
//import Navbar from "../components/Navbar";
import Navbar from "../components/Navbar";
//import Navbar from "@/components/Navbar";
import "../styles/globals.css";




export default function Home() {
    console.log("Navbar seharusnya muncul di sini!");
    
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {console.log("Render Navbar")}
            {/* Navbar Harus Ditampilkan */}
            <div> <Navbar />  </div>
           
            
            {/* Background Video as Body */}

            <video
                autoPlay
                loop
                muted
                //playsInline
                //preload="auto"

                className="absolute top-0 left-0 w-full h-full object-cover"
                onError={() => console.log("Video gagal dimuat")}
            >
                <source src="/videos/background.mp4" type="video/mp4" />
            </video>


            {/* Content Overlay */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center bg-gradient-to-b from-black/70 to-transparent">
                <h1 className="text-5xl font-bold mb-4">Welcome to My Cafe  Website</h1>
                <p className="text-lg">  Enjoy coffie and cake </p>
            </div>
        </div>
    );
}