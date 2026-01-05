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

      {/* Mobile Menu Button - Shown only on small screens */}
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 text-[#2D3E48] hover:bg-black/5 rounded-lg transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-end mb-12">
            <button onClick={toggleMenu}>
              <X size={32} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-8 text-center text-xl font-semibold">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-600" : "text-[#2D3E48]"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}