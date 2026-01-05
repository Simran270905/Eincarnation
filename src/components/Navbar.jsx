import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Using lucide for icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/events", label: "Events" },
    { to: "/epr", label: "EPR" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 md:py-8 text-white">
      
      {/* Logo */}
      <NavLink
        to="/"
        className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-black border border-gray-700 flex items-center justify-center text-[8px] md:text-[10px] font-bold tracking-widest flex-shrink-0"
      >
        LOGO
      </NavLink>

      {/* Desktop Links */}
      <nav className="hidden lg:flex gap-8 xl:gap-10 text-[15px] font-medium">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `hover:opacity-80 transition-opacity ${
                isActive ? "border-b-2 border-white pb-1" : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Toggle Button */}
      <button 
        className="lg:hidden p-2 transition-colors hover:bg-white/10 rounded-lg" 
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#1A0185] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button Inside Overlay */}
        <button 
          className="absolute top-8 right-6 p-2" 
          onClick={toggleMenu}
        >
          <X size={32} />
        </button>

        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-2xl font-semibold tracking-wide ${
                isActive ? "text-[#87BBD7]" : "text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}