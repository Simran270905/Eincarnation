import React from "react";
import { motion } from "framer-motion";

import NavbarMain from "../components/NavbarMain";
import HeroMain from "../components/HeroMain";
import AboutServicesSection from "../components/AboutServiceSection";
import Client from "../components/Client";
import Review from "../components/Review";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

// Reusable scroll animation wrapper
const ScrollSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut", delay }}
    viewport={{ once: true, amount: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="w-full font-sans bg-[#f3f0e6] min-h-screen overflow-hidden">
      {/* Navbar stays static */}
      <NavbarMain />

      <ScrollSection>
        <HeroMain />
      </ScrollSection>

      <ScrollSection delay={0.05}>
        <AboutServicesSection />
      </ScrollSection>

      <ScrollSection delay={0.05}>
        <Client />
      </ScrollSection>

      <ScrollSection delay={0.05}>
        <Review />
      </ScrollSection>

      <ScrollSection delay={0.125}>
        <ContactForm />
      </ScrollSection>

      <ScrollSection delay={0.05}>
        <Footer />
      </ScrollSection>
    </div>
  );
};
