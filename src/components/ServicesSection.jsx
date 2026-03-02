import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useServices } from "../hooks/useServices";
import { useServicesPage } from "../hooks/useServicesPage";

const ServicesSection = () => {
  // DATA - Fetch from backend
  const { servicesPageData, loading: pageLoading } = useServicesPage();
  
  // Services sections from Services Page (not Home page)
  const serviceSections = servicesPageData?.sections && servicesPageData.sections.length > 0
    ? [...servicesPageData.sections].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];
  
  // Fallback data if backend is empty
  const fallbackProcessSteps = [
    { title: "Collection and Pickup", description: "Scheduled e-waste collection from corporates, institutions, and households.", order: 0 },
    { title: "Secure Transportation", description: "Safe transport to authorized facilities as per CPCB norms.", order: 1 },
    { title: "Inspection & Segregation", description: "Material is weighed, inspected, and categorized for recycling.", order: 2 },
    { title: "Refurbishment & Reuse", description: "Repairable items are refurbished to extend product life.", order: 3 },
    { title: "Dismantling", description: "Non-repairable items are dismantled to separate components.", order: 4 },
    { title: "Material Recovery", description: "Recovery of metals, plastics, and valuable resources.", order: 5 },
    { title: "Hazardous Waste Management", description: "Safe handling and disposal of hazardous e-waste materials.", order: 6 },
    { title: "Responsible Recycling", description: "Environmentally responsible recycling as per regulations.", order: 7 },
    { title: "Documentation & Certification", description: "Compliance documents and recycling certificates provided.", order: 8 },
  ];

  // Use backend data or fallback
  const processSteps = servicesPageData?.recyclingProcess?.steps && servicesPageData.recyclingProcess.steps.length > 0
    ? [...servicesPageData.recyclingProcess.steps].sort((a, b) => (a.order || 0) - (b.order || 0))
    : fallbackProcessSteps;
  
  const processTitle = servicesPageData?.recyclingProcess?.title || "Our Recycling Process";
  const processDescription = servicesPageData?.recyclingProcess?.description || "Our process ensures safe, compliant e-waste handling with maximum resource recovery.";

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
          
          {/* ================= SECTION 1: SERVICES SECTIONS FROM ADMIN ================= */}
          {pageLoading ? (
            <div className="text-center py-12 mb-24">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
            </div>
          ) : serviceSections.length > 0 ? (
            <div className="space-y-16 mb-24">
              {serviceSections.map((section, index) => (
                <div 
                  key={section._id || index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 lg:gap-12 items-center bg-white rounded-3xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-shadow`}
                >
                  {/* Image Section */}
                  {section.image && (
                    <div className="w-full lg:w-1/2">
                      {section.image && (
                        <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
                          <img 
                            src={section.image} 
                            alt={section.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Content Section */}
                  <div className={`w-full ${section.image ? 'lg:w-1/2' : 'lg:w-full'} space-y-4`}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#1A0185] leading-tight">
                      {section.title}
                    </h2>
                    <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                      {section.description}
                    </p>
                    
                    {/* Features List */}
                    {section.features && section.features.length > 0 && (
                      <ul className="space-y-2 pt-4">
                        {section.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#87BBD7] flex items-center justify-center mt-0.5">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span className="text-gray-700 text-sm lg:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-24">
              <p className="text-gray-500">No services available. Please add services from the Admin Panel.</p>
            </div>
          )}

          {/* ================= SECTION 2: CIRCULAR PROCESS SLIDER ================= */}
          <div className="mb-12 text-center md:text-left">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-[#1a0b91]">
              {processTitle}
            </h2>
            <p className="max-w-3xl text-sm font-medium text-gray-800 leading-relaxed">
              {processDescription}
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
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {item.description || item.desc}
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