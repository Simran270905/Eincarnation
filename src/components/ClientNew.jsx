import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useClients } from "../hooks/useClients";

// Fallback Logos
import logo1 from "../assets/images/logo1.png";
import logo2 from "../assets/images/logo2.png";
import logo3 from "../assets/images/logo3.png";
import logo4 from "../assets/images/logo4.png";
import logo5 from "../assets/images/logo5.png";
import logo6 from "../assets/images/logo6.png";

const fallbackClients = [logo1, logo2, logo3, logo4, logo5, logo6];

export default function ClientsNew() {
  const { clients: backendClients, loading } = useClients();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use backend data if available, otherwise use fallback
  const clientLogos = backendClients.length > 0 
    ? backendClients.map(client => client.logo)
    : fallbackClients;

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clientLogos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [clientLogos.length]);

  return (
    <section className="relative px-6 sm:px-10 md:px-20 lg:px-32 py-16 md:py-24 bg-[#fcfcfb] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          viewport={{ once: true }}
          className="text-center md:text-left mb-12 md:mb-16"
        >
          <h4 className="text-[#060C0C] font-semibold text-[10px] sm:text-sm tracking-[0.15em] mb-2 uppercase opacity-70">
            MEET
          </h4>

          <h1 className="font-bold text-[#1A0185] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            Our Clients
          </h1>

          <p className="text-[#060C0C] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed max-w-2xl mx-auto md:mx-0">
            Reliable recycling partnerships that transform waste into value
            while supporting sustainable industrial growth.
          </p>
        </motion.div>

        {/* LOGO GRID - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 items-center justify-items-center">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-[#1A0185]"></div>
            </div>
          ) : (
            clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-2xl bg-white shadow-md hover:shadow-xl flex items-center justify-center p-6 transition-all duration-300 border border-gray-100">
                  <img
                    src={logo}
                    alt={`Client ${index + 1}`}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* INFINITE SCROLL CAROUSEL - Mobile */}
        <div className="md:hidden relative overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-[#1A0185]"></div>
            </div>
          ) : (
            <>
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fcfcfb] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fcfcfb] to-transparent z-10 pointer-events-none" />

              {/* Scrolling Container - Now draggable */}
              <motion.div
                className="flex gap-6 py-8 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -((clientLogos.length * 140) + (clientLogos.length * 24)), right: 0 }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                animate={{
                  x: [0, -((clientLogos.length * 140) + (clientLogos.length * 24))],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: clientLogos.length * 3,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-32 h-32 rounded-2xl bg-white shadow-md flex items-center justify-center p-5 border border-gray-100"
                  >
                    <img
                      src={logo}
                      alt={`Client ${(index % clientLogos.length) + 1}`}
                      className="w-full h-full object-contain opacity-70"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </div>

        {/* PAGINATION DOTS - Mobile */}
        <div className="md:hidden flex justify-center gap-2 mt-8">
          {clientLogos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex % clientLogos.length
                  ? "w-8 bg-[#1A0185]"
                  : "w-2 bg-[#1A0185]/30"
              }`}
              aria-label={`Go to client ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
