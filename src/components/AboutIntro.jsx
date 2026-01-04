
import React from "react";
import recyclingImg from "../assets/images/recycling.png";

export default function AboutIntro() {
  return (
    <section className="bg-[#EBE8D7] px-6 py-16 md:px-12 lg:py-24">
      <div className="relative mx-auto max-w-7xl">
        
        {/* 1. The Image Card: Taller and narrower than standard layout */}
        <div className="relative z-0 h-[400px] w-full md:h-[520px] md:w-[45%]">
          <img
            src={recyclingImg}
            alt="E-waste recycling facility"
            className="h-full w-full rounded-[45px] object-cover shadow-2xl"
          />
        </div>

        {/* 2. The Text Card: High overlap and specific Primary Color */}
        <div className="relative z-10 -mt-32 ml-auto w-full rounded-[30px] bg-[#F4F3EF] p-8 shadow-sm md:absolute md:right-0 md:top-1/2 md:mt-0 md:w-[70%] md:-translate-y-1/2 md:p-14 lg:p-20">
          
          <h2 className="mb-8 text-xl font-bold text-black md:text-2xl">
            Trusted Partner for Secure & Sustainable E-Waste Recycling
          </h2>

          {/* Grid for two-column text layout */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
            <p className="text-[15px] text-black text-xl leading-relaxed">
              E-Incarnation Recycling Pvt. Ltd. is an authorized e-waste
              recycler providing secure, compliant, and sustainable
              recycling solutions across India. We ensure safe e-waste
              disposal with strong data security, regulatory compliance,
              full traceability, and zero landfill practices.
            </p>
            <p className="text-[15px] text-black text-xl leading-relaxed">
              Our structured processes, certified data destruction, and
              circular economy approach help organizations reduce
              environmental impact while managing e-waste responsibly and
              transparently.
            </p>
          </div>

          {/* 3. The Button: Specific pill shape and blue tone */}
          <div className="mt-10 flex justify-end">
            <button className="group flex items-center gap-3 rounded-[20px] bg-[#96C2DB] px-9 py-3 text-[14px] font-bold tracking-wide text-[#232f3e] transition-all hover:brightness-95 md:rounded-full">
              VIEW MORE
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
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