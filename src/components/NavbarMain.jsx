import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavbarMain = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Events", path: "/events" },
    { name: "EPR", path: "/epr" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="w-full bg-[#F4F3EF] px-6 sm:px-10 md:px-16 lg:px-20 py-4 flex items-center justify-between relative z-[100]">

      {/* Logo */}
      <NavLink
        to="/"
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white flex items-center justify-center text-[10px] md:text-xs font-bold transition-transform active:scale-95"
      >
        LOGO
      </NavLink>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-6 lg:gap-10 text-sm font-medium text-[#2D3E48]">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `transition-all hover:text-[#1A0185] relative py-1 ${
                isActive 
                  ? "text-[#1A0185] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#1A0185]" 
                  : "text-gray-600"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </ul>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
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
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
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
    </nav>
  );
};

export default NavbarMain;