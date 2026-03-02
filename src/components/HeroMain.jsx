import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/images/hero.png";
import { useHeroStats } from "../hooks/useHeroStats";
import { useCounterAnimation } from "../hooks/useCounterAnimation";

const HeroMain = () => {
  const { stats, loading } = useHeroStats();
  
  // Counter animations for stats (1200ms for faster counting)
  // Only start animation after data is loaded
  const recyclingCounter = useCounterAnimation(stats.recycling, 1200);
  const reuseCounter = useCounterAnimation(stats.reuse, 1200);
  const forecastCounter = useCounterAnimation(stats.forecast2026, 1200);
  
  // Show loading state while fetching data
  if (loading) {
    return (
      <section className="relative w-full bg-[#D7E8F2] overflow-hidden pt-24 sm:pt-20 md:pt-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-6 sm:pt-8 md:pt-10 pb-20 md:pb-24 lg:pb-28 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#1A0185]"></div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="relative w-full bg-[#D7E8F2] overflow-hidden pt-24 sm:pt-20 md:pt-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-6 sm:pt-8 md:pt-10 pb-20 md:pb-24 lg:pb-28">
        
        {/* HERO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-12">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center text-center lg:text-left z-10">
            {/* HEADING */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-bold tracking-[0.3em] text-[10px] sm:text-xs mb-3 text-[#061512] uppercase"
            >
              #EINCARNATION
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-black leading-[1.1] text-[#1A0185] text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl uppercase tracking-tighter"
            >
              {stats.heroTitle || "Breathing Life Into A Greener Future"}
            </motion.h1>

            {/* MOBILE ONLY IMAGE: Appears between Heading and Text */}
            <div className="flex lg:hidden justify-center my-8">
              <div className="relative w-full max-w-[280px] sm:max-w-[340px]">
                <div className="absolute -inset-10 bg-[#87BBD7]/20 rounded-full blur-3xl opacity-50" />
                <img
                  src={heroImage}
                  alt="Sustainable Nature"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* DESCRIPTION & BUTTON */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#060C0C]/80 mt-4 max-w-md sm:max-w-lg mx-auto lg:mx-0 text-sm sm:text-base md:text-lg leading-relaxed"
            >
              {stats.heroDescription || "Join the movement to reduce waste and protect our planet for future generations through circular economy solutions."}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 lg:mt-8"
            >
              <button className="group bg-[#87BBD7] hover:bg-[#1A0185] hover:text-white text-[#000000] px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 flex items-center gap-3 mx-auto lg:mx-0 uppercase">
                {stats.heroButtonText || "Know More"} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          </div>

          {/* DESKTOP ONLY IMAGE: Appears on the right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex justify-center lg:justify-end"
          >
            <div className="relative w-full lg:max-w-[520px] xl:max-w-[600px]">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-12 bg-[#87BBD7]/20 rounded-full blur-3xl opacity-50" 
              />
              <img
                src={heroImage}
                alt="Sustainable Nature"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

        </div>

        {/* REAL-TIME STATS BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="relative z-20 mt-12 sm:mt-16 lg:mt-12"
          ref={recyclingCounter.elementRef}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-[2rem] shadow-lg px-5 py-5 sm:px-8 sm:py-6 md:px-10 lg:px-12 md:py-10 lg:py-12">
            {/* Mobile: Compact Horizontal Grid */}
            <div className="lg:hidden">
              <div className="text-center mb-4">
                <motion.p 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="text-sm font-semibold text-[#1A0185]/70 tracking-wider uppercase"
                >
                  Real-Time Impact
                </motion.p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  ["Recycling", recyclingCounter.count || stats.recycling, "MT"],
                  ["Reuse", reuseCounter.count || stats.reuse, "MT"],
                  ["Forecast '26", forecastCounter.count || stats.forecast2026, "MT"],
                ].map(([title, value, unit], index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + (index * 0.1) }}
                    className="bg-gradient-to-br from-[#D7E8F2]/40 to-transparent rounded-xl p-3 text-center border border-[#1A0185]/5"
                  >
                    <p className="text-[10px] font-semibold text-[#1A0185]/60 uppercase mb-1.5 tracking-wide">
                      {title}
                    </p>
                    <p className="text-xl sm:text-2xl font-black text-[#1A0185] leading-none">
                      {value}
                    </p>
                    <p className="text-[9px] font-medium text-[#1A0185]/50 uppercase mt-0.5">
                      {unit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop: Horizontal Grid */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-0 items-center">
              {[
                ["REAL-TIME", ""],
                ["RECYCLING", `${recyclingCounter.count || stats.recycling} MT`],
                ["REUSE", `${reuseCounter.count || stats.reuse} MT`],
                ["FORECAST 2026", `${forecastCounter.count || stats.forecast2026} MT`],
              ].map(([title, value], index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + (index * 0.1) }}
                  className={`relative flex flex-col justify-center min-h-[60px] 
                    ${index !== 0 ? "pl-10" : ""} 
                    text-left`}
                >
                  {index !== 0 && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-[#1A0185]" />
                  )}
                  <p className={`font-bold text-black tracking-tight leading-tight ${
                    index === 0 ? "text-3xl" : "text-xl"
                  }`}>
                    {title}
                  </p>
                  {value && (
                    <p className="text-2xl font-normal text-gray-900 leading-none mt-1">
                      {value}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroMain;