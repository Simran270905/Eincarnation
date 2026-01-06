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
const FloatingLogo = ({ logo, radius, offset, duration, size, isMobile }) => {
  const progress = useMotionValue(0);

  const desktopAngle = useTransform(
    progress,
    (v) => ((v + offset) % 180) - 90
  );

  const mobileAngle = useTransform(
    progress,
    (v) => (v + offset) % 180
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
      <div className="w-full h-full rounded-full bg-white shadow-xl flex items-center justify-center p-3 sm:p-6 border-2 border-white">
        <img
          src={logo}
          alt="client"
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

/* ============================
   SEMI ORBIT
============================ */
const SemiOrbit = ({ logos, radius, size, duration, isMobile }) => (
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
        offset={(180 / logos.length) * i}
      />
    ))}
  </>
);

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

  /* Radii & sizes */
  const outerRadius = isMobile ? 180 : 500;
  const innerRadius = isMobile ? 120 : 300;

  const outerSize = isMobile ? 60 : 150;
  const innerSize = isMobile ? 45 : 120;

  return (
    <section
      className={`relative py-12 sm:py-20 px-6 sm:px-10 md:px-20 lg:px-32 flex flex-col md:flex-row items-center
                  min-h-[500px] sm:min-h-[600px] md:min-h-[800px] bg-[#fcfcfb] overflow-hidden`}
    >
      {/* LEFT CONTENT */}
      <div className="w-full md:w-1/2 z-30 mb-8 md:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          viewport={{ once: true }}
        >
          <h4 className="text-[#060C0C] font-semibold text-[10px] sm:text-sm tracking-[0.15em] mb-1 uppercase opacity-70">
            MEET
          </h4>

          <h1 className="font-bold text-[#1A0185] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-3 sm:mb-4">
            Our Client
          </h1>

          <p className="text-[#060C0C] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed max-w-[460px]">
            Reliable recycling partnerships that transform waste into value
            while supporting sustainable industrial growth.
          </p>
        </motion.div>
      </div>

      {/* ORBITS */}
      <div className="absolute inset-0 pointer-events-none z-10">
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
