import React from "react";
import { motion } from "framer-motion";

import SectionHero from "../components/SectionHero";
import ServicesSection from "../components/ServicesSection";
import ContactForm from "../components/ContactForm";
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
