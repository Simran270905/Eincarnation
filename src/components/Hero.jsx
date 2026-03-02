import { motion } from "framer-motion";
import hero from "../assets/images/hero-bg.png";
import Navbar from "./common/Navbar";
import { useAboutPage } from "../hooks/useAboutPage";

export default function HeroSection() {
  const { aboutData } = useAboutPage();
  const heroImage = aboutData?.heroSection?.image || hero;

  return (
    <section
      className="relative h-[280px] md:h-[260px] lg:h-[300px] w-full bg-cover bg-center overflow-hidden rounded-b-[30px] md:rounded-b-[40px]"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/50"></div>

      <div className="relative z-20">
        <Navbar variant="transparent" />
      </div>

      {/* Content positioned below navbar */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-28 md:pt-24 lg:pt-28 pb-8"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block mb-2 md:mb-4"
        >
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70 font-bold">
            WHO WE ARE
          </span>
          <div className="h-[2px] w-10 bg-[#87BBD7] mt-1" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight"
        >
          About Us
        </motion.h1>
      </motion.div>
    </section>
  );
}