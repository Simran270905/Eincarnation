import React from "react";
import historyMain from "../assets/images/history-main.png";
import historyOverlay from "../assets/images/history-overlay.png";

export default function HistorySection() {
  return (
    <section className="bg-[#F4F3EF] py-16 md:py-24 overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">
          
          {/* Left Side: Content */}
          <div className="flex flex-col items-center md:items-start order-2 md:order-1 text-center md:text-left">
            <p className="text-sm md:text-[20px] font-bold text-black uppercase tracking-widest opacity-90 mb-2">
              ABOUT
            </p>

            <h1 className="font-black leading-tight text-[#1A0185] text-3xl sm:text-4xl lg:text-5xl uppercase">
              Our History
            </h1>

            <p className="text-sm md:text-[16px] leading-[1.8] text-[#000000]/80 mb-10 mt-5 max-w-[460px] md:text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <button className="group flex items-center gap-3 rounded-full bg-[#9bc9df] px-8 md:px-10 py-3 md:py-4 text-xs md:text-[15px] font-black tracking-widest text-gray-900 transition-all hover:bg-[#1A0185] hover:text-white active:scale-95 shadow-md uppercase">
              Know More
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Right Side: Offset Semicircles */}
          <div className="relative flex items-center justify-center order-1 md:order-2 py-8 md:py-12">
            {/* Main Container - scaled for mobile */}
            <div className="relative flex w-[280px] h-[320px] sm:w-[350px] sm:h-[400px] md:w-[420px] md:h-[480px] lg:w-[480px] lg:h-[550px] items-center">
              
              {/* Left Semicircle - Shifted Down */}
              <div className="w-[55%] h-[80%] md:h-[85%] overflow-hidden rounded-l-full translate-y-6 md:translate-y-12 translate-x-2 z-0 shadow-[-10px_10px_30px_rgba(0,0,0,0.1)]">
                <img
                  src={historyMain}
                  alt="History Process"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Semicircle - Shifted Up */}
              <div className="w-[65%] md:w-[69%] h-[105%] md:h-[115%] overflow-hidden rounded-r-full translate-y-0 -translate-x-2 z-10 bg-white shadow-[15px_-10px_30px_rgba(0,0,0,0.1)]">
                <img
                  src={historyOverlay}
                  alt="Waste Management"
                  className="h-full w-[110%] md:w-[115%] object-cover"
                />
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}