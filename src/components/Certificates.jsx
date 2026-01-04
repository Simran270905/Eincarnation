import React from "react";
import iso9001 from "../assets/images/iso9001.png";
import iso14001 from "../assets/images/iso14001.png";
import seepz from "../assets/images/seepz.png";
import mpcb from "../assets/images/mpcb.png";
import decor from "../assets/images/certificates-decor.png";

export default function Certificates() {
  const certs = [
    { 
      id: "ISO 9001", 
      logo: iso9001, 
      text: "We follow globally recognized quality standards to ensure consistent excellence in our products and services. Customer satisfaction and continuous improvement are at the heart of everything we do." 
    },
    { 
      id: "ISO 14001", 
      logo: iso14001, 
      text: "We are committed to minimizing environmental impact through responsible and sustainable practices. Our operations strictly follow international environmental safety standards." 
    },
    { 
      id: "SEEPZ", 
      logo: seepz, 
      text: "We are an authorized SEEPZ unit, enabling efficient export-oriented operations and global trade compliance. This approval ensures faster processing, tax benefits, and seamless international business." 
    },
    { 
      id: "MPCB", 
      logo: mpcb, 
      text: "We operate in compliance with MPCB norms to control pollution and protect the environment. Our processes meet regulatory standards for safety, waste management, and emissions." 
    },
  ];

  return (
    <section className="bg-[#EBE8D7] py-28 relative overflow-hidden font-sans">
      
      {/* Decorative Image */}
      <img
        src={decor}
        alt=""
        className="absolute top-0 right-0 w-[260px] pointer-events-none select-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* HEADER */}
        <div className="mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-black mb-2">
            OUR
          </p>
          <h1 className="text-[52px] font-bold text-[#1e1494] leading-tight">
            Certificates
          </h1>
        </div>

        {/* CARDS GRID */}
        <div className="grid md:grid-cols-2 gap-10">
          {certs.map((c) => (
            <div
              key={c.id}
              className="bg-[#F4F3EF] rounded-[32px] p-10 flex flex-col justify-between shadow-sm border border-white/30"
            >
              
              {/* CARD HEADER */}
              <div>
                <div className="flex items-center justify-between mb-10">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                    <img
                      src={c.logo}
                      alt={c.id}
                      className="w-full h-full object-contain p-3"
                    />
                  </div>
                  <h3 className="text-[26px] font-bold text-[#2d3e50]">
                    {c.id}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <p className="text-[15px] leading-relaxed text-gray-700 text-justify mb-10">
                  {c.text}
                </p>
              </div>

              {/* BUTTON */}
              <button className="flex items-center gap-2 w-fit rounded-full bg-[#9BC9DF] px-8 py-2.5 text-[14px] font-bold text-gray-900 hover:brightness-95 transition">
                Download now →
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
