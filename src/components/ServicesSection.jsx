import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Collection and Pickup",
      desc: "Scheduled e-waste collection from corporates, institutions, bulk consumers, households.",
    },
    {
      title: "Secure Transportation",
      desc: "Safe transport to authorized facilities as per CPCB norms.",
    },
    {
      title: "Inspection & Segregation",
      desc: "Material is weighed, inspected, and categorized for recycling.",
    },
    {
      title: "Refurbishment & Reuse",
      desc: "Repairable items are refurbished to extend product life.",
    },
    {
      title: "Dismantling",
      desc: "Non-repairable items are dismantled to separate components.",
    },
    {
      title: "Material Recovery",
      desc: "Recovery of metals, plastics, and valuable resources.",
    },
    {
      title: "Hazardous Waste Management",
      desc: "Safe handling and disposal of hazardous e-waste materials.",
    },
    {
      title: "Responsible Recycling",
      desc: "Environmentally responsible recycling as per regulations.",
    },
    {
      title: "Documentation & Certification",
      desc: "Compliance documents and recycling certificates provided.",
    },
  ];

  const cardsPerView = 4;
  const totalCards = services.length;
  const maxIndex = totalCards - cardsPerView;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className="w-full bg-[#f4f2eb] font-sans">
     

      {/* ================= SERVICES SLIDER ================= */}
      <div className="px-16 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="mb-4 text-4xl font-bold text-[#1a0b91]">
              Our Recycling Services
            </h2>
            <p className="max-w-3xl text-[14px] font-medium text-gray-800">
              Our recycling process ensures safe, compliant e-waste handling
              with maximum resource recovery.
              <br />
              Every step follows strict environmental and data security
              standards.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 h-[1px] w-full bg-black/40" />

            {/* SLIDER TRACK */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 25}%)`,
              }}
            >
              {services.map((item, index) => (
                <div key={index} className="min-w-[25%] px-3 pt-10">
                  <div className="relative h-full rounded-[25px] bg-white p-8 shadow-sm transition hover:shadow-lg">
                    {/* DOT + LINE */}
                    <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 flex-col items-center">
                      <div className="h-10 w-[1px] bg-black" />
                      <div className="h-2 w-2 rounded-full bg-black" />
                    </div>

                    <div className="mb-6 h-12 w-12 rounded-full bg-black" />
                    <h3 className="mb-4 text-[18px] font-bold text-[#1a0b91]">
                      {item.title}
                    </h3>
                    <p className="text-[13px] font-medium text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTROLS */}
          <div className="mt-16 flex justify-center gap-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#96c3de] transition hover:bg-[#7db3d4] disabled:opacity-40"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#96c3de] transition hover:bg-[#7db3d4] disabled:opacity-40"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
