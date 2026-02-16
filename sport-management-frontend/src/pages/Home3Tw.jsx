// src/pages/App.jsx (or wherever your homepage file lives)
import React from "react";
import Header from "../components/HomePage/header";
import "../index.css"; // Tailwind base styles
import HeroSection from "../components/HomePage/heroSection";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-transparent text-black overflow-x-hidden">
      <Header />

      {/* Main content (no manual top padding needed for sticky header) */}
      <main className="relative">
        <HeroSection />
      </main>
    </div>
  );
}
