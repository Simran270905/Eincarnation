import React from "react";
import heroImage from "../assets/images/hero.png";

const HeroMain = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center px-6 sm:px-10 md:px-16 lg:px-24 py-12 sm:py-20 lg:py-32 gap-12 lg:gap-16 bg-[#F4F3EF] overflow-hidden">
      
      {/* LEFT CONTENT */}
      <div className="text-center lg:text-left order-2 lg:order-1">
        <p className="font-bold tracking-[0.3em] text-[10px] sm:text-xs mb-4 text-[#061512] opacity-70 uppercase">
          #EINCARNATION
        </p>

        <h1 className="font-black leading-[1.1] text-[#1A0185] text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter">
          Breathing Life Into <br className="hidden sm:block" /> A Greener Future
        </h1>

        <p className="text-[#060C0C]/80 mt-6 max-w-md sm:max-w-lg mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed">
          Join the movement to reduce waste and protect our planet for future generations through circular economy solutions.
        </p>

        <button className="mt-8 bg-[#87BBD7] hover:bg-[#1A0185] hover:text-white text-[#000000] px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-widest transition-all duration-300 shadow-lg hover:shadow-[#1A0185]/20 flex items-center gap-3 mx-auto lg:mx-0 uppercase">
          Know More <span>→</span>
        </button>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-y-8 gap-x-4 sm:gap-10 mt-16 text-[#060C0C] justify-center lg:justify-start">
          {[
            ["REAL-TIME", "DATA"],
            ["RECYCLING", "10000 MT"],
            ["REUSE", "10000 MT"],
            ["FORECAST 2026", "10000 MT"],
          ].map(([title, value], index) => (
            <div
              key={index}
              className="relative flex flex-col items-center lg:items-start sm:pl-6"
            >
              {/* Vertical line - hidden on mobile grid, shown from sm up */}
              {index !== 0 && (
                <span className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[2px] bg-[#1A0185]/20 rounded-full"></span>
              )}
              
              <p className="text-[10px] sm:text-xs font-bold tracking-widest opacity-50 mb-1 uppercase text-center lg:text-left">
                {title}
              </p>
              <p className="text-sm sm:text-base font-black text-[#1A0185]">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT IMAGE (STATIC) */}
      <div className="flex justify-center lg:justify-end order-1 lg:order-2">
        <div className="relative">
          {/* Decorative background glow stays to highlight the static image */}
          <div className="absolute -inset-4 bg-[#87BBD7]/10 rounded-full blur-3xl" />
          <img
            src={heroImage}
            alt="Sustainable Nature"
            className="relative z-10 w-56 sm:w-72 md:w-96 lg:w-[520px] xl:w-[600px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroMain;