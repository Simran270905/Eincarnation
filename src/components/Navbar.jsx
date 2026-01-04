import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="relative z-10 flex items-center justify-between px-12 py-8 text-white">
      
      {/* Logo */}
      <NavLink
        to="/"
        className="h-12 w-12 rounded-full bg-black border border-gray-700 flex items-center justify-center text-[10px] font-bold tracking-widest"
      >
        LOGO
      </NavLink>

      {/* Links */}
      <nav className="flex gap-10 text-[15px] font-medium">
        <NavLink to="/" className="hover:opacity-80">
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:opacity-80 ${
              isActive ? "border-b-2 border-white pb-1" : ""
            }`
          }
        >
          About Us
        </NavLink>

        <NavLink to="/services" className="hover:opacity-80">
          Services
        </NavLink>

        <NavLink to="/events" className="hover:opacity-80">
          Events
        </NavLink>

        <NavLink to="/epr" className="hover:opacity-80">
          EPR
        </NavLink>

        <NavLink to="/contact" className="hover:opacity-80">
          Contact Us
        </NavLink>
      </nav>
    </div>
  );
}
