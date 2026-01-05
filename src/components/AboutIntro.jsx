import React from "react";
import recyclingImg from "../assets/images/recycling.png";

export default function AboutIntro() {
  return (
    <section className="bg-[#EBE8D7] px-4 py-12 md:px-12 md:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl">
        
        {/* 1. The Image Card - Elevated with better aspect ratios */}
        <div className="relative z-0 h-[350px] w-full overflow-hidden rounded-[30px] md:h-[550px] md:w-[50%] md:rounded-[45px]">
          <img
            src={recyclingImg}
            alt="E-waste recycling facility"
            className="h-full w-full object-cover shadow-2xl transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* 2. The Text Card - Premium 'Floating' Effect */}
        <div className="relative z-10 -mt-20 mx-4 rounded-[30px] bg-[#F4F3EF]/95 border border-white/20 backdrop-blur-sm p-8 shadow-xl md:absolute md:right-0 md:top-1/2 md:mt-0 md:mx-0 md:w-[65%] md:-translate-y-1/2 md:p-12 lg:p-20">
          
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-gray-900 md:mb-10 md:text-3xl lg:text-4xl">
            Trusted Partner for Secure & <br className="hidden lg:block" /> 
            Sustainable E-Waste Recycling
          </h2>

          {/* Grid for two-column text layout */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-x-12">
            <p className="text-[16px] leading-relaxed text-gray-700 lg:text-[18px]">
              E-Incarnation Recycling Pvt. Ltd. is an authorized e-waste
              recycler providing secure, compliant, and sustainable
              recycling solutions across India. We ensure safe e-waste
              disposal with strong data security and zero landfill practices.
            </p>
            <p className="text-[16px] leading-relaxed text-gray-700 lg:text-[18px]">
              Our structured processes, certified data destruction, and
              circular economy approach help organizations reduce
              environmental impact while managing e-waste responsibly and
              transparently.
            </p>
          </div>

          {/* 3. The Button - Polished Pill Design */}
          <div className="mt-10 flex justify-start md:justify-end">
            <button className="group flex items-center gap-3 rounded-full bg-[#96C2DB] px-8 py-4 text-[13px] font-black uppercase tracking-[0.1em] text-[#232f3e] transition-all hover:bg-[#85b3cc] hover:shadow-lg active:scale-95">
              VIEW MORE
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}