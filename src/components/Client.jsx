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
   FLOATING LOGO COMPONENT
============================ */
const FloatingLogo = ({ logo, radius, offset, duration, size, isMobile }) => {
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
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      className="absolute top-1/2 right-0 z-20"
    >
      <div className="w-full h-full rounded-full bg-white shadow-xl flex items-center justify-center p-3 sm:p-6 border-2 border-white">
        <img
          src={logo}
          alt="client"
          className="w-full h-full object-contain opacity-100 transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

/* ============================
   SEMI ORBIT COMPONENT
============================ */
const SemiOrbit = ({ logos, radius, size, duration, isMobile }) => {
  return (
    <>
      <div 
        className="absolute top-1/2 right-0 border-2 border-dashed border-gray-300 rounded-full -translate-y-1/2 opacity-0"
        style={{
          width: radius * 2,
          height: radius * 2,
          marginRight: -radius, 
        }}
      />
      {logos.map((logo, i) => (
        <FloatingLogo
          key={`${logo}-${i}`}
          logo={logo}
          radius={radius}
          size={size}
          duration={duration}
          isMobile={isMobile}
          offset={(180 / logos.length) * i}
        />
      ))}
    </>
  );
};

/* ============================
   MAIN CLIENTS SECTION
============================ */
export default function Clients() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const outerRadius = isMobile ? 220 : 550;
  const innerRadius = isMobile ? 140 : 350;
  const outerSize = isMobile ? 70 : 150; 
  const innerSize = isMobile ? 55 : 120;

  return (
    <section className="relative py-20 sm:py-32 px-6 sm:px-12 md:px-24 lg:px-32 flex flex-col md:flex-row items-center justify-center min-h-[600px] md:min-h-[800px] bg-[#fcfcfb] overflow-hidden">
      
      {/* LEFT CONTENT WRAPPER */}
      <div className="max-w-6xl w-full mx-auto z-30 flex items-center">
        <motion.div
          className="w-full md:w-1/2 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          viewport={{ once: true }}
        >
          <h4 className="text-[#060C0C] font-bold text-[10px] tracking-[0.4em] uppercase opacity-50 mb-4">
            TRUSTED PARTNERS
          </h4>

          <h1 className="text-[#1A0185] text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
            Our Clients
          </h1>

          <p className="text-[#060C0C]/60 leading-relaxed text-base sm:text-lg max-w-sm">
            Reliable recycling services that reduce waste and turn materials into reusable resources.
          </p>
        </motion.div>
      </div>

      {/* ORBITAL ANIMATION LAYER */}
      <div className="absolute top-0 right-0 h-full w-full pointer-events-none z-10">
        <SemiOrbit
          logos={clients}
          radius={outerRadius}
          size={outerSize}
          duration={30}
          isMobile={isMobile}
        />
        <SemiOrbit
          logos={clients.slice(0, 4)}
          radius={innerRadius}
          size={innerSize}
          duration={20}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
}