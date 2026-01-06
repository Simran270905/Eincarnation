import React, { useState } from "react";
import butterfly from "../assets/images/butterfly.png";
import human from "../assets/images/human.png";

const Review = [
  {
    id: 1,
    text: `Motion Elements is the best online site to download AE templates for free. Choose from free templates for After Effects, free videos and free music. Our elements are commission-free, you can use them in various projects, in any type of media around the world. Get Free Bookmarklet Items.`,
    name: "Lihov Sergey",
    role: "UI/UX Designer",
    avatar: human,
  },
  {
    id: 2,
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    name: "Nitin Sharma",
    role: "React Developer",
    avatar: human,
  },
];

export default function ClientTestimonials() {
  const [current, setCurrent] = useState(0);

  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? Review.length - 1 : prev - 1));
  const goNext = () => setCurrent((prev) => (prev + 1) % Review.length);

  return (
    <section className="bg-[#EEEBD9] py-20 sm:py-28 px-6 sm:px-10 md:px-20 lg:px-28 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="block text-xs tracking-[0.2em] text-[#060C0C]/70 mb-3 uppercase">
            Client
          </span>

          <h2 className=" font-bold text-[#1A0185]  text-[32px] sm:text-[38px] md:text-[44px] lg:text-[52px] leading-[1.15]  mb-5">
            Hear From <br /> Our Clients
          </h2>

          <p className="text-[#060C0C]/70 text-[15px] max-w-md mb-8">
            Real Experiences. Real Impact.
          </p>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-[#87BBD7] flex items-center justify-center text-lg hover:opacity-90 transition active:scale-95"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-[#87BBD7] flex items-center justify-center text-lg hover:opacity-90 transition active:scale-95"
            >
              ›
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative flex justify-right lg:justify-end pr-20">
          <div className="bg-white rounded-[2rem] px-8 sm:px-12 py-12 sm:py-16 shadow-xl max-w-lg relative w-full border border-black/5 md:-ml-12 lg:-ml-20">

            {/* Quote icon */}
            <div className="absolute top-8 left-60 text-6xl font-serif text-black select-none">
              “
            </div>

            {/* Text */}
            <p className="relative z-10 text-base sm:text-lg leading-relaxed text-[#060C0C] mb-10 mt-10 italic">
              {Review[current].text}
            </p>

            {/* User */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-8">
              <img
                src={Review[current].avatar}
                alt={Review[current].name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-4 ring-[#EEEBD9]"
              />
              <div className="text-left">
                <p className="font-bold text-base sm:text-lg text-[#1A0185]">
                  {Review[current].name}
                </p>
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-gray-400 uppercase">
                  {Review[current].role}
                </p>
              </div>
            </div>
            {/* Butterfly (ANIMATION UNCHANGED) */}
            <img
              src={butterfly}
              alt=""
              className="absolute -top-15 -right-12 w-40 pointer-events-none animate-float"
            />
          </div>
        </div>
      </div>

      {/* 🔒 Animation preserved exactly */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
