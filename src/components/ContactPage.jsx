import React from "react";
import { MapPin, Phone, Mail, UserCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import robot from "../assets/images/robot.png";

export default function ContactPage() {
  return (
    <section className="w-full bg-[#f1efe0] min-h-screen font-sans text-[#333]">
      
      {/* ================= HERO SECTION WITH MAP ================= */}
      {/* Added id="map-section" so links can target this specific area */}
      <div id="map-section" className="relative h-[40vh] sm:h-[50vh] w-full overflow-hidden rounded-b-[30px] sm:rounded-b-[40px] shadow-lg">
        
        {/* Google Map Background */}
        <iframe
          title="map"
          className="absolute inset-0 w-full h-full grayscale brightness-[0.4] contrast-125"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.1985347201735!2d72.909569!3d19.088015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f075775f73%3A0xc3f0b3f54546419e!2sBhaveshwar%20Arcade!5e0!3m2!1sen!2sin!4v1700000000000"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
        
        {/* Navbar Overlay */}
        {/* The Navbar is kept inside the relative parent so it sits "on top" of the map */}
        <div className="absolute top-0 left-0 w-full z-20">
            <Navbar />
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end pb-8 sm:pb-16 px-6 sm:px-12 pointer-events-none">
          <p className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.2em] mb-2 opacity-90 uppercase">
            CONTACT US
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Start a Conversation
          </h1>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 relative">
        
        {/* LEFT: FORM AREA */}
        <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-100 outline-none placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Company Name"
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-100 outline-none placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-100 outline-none placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Phone No."
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-100 outline-none placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Select City"
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-100 outline-none placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Select State"
              className="w-full rounded-full bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-100 outline-none placeholder-gray-400"
            />

            <textarea
              placeholder="Message"
              rows="6"
              className="md:col-span-2 w-full rounded-[25px] sm:rounded-[30px] bg-white px-6 py-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-blue-100 outline-none resize-none placeholder-gray-400"
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full sm:w-fit bg-[#99c5df] hover:bg-[#88b5cf] text-[#2c3e50] font-bold text-xs py-4 px-12 rounded-full flex items-center justify-center gap-2 transition-all shadow-md group uppercase tracking-widest"
              >
                SUBMIT 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </form>

          <div className="mt-12 hidden md:block">
              <img 
                src={robot}
                alt="Robot character" 
                className="w-32 sm:w-48 opacity-90 object-contain"
              />
          </div>
        </div>

        {/* RIGHT: INFO CARDS */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 order-1 lg:order-2">
          <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-sm">
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
              <div className="flex items-start gap-4">
                <div className="text-[#5b7c56] mt-1"><Phone size={18} /></div>
                <div className="text-[13px] font-semibold leading-relaxed">
                  022 47494262 <br /> 9137287173
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-[#5b7c56]"><Mail size={18} /></div>
                <span className="text-[13px] font-semibold">info@e-incarnation.com</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-[#5b7c56]">
              <UserCircle size={22} strokeWidth={2.5} />
              <h3 className="font-bold text-lg text-gray-800 uppercase tracking-tight">Careers</h3>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Join our team and help us build a sustainable future. Explore opportunities to grow your career with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}