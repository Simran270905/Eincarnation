import React from "react";
import { motion } from "framer-motion";

import SectionHero from "../components/SectionHero";
import ServicesSection from "../components/ServicesSection";
import ContactForm from "../components/ContactForm";
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
export default function Services() {
  return (
    <main className="w-full">
      <ScrollSection>
        <SectionHero />
      </ScrollSection>

      <ScrollSection delay={0.1}>
        <ServicesSection />
      </ScrollSection>

      <ScrollSection delay={0.2}>
        <ContactForm />
      </ScrollSection>

      <ScrollSection delay={0.3}>
        <Footer />
      </ScrollSection>
    </main>
  );
}
