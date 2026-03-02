import React from "react";
import { ArrowRight } from "lucide-react";
import image from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import { useServices } from "../hooks/useServices";

const AboutServiceSection = () => {
  const { services, loading, error } = useServices();

  return (
    <div className="bg-[#f3f3f1] w-full relative overflow-x-hidden font-sans">
      
      {/* ================= ABOUT US ================= */}
      <section className="relative pt-28 sm:pt-24 md:pt-28 lg:pt-32 px-6 sm:px-10 md:px-20 lg:px-32 flex flex-col md:flex-row items-start min-h-[600px] md:min-h-[820px]">
        
        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 z-20 mt-0 md:mt-0 mb-8 md:mb-0">
          <h4 className="text-[#060C0C] font-semibold text-xs sm:text-sm tracking-[0.15em] mb-1">
            ABOUT US
          </h4>

          <h1 className="font-bold text-[#1A0185] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-tight mb-4 sm:mb-6">
            Pioneering a <br /> Greener Tomorrow
          </h1>

          <p className="text-[#060C0C] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed mb-5 sm:mb-6 max-w-full md:max-w-[460px] pr-0 md:pr-8">
            With a resolute commitment to transforming waste into wealth, we're
            not just recycling; we're rejuvenating industries, supporting local
            economies, and catalyzing India's growth trajectory.
          </p>

          <button className="mt-2 bg-[#87BBD7] text-black px-6 py-2.5 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-[#76a8c1] transition">
            KNOW MORE →
          </button>
        </div>

        {/* RIGHT BIG SEMI-CIRCLE - Hidden on mobile, visible on md+ */}
        <div
          className="hidden md:block absolute top-0 -right-5 w-[25%] h-[1000px] rounded-l-[100%_50%] overflow-hidden z-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="img"
          aria-label="E-waste recycling facility"
        />

        {/* CENTER CIRCLE - Adjusted positioning for mobile */}
        <div className="hidden md:block absolute right-[12%] top-[360px] w-68 h-68 rounded-full overflow-hidden z-30">
          <img
            src={image2}
            className="w-full h-full object-cover"
            alt="Recycling process in action"
            loading="lazy"
          />
        </div>

        {/* LEFT SEMI-CIRCLE - Hidden on mobile */}
        <div className="hidden md:block absolute -left-5 top-[420px] w-44 h-72 rounded-r-full overflow-hidden z-10">
          <img
            src={image3}
            className="w-full h-full object-cover"
            alt="Waste collection and sorting"
            loading="lazy"
          />
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative px-6 sm:px-10 md:px-20 lg:px-32 -mt-50 sm:-mt-30 pt-4 sm:pt-0 pb-16 sm:pb-20 md:pb-24 z-10">
        
        <div className="mb-4 sm:mb-10">
          <h4 className="text-[#060C0C] font-semibold text-[10px] sm:text-sm tracking-[0.15em] mb-1 uppercase opacity-70">
            SERVICES
          </h4>

          <h1 className="font-bold text-[#1A0185] text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-3 leading-tight">
            Our Recycling Services
          </h1>

          <p className="text-[#060C0C] max-w-xl text-[14px] sm:text-[15px] md:text-[16px] leading-snug sm:leading-relaxed">
            With a resolute commitment to transforming waste into wealth, we're
            not just recycling; we're rejuvenating industries.
          </p>
        </div>

        {/* SERVICE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-600">Failed to load services. Please try again later.</p>
            </div>
          ) : services.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No services available.</p>
            </div>
          ) : services.map((service, index) => (
            <div
              key={service._id || index}
              className="group bg-white rounded-[2.2rem] p-6 sm:p-7 md:p-8 shadow-sm hover:shadow-2xl flex flex-col transition-all duration-500 hover:-translate-y-3 cursor-pointer"
            >
              {/* ICON CIRCLE - Updated to display the icon */}
              <div className="bg-black w-12 h-12 sm:w-14 sm:h-14 rounded-full mb-5 flex items-center justify-center overflow-hidden p-3">
                {service.icon && service.icon.trim() !== '' ? (
                  <img 
                    src={service.icon} 
                    alt={service.title} 
                    className="w-full h-full object-contain invert" 
                  />
                ) : (
                  <div className="bg-gray-400 w-full h-full rounded-full" />
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#1A0185] mb-2">
                {service.title}
              </h3>

              <p className="text-[#060C0C] text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <button className="mt-auto px-4 py-2 rounded-full text-sm font-semibold bg-[#87BBD7] hover:bg-[#1A0185] hover:text-white transition-all duration-300 group-hover:scale-105 flex items-center gap-2">
                Contact Us
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutServiceSection;