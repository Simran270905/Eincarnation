import React from "react";
import { Shield, FileCheck, Recycle, Award, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";
import { BreadcrumbSchema, ServiceSchema } from "../components/StructuredData";
import Navbar from "../components/common/Navbar";
import ScrollSection from "../components/common/ScrollSection";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import WhyChooseUsEPR from "../components/WhyChooseUsEPR";
import { useEprPage } from "../hooks/useEprPage";

export default function EPR() {
  const { eprData, loading } = useEprPage();
  
  const seoData = (
    <>
      <SEO 
        title="EPR Services - Extended Producer Responsibility Solutions | E-Incarnation"
        description="Complete EPR authorization, compliance reporting, and e-waste collection services. Meet your Extended Producer Responsibility obligations with certified recycling solutions."
        keywords="EPR services India, extended producer responsibility, EPR authorization, CPCB compliance, e-waste EPR, producer responsibility"
        canonical="/epr"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'EPR Services', path: '/epr' }
      ]} />
      <ServiceSchema service={{
        title: 'Extended Producer Responsibility (EPR) Services',
        description: 'Complete EPR authorization, compliance reporting, and certified recycling solutions for e-waste management'
      }} />
    </>
  );

  // Fallback data
  const fallbackEprServices = [
    {
      icon: <Shield size={32} />,
      title: "EPR Authorization",
      description: "Complete assistance in obtaining EPR authorization from Central Pollution Control Board (CPCB) for e-waste management."
    },
    {
      icon: <FileCheck size={32} />,
      title: "Compliance Reporting",
      description: "Regular documentation and submission of annual returns to ensure full regulatory compliance with e-waste management rules."
    },
    {
      icon: <Recycle size={32} />,
      title: "Collection & Recycling",
      description: "Pan-India collection network and certified recycling facilities to meet your Extended Producer Responsibility targets."
    },
    {
      icon: <Award size={32} />,
      title: "Certificate Management",
      description: "Timely issuance of EPR certificates, recycling certificates, and all compliance documentation for your records."
    },
  ];

  const fallbackComplianceSteps = [
    {
      step: "01",
      title: "Registration & Authorization",
      description: "We assist producers in registering with CPCB and obtaining EPR authorization for e-waste management."
    },
    {
      step: "02",
      title: "Target Allocation",
      description: "Help determine collection targets based on your product sales and ensure compliance with mandated percentages."
    },
    {
      step: "03",
      title: "Collection Network",
      description: "Establish pan-India collection points and reverse logistics for efficient e-waste collection from end-users."
    },
    {
      step: "04",
      title: "Certified Recycling",
      description: "Process collected e-waste at authorized facilities with environmentally sound recycling practices."
    },
    {
      step: "05",
      title: "Documentation & Reporting",
      description: "Maintain records, submit annual returns, and provide EPR certificates demonstrating compliance."
    },
  ];

  const fallbackBenefits = [
    "Full regulatory compliance with E-Waste Management Rules, 2016",
    "Reduced environmental liability and brand risk",
    "Cost-effective EPR solutions with transparent pricing",
    "Pan-India collection and recycling infrastructure",
    "Real-time tracking and reporting dashboard",
    "Timely submission of statutory returns and documentation",
  ];

  // Use backend data if available, otherwise use fallback
  const eprServices = eprData?.services?.sort((a, b) => (a.order || 0) - (b.order || 0)) || fallbackEprServices;
  const complianceSteps = eprData?.complianceSteps?.sort((a, b) => (a.order || 0) - (b.order || 0)) || fallbackComplianceSteps;
  const benefits = eprData?.benefits?.sort((a, b) => (a.order || 0) - (b.order || 0)).map(b => b.benefit) || fallbackBenefits;
  const coverage = eprData?.coverage?.sort((a, b) => (a.order || 0) - (b.order || 0)).map(c => c.item) || [
    "IT & Telecommunication Equipment",
    "Consumer Electronics",
    "Medical Equipment",
    "Electrical & Electronic Equipment",
    "LED & Compact Fluorescent Lamps",
  ];
  const heroData = eprData?.hero || {
    title: "Extended Producer\nResponsibility (EPR)",
    subtitle: "Comprehensive EPR solutions for electronics manufacturers, importers, and brand owners. We help you meet your environmental obligations while focusing on your core business."
  };
  const whatIsEpr = eprData?.whatIsEpr || {
    title: "What is EPR?",
    paragraphs: [
      "Extended Producer Responsibility (EPR) is an environmental policy approach where producers take responsibility for the entire lifecycle of their products, especially for take-back, recycling, and final disposal.",
      "Under the E-Waste Management Rules, 2016, every producer of electrical and electronic equipment (EEE) must obtain EPR authorization from the Central Pollution Control Board (CPCB) and meet collection and recycling targets.",
      "E-Incarnation helps you navigate these requirements with end-to-end EPR compliance services."
    ]
  };
  const brochureLink = eprData?.brochureLink || '';

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f3f0e6]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </div>
    );
  }

  return (
    <>
      {seoData}
      <div className="w-full font-sans bg-[#f3f0e6] min-h-screen">
        <Navbar variant="main" />

      {/* Hero Section */}
      <ScrollSection>
        <section className="pt-36 pb-16 px-6 sm:px-10 md:px-20 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="inline-block mb-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#060C0C]/70 font-bold">
                COMPLIANCE MADE EASY
              </span>
              <div className="h-[2px] w-12 bg-[#88BBD8] mt-1" />
            </div>
            
            <h1 className="font-bold text-[#1A0185] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
              {heroData.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < heroData.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            
            <p className="text-[#060C0C] text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
              {heroData.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                Get EPR Authorization <span>→</span>
              </Button>
              <a 
                href={brochureLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!brochureLink) {
                    e.preventDefault();
                    alert('Brochure link not available. Please contact admin.');
                  }
                }}
              >
                <Button variant="secondary" size="lg">
                  Download Brochure
                </Button>
              </a>
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* What is EPR Section */}
      <ScrollSection delay={0.1}>
        <section className="py-16 px-6 sm:px-10 md:px-20 lg:px-32 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-bold text-[#1A0185] text-3xl sm:text-4xl md:text-5xl mb-6">
                  {whatIsEpr.title}
                </h2>
                {whatIsEpr.paragraphs?.map((paragraph, idx) => (
                  <p key={idx} className="text-[#060C0C] text-base leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="bg-[#EBE8D7] rounded-[32px] p-8 md:p-12">
                <h3 className="font-bold text-[#1A0185] text-2xl mb-6">Coverage</h3>
                <ul className="space-y-3">
                  {coverage.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#88BBD8] flex-shrink-0 mt-1" />
                      <span className="text-[#060C0C]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* EPR Services Grid */}
      <ScrollSection delay={0.15}>
        <section className="py-16 px-6 sm:px-10 md:px-20 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-bold text-[#1A0185] text-3xl sm:text-4xl md:text-5xl mb-4">
                Our EPR Services
              </h2>
              <p className="text-[#060C0C] max-w-2xl mx-auto">
                Comprehensive support for all your EPR compliance needs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {eprServices.map((service, idx) => (
                <Card key={idx} padding="lg" rounded="2xl">
                  <div className="bg-[#1A0185] w-14 h-14 rounded-full mb-5 flex items-center justify-center text-white">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1A0185] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#060C0C] leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* Compliance Process */}
      <ScrollSection delay={0.2}>
        <section className="py-16 px-6 sm:px-10 md:px-20 lg:px-32 bg-[#EBE8D7]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-bold text-[#1A0185] text-3xl sm:text-4xl md:text-5xl mb-4">
                EPR Compliance Process
              </h2>
              <p className="text-[#060C0C] max-w-2xl mx-auto">
                Our streamlined five-step process ensures complete compliance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceSteps.map((item, idx) => (
                <Card key={idx} className="bg-white" padding="lg" rounded="2xl">
                  <div className="bg-[#88BBD8] text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#1A0185] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#060C0C] leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* Benefits Section */}
      <ScrollSection delay={0.25}>
        <section className="py-16 px-6 sm:px-10 md:px-20 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-bold text-[#1A0185] text-3xl sm:text-4xl md:text-5xl mb-6">
                  Why Choose Us for EPR?
                </h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={24} className="text-[#88BBD8] flex-shrink-0 mt-1" />
                      <span className="text-[#060C0C] text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="bg-[#1A0185] text-white" padding="xl" rounded="3xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Contact our EPR compliance team for a free consultation. 
                  We'll help you understand your obligations and create a customized compliance plan.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Shield size={20} />
                    </div>
                    <span>CPCB Authorized Recycler</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Award size={20} />
                    </div>
                    <span>ISO 9001 & 14001 Certified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Recycle size={20} />
                    </div>
                    <span>10+ Years Experience</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* Why Choose Us for EPR */}
      {eprData?.whyChooseUs && (
        <ScrollSection delay={0.25}>
          <WhyChooseUsEPR data={eprData.whyChooseUs} />
        </ScrollSection>
      )}

      {/* Contact Form */}
      <ScrollSection delay={0.3}>
        <ContactForm />
      </ScrollSection>

      {/* Footer */}
      <ScrollSection>
        <Footer />
      </ScrollSection>
    </div>
    </>
  );
};
