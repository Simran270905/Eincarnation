import React from 'react';
import { ArrowRight } from 'lucide-react';

const AboutServiceSection = () => {
  const services = [
    { title: "Collection", btn: "Contact Us" },
    { title: "Data Security", btn: "Contact Us" },
    { title: "Recycle", btn: "Contact Us" },
    { title: "Hazardous Waste", btn: "Contact Us" },
    { title: "Metal Recovery", btn: "Contact Us" },
    { title: "ERP", btn: "View More" },
  ];

  return (
    <div className="bg-[#f3f3f1] min-h-screen w-full relative overflow-x-hidden font-sans">
      
      {/* --- SECTION 1: ABOUT US --- */}
      <section className="relative pt-24 px-10 md:px-32 flex flex-col md:flex-row items-start min-h-[850px] pb-0">
        
        {/* Left Text Content */}
        <div className="w-full md:w-1/2 z-20 mt-10">
          <p className="text-gray-700 font-bold text-xs tracking-[0.2em] mb-4">ABOUT US</p>
          <h1 className="text-[52px] font-bold text-[#1A0185] leading-[1.1] mb-8">
            Pioneering a <br /> Greener Tomorrow
          </h1>
          <p className="text-gray-600 text-[15px] leading-relaxed mb-8 max-w-[480px]">
            With a resolute commitment to transforming waste into wealth, we're not just recycling; 
            we're rejuvenating industries, supporting local economies, and catalyzing India's 
            growth trajectory. Through our strategic partnerships and innovative.
          </p>
          <button className="bg-[#99d1e9] hover:bg-[#7bbcd5] font-bold py-3 px-8 rounded-full flex items-center gap-3 transition-all">
            KNOW MORE <ArrowRight size={18} strokeWidth={3} />
          </button>
        </div>

        {/* --- RIGHT SEMI-CIRCLE IMAGE --- */}
        {/* Width set to 25%, Height to 1000px as requested */}
        <div 
          className="absolute top-0 -right-5 w-[25%] h-[1000px] rounded-l-[100%_50%] overflow-hidden z-0 mt--5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </div>

        {/* --- CENTER CIRCULAR IMAGE --- */}
        {/* Adjusted 'right' to 15% to align with the thinner 25% width background image */}
        <div className="absolute right-[15%] top-[380px] w-64 h-64 md:w-72 md:h-72 rounded-full border-[15px] border-[#f3f3f1] overflow-hidden z-30 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600" 
            className="w-full h-full object-cover" 
            alt="Hard drive recycling" 
          />
        </div>

        {/* --- LEFT SEMI-CIRCLE --- */}
        <div className="absolute -left-16 top-[420px] w-48 h-80 rounded-r-full overflow-hidden border-r-4 border-white/20 z-10 shadow-lg">
           <img 
            src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600" 
            className="w-full h-full object-cover" 
            alt="Waste collection" 
          />
        </div>
      </section>

      {/* --- SECTION 2: SERVICES --- */}
      <section className="relative px-10 md:px-32 -mt-10 pb-24 z-10">
        <div className="mb-14">
          <p className="text-gray-700 font-bold text-xs tracking-[0.2em] mb-4 uppercase">Services</p>
          <h2 className="text-[52px] font-bold text-[#1A0185] mb-4">Our Recycling Services</h2>
          <p className="text-gray-500 max-w-2xl text-[15px] leading-relaxed">
            With a resolute commitment to transforming waste into wealth, we're not just recycling; we're rejuvenating industries.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-[2.5rem] p-10 shadow-sm flex flex-col items-start transition-transform hover:-translate-y-1">
              <div className="bg-black w-14 h-14 rounded-full mb-8 flex items-center justify-center">
                {/* Icon Placeholder */}
              </div>
              <h3 className="text-2xl font-bold text-[#3451A3] mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Safe disposal of electronics with certified recycling processes.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutServiceSection;