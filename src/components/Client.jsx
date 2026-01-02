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
const FloatingLogo = ({ logo, radius, offset, duration, size }) => {
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
  }, [duration]);

  return (
    <motion.div
      style={{
        x,
        y,
        width: size,
        height: size,
        originX: 0.5,
        originY: 0.5,
      }}
      className="absolute top-1/2 right-0 -translate-y-1/2"
    >
      <div className="w-full h-full rounded-full bg-white shadow-xl flex items-center justify-center p-4">
        <img
          src={logo}
          alt="client"
          className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

/* ============================
   SEMI ORBIT
============================ */
const SemiOrbit = ({ logos, radius, size, duration }) => {
  return (
    <>
      {logos.map((logo, i) => (
        <FloatingLogo
          key={`${logo}-${i}`}
          logo={logo}
          radius={radius}
          size={size}
          duration={duration}
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
  // Radii for different breakpoints
  const outerRadiusDesktop = 300;
  const innerRadiusDesktop = 190;

  const outerRadiusMobile = 180; // Shrinks for mobile
  const innerRadiusMobile = 120;

  // Logo sizes remain the same for desktop
  const outerSize = 96;
  const innerSize = 80;

  // Detect screen width (for small vs desktop)
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const outerRadius = isMobile ? outerRadiusMobile : outerRadiusDesktop;
  const innerRadius = isMobile ? innerRadiusMobile : innerRadiusDesktop;

  return (
    <section className="relative pt-24 px-4 sm:px-10 md:px-32 flex flex-col md:flex-row items-start min-h-[700px] sm:min-h-[750px] md:min-h-[850px] bg-gradient-to-br from-[#f8f9fa] to-[#f3f3f1] overflow-hidden">
      
      {/* LEFT CONTENT */}
      <motion.div
        className="z-20 max-w-md md:max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h4 className="text-[#060C0C] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">
          MEET
        </h4>
        <h1 className="font-bold text-[#1A0185] text-2xl sm:text-3xl md:text-5xl mb-4 leading-snug sm:leading-tight">
          Our Clients
        </h1>
        <p className="text-[#060C0C] mb-6 leading-relaxed text-sm sm:text-base">
          Reliable recycling services that reduce waste and turn materials
          into reusable resources.
        </p>
      </motion.div>

      {/* EXTREME RIGHT – SEMI ORBITS */}
      <div className="absolute top-0 right-0 h-full w-[80vw] max-w-[720px] overflow-hidden pointer-events-none z-10">
        {/* OUTER ARC */}
        <SemiOrbit
          logos={clients}
          radius={outerRadius}
          size={outerSize}
          duration={20}
        />

        {/* INNER ARC */}
        <SemiOrbit
          logos={clients.slice(0, 4)}
          radius={innerRadius}
          size={innerSize}
          duration={14}
        />
      </div>

      {/* RESPONSIVE BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 sm:right-20 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-r from-[#1A0185]/5 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-20 left-10 sm:left-20 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-r from-[#1A0185]/10 to-transparent rounded-full blur-lg" />
      </div>
    </section>
  );
}
