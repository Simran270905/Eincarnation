const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-20 py-6">
      {/* Logo */}
      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xs">
        LOGO
      </div>

      {/* Links */}
      <ul className="flex gap-10 text-sm font-medium">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About Us</li>
        <li className="cursor-pointer">Services</li>
        <li className="cursor-pointer">Events</li>
        <li className="cursor-pointer">Contact Us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
