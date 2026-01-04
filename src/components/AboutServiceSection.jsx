import React from "react";
import { ArrowRight } from "lucide-react";
import image from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";

const AboutServiceSection = () => {
  const services = [
    { title: "Collection", btn: "Contact Us" },
    { title: "Data Security", btn: "Contact Us" },
    { title: "Recycle", btn: "Contact Us" },
    { title: "Hazardous Waste", btn: "Contact Us" },
    { title: "Metal Recovery", btn: "Contact Us" },
    { title: "EPR", btn: "View More" },
  ];

  return (
    <div className="bg-[#f3f3f1] min-h-screen w-full relative overflow-x-hidden font-sans">
      
      {/* ================= ABOUT US ================= */}
      <section className="relative pt-20 px-6 sm:px-10 md:px-20 lg:px-32 flex flex-col md:flex-row items-start min-h-[850px]">
        
        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 z-20 mt-10 md:mt-0">
          <h4 className="text-[#060C0C] font-semibold text-xs sm:text-sm tracking-[0.15em] mb-2">
            ABOUT US
          </h4>

          <h1 className="font-bold text-[#1A0185] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-tight mb-6 sm:mb-8">
            Pioneering a <br /> Greener Tomorrow
          </h1>

          <p className="text-[#060C0C] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed mb-6 sm:mb-8 max-w-full md:max-w-[480px]">
            With a resolute commitment to transforming waste into wealth, we're
            not just recycling; we're rejuvenating industries, supporting local
            economies, and catalyzing India's growth trajectory.
          </p>

          <button className="mt-4 sm:mt-6 bg-[#87BBD7] text-black px-6 sm:px-7 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium flex items-center gap-2 hover:bg-[#76a8c1] transition">
            KNOW MORE →
          </button>
        </div>

        {/* RIGHT BIG SEMI-CIRCLE */}
        <div
          className="absolute top-0 -right-5 w-[35%] sm:w-[28%] md:w-[25%] h-[600px] sm:h-[800px] md:h-[1000px] rounded-l-[150%_75%] overflow-hidden z-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* CENTER CIRCLE */}
        <div className="absolute right-[10%] sm:right-[12%] top-[300px] sm:top-[350px] md:top-[380px] w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden z-30">
          <img
            src={image2}
            className="w-full h-full object-cover"
            alt="Recycling"
          />
        </div>

        {/* LEFT SEMI-CIRCLE */}
        <div className="absolute -left-2 sm:-left-5 top-[400px] sm:top-[450px] md:top-[490px] w-36 sm:w-44 md:w-48 h-64 sm:h-72 md:h-80 rounded-r-full overflow-hidden z-10">
          <img
            src={image3}
            className="w-full h-full object-cover"
            alt="Waste Collection"
          />
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative px-6 sm:px-10 md:px-20 lg:px-32 -mt-8 sm:-mt-10 pb-24 z-10">
        <div className="mb-10 sm:mb-14">
          <h4 className="text-[#060C0C] font-semibold text-xs sm:text-sm tracking-[0.15em] mb-2 uppercase">
            SERVICES
          </h4>

          <h1 className="font-bold text-[#1A0185] text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
            Our Recycling Services
          </h1>

          <p className="text-[#060C0C] max-w-full sm:max-w-xl text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
            With a resolute commitment to transforming waste into wealth, we're
            not just recycling; we're rejuvenating industries.
          </p>
        </div>

        {/* SERVICE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm flex flex-col transition-transform hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="bg-black w-12 h-12 sm:w-14 sm:h-14 rounded-full mb-6 sm:mb-8" />

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A0185] mb-2 sm:mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#060C0C] text-sm sm:text-[15px] leading-relaxed mb-4 sm:mb-6">
                Safe disposal of electronics with certified recycling processes.
              </p>

              {/* Button */}
              <button
                className="mt-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold 
                           bg-[#87BBD7] hover:bg-[#76a8c1] transition-all"
              >
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
