import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Install with: npm install lucide-react

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Events", to: "/events" },
    { name: "EPR", to: "/epr" },
    { name: "Contact Us", to: "/contact" },
  ];

  return (
    <div className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 md:py-8 text-[#2D3E48]">
      {/* Logo */}
      <NavLink
        to="/"
        className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-black border border-gray-700 flex items-center justify-center text-[8px] md:text-[10px] font-bold tracking-widest text-white flex-shrink-0"
      >
        LOGO
      </NavLink>

      {/* Desktop Links - Hidden on Mobile */}
      <nav className="hidden lg:flex gap-8 xl:gap-10 text-[15px] font-medium">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `hover:opacity-80 transition-all ${
                isActive ? "border-b-2 border-[#2D3E48] pb-1" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-[#2D3E48] p-2 hover:bg-black/5 rounded-lg transition-colors"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-[#F4F3EF] shadow-xl border-t border-black/5 flex flex-col items-center py-6 md:hidden transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-0 invisible"
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
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
