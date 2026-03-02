import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar({ variant = "main" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/events", label: "Events" },
    { to: "/epr", label: "EPR" },
    { to: "/contact", label: "Contact Us", isAnchor: true },
  ];

  // Transparent navbar for pages with hero sections
  const isHeroPage = ['/about', '/services', '/contact'].includes(location.pathname);
  
  const navbarClasses = isHeroPage 
    ? `fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'bg-[#F4F3EF] shadow-sm' : 'bg-transparent'
      }`
    : "fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-[#F4F3EF] shadow-sm";
  const textColor = "text-[#2D3E48]";
  const mobileMenuBg = "bg-[#F4F3EF]";

  return (
    <header className={navbarClasses}>
      <div className={`flex items-center justify-between px-6 md:px-12 py-4 md:py-5 ${textColor}`}>
        {/* Logo */}
        <NavLink
          to="/"
          className={`h-10 w-10 md:h-12 md:w-12 rounded-full bg-black flex items-center justify-center text-[8px] md:text-[10px] font-bold tracking-widest flex-shrink-0 ${
            variant === "main" ? "border border-gray-700" : ""
          } text-white transition-transform active:scale-95`}
        >
          LOGO
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const linkTextColor = isHeroPage && !scrolled ? 'text-white' : textColor;
            const linkHoverColor = isHeroPage && !scrolled ? 'hover:text-[#87BBD7]' : 'hover:text-[#1A0185]';
            const activeColor = isHeroPage && !scrolled ? 'text-[#87BBD7]' : 'text-[#1A0185]';
            
            if (link.isAnchor && location.pathname === "/contact") {
              return (
                <a
                  key={link.to}
                  href="#map-section"
                  className={`text-sm font-bold tracking-wide transition-colors ${linkTextColor} ${linkHoverColor}`}
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
                  `text-sm font-bold tracking-wide transition-colors ${
                    isActive ? activeColor : `${linkTextColor} ${linkHoverColor}`
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${textColor} p-2 hover:bg-black/5 rounded-lg transition-colors`}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full ${mobileMenuBg} shadow-xl border-t border-black/5 flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        {navLinks.map((link) => {
          if (link.isAnchor && location.pathname === "/contact") {
            return (
              <a
                key={link.to}
                href="#map-section"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 text-base font-bold text-[#2D3E48] hover:bg-black/5"
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
                `w-full text-center py-4 text-base font-bold transition-colors ${
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
