import React from "react";
import { ArrowRight } from "lucide-react";
import image from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import collection from "../assets/images/collection.png";
import recycling from "../assets/images/recycle.png";
import danger from "../assets/images/danger.png";
import gears from "../assets/images/gears.png";
import encrypted from "../assets/images/encrypted.png";

const AboutServiceSection = () => {
  const services = [
    { title: "Collection", btn: "Contact Us", icon: collection },
    { title: "Data Security", btn: "Contact Us", icon: encrypted },
    { title: "Recycle", btn: "Contact Us", icon: recycling },
    { title: "Hazardous Waste", btn: "Contact Us", icon: danger },
    { title: "Metal Recovery", btn: "Contact Us", icon: gears },
    // Note: Added a default or placeholder icon for EPR if needed
    { title: "EPR", btn: "View More", icon: recycling }, 
  ];

  return (
    <div className="bg-[#f3f3f1] min-h-screen w-full relative overflow-x-hidden font-sans">
      
      {/* ================= ABOUT US ================= */}
      <section className="relative pt-16 px-6 sm:px-10 md:px-20 lg:px-32 flex flex-col md:flex-row items-start min-h-[820px]">
        
        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 z-20 mt-6 md:mt-0">
          <h4 className="text-[#060C0C] font-semibold text-xs sm:text-sm tracking-[0.15em] mb-1">
            ABOUT US
          </h4>

          <h1 className="font-bold text-[#1A0185] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-tight mb-4 sm:mb-6">
            Pioneering a <br /> Greener Tomorrow
          </h1>

          <p className="text-[#060C0C] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed mb-5 sm:mb-6 max-w-full md:max-w-[460px]">
            With a resolute commitment to transforming waste into wealth, we're
            not just recycling; we're rejuvenating industries, supporting local
            economies, and catalyzing India's growth trajectory.
          </p>

          <button className="mt-2 bg-[#87BBD7] text-black px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-[#76a8c1] transition">
            KNOW MORE →
          </button>
        </div>

        {/* RIGHT BIG SEMI-CIRCLE */}
        <div
          className="absolute top-0 -right-5 w-[35%] sm:w-[28%] md:w-[25%] h-[600px] sm:h-[800px] md:h-[1000px] rounded-l-[100%_50%] overflow-hidden z-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* CENTER CIRCLE */}
        <div className="absolute right-[10%] sm:right-[12%] top-[280px] sm:top-[330px] md:top-[360px] w-44 h-44 sm:w-52 sm:h-52 md:w-68 md:h-68 rounded-full overflow-hidden z-30">
          <img
            src={image2}
            className="w-full h-full object-cover"
            alt="Recycling"
          />
        </div>

        {/* LEFT SEMI-CIRCLE */}
        <div className="absolute -left-2 sm:-left-5 top-[360px] sm:top-[420px] md:top-[420px] w-32 sm:w-40 md:w-44 h-60 sm:h-68 md:h-72 rounded-r-full overflow-hidden z-10">
          <img
            src={image3}
            className="w-full h-full object-cover"
            alt="Waste Collection"
          />
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative px-6 sm:px-10 md:px-20 lg:px-32 -mt-50 sm:-mt-30 pt-4 sm:pt-0 pb-10 sm:pb-20 z-10">
        
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-[2.2rem] p-6 sm:p-7 md:p-8 shadow-sm flex flex-col transition-transform hover:-translate-y-1"
            >
              {/* ICON CIRCLE - Updated to display the icon */}
              <div className="bg-black w-12 h-12 sm:w-14 sm:h-14 rounded-full mb-5 flex items-center justify-center overflow-hidden p-3">
                {service.icon ? (
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
                Safe disposal of electronics with certified recycling processes.
              </p>

              <button className="mt-auto px-4 py-2 rounded-full text-sm font-semibold bg-[#87BBD7] hover:bg-[#76a8c1] transition">
                {service.btn}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutServiceSection;