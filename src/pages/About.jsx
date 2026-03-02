import React from "react";
import SEO from "../components/SEO";
import { BreadcrumbSchema } from "../components/StructuredData";
import ScrollSection from "../components/common/ScrollSection";
import Hero from "../components/Hero";
import AboutIntro from "../components/AboutIntro";
import History from "../components/History";
import CoreTeam from "../components/CoreTeam";
import Certificates from "../components/Certificates";
import ContactForm  from "../components/ContactForm";
import Footer from "../components/Footer";
export default function About() {
  return (
    <>
      <SEO 
        title="About Us - E-Incarnation Recycling | Our Mission & Values"
        description="Learn about E-Incarnation's journey in sustainable e-waste management. Meet our expert team, discover our certifications, and understand our commitment to environmental responsibility."
        keywords="about e-incarnation, e-waste company history, recycling team, environmental certifications, sustainable practices, company values"
        canonical="/about"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' }
      ]} />
      <div className="w-full font-sans bg-[#f3f0e6] min-h-screen">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <ScrollSection>
        <Hero />
      </ScrollSection>
      
      <main id="main-content">

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
      </main>
    </div>
    </>
  );
}
