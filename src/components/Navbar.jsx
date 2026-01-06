import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/events", label: "Events" },
    { to: "/epr", label: "EPR" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="relative z-50 bg-transparent">
      <div className="flex items-center justify-between px-6 md:px-12 py-6 md:py-8 text-white">
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

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#2D3E48] p-2 hover:bg-black/5 rounded-lg transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#F4F3EF] shadow-xl border-t border-black/5 flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `w-full text-center py-4 text-base font-semibold transition-colors ${
                isActive
                  ? "bg-[#1A0185] text-white"
                  : "text-[#2D3E48] hover:bg-black/5"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
