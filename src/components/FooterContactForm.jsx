import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useContactForm } from "../hooks/useContactForm";
import { contactFormSchema } from "../utils/formValidation";
import Input from "./forms/Input";
import Textarea from "./forms/Textarea";
import Toast from "./common/Toast";

const FooterContactForm = () => {
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
    <div className="w-full bg-[#1A0185] text-white py-16 px-6 md:px-20">
      {showToast && submitStatus && (
        <Toast
          type={submitStatus.type}
          message={submitStatus.message}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Let's Talk</h2>
          <p className="text-white/80 text-lg">Quick inquiry? Drop us a message below.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="name"
              placeholder="NAME"
              variant="default"
              register={register}
              error={errors.name?.message}
              required
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
              name="companyName"
              placeholder="COMPANY NAME (Optional)"
              variant="default"
              register={register}
              error={errors.companyName?.message}
            />
          </div>

          <Textarea
            name="message"
            placeholder="YOUR MESSAGE"
            rows={4}
            variant="default"
            register={register}
            error={errors.message?.message}
            required
          />

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
              onExpired={handleCaptchaExpired}
              theme="light"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#87BBD7] text-[#1A2E63] px-12 py-4 rounded-full font-black hover:bg-white hover:shadow-2xl transition-all duration-300 uppercase text-sm tracking-wider ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0px 1000px #1A0185 inset !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
      `}} />
    </div>
  );
};

export default FooterContactForm;
