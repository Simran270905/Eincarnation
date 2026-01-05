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
      <section className="relative pt-20 px-6 sm:px-10 md:px-20 lg:px-32 flex flex-col md:flex-row items-start min-h-[750px] md:min-h-[850px]">
        
        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 z-20 mt-10 md:mt-24">
          <h4 className="text-[#060C0C] font-semibold text-xs sm:text-sm tracking-[0.15em] mb-2 uppercase">
            ABOUT US
          </h4>

          <h1 className="font-bold text-[#1A0185] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 sm:mb-8">
            Pioneering a <br /> Greener Tomorrow
          </h1>

          <p className="text-[#060C0C] text-[15px] sm:text-[16px] leading-relaxed mb-6 sm:mb-10 max-w-full md:max-w-[480px]">
            With a resolute commitment to transforming waste into wealth, we're
            not just recycling; we're rejuvenating industries, supporting local
            economies, and catalyzing India's growth trajectory.
          </p>

          <button className="bg-[#87BBD7] text-black px-7 py-3 rounded-full text-sm sm:text-base font-medium flex items-center gap-2 hover:bg-[#76a8c1] transition">
            KNOW MORE →
          </button>
        </div>

        {/* RIGHT BIG SEMI-CIRCLE - Improved positioning for responsiveness */}
        <div
          className="absolute top-0 right-[-5%] sm:right-[-2%] w-[45%] md:w-[28%] h-[550px] sm:h-[750px] md:h-[1000px] rounded-l-[500px] overflow-hidden z-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* CENTER CIRCLE - Responsive sizing */}
        <div className="absolute right-[5%] sm:right-[8%] md:right-[12%] top-[380px] sm:top-[450px] md:top-[380px] w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full overflow-hidden z-30 shadow-lg border-4 border-[#f3f3f1]">
          <img
            src={image2}
            className="w-full h-full object-cover"
            alt="Recycling"
          />
        </div>

        {/* LEFT SEMI-CIRCLE - Adjusted for small screens */}
        <div className="absolute -left-2 sm:-left-5 top-[500px] sm:top-[600px] md:top-[490px] w-32 sm:w-40 md:w-48 h-60 sm:h-72 md:h-80 rounded-r-full overflow-hidden z-10 shadow-md">
          <img
            src={image3}
            className="w-full h-full object-cover"
            alt="Waste Collection"
          />
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative px-6 sm:px-10 md:px-20 lg:px-32 py-16 sm:py-24 z-10">
        <div className="mb-10 sm:mb-14">
          <h4 className="text-[#060C0C] font-semibold text-xs sm:text-sm tracking-[0.15em] mb-2 uppercase">
            SERVICES
          </h4>

          <h1 className="font-bold text-[#1A0185] text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
            Our Recycling Services
          </h1>

          <p className="text-[#060C0C] max-w-full sm:max-w-xl text-[15px] sm:text-[16px] leading-relaxed">
            With a resolute commitment to transforming waste into wealth, we're
            not just recycling; we're rejuvenating industries.
          </p>
        </div>

        {/* SERVICE CARDS - Grid scaling improved */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-sm flex flex-col transition-transform hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="bg-black w-14 h-14 rounded-full mb-8 flex-shrink-0" />

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#1A0185] mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#060C0C] text-[15px] leading-relaxed mb-6">
                Safe disposal of electronics with certified recycling processes.
              </p>

              {/* Button */}
              <button
                className="mt-auto w-fit px-7 py-2.5 rounded-full text-sm sm:text-base font-semibold 
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