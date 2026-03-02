import React from "react";
import { motion } from "framer-motion";
import { useAboutPage } from "../hooks/useAboutPage";
import iso9001 from "../assets/images/iso9001.png";
import iso14001 from "../assets/images/iso14001.png";
import seepz from "../assets/images/seepz.png";
import mpcb from "../assets/images/mpcb.png";
import decor from "../assets/images/certificates-decor.png";

export default function Certificates() {
  const { aboutData, loading } = useAboutPage();

  const fallbackCerts = [
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

  const certs = aboutData?.certifications && aboutData.certifications.length > 0
    ? aboutData.certifications.sort((a, b) => (a.order || 0) - (b.order || 0))
    : fallbackCerts;

  if (loading) {
    return (
      <section className="bg-[#EBE8D7] py-16 md:py-28 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </section>
    );
  }

  return (
    <section className="bg-[#EBE8D7] py-16 md:py-28 relative overflow-hidden font-sans">
      
      {/* Decorative Image - Adjusted for mobile visibility */}
      <img
        src={decor}
        alt=""
        className="absolute top-0 right-0 w-[150px] md:w-[260px] opacity-40 md:opacity-100 pointer-events-none select-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20"
        >
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-black mb-2">
            OUR
          </p>
          <h1 className="text-4xl md:text-[52px] font-bold text-[#1e1494] leading-tight">
            Certificates
          </h1>
        </motion.div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {certs.map((c, index) => (
            <motion.div
              key={c.id || c._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-[#F4F3EF] rounded-[24px] md:rounded-[32px] p-6 md:p-10 flex flex-col justify-between shadow-sm border border-white/30"
            >
              
              {/* CARD HEADER */}
              <div>
                <div className="flex items-center justify-between mb-6 md:mb-10">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
                    <img
                      src={c.logo}
                      alt={c.id || c.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <h3 className="text-xl md:text-[26px] font-bold text-[#2d3e50] ml-4 text-right">
                    {c.id || c.name}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-700 md:text-justify mb-8 md:mb-10">
                  {c.text || c.description}
                </p>
              </div>

              {/* BUTTON */}
              <button className="flex items-center gap-2 w-full md:w-fit justify-center md:justify-start rounded-full bg-[#9BC9DF] px-8 py-3 text-[14px] font-bold text-gray-900 transition-all hover:bg-[#8bbbd1] active:scale-95">
                Download now 
                <span className="text-lg">→</span>
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}