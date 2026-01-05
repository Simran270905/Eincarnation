import React from "react";
import heroImage from "../assets/images/hero.png";

const HeroMain = () => {
  return (
    <section className="relative w-full bg-[#D7E8F2] overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-6 sm:px-10 md:px-16 lg:px-24 py-12 lg:py-16 gap-10 lg:gap-12 lg:[&>*:first-child]:col-start-1 lg:[&>*:last-child]:col-start-2">

        {/* LEFT CONTENT (TEXT) */}
        <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 z-10">
          <p className="font-bold tracking-[0.3em] text-[10px] sm:text-xs mb-3 text-[#061512] opacity-60 uppercase">
            #EINCARNATION
          </p>

          <h1 className="font-black leading-[1.1] text-[#1A0185] text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl uppercase tracking-tighter">
            Breathing Life Into <br className="hidden sm:block" /> A Greener Future
          </h1>

          <p className="text-[#060C0C]/80 mt-4 max-w-md sm:max-w-lg mx-auto lg:mx-0 text-sm sm:text-base md:text-lg leading-relaxed">
            Join the movement to reduce waste and protect our planet for future
            generations through circular economy solutions.
          </p>

          <div className="mt-6 lg:mt-8">
            <button className="bg-[#87BBD7] hover:bg-[#1A0185] hover:text-white text-[#000000] px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-widest transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-3 mx-auto lg:mx-0 uppercase">
              Know More <span>→</span>
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-y-4 gap-x-6 sm:gap-8 mt-10 lg:mt-12 text-[#060C0C] justify-center lg:justify-start">
            {[
              ["REAL-TIME", "DATA"],
              ["RECYCLING", "10,000 MT"],
              ["REUSE", "10,000 MT"],
              ["FORECAST 2026", "10,000 MT"],
            ].map(([title, value], index) => (
              <div
                key={index}
                className="relative flex flex-col items-center lg:items-start sm:pl-5"
              >
                {index !== 0 && (
                  <span className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[1px] bg-[#1A0185]/30 rounded-full"></span>
                )}
                <p className="text-[9px] font-bold tracking-[0.15em] opacity-50 uppercase">
                  {title}
                </p>
                <p className="text-xs sm:text-sm font-black text-[#1A0185]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] xl:max-w-[550px]">
            {/* Glow */}
            <div className="absolute -inset-10 bg-[#87BBD7]/20 rounded-full blur-3xl opacity-50" />
            <img
              src={heroImage}
              alt="Sustainable Nature"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroMain;
