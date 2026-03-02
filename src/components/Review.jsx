import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTestimonials } from "../hooks/useTestimonials";
import butterfly from "../assets/images/butterfly.png";
import human from "../assets/images/human.png";

const fallbackReviews = [
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
  const [direction, setDirection] = useState(0);
  const { testimonials: backendTestimonials, loading } = useTestimonials();
  
  // Use backend data if available, otherwise use fallback
  const Review = backendTestimonials.length > 0 
    ? backendTestimonials.map(t => ({
        id: t._id,
        text: t.testimonial,
        name: t.name,
        role: t.position,
        avatar: t.image || human,
      }))
    : fallbackReviews;

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? Review.length - 1 : prev - 1));
  };
  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % Review.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="bg-[#EEEBD9] px-6 sm:px-10 md:px-20 lg:px-28 py-16 md:py-20 overflow-hidden min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <span className="block text-xs sm:text-sm tracking-[0.2em] text-[#060C0C]/70 mb-2 uppercase">
            Client
          </span>

          <h2 className="font-bold text-[#1A0185] text-3xl sm:text-[38px] md:text-[44px] lg:text-[52px] leading-[1.15] mb-4">
            Hear From <br className="hidden sm:block" /> Our Clients
          </h2>

          <p className="text-[#060C0C]/70 text-sm sm:text-[15px] max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
            Real Experiences. Real Impact.
          </p>

          {/* Navigation */}
          <div className="flex gap-4 justify-center lg:justify-start">
            <button
              onClick={goPrev}
              className="w-11 h-11 rounded-full bg-[#87BBD7] flex items-center justify-center text-lg hover:opacity-90 transition active:scale-95 flex-shrink-0"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              className="w-11 h-11 rounded-full bg-[#87BBD7] flex items-center justify-center text-lg hover:opacity-90 transition active:scale-95 flex-shrink-0"
            >
              ›
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative flex justify-center lg:justify-end lg:pr-20">
          <div className="bg-white rounded-[2rem] px-8 sm:px-12 py-10 sm:py-14 shadow-2xl max-w-sm sm:max-w-lg relative w-full border border-gray-100 md:-ml-12 lg:-ml-20 min-h-[400px] sm:h-[420px] flex flex-col justify-between mx-auto lg:mx-0 overflow-hidden">
            {/* Quote icon - Static */}
            <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl font-serif text-[#1A0185]/15 select-none">
              "
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-[#1A0185]"></div>
              </div>
            ) : (
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  {/* Review Text */}
                  <p className="relative z-10 text-base sm:text-lg leading-relaxed text-[#060C0C] mt-16 sm:mt-12 italic line-clamp-5 sm:line-clamp-5 text-center sm:text-left">
                    {Review[current].text}
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-3 sm:gap-4 border-t border-gray-200 pt-6 sm:pt-8">
                    <img
                      src={Review[current].avatar}
                      alt={Review[current].name}
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover ring-4 ring-[#EEEBD9] flex-shrink-0"
                    />
                    <div className="text-left min-w-0 flex-1">
                      <p className="font-bold text-sm sm:text-lg text-[#1A0185] truncate">
                        {Review[current].name}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold tracking-wide text-gray-400 uppercase">
                        {Review[current].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Animation preserved */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
         0%, 100% {
          transform: translateY(0);
         }
         50% {
          transform: translateY(-16px);
         }
        }
        .animate-float {
         animation: float 6s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}
