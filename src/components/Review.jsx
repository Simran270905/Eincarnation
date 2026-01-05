import React, { useState } from "react";
import butterfly from "../assets/images/butterfly.png";
import human from "../assets/images/human.png";

const Review = [
  {
    id: 1,
    text: `Motion Elements is the best online site to download AE templates for free. Choose from free templates for After Effects, free videos and free music. Our elements are commission-free, you can use them in various projects, in any type of media around the world. Get Free Bookmarklet Items.`,
    name: "Lihov Sergey",
    role: "UI/UX designer",
    avatar: human,
  },
];

export default function ClientTestimonials() {
  const [current, setCurrent] = useState(0);

  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? Review.length - 1 : prev - 1));
  const goNext = () => setCurrent((prev) => (prev + 1) % Review.length);

  return (
    <section className="bg-[#EEEBD9] py-16 sm:py-20 md:py-28 px-6 sm:px-12 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-20">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left z-10">
          <p className="text-xs sm:text-sm tracking-[0.4em] font-bold mb-4 text-[#060C0C] uppercase opacity-60">
            CLIENT
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-black text-[#1A0185] mb-4">
            Hear From <br className="hidden md:block" /> Our Clients
          </h2>

          <p className="text-base sm:text-lg text-[#060C0C] font-medium opacity-80 mb-8 sm:mb-12">
            Real Experiences. Real Impact.
          </p>

          {/* Arrows */}
          <div className="flex justify-center md:justify-start gap-4">
            <button
              onClick={goPrev}
              className="w-12 h-12 rounded-full bg-[#9AC6E3] hover:bg-[#1A0185] hover:text-white flex items-center justify-center text-xl transition-all duration-300 shadow-md active:scale-90"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              onClick={goNext}
              className="w-12 h-12 rounded-full bg-[#9AC6E3] hover:bg-[#1A0185] hover:text-white flex items-center justify-center text-xl transition-all duration-300 shadow-md active:scale-90"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative flex justify-center md:justify-end mt-12 md:mt-0">
          <div className="bg-white rounded-[2rem] px-8 sm:px-12 py-12 sm:py-16 shadow-xl max-w-lg relative w-full border border-black/5">

            {/* Quote icon */}
            <div className="absolute top-8 left-8 text-6xl font-serif text-[#9AC6E3] opacity-40 select-none">
              “
            </div>

            {/* Text */}
            <p className="relative z-10 text-base sm:text-lg leading-relaxed text-[#060C0C] mb-10 italic">
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

            {/* Butterfly Decoration */}
            <img
              src={butterfly}
              alt=""
              className="absolute -top-16 -right-8 sm:-top-24 sm:-right-24 w-32 sm:w-56 h-auto object-contain pointer-events-none drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}