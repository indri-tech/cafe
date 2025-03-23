import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Navbar from "../components/Navbar";

const DashboardCafe = () => {
    const [visitors, setVisitors] = useState([]);
  
    useEffect(() => {
      // Simulasi data pengunjung per hari
      const data = [
        { day: "Senin", count: 120 },
        { day: "Selasa", count: 150 },
        { day: "Rabu", count: 130 },
        { day: "Kamis", count: 170 },
        { day: "Jumat", count: 180 },
        { day: "Sabtu", count: 200 },
        { day: "Minggu", count: 220 },
      ];
      setVisitors(data);
    }, []);
  
    const chartData = {
      labels: visitors.map((v) => v.day),
      datasets: [
        {
          label: "Jumlah Pengunjung",
          data: visitors.map((v) => v.count),
          backgroundColor: "#4CAF50",
        },
      ],
    };
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
          <div> <Navbar />  </div>
        <h1 className="margin-top: 50px; text-2xl font-bold mb-30">Dashboard Cafe</h1>
        <div className="bg-white width: 70%; max-width: 600px; height: 400px;  margin: auto;  ">
          <h2 className="text-lg font-semibold mb-20">Jumlah Pengunjung Per Hari</h2>
          <Bar data={chartData} />
        </div>
      </div>
    );
  };
  
  export default DashboardCafe;
  