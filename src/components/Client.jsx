import React from "react";
import { motion, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { useClients } from "../hooks/useClients";

// Fallback Logos
import logo1 from "../assets/images/logo1.png";
import logo2 from "../assets/images/logo2.png";
import logo3 from "../assets/images/logo3.png";
import logo4 from "../assets/images/logo4.png";
import logo5 from "../assets/images/logo5.png";
import logo6 from "../assets/images/logo6.png";

const fallbackClients = [logo1, logo2, logo3, logo4, logo5, logo6];

/* ============================
   FLOATING LOGO
============================ */
const FloatingLogo = ({ logo, radius, offset, duration, size, isMobile, scrollProgress }) => {
  const progress = useMotionValue(0);

  const desktopAngle = useTransform(
    progress,
    (v) => ((v + offset) % 180) - 90
  );

  const mobileAngle = useTransform(
    progress,
    (v) => (v + offset) % 360 
  );

  const x = useTransform(isMobile ? mobileAngle : desktopAngle, (a) =>
    isMobile
      ? radius * Math.cos((a * Math.PI) / 180)
      : -radius * Math.cos((a * Math.PI) / 180)
  );

  const y = useTransform(isMobile ? mobileAngle : desktopAngle, (a) =>
    isMobile
      ? -radius * Math.sin((a * Math.PI) / 180)
      : radius * Math.sin((a * Math.PI) / 180)
  );

  React.useEffect(() => {
    const controls = animate(progress, 360, {
      duration,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [duration, progress]);

  // Add scroll-based rotation
  React.useEffect(() => {
    if (scrollProgress) {
      const unsubscribe = scrollProgress.onChange((latest) => {
        progress.set(progress.get() + latest * 2);
      });
      return unsubscribe;
    }
  }, [scrollProgress, progress]);

  return (
    <motion.div
      className={`absolute z-20 ${
        isMobile ? "bottom-0 left-1/2" : "top-1/2 right-0"
      }`}
      style={{
        x,
        y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl flex items-center justify-center p-3 sm:p-6 border-2 border-white/80 transition-all duration-500 hover:scale-110 hover:border-[#87BBD7]/30">
        <img
          src={logo}
          alt="Client company logo"
          className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
          loading="lazy"
          decoding="async"
        />
      </div>
    </motion.div>
  );
};

/* ============================
   SEMI ORBIT
============================ */
const SemiOrbit = ({ logos, radius, size, duration, isMobile, scrollProgress }) => (
  <>
    <div
      className={`absolute rounded-full opacity-0 ${
        isMobile
          ? "bottom-0 left-1/2 -translate-x-1/2"
          : "top-1/2 right-0 -translate-y-1/2"
      }`}
      style={{
        width: radius * 2,
        height: radius * 2,
        marginRight: isMobile ? 0 : -radius,
      }}
    />

    {logos.map((logo, i) => (
      <FloatingLogo
        key={i}
        logo={logo}
        radius={radius}
        size={size}
        duration={duration}
        isMobile={isMobile}
        scrollProgress={scrollProgress}
        offset={( (isMobile ? 360 : 180) / logos.length) * i}
      />
    ))}
  </>
);

/* ============================
   MAIN CLIENTS SECTION
============================ */
export default function Clients() {
  const [isMobile, setIsMobile] = React.useState(false);
  const { clients: backendClients, loading } = useClients();
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Use backend data if available, otherwise use fallback
  const clientLogos = backendClients.length > 0 
    ? backendClients.map(client => client.logo)
    : fallbackClients;

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const outerRadius = isMobile ? 155 : 520;
  const innerRadius = isMobile ? 80 : 280;

  const outerSize = isMobile ? 80 : 160;
  const innerSize = isMobile ? 65 : 130;

  return (
    <section
      ref={containerRef}
      className={`relative px-6 sm:px-10 md:px-20 lg:px-32 py-16 md:py-20 flex flex-col md:flex-row items-center
                  min-h-[580px] md:min-h-[700px] bg-gradient-to-b from-[#fcfcfb] to-[#f8f8f6] overflow-hidden`}
    >
      {/* LEFT CONTENT - Forced left alignment for all views */}
      <div className="w-full md:w-1/2 z-30 mb-0 md:mb-0 text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          viewport={{ once: true }}
        >
          <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#060C0C] font-semibold text-[10px] sm:text-sm tracking-[0.2em] mb-2 uppercase"
          >
            MEET
          </motion.h4>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1A0185] to-[#3d1fb5] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
          >
            Our Clients
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-[#060C0C]/80 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed max-w-[460px]"
          >
            Reliable recycling partnerships that transform waste into value
            while supporting sustainable industrial growth.
          </motion.p>
        </motion.div>
      </div>

      {/* ORBITS */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-[#1A0185]"></div>
          </div>
        ) : (
          <>
            <SemiOrbit
              logos={clientLogos}
              radius={outerRadius}
              size={outerSize}
              duration={isMobile ? 20 : 40}
              isMobile={isMobile}
              scrollProgress={scrollYProgress}
            />
            <SemiOrbit
              logos={clientLogos.slice(0, Math.min(5, clientLogos.length))}
              radius={innerRadius}
              size={innerSize}
              duration={isMobile ? 15 : 28}
              isMobile={isMobile}
              scrollProgress={scrollYProgress}
            />
          </>
        )}
      </div>
    </section>
  );
}