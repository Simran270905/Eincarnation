import React from "react";
import { MapPin, Phone, Mail, UserCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import robot from "../assets/images/robot.png";

export default function ContactPage() {
  const googleMapsUrl = "https://maps.google.com/?cid=3781179314759847695&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl";
const mapEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8123456789!2d72.9109548!3d19.0922584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce17c4670e57%3A0x3479728da0a0cf0f!2sE-Incarnation%20Recycling%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1234567890";
  return (
    <section className="w-full bg-[#f1efe0] min-h-screen font-sans text-[#333] flex flex-col">
      
      {/* ================= HERO SECTION (MAP) ================= */}
      {/* Added id="map-section" so the Navbar link can scroll here */}
      <div id="map-section" className="relative h-[36vh] sm:h-[44vh] w-full overflow-hidden rounded-b-[30px] sm:rounded-b-[40px] shadow-lg">
        
        {/* Map iframe */}
        <iframe
          title="map"
          className="absolute inset-0 w-full h-full border-0 grayscale brightness-75"
          src={mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none z-0" />

        {/* Navbar on top - z-30 ensures it stays above the clickable map link */}
        <div className="absolute top-0 left-0 w-full z-30">
          <Navbar />
        </div>

        {/* Clickable map link - z-10 covers the map but sits under the navbar */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Open location in Google Maps"
        />

        {/* Text over map */}
        <div className="relative z-20 max-w-7xl mx-auto h-full flex flex-col justify-end pb-8 sm:pb-14 px-4 sm:px-12 pointer-events-none">
          <p className="text-white text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2">
            CONTACT US
          </p>
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Start a Conversation
          </h1>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 pt-10 sm:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative w-full">
        
        {/* LEFT: FORM + Robot */}
        <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1 flex flex-col justify-between">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Name" className="w-full rounded-full bg-white px-6 py-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#99c5df]" />
            <input type="text" placeholder="Company Name" className="w-full rounded-full bg-white px-6 py-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#99c5df]" />
            <input type="email" placeholder="Email" className="w-full rounded-full bg-white px-6 py-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#99c5df]" />
            <input type="text" placeholder="Phone No." className="w-full rounded-full bg-white px-6 py-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#99c5df]" />
            <input type="text" placeholder="Select City" className="w-full rounded-full bg-white px-6 py-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#99c5df]" />
            <input type="text" placeholder="Select State" className="w-full rounded-full bg-white px-6 py-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#99c5df]" />

            <textarea
              placeholder="Message"
              rows={5}
              className="md:col-span-2 w-full rounded-[25px] bg-white px-6 py-4 text-sm shadow-sm outline-none resize-none focus:ring-2 focus:ring-[#99c5df]"
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full sm:w-fit bg-[#99c5df] hover:bg-[#88b5cf] text-[#2c3e50] font-bold text-xs py-4 px-12 rounded-full flex items-center justify-center gap-2 transition-all shadow-md group uppercase tracking-widest"
              >
                SUBMIT <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </form>

          {/* Robot */}
          <div className="mt-6 flex justify-center md:justify-start">
            <img src={robot} alt="Robot character" className="w-24 sm:w-32 md:w-48 object-contain opacity-90" />
          </div>
        </div>

        {/* RIGHT: INFO */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 order-1 lg:order-2 pb-0">
          <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#5b7c56]">
              <MapPin size={22} strokeWidth={2.5} />
              <h3 className="font-bold text-lg text-gray-800">Address</h3>
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
              Unit No. 103, 1st Floor, Bhaveshwar Arcade, A Wing, Lal Bahadur
              Shastri Marg, Mumbai, Maharashtra 400086.
            </p>
            <div className="mt-6 space-y-4 text-gray-700">
              <div className="flex items-start gap-4">
                <Phone size={18} className="text-[#5b7c56] mt-1" />
                <div className="text-[13px] font-semibold">022 47494262 <br /> 9137287173</div>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={18} className="text-[#5b7c56]" />
                <span className="text-[13px] font-semibold">info@e-incarnation.com</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#5b7c56]">
              <UserCircle size={22} strokeWidth={2.5} />
              <h3 className="font-bold text-lg text-gray-800 uppercase">Careers</h3>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">Join our team and help us build a sustainable future.</p>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}