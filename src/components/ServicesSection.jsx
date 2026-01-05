import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ServicesSection() {
  const services = [
    { title: "Collection and Pickup", desc: "Scheduled e-waste collection from corporates, institutions, bulk consumers, households." },
    { title: "Secure Transportation", desc: "Safe transport to authorized facilities as per CPCB norms." },
    { title: "Inspection & Segregation", desc: "Material is weighed, inspected, and categorized for recycling." },
    { title: "Refurbishment & Reuse", desc: "Repairable items are refurbished to extend product life." },
    { title: "Dismantling", desc: "Non-repairable items are dismantled to separate components." },
    { title: "Material Recovery", desc: "Recovery of metals, plastics, and valuable resources." },
    { title: "Hazardous Waste Management", desc: "Safe handling and disposal of hazardous e-waste materials." },
    { title: "Responsible Recycling", desc: "Environmentally responsible recycling as per regulations." },
    { title: "Documentation & Certification", desc: "Compliance documents and recycling certificates provided." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // Update cards per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCards = services.length;
  const maxIndex = totalCards - cardsPerView;

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <section className="w-full bg-[#f4f2eb] font-sans overflow-hidden">
      <div className="px-6 md:px-16 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          
          {/* HEADER */}
          <div className="mb-12 md:mb-16 text-center md:text-left">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-[#1a0b91]">
              Our Recycling Services
            </h2>
            <p className="mx-auto md:mx-0 max-w-3xl text-sm font-medium text-gray-800 leading-relaxed">
              Our recycling process ensures safe, compliant e-waste handling
              with maximum resource recovery. Every step follows strict environmental 
              and data security standards.
            </p>
          </div>

          <div className="relative">
            {/* Horizontal Timeline Line */}
            <div className="absolute left-0 top-0 h-[1px] w-full bg-black/20" />

            {/* SLIDER TRACK */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                }}
              >
                {services.map((item, index) => (
                  <div 
                    key={index} 
                    className="px-2 md:px-3 pt-12 pb-6"
                    style={{ minWidth: `${100 / cardsPerView}%` }}
                  >
                    <div className="relative h-full rounded-[25px] bg-white p-6 md:p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                      
                      {/* TIMELINE CONNECTOR */}
                      <div className="absolute -top-12 left-1/2 flex -translate-x-1/2 flex-col items-center">
                        <div className="h-12 w-[1px] bg-black/40" />
                        <div className="h-3 w-3 rounded-full bg-black shadow-[0_0_0_4px_rgba(244,242,235,1)]" />
                      </div>

                      {/* ICON PLACEHOLDER */}
                      <div className="mb-6 h-12 w-12 rounded-full bg-[#1a0b91] flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      
                      <h3 className="mb-3 text-lg font-bold text-[#1a0b91] leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed font-medium text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="mt-8 md:mt-12 flex justify-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#96c3de] text-white transition-all hover:bg-[#1a0b91] disabled:opacity-20 active:scale-90"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#96c3de] text-white transition-all hover:bg-[#1a0b91] disabled:opacity-20 active:scale-90"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}