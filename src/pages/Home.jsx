import React from "react";
import SEO from "../components/SEO";
import { OrganizationSchema } from "../components/StructuredData";
import Navbar from "../components/common/Navbar";
import ScrollSection from "../components/common/ScrollSection";
import HeroMain from "../components/HeroMain";
import AboutServicesSection from "../components/AboutServiceSection";
import ClientHybrid from "../components/ClientHybrid";
import Review from "../components/Review";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <SEO 
        title="E-Incarnation Recycling - Leading E-Waste Management & EPR Solutions in India"
        description="Transform your e-waste into environmental action. Professional EPR compliance, IT asset disposition, and certified electronics recycling services across India. Sustainable waste management solutions."
        keywords="e-waste recycling India, EPR compliance, IT asset disposition, ITAD services, electronics recycling, e-waste management, sustainable recycling, electronic waste disposal, IT equipment recycling"
        canonical="/"
      />
      <OrganizationSchema />
      <div className="w-full font-sans bg-[#f3f0e6] min-h-screen">
        <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar variant="main" />
      
      <main id="main-content" className="space-y-0">
        {/* Hero Section - No top spacing needed */}
        <ScrollSection>
          <HeroMain />
        </ScrollSection>

        {/* About & Services - Seamless connection to hero */}
        <ScrollSection delay={0.05}>
          <AboutServicesSection />
        </ScrollSection>

        {/* Client Logos - Consistent spacing */}
        <ScrollSection delay={0.1}>
          <ClientHybrid />
        </ScrollSection>

        {/* Testimonials - Balanced spacing */}
        <ScrollSection delay={0.1}>
          <Review />
        </ScrollSection>

        {/* Contact Form - Increased top spacing for separation */}
        <ScrollSection delay={0.1}>
          <ContactForm />
        </ScrollSection>

        {/* Footer - No extra spacing */}
        <ScrollSection>
          <Footer />
        </ScrollSection>
      </main>
    </div>
    </>
  );
}