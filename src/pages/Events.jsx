import React from "react";
import { motion } from "framer-motion";

import NavbarMain from "../components/NavbarMain";
import Award1 from "../components/award1.jsx";  
import Footer from "../components/Footer";

// Reusable scroll animation wrapper
const ScrollSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
    viewport={{ once: true, amount: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function Events() {
  return (
    <div className="w-full font-sans bg-[#f3f0e6] min-h-screen overflow-hidden">
      {/* Navbar stays static */}
      <NavbarMain />
      <ScrollSection delay={0.5}>
        <Award1 />
      </ScrollSection>  
      
      <ScrollSection delay={0.5}>
        <Footer />
      </ScrollSection>
    </div>
  );
};
