import React from "react";
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#132441] text-white py-12 sm:py-16 px-6 sm:px-8 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
        {/* Column 1: Logo & Socials */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[8px] sm:text-[10px] text-black font-bold uppercase">
                Logo
              </span>
            </div>
            <span className="text-xl font-light">✕ ✕</span>
          </div>
          <p className="text-sm sm:text-[13px] text-gray-400 leading-relaxed">
            All rights reserved<br />
            Copyright © 2020<br />
            Landify UI Kit.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
          </div>
        </div>

        {/* Column 2: Company */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
            Company
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-[14px] text-gray-300">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">About us</li>
            <li className="hover:text-white cursor-pointer transition">Services</li>
            <li className="hover:text-white cursor-pointer transition">Events</li>
            <li className="hover:text-white cursor-pointer transition">Contact us</li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
            Support
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-[14px] text-gray-300">
            <li className="hover:text-white cursor-pointer transition">Help center</li>
            <li className="hover:text-white cursor-pointer transition">Terms of service</li>
            <li className="hover:text-white cursor-pointer transition">Legal</li>
            <li className="hover:text-white cursor-pointer transition">Privacy policy</li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="space-y-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
            Contact Us
          </h3>

          <div className="flex gap-3 sm:gap-4 items-start">
            <MapPin size={24} className="mt-1 flex-shrink-0" />
            <p className="text-sm sm:text-[14px] text-gray-300 leading-relaxed">
              Unit No. 103, 1st Floor, Bhaveshwar Arcade, A Wing, 
              Lal Bahadur Shastri Marg, near Shreyas Cinema Road, 
              Nityanand Nagar, Ghatkopar West, Mumbai, Maharashtra 400086.
            </p>
          </div>

          <div className="flex gap-3 sm:gap-4 items-center">
            <Phone size={20} className="flex-shrink-0" />
            <div className="text-sm sm:text-[14px] text-gray-300">
              <p>022 47494262</p>
              <p>9137287173</p>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 items-center">
            <Mail size={20} className="flex-shrink-0" />
            <p className="text-sm sm:text-[14px] text-gray-300">
              info@e-incarnation.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for Social Icons
const SocialIcon = ({ icon }) => (
  <div className="w-8 sm:w-9 h-8 sm:h-9 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all">
    {icon}
  </div>
);

export default Footer;
