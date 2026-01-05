import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// Logos
import logo1 from "../assets/images/logo1.png";
import logo2 from "../assets/images/logo2.png";
import logo3 from "../assets/images/logo3.png";
import logo4 from "../assets/images/logo4.png";
import logo5 from "../assets/images/logo5.png";
import logo6 from "../assets/images/logo6.png";

const clients = [logo1, logo2, logo3, logo4, logo5, logo6];

/* ============================
   FLOATING LOGO
============================ */
const FloatingLogo = ({ logo, radius, offset, duration, size, opacity = 1 }) => {
  const progress = useMotionValue(0);

  const angle = useTransform(progress, (v) => ((v + offset) % 180) - 90);
  const x = useTransform(angle, (a) => -radius * Math.cos((a * Math.PI) / 180));
  const y = useTransform(angle, (a) => radius * Math.sin((a * Math.PI) / 180));

  React.useEffect(() => {
    const controls = animate(progress, 360, {
      duration,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [duration, progress]);

  return (
    <motion.div
      style={{
        x,
        y,
        width: size,
        height: size,
        originX: 0.5,
        originY: 0.5,
        opacity,
      }}
      className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-auto"
    >
      <div className="w-full h-full rounded-full bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/50 flex items-center justify-center p-3 sm:p-4 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:border-[#1A0185]/20">
        <img
          src={logo}
          alt="client"
          className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

/* ============================
   SEMI ORBIT
============================ */
const SemiOrbit = ({ logos, radius, size, duration, opacity }) => {
  return (
    <>
      {logos.map((logo, i) => (
        <FloatingLogo
          key={`${logo}-${i}`}
          logo={logo}
          radius={radius}
          size={size}
          duration={duration}
          opacity={opacity}
          offset={(180 / logos.length) * i}
        />
      ))}
    </>
  );
};

/* ============================
   MAIN SECTION
============================ */
export default function Clients() {
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1280;

  /**
   * RADIUS LOGIC
   * We increased the gap between outer and inner radii here.
   * Desktop Gap: 160px | Mobile Gap: 80px
   */
  const outerRadius = isMobile ? 180 : isTablet ? 280 : 380;
  const innerRadius = isMobile ? 100 : isTablet ? 140 : 220;
  
  const outerSize = isMobile ? 55 : 96;
  const innerSize = isMobile ? 45 : 75;

  return (
    <section className="relative py-24 px-6 sm:px-12 md:px-24 lg:px-32 flex flex-col md:flex-row items-center md:items-start min-h-[650px] md:min-h-[850px] bg-[#fcfcfb] overflow-hidden">
      
      {/* LEFT CONTENT */}
      <motion.div
        className="z-30 w-full md:w-1/2 mt-10 md:mt-32 text-center md:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        viewport={{ once: true }}
      >
        <h4 className="text-[#060C0C] font-bold text-[10px] tracking-[0.4em] uppercase opacity-50 mb-4">
          TRUSTED PARTNERS
        </h4>

        <h1 className="font-black text-[#1A0185] text-4xl sm:text-5xl lg:text-7xl mb-6 leading-[1.1]">
          Our Clients
        </h1>

        <p className="text-[#060C0C]/60 mb-10 leading-relaxed text-base sm:text-lg max-w-sm mx-auto md:mx-0">
          We collaborate with forward-thinking organizations to build 
          a sustainable circular economy together.
        </p>
      </motion.div>

      {/* ORBITAL AREA */}
      <div className="absolute top-0 right-0 h-full w-[100vw] md:w-[65vw] max-w-[1200px] overflow-hidden pointer-events-none z-10">
        {/* OUTER ARC (Primary Orbit) */}
        <SemiOrbit
          logos={clients}
          radius={outerRadius}
          size={outerSize}
          duration={30} // Slower for premium feel
          opacity={1}
        />

        {/* INNER ARC (Secondary Orbit - Faded for Depth) */}
        <SemiOrbit
          logos={clients.slice(0, 4)}
          radius={innerRadius}
          size={innerSize}
          duration={22}
          opacity={0.6}
        />
      </div>

      {/* BACKGROUND DEPTH ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft orbit guide lines */}
        <div 
          className="absolute top-1/2 right-0 -translate-y-1/2 border border-[#1A0185]/5 rounded-full"
          style={{ width: outerRadius * 2, height: outerRadius * 2, transform: `translate(50%, -50%)` }}
        />
        <div 
          className="absolute top-1/2 right-0 -translate-y-1/2 border border-[#1A0185]/5 rounded-full"
          style={{ width: innerRadius * 2, height: innerRadius * 2, transform: `translate(50%, -50%)` }}
        />
        
        {/* Gradient Glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#1A0185]/5 to-transparent rounded-full blur-[100px]" />
      </div>
    </section>
  );
}