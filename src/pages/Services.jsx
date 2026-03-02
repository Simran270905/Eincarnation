import React from "react";
import SEO from "../components/SEO";
import { BreadcrumbSchema, ServiceSchema } from "../components/StructuredData";
import ScrollSection from "../components/common/ScrollSection";
import SectionHero from "../components/SectionHero";
import ServicesSection from "../components/ServicesSection";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
export default function Services() {
  return (
    <>
      <SEO 
        title="Our Services - E-Waste Recycling & IT Asset Disposal | E-Incarnation"
        description="Comprehensive e-waste management services including EPR compliance, ITAD, secure data destruction, battery recycling, and corporate waste solutions. Certified and environmentally responsible."
        keywords="e-waste services, EPR compliance India, ITAD services, data destruction, battery recycling, corporate waste management, electronics disposal"
        canonical="/services"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' }
      ]} />
      <ServiceSchema service={{
        title: 'E-Waste Recycling Services',
        description: 'Professional e-waste recycling, EPR compliance, and IT asset disposition services'
      }} />
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
    </>
  );
}
