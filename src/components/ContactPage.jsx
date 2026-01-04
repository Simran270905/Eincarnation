import React from "react";
import { MapPin, Phone, Mail, UserCircle } from "lucide-react";
import {} from "react-router-dom";
import robot from "../assets/images/robot.png";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <section className="w-full bg-[#f1efe0] min-h-screen font-sans text-[#333]">
      {/* ================= HERO SECTION WITH MAP ================= */}
      <div className="relative h-[60vh] w-full overflow-hidden rounded-b-[40px] shadow-lg">
        {/* Google Map Background */}
        <iframe
          title="map"
          className="absolute inset-0 w-full h-full grayscale brightness-[0.4] contrast-125"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d72.90!3d19.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7cb1234567!2sGhatkopar+West!5e0!3m2!1sen!2sin!4v1"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
        
        {/* Navbar Overlay */}
        <div className="absolute top-0 left-0 w-full z-20">
            <Navbar />
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-end pb-16 px-8">
          <p className="text-white text-sm font-semibold tracking-widest mb-2 opacity-90">
            CONTACT US
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Start a Conversation
          </h1>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        
        {/* LEFT: FORM AREA */}
        <div className="lg:col-span-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-200 outline-none placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Company Name"
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-200 outline-none placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-200 outline-none placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Phone No."
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-200 outline-none placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Select City"
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-200 outline-none placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Select State"
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-200 outline-none placeholder-gray-400"
            />

            <textarea
              placeholder="Message"
              rows="6"
              className="md:col-span-2 w-full rounded-[30px] bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-200 outline-none resize-none placeholder-gray-400"
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-[#99c5df] hover:bg-[#88b5cf] text-[#2c3e50] font-bold text-xs py-3 px-10 rounded-full flex items-center gap-2 transition-all shadow-md group"
              >
                SUBMIT 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </form>

          {/* Decorative Robot Image (Bottom Left) */}
          <div className="mt-12 hidden md:block">
             <img 
               src={robot}
               alt="Robot character" 
               className="w-48 opacity-90 object-contain"
             />
          </div>
        </div>

        {/* RIGHT: INFO CARDS */}
        <div className="lg:col-span-4 space-y-6">
          {/* Address Card */}
          <div className="bg-white rounded-[30px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-[#5b7c56]">
              <MapPin size={22} strokeWidth={2.5} />
              <h3 className="font-bold text-lg text-gray-800">Address</h3>
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
              Unit No. 103, 1st Floor, Bhaveshwar Arcade, A Wing, Lal Bahadur
              Shastri Marg, near Shreyas Cinema Road, Nityanand Nagar, Ghatkopar
              West, Mumbai, Maharashtra 400086.
            </p>

            <div className="mt-8 space-y-4 text-gray-700">
              <div className="flex items-center gap-4">
                <div className="text-[#5b7c56]"><Phone size={18} /></div>
                <div className="text-[13px] font-semibold">
                  022 47494262 <br /> 9137287173
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-[#5b7c56]"><Mail size={18} /></div>
                <span className="text-[13px] font-semibold">info@e-incarnation.com</span>
              </div>
            </div>
          </div>

          {/* Career Card */}
          <div className="bg-white rounded-[30px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-[#5b7c56]">
              <UserCircle size={22} strokeWidth={2.5} />
              <h3 className="font-bold text-lg text-gray-800 uppercase tracking-tight">Career Card</h3>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}