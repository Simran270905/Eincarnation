import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = ["Home", "About Us", "Services", "Events", "Contact Us"];

  return (
    <nav className="w-full bg-[#F4F3EF] px-4 sm:px-8 md:px-16 lg:px-20 py-4 flex items-center justify-between relative">
      
      {/* Logo */}
      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
        LOGO
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-8 lg:gap-10 text-sm font-medium text-[#2D3E48]">
        {links.map((link, i) => (
          <li key={i} className="cursor-pointer hover:text-[#1A0185] transition">
            {link}
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#2D3E48]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#F4F3EF] shadow-md flex flex-col items-center py-4 md:hidden z-50">
          {links.map((link, i) => (
            <li
              key={i}
              className="list-none py-2 text-base font-medium cursor-pointer hover:text-[#1A0185] transition"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </li>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
