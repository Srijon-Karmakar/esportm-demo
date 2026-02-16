import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./header.css"; // spotlight effect
import sportbitVideo from "../../assets/sportbit_dot_white.json";
import Lottie from "lottie-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navItems = ["Home", "Features", "Pricing", "About", "Contact"];

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-poppins">
      {/* Spotlight effect */}
      <div
        className="spotlight-pointer"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      ></div>

      <div className="flex justify-between items-center px-6 md:px-12 h-14 bg-transparent">
        {/* Logo */}
        <div className="logo flex items-center h-full cursor-pointer">
          <div style={{ width: 120, height: 60 }}>
            <Lottie animationData={sportbitVideo} loop={true} />
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 font-medium">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="relative group text-white no-underline"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {item}
              {/* Underline with glow */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-[0_0_10px_rgba(255,0,255,0.8)] transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/80 text-white flex flex-col items-center gap-6 py-6 backdrop-blur-lg"
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="hover:text-pink-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
};

export default Header;
