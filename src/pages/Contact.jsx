import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { MapPin, Phone, Mail, UserCircle } from "lucide-react";
import SEO from "../components/SEO";
import { BreadcrumbSchema } from "../components/StructuredData";
import Navbar from "../components/common/Navbar";
import Footer from "../components/Footer";
import Input from "../components/forms/Input";
import Textarea from "../components/forms/Textarea";
import Toast from "../components/common/Toast";
import { useContactForm } from "../hooks/useContactForm";
import { useContactPage } from "../hooks/useContactPage";
import { contactPageFormSchema } from "../utils/formValidation";
import robot from "../assets/images/robot.png";

function ContactFormSection({ robot }) {
  const [showToast, setShowToast] = useState(false);
  const recaptchaRef = useRef(null);
  const { 
    register, 
    handleSubmit, 
    onSubmit, 
    errors, 
    isSubmitting, 
    submitStatus,
    handleCaptchaChange,
    handleCaptchaExpired 
  } = useContactForm(contactPageFormSchema);

  React.useEffect(() => {
    if (submitStatus) {
      setShowToast(true);
    }
  }, [submitStatus]);

  return (
    <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1 flex flex-col justify-between">
      {showToast && submitStatus && (
        <Toast
          type={submitStatus.type}
          message={submitStatus.message}
          onClose={() => setShowToast(false)}
        />
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>
        <Input
          name="name"
          placeholder="Name"
          variant="contact"
          register={register}
          error={errors.name?.message}
          required
        />
        <Input
          name="companyName"
          placeholder="Company Name"
          variant="contact"
          register={register}
          error={errors.companyName?.message}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          variant="contact"
          register={register}
          error={errors.email?.message}
          required
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Phone No."
          variant="contact"
          register={register}
          error={errors.phone?.message}
          required
        />
        <Input
          name="city"
          placeholder="Select City"
          variant="contact"
          register={register}
          error={errors.city?.message}
        />
        <Input
          name="state"
          placeholder="Select State"
          variant="contact"
          register={register}
          error={errors.state?.message}
        />

        <div className="md:col-span-2">
          <Textarea
            name="message"
            placeholder="Message"
            rows={5}
            variant="contact"
            register={register}
            error={errors.message?.message}
            required
          />
        </div>

        {/* reCAPTCHA */}
        <div className="md:col-span-2 flex justify-center md:justify-start">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            onExpired={handleCaptchaExpired}
            theme="light"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-fit bg-[#99c5df] hover:bg-[#88b5cf] text-[#2c3e50] font-bold text-xs py-4 px-12 rounded-full flex items-center justify-center gap-2 transition-all shadow-md group uppercase tracking-widest ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'} 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </form>

      <div className="mt-6 flex justify-center md:justify-start">
        <img src={robot} alt="Robot character" className="w-24 sm:w-32 md:w-48 object-contain opacity-90" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { contactPageData } = useContactPage();
  
  // Extract data with fallbacks - match backend field names
  const mapEmbedSrc = contactPageData?.googleMapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8123456789!2d72.9109548!3d19.0922584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce17c4670e57%3A0x3479728da0a0cf0f!2sE-Incarnation%20Recycling%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1234567890';
  const googleMapsUrl = contactPageData?.googleMapDirectUrl || 'https://maps.google.com/?cid=3781179314759847695';
  const heroSubtitle = contactPageData?.heroSubtitle || 'CONTACT US';
  const heroTitle = contactPageData?.heroTitle || 'Start a Conversation';
  const mainAddress = contactPageData?.mainAddress || 'Unit No. 103, 1st Floor, Bhaveshwar Arcade, A Wing, Lal Bahadur Shastri Marg, Mumbai, Maharashtra 400086.';
  const headOfficeAddress = contactPageData?.headOfficeAddress || '';
  
  return (
    <>
      <SEO 
        title="Contact Us - Get in Touch | E-Incarnation Recycling"
        description="Contact E-Incarnation for professional e-waste management solutions. Reach out for EPR compliance, IT asset disposal, or recycling inquiries. We're here to help."
        keywords="contact e-incarnation, e-waste inquiry, recycling quote, EPR consultation, IT disposal contact"
        canonical="/contact"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' }
      ]} />
      <section className="w-full bg-[#f1efe0] min-h-screen font-sans text-[#333] flex flex-col">
      
      {/* ================= HERO SECTION (MAP) ================= */}
      {/* Added id="map-section" so the Navbar link can scroll here */}
      <div id="map-section" className="relative h-[36vh] sm:h-[44vh] w-full overflow-hidden rounded-b-[30px] sm:rounded-b-[40px] shadow-lg">
        
        {/* Map iframe */}
        {mapEmbedSrc && mapEmbedSrc.trim() !== '' && (
          <iframe
            title="map"
            className="absolute inset-0 w-full h-full border-0 grayscale brightness-75"
            src={mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none z-0" />

        {/* Navbar on top - z-30 ensures it stays above the clickable map link */}
        <div className="absolute top-0 left-0 w-full z-30">
          <Navbar variant="transparent" />
        </div>

        {/* Clickable map link - z-10 covers the map but sits under the navbar */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Open location in Google Maps"
        />

        {/* Text over map */}
        <div className="relative z-20 max-w-7xl mx-auto h-full flex flex-col justify-end pb-8 sm:pb-14 px-4 sm:px-12 pointer-events-none">
          <p className="text-white text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2">
            {heroSubtitle}
          </p>
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            {heroTitle}
          </h1>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 pt-28 sm:pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 relative w-full">
        
        {/* LEFT: FORM + Robot */}
        <ContactFormSection robot={robot} />
        

        {/* RIGHT: INFO */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 order-1 lg:order-2 pb-0">
          {/* Main Address */}
          <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#5b7c56]">
              <MapPin size={22} strokeWidth={2.5} />
              <h3 className="font-bold text-lg text-gray-800">Address</h3>
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
              {mainAddress}
            </p>
            <div className="mt-6 space-y-4 text-gray-700">
              <div className="flex items-start gap-4">
                <Phone size={18} className="text-[#5b7c56] mt-1" />
                <div className="text-[13px] font-semibold">022 47494262 <br /> 9137287173</div>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={18} className="text-[#5b7c56]" />
                <span className="text-[13px] font-semibold">info@e-incarnation.com</span>
              </div>
            </div>
          </div>

          {/* Head Office Address (if set) */}
          {headOfficeAddress && headOfficeAddress.trim() !== '' && (
            <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4 text-[#5b7c56]">
                <MapPin size={22} strokeWidth={2.5} />
                <h3 className="font-bold text-lg text-gray-800">Head Office</h3>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                {headOfficeAddress}
              </p>
            </div>
          )}

          {/* Careers */}
          <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#5b7c56]">
              <UserCircle size={22} strokeWidth={2.5} />
              <h3 className="font-bold text-lg text-gray-800 uppercase">Careers</h3>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">Join our team and help us build a sustainable future.</p>
          </div>
        </div>
      </div>

      <Footer />
    </section>
    </>
  );
}