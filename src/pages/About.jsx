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
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
    viewport={{ once: true, amount: 0.3 }}
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

      <ScrollSection delay={0.1}>
        <AboutIntro />
      </ScrollSection>

      <ScrollSection delay={0.2}>
        <History />
      </ScrollSection>

      <ScrollSection delay={0.3}>
        <CoreTeam />
      </ScrollSection>

      <ScrollSection delay={0.4}>
        <Certificates />
      </ScrollSection>

      <ScrollSection delay={0.5}>
        <ContactForm />
      </ScrollSection>

      <ScrollSection delay={0.6}>
        <Footer />
      </ScrollSection>
    </div>
  );
}
