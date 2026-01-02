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
    <section className="bg-[#EEEBD9] py-16 sm:py-20 md:py-28 px-4 sm:px-8 md:px-10 lg:px-20 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-start gap-12 md:gap-20">

        {/* LEFT CONTENT */}
        <div className="pt-6 md:pt-10 text-center md:text-left">
          <p className="text-xs sm:text-sm tracking-[0.3em] mb-4 text-[#060C0C]">
            CLIENT
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-[40px] leading-snug md:leading-tight font-bold text-[#1A0185] mb-3">
            Hear From <br /> Our Clients
          </h2>

          <p className="text-sm sm:text-base text-[#060C0C] mb-6 sm:mb-10">
            Real Experiences. Real Impact.
          </p>

          {/* Arrows */}
          <div className="flex justify-center md:justify-start gap-4">
            <button
              onClick={goPrev}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#9AC6E3] flex items-center justify-center text-lg hover:scale-105 transition"
            >
              &lt;
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#9AC6E3] flex items-center justify-center text-lg hover:scale-105 transition"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative flex justify-center md:justify-end mt-10 md:mt-0">
          <div className="bg-white rounded-2xl px-6 sm:px-10 py-10 sm:py-12 shadow-md max-w-md sm:max-w-lg relative w-full">

            {/* Quote icon */}
            <div className="text-5xl sm:text-[64px] font-serif leading-none mb-4 text-center">
              "
            </div>

            {/* Text */}
            <p className="text-sm sm:text-base leading-6 text-[#060C0C] mb-6 sm:mb-8">
              {Review[current].text}
            </p>

            {/* User */}
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={Review[current].avatar}
                alt={Review[current].name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  {Review[current].name}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {Review[current].role}
                </p>
              </div>
            </div>

            {/* Butterfly */}
            <img
              src={butterfly}
              alt="decorative butterfly"
              className="absolute -top-12 sm:-top-20 -right-16 sm:-right-24 w-20 sm:w-48 h-20 sm:h-48 object-contain pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
