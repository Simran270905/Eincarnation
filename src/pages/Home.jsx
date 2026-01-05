import React from "react";
import { motion } from "framer-motion";

import NavbarMain from "../components/NavbarMain";
import HeroMain from "../components/HeroMain";
import AboutServicesSection from "../components/AboutServiceSection";
import Client from "../components/Client";
import Review from "../components/Review";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

// Optimized scroll animation wrapper
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

export default function Home() {
  return (
    <div className="w-full font-sans bg-[#f3f0e6] min-h-screen">
      <NavbarMain />

      <ScrollSection>
        <HeroMain />
      </ScrollSection>

      {/* Staggered delays create a professional sequence */}
      <ScrollSection delay={0.05}>
        <AboutServicesSection />
      </ScrollSection>

      <ScrollSection delay={0.1}>
        <Client />
      </ScrollSection>

      <ScrollSection delay={0.1}>
        <Review />
      </ScrollSection>

      <ScrollSection delay={0.1}>
        <ContactForm />
      </ScrollSection>

      <ScrollSection>
        <Footer />
      </ScrollSection>
    </div>
  );
}