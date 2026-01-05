import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Asset Imports (Ensure paths match your project structure)
import collection from "../assets/images/collection.png";
import recycling from "../assets/images/recycle.png";
import danger from "../assets/images/danger.png";
import gears from "../assets/images/gears.png";
import encrypted from "../assets/images/encrypted.png";

const ServicesSection = () => {
  // 1. DATA FOR TOP GRID
  const mainServices = [
    { title: "Collection", btn: "Contact Us", icon: collection },
    { title: "Data Security", btn: "Contact Us", icon: encrypted },
    { title: "Recycle", btn: "Contact Us", icon: recycling },
    { title: "Hazardous Waste", btn: "Contact Us", icon: danger },
    { title: "Metal Recovery", btn: "Contact Us", icon: gears },
    { title: "EPR", btn: "View More", icon: recycling },
  ];

  // 2. DATA FOR CIRCULAR SLIDER
  const processSteps = [
    { title: "Collection and Pickup", desc: "Scheduled e-waste collection from corporates, institutions, and households." },
    { title: "Secure Transportation", desc: "Safe transport to authorized facilities as per CPCB norms." },
    { title: "Inspection & Segregation", desc: "Material is weighed, inspected, and categorized for recycling." },
    { title: "Refurbishment & Reuse", desc: "Repairable items are refurbished to extend product life." },
    { title: "Dismantling", desc: "Non-repairable items are dismantled to separate components." },
    { title: "Material Recovery", desc: "Recovery of metals, plastics, and valuable resources." },
    { title: "Hazardous Waste Management", desc: "Safe handling and disposal of hazardous e-waste materials." },
    { title: "Responsible Recycling", desc: "Environmentally responsible recycling as per regulations." },
    { title: "Documentation & Certification", desc: "Compliance documents and recycling certificates provided." },
  ];

  // --- INFINITE LOOP LOGIC ---
  const [cardsPerView, setCardsPerView] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  // Clone the first few cards to the end to create a seamless circular feel
  const extendedSteps = [...processSteps, ...processSteps.slice(0, 4)];

  // Update responsive view
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

  // Optional: Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex >= processSteps.length) {
      // Snap to start without animation, then move to 1
      setIsTransitioning(false);
      setCurrentIndex(0);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(1);
      }, 20);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(processSteps.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(processSteps.length - 1);
      }, 20);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    // If we reach the clones at the end, snap back to the actual originals
    if (currentIndex >= processSteps.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  return (
    <section className="w-full bg-[#f4f2eb] font-sans overflow-hidden">
      <div className="px-6 md:px-16 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          
          {/* ================= SECTION 1: MAIN SERVICES GRID ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-[2.2rem] p-8 shadow-sm flex flex-col transition-transform hover:-translate-y-1"
              >
                <div className="bg-black w-14 h-14 rounded-full mb-5 flex items-center justify-center p-3">
                  <img 
                    src={service.icon} 
                    alt={service.title} 
                    className="w-full h-full object-contain invert" 
                  />
                </div>
                <h3 className="text-xl font-bold text-[#1A0185] mb-2">{service.title}</h3>
                <p className="text-[#060C0C] text-sm leading-relaxed mb-6">
                  Safe disposal of electronics with certified recycling processes.
                </p>
                <button className="mt-auto w-fit px-6 py-2 rounded-full text-sm font-semibold bg-[#87BBD7] hover:bg-[#76a8c1] transition">
                  {service.btn}
                </button>
              </div>
            ))}
          </div>

          {/* ================= SECTION 2: CIRCULAR PROCESS SLIDER ================= */}
          <div className="mb-12 text-center md:text-left">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-[#1a0b91]">
              Our Recycling Process
            </h2>
            <p className="max-w-3xl text-sm font-medium text-gray-800 leading-relaxed">
              Our process ensures safe, compliant e-waste handling with maximum resource recovery.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Horizontal Line */}
            <div className="absolute left-0 top-0 h-[1px] w-full bg-black/20" />

            <div className="overflow-hidden">
              <div
                className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                }}
              >
                {extendedSteps.map((item, index) => (
                  <div 
                    key={index} 
                    className="px-3 pt-12 pb-6 flex-shrink-0"
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <div className="relative h-full rounded-[25px] bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                      {/* Timeline Connector */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="h-12 w-[1px] bg-black/40" />
                        <div className="h-3 w-3 rounded-full bg-black shadow-[0_0_0_4px_#f4f2eb]" />
                      </div>

                      {/* Step Number (Looping 1-9) */}
                      <div className="mb-6 h-10 w-10 rounded-full bg-[#1a0b91] flex items-center justify-center text-white text-xs font-bold">
                        {(index % processSteps.length) + 1}
                      </div>

                      <h3 className="mb-3 text-lg font-bold text-[#1a0b91] leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={handlePrev}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-[#96c3de] text-white hover:bg-[#1a0b91] transition-all active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-[#96c3de] text-white hover:bg-[#1a0b91] transition-all active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;