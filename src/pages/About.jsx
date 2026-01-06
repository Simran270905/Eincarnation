import React from "react";
import { motion } from "framer-motion";

import Hero from "../components/Hero";
import AboutIntro from "../components/AboutIntro";
import History from "../components/History";
import CoreTeam from "../components/CoreTeam";
import Certificates from "../components/Certificates";
import ContactForm  from "../components/ContactForm";
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
export default function About() {
  return (
    <div className="w-full font-sans bg-[#f3f0e6] min-h-screen">
      <ScrollSection>
        <Hero />
      </ScrollSection>

      <ScrollSection delay={0.025}>
        <AboutIntro />
      </ScrollSection>

      <ScrollSection delay={0.05}>
        <History />
      </ScrollSection>

      <ScrollSection delay={0.075}>
        <CoreTeam />
      </ScrollSection>

      <ScrollSection delay={0.1}>
        <Certificates />
      </ScrollSection>

      <ScrollSection delay={0.125}>
        <ContactForm />
      </ScrollSection>

      <ScrollSection delay={0.150}>
        <Footer />
      </ScrollSection>
    </div>
  );
}
