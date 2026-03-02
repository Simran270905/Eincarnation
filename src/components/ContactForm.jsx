import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useContactForm } from "../hooks/useContactForm";
import { contactFormSchema } from "../utils/formValidation";
import Input from "./forms/Input";
import Textarea from "./forms/Textarea";
import Toast from "./common/Toast";

const ContactForm = () => {
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
  } = useContactForm(contactFormSchema, 'footer_form');

  React.useEffect(() => {
    if (submitStatus) {
      setShowToast(true);
    }
  }, [submitStatus]);

  return (
    <div className="w-full bg-[#3451A3] text-white py-20 sm:py-24 md:py-28 lg:py-32 px-6 sm:px-12 md:px-20 lg:px-32">
      {showToast && submitStatus && (
        <Toast
          type={submitStatus.type}
          message={submitStatus.message}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="max-w-6xl text-left">
        <header className="mb-16 md:mb-20">
          <div className="inline-block mb-5">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/60 font-bold">Get In Touch</span>
            <div className="h-[1px] w-16 bg-[#87BBD7] mt-2"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
            Let's Talk
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl font-light leading-relaxed">
            Got something on your mind? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-14" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <Input
              name="name"
              placeholder="NAME"
              variant="default"
              register={register}
              error={errors.name?.message}
              required
            />
            <Input
              name="companyName"
              placeholder="COMPANY NAME"
              variant="default"
              register={register}
              error={errors.companyName?.message}
            />
            <Input
              name="email"
              type="email"
              placeholder="EMAIL"
              variant="default"
              register={register}
              error={errors.email?.message}
              required
            />
            <Input
              name="phone"
              type="tel"
              placeholder="PHONE NO."
              variant="default"
              register={register}
              error={errors.phone?.message}
              required
            />
            <Input
              name="city"
              placeholder="CITY"
              variant="default"
              register={register}
              error={errors.city?.message}
            />
            <Input
              name="state"
              placeholder="STATE"
              variant="default"
              register={register}
              error={errors.state?.message}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-10 pt-6">
            <Textarea
              name="message"
              placeholder="HOW CAN WE HELP YOU?"
              rows={2}
              variant="default"
              register={register}
              error={errors.message?.message}
              required
              label="Your Message"
              className="w-full lg:w-8/12"
            />

            <div className="flex items-center justify-start md:justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group bg-[#87BBD7] text-[#1A2E63] px-14 py-5 rounded-full font-black flex items-center gap-4 hover:bg-white hover:shadow-2xl transition-all duration-300 uppercase text-sm tracking-[0.15em] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Form'} 
                <span className="text-2xl transition-transform group-hover:translate-x-2 duration-300">→</span>
              </button>
            </div>
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center pt-6">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
              onExpired={handleCaptchaExpired}
              theme="light"
            />
          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0px 1000px #3451A3 inset !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
      `}} />
    </div>
  );
};

export default ContactForm;