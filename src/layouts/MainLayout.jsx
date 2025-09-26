import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 
        p-4 flex flex-col md:flex-row gap-2 justify-between items-center 
        border-b border-gray-600/50 text-white shadow-lg backdrop-blur-sm">
        {/* Tambahkan konten header jika perlu */}
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gradient-to-b from-gray-600/20 via-gray-700/10 to-gray-600/30
        shadow-inner backdrop-blur-sm rounded-t-xl">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 
        text-white text-center p-4 shadow-inner">
        <p>© 2025 E-Commerce-INDRAshop</p>
      </footer>
    </div>
  );
}
