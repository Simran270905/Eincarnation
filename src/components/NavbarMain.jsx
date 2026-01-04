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
    <nav className="w-full bg-[#F4F3EF] px-4 sm:px-8 md:px-16 lg:px-20 py-4 flex items-center justify-between relative">

      {/* Logo */}
      <NavLink
        to="/"
        className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold"
      >
        LOGO
      </NavLink>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-8 lg:gap-10 text-sm font-medium text-[#2D3E48]">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `transition hover:text-[#1A0185] ${
                isActive ? "text-[#1A0185] font-semibold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
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
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `py-2 text-base font-medium transition hover:text-[#1A0185] ${
                  isActive ? "text-[#1A0185] font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavbarMain;
