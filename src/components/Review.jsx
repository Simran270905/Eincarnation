import React, { useState } from "react";

// Use empty string for avatar for now
const Review = [
  {
    id: 1,
    text: `Motion Elements is the best online site to download AE templates for free. Choose from free templates for After Effects, free videos and free music. Our elements are commission-free, you can use them in various projects, in any type of media around the world. Get Free Bookmarklet Items.`,
    name: "Lihov Sergey",
    role: "UI/UX designer",
    avatar: "", // empty for now
  },
  {
    id: 2,
    text: `Motion Elements is the best online site to download AE templates for free. Choose from free templates for After Effects, free videos and free music. Our elements are commission-free, you can use them in various projects, in any type of media around the world. Get Free Bookmarklet Items.`,
    name: "Lihov ",
    role: "UI/UX designer",
    avatar: "", // empty for now
  },
  // Add more testimonials if needed
];

export default function ClientTestimonials() {
  const [current, setCurrent] = useState(0);

  const prevTestimonial = () => {
    setCurrent(current === 0 ? Review.length - 1 : current - 1);
  };

  const nextTestimonial = () => {
    setCurrent(current === Review.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="bg-[#EFEDE3] py-24 relative px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left side: heading and arrows */}
        <div className="md:w-1/3 text-center md:text-left">
          <p className="text-sm tracking-widest mb-2">CLIENT</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2B1582] mb-2">
            Hear From <br /> Our Clients
          </h2>
          <p className="text-gray-600 mb-6">Real Experiences. Real Impact.</p>

          {/* Navigation buttons */}
          <div className="flex gap-4 justify-center md:justify-start">
            <button
              onClick={prevTestimonial}
              className="bg-blue-200 text-black w-10 h-10 rounded-full flex items-center justify-center text-lg"
            >
              &lt;
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-blue-200 text-black w-10 h-10 rounded-full flex items-center justify-center text-lg"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Right side: testimonial card */}
        <div className="md:w-2/3 relative">
          <div className="bg-white p-8 rounded-xl shadow-md relative">
            {/* Butterfly in the corner */}
            <img
              src=""
              alt="decorative"
              className="absolute -top-4 -right-4 w-12 h-12"
            />

            {/* Quote */}
            <p className="text-xl mb-6">&ldquo;{Review[current].text}&rdquo;</p>

            {/* Client info */}
            <div className="flex items-center gap-4 mt-4">
              <img
                src={Review[current].avatar}
                alt={Review[current].name}
                className="w-12 h-12 rounded-full bg-gray-300" // gray bg as placeholder
              />
              <div>
                <p className="font-semibold">{Review[current].name}</p>
                <p className="text-gray-500 text-sm">{Review[current].role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
