import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll to change background color
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/events", label: "Events" },
    { to: "/epr", label: "EPR" },
    { to: "/contact", label: "Contact Us", isAnchor: true },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled || isOpen ? "bg-[#1a1a1a] shadow-lg" : "bg-transparent"
      }`}
    >
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
          {navLinks.map((link) => {
            if (link.isAnchor && location.pathname === "/contact") {
              return (
                <a 
                  key={link.to} 
                  href="#map-section" 
                  className="hover:opacity-80 transition-opacity border-b-2 border-transparent hover:border-white pb-1"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `hover:opacity-80 transition-opacity ${
                    isActive ? "border-b-2 border-white pb-1" : "border-b-2 border-transparent pb-1"
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Hamburger - Fixed to be white for visibility */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Your Original Design) */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#F4F3EF] shadow-xl border-t border-black/5 flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        {navLinks.map((link) => {
          // Check if it's the anchor link for mobile too
          if (link.isAnchor && location.pathname === "/contact") {
            return (
              <a
                key={link.to}
                href="#map-section"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 text-base font-semibold text-[#2D3E48] hover:bg-black/5"
              >
                {link.label}
              </a>
            );
          }
          return (
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
          );
        })}
      </div>
    </header>
  );
}