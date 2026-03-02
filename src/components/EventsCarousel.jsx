import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useEvents } from "../hooks/useEvents";

export default function EventsCarousel() {
  const { events, loading } = useEvents();
  const [carouselImages, setCarouselImages] = useState([]);
  const [carouselTitle, setCarouselTitle] = useState("");

  useEffect(() => {
    // Get carousel images from the first event that has them
    const eventWithCarousel = events.find(e => e.carouselImages && e.carouselImages.length > 0);
    if (eventWithCarousel) {
      setCarouselImages(eventWithCarousel.carouselImages);
      setCarouselTitle(eventWithCarousel.title);
    }
  }, [events]);

  if (loading || carouselImages.length === 0) {
    return null;
  }

  // Duplicate images for seamless loop
  const extendedImages = [...carouselImages, ...carouselImages];

  return (
    <section className="w-full py-12 md:py-16 bg-[#f4f2eb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#1A0185] font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-8 md:mb-12"
        >
          {carouselTitle || "Event Gallery"}
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl bg-white/50 backdrop-blur-sm overflow-hidden shadow-xl">
          <motion.div
            className="absolute inset-0 flex gap-4 md:gap-6 p-4 md:p-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {extendedImages.map((img, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px] h-full rounded-2xl overflow-hidden group"
              >
                <img
                  src={img.url}
                  alt={img.caption || `Gallery image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                    <p className="text-white text-sm md:text-base font-medium">
                      {img.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
