import React from "react";
import { motion } from "framer-motion";

import NavbarMain from "../components/NavbarMain";
import Events from "../components/Events.jsx";
import Award1 from "../components/Award1.jsx";  
import Footer from "../components/Footer";

// Reusable scroll animation wrapper
const ScrollSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }} // Reduced distance for "faster" look
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.4,           // Snappier duration
      ease: [0.22, 1, 0.36, 1], // Smooth Quintic Ease-out
      delay 
    }}
    viewport={{ 
      once: true, 
      amount: 0.15             // Triggers sooner as user scrolls
    }}
  >
    {children}
  </motion.div>
);
export default function events() {
  return (
    <div className="w-full font-sans bg-[#f3f0e6] min-h-screen overflow-hidden">
      {/* Navbar stays static */}
      <NavbarMain />
      
      <ScrollSection delay={0.3}>
        <Events />
      </ScrollSection>
      <ScrollSection delay={0.5}>
        <Award1 />
      </ScrollSection>  
      
      <ScrollSection delay={0.5}>
        <Footer />
      </ScrollSection>
    </div>
  );
};
