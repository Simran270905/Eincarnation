import React from "react";
import heroImage from "../assets/images/hero.png";

const HeroMain = () => {
  return (
    <section className="relative w-full bg-[#D7E8F2] mt-5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-20 pb-24 md:pb-32">
        
        {/* HERO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-12">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center text-center lg:text-left z-10">
            {/* HEADING */}
            <p className="font-bold tracking-[0.3em] text-[10px] sm:text-xs mb-3 text-[#061512] opacity-60 uppercase">
              #EINCARNATION
            </p>

            <h1 className="font-black leading-[1.1] text-[#1A0185] text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl uppercase tracking-tighter">
              Breathing Life Into <br className="hidden sm:block" /> A Greener Future
            </h1>

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
            <p className="text-[#060C0C]/80 mt-4 max-w-md sm:max-w-lg mx-auto lg:mx-0 text-sm sm:text-base md:text-lg leading-relaxed">
              Join the movement to reduce waste and protect our planet for future
              generations through circular economy solutions.
            </p>

            <div className="mt-6 lg:mt-8">
              <button className="bg-[#87BBD7] hover:bg-[#1A0185] hover:text-white text-[#000000] px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-widest transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-3 mx-auto lg:mx-0 uppercase">
                Know More <span>→</span>
              </button>
            </div>
          </div>

          {/* DESKTOP ONLY IMAGE: Appears on the right */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div className="relative w-full lg:max-w-[520px] xl:max-w-[600px]">
              <div className="absolute -inset-12 bg-[#87BBD7]/20 rounded-full blur-3xl opacity-50" />
              <img
                src={heroImage}
                alt="Sustainable Nature"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>

        </div>

        {/* REAL-TIME STATS BAR */}
        <div className="relative z-20 mt-12 lg:-mt-10">
          <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-2xl px-6 py-8 md:px-12 md:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 items-center">
              {[
                ["REAL-TIME", ""],
                ["RECYCLING", "10000 MT"],
                ["REUSE", "10000 MT"],
                ["FORECAST 2026", "10000 MT"],
              ].map(([title, value], index) => (
                <div
                  key={index}
                  className={`relative flex flex-col justify-center min-h-[50px] md:min-h-[60px] 
                    ${index !== 0 ? "lg:pl-10" : ""} 
                    ${index % 2 !== 0 ? "sm:pl-10 lg:pl-10" : ""} 
                    text-center sm:text-left`}
                >
                  {index !== 0 && (
                    <span className="hidden lg:block absolute left-0 top-0 h-full w-[3px] bg-[#1A0185]" />
                  )}
                  {(index === 1 || index === 3) && (
                    <span className="hidden sm:block lg:hidden absolute left-0 top-0 h-full w-[3px] bg-[#1A0185]" />
                  )}
                  <p className={`font-bold text-black tracking-tight leading-tight ${
                    index === 0 ? "text-xl md:text-2xl lg:text-3xl" : "text-lg md:text-xl"
                  }`}>
                    {title}
                  </p>
                  {value && (
                    <p className="text-xl md:text-2xl font-normal text-gray-900 leading-none mt-1">
                      {value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroMain;