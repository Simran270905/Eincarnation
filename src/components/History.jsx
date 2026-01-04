import React from "react";
import historyMain from "../assets/images/history-main.png";
import historyOverlay from "../assets/images/history-overlay.png";

export default function HistorySection() {
  return (
    <section className="bg-[#F4F3EF] py-24 overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-0">
          
          {/* Left Side: Content aligned with Snapshot */}
          <div className="flex flex-col items-start order-2 md:order-1 lg:pl-4">
            <p className="text-[20px] font-semibold text-black  uppercase opacity-90 ">
              ABOUT
            </p>

            <h1 className="font-bold leading-tight text-[#1A0185] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Our History
            </h1>

            <p className="text-[16px] leading-[1.8] text-[#000000] mb-10 mt-5  max-w-[460px] text-justify md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <button className="group flex items-center gap-3 rounded-full bg-[#9bc9df] px-10 py-3 text-[15px] font-bold tracking-tight text-gray-900 transition-all hover:brightness-95 active:scale-95 shadow-sm">
              KNOW MORE
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Right Side: Joined Offset Semicircles as per snapshot */}
          <div className="relative flex items-center justify-center order-1 md:order-2 py-12">
            <div className="relative flex w-[350px] h-[400px] md:w-[480px] md:h-[550px] items-center">
              
              {/* Left Semicircle - Shifted Down */}
              <div className="w-[55%] h-[85%] overflow-hidden rounded-l-full translate-y-12 translate-x-2 z-0 shadow-[-15px_15px_35px_rgba(0,0,0,0.08)]">
                <img
                  src={historyMain}
                  alt="Worker"
                  className=" w-full h-full object-cover object-[20%_center]"
                />
              </div>

              {/* Right Semicircle - Shifted Up */}
              <div className="w-[69%] h-[115%] overflow-hidden rounded-r-full translate-y-0 -translate-x-2 z-10 bg-white shadow-[15px_-15px_35px_rgba(0,0,0,0.08)]">
                <img
                  src={historyOverlay}
                  alt="E-waste"
                  className="h-full w-[115%] object-cover"
                />
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}