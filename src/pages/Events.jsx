import React from "react";
import SEO from "../components/SEO";
import { BreadcrumbSchema } from "../components/StructuredData";
import Navbar from "../components/common/Navbar";
import ScrollSection from "../components/common/ScrollSection";
import EventsSection from "../components/EventsSection";
import EventsCarousel from "../components/EventsCarousel";  
import Footer from "../components/Footer";

export default function Events() {
  return (
    <>
      <SEO 
        title="Events & Workshops - E-Waste Awareness Programs | E-Incarnation"
        description="Join our e-waste awareness workshops, community recycling drives, and corporate training programs. Learn about sustainable electronics disposal and environmental responsibility."
        keywords="e-waste events, recycling workshops, awareness programs, community drives, corporate training, environmental education"
        canonical="/events"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' }
      ]} />
      <div className="w-full font-sans bg-[#f3f0e6] min-h-screen overflow-hidden">
      {/* Navbar stays static */}
      <Navbar variant="main" />
      
      <ScrollSection delay={0.2}>
        <EventsSection />
      </ScrollSection>
      
      <ScrollSection delay={0.3}>
        <EventsCarousel />
      </ScrollSection>  
      
      <ScrollSection delay={0.4}>
        <Footer />
      </ScrollSection>
    </div>
    </>
  );
}
