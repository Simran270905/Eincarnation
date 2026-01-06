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
    <footer className="w-full bg-[#132441] text-white py-12 md:py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Column 1: Logo & Socials */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[10px] text-black font-black uppercase">Logo</span>
            </div>
            <span className="text-xl font-light tracking-tighter">✕ ✕</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
            All rights reserved<br />
            Copyright © 2026<br />
            Landify UI Kit.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
          </div>
        </div>

        {/* Column 2: Company */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-[12px]">
            Company
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-medium">
            <li className="hover:text-white cursor-pointer transition-colors">Home</li>
            <li className="hover:text-white cursor-pointer transition-colors">About us</li>
            <li className="hover:text-white cursor-pointer transition-colors">Services</li>
            <li className="hover:text-white cursor-pointer transition-colors">Events</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact us</li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-[12px]">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-medium">
            <li className="hover:text-white cursor-pointer transition-colors">Help center</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms of service</li>
            <li className="hover:text-white cursor-pointer transition-colors">Legal</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy policy</li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
          <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-[12px]">
            Contact Us
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start max-w-xs">
            <MapPin size={20} className="text-gray-400 flex-shrink-0 sm:mt-1" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Unit No. 103, 1st Floor, Bhaveshwar Arcade, A Wing, 
              LBS Marg, Ghatkopar West, Mumbai 400086.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
            <Phone size={18} className="text-gray-400 flex-shrink-0" />
            <div className="text-sm text-gray-400">
              <p>022 47494262</p>
              <p>9137287173</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
            <Mail size={18} className="text-gray-400 flex-shrink-0" />
            <p className="text-sm text-gray-400">info@e-incarnation.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <button className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#87BBD7] hover:text-[#132441] transition-all duration-300">
    {icon}
  </button>
);

export default Footer;
