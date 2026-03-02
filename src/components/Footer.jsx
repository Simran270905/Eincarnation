import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Youtube,
  Link as LinkIcon,
} from "lucide-react";
import { useFooterData } from "../hooks/useFooterData";

const Footer = () => {
  const { footer, loading } = useFooterData();
  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/social-media/active');
        const data = await response.json();
        if (data.success) {
          setSocialMedia(data.data);
        }
      } catch (error) {
        console.error('Error fetching social media:', error);
      }
    };

    fetchSocialMedia();
  }, []);

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: <Facebook size={18} />,
      instagram: <Instagram size={18} />,
      twitter: <Twitter size={18} />,
      linkedin: <Linkedin size={18} />,
      youtube: <Youtube size={18} />,
      whatsapp: <MessageCircle size={18} />,
      other: <LinkIcon size={18} />
    };
    return icons[platform] || <LinkIcon size={18} />;
  };

  return (
    <footer className="w-full bg-[#132441] text-white py-12 md:py-16 px-6 md:px-20" role="contentinfo">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Column 1: Logo & Socials */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[10px] text-black font-black uppercase">Logo</span>
            </div>
            <span className="text-xl font-light tracking-tighter" aria-hidden="true">✕ ✕</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
            All rights reserved<br />
            Copyright © 2026<br />
            E-Incarnation Recycling Pvt. Ltd.
          </p>
          <div className="flex gap-4" role="list" aria-label="Social media links">
            {socialMedia.map((platform) => (
              <SocialIcon 
                key={platform._id}
                icon={getPlatformIcon(platform.platform)}
                label={platform.name}
                url={platform.url}
              />
            ))}
          </div>
        </div>

        {/* Column 2: Company */}
        <nav className="text-center sm:text-left" aria-labelledby="footer-company">
          <h3 id="footer-company" className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-[12px]">
            Company
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-medium">
            <li><NavLink to="/" className="hover:text-white transition-colors">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-white transition-colors">About us</NavLink></li>
            <li><NavLink to="/services" className="hover:text-white transition-colors">Services</NavLink></li>
            <li><NavLink to="/events" className="hover:text-white transition-colors">Events</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-white transition-colors">Contact us</NavLink></li>
          </ul>
        </nav>

        {/* Column 3: Support */}
        <nav className="text-center sm:text-left" aria-labelledby="footer-support">
          <h3 id="footer-support" className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-[12px]">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Help center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
          </ul>
        </nav>

        {/* Column 4: Contact Us */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
          <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-[12px]">
            Contact Us
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start max-w-xs">
            <MapPin size={20} className="text-gray-400 flex-shrink-0 sm:mt-1" />
            <p className="text-sm text-gray-400 leading-relaxed">
              {footer.address}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
            <Phone size={18} className="text-gray-400 flex-shrink-0" />
            <div className="text-sm text-gray-400">
              {footer.phone.map((phone, index) => (
                <p key={index}>{phone}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
            <Mail size={18} className="text-gray-400 flex-shrink-0" />
            <p className="text-sm text-gray-400">{footer.email}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, label, url }) => (
  <a 
    href={url || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#87BBD7] hover:text-[#132441] transition-all duration-300"
    aria-label={label}
    role="listitem"
  >
    {icon}
  </a>
);

export default Footer;
