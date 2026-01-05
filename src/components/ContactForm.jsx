import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    city: "", orgName: "", industry: "", services: "", comment: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputClasses = `
    w-full bg-transparent border-b border-white/40 py-4
    text-white placeholder:text-white/50 placeholder:uppercase
    placeholder:text-[10px] sm:placeholder:text-xs tracking-[0.2em]
    outline-none focus:border-white focus:border-b-2 transition-all duration-300
    text-sm sm:text-base appearance-none
  `;

  return (
    // Unified padding to match your Clients section exactly
    <div className="w-full bg-[#3451A3] text-white py-24 px-6 sm:px-12 md:px-20 lg:px-32">
      {/* Removed mx-auto to keep the container anchored to the left */}
      <div className="max-w-6xl text-left">
        
        <header className="mb-12 md:mb-20">
          <div className="inline-block mb-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/60 font-bold">Get In Touch</span>
            <div className="h-[1px] w-12 bg-[#87BBD7] mt-1"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Let's Talk
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-lg font-light leading-relaxed">
            Got something on your mind? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </header>

        <form className="space-y-12" autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {Object.keys(formData).filter(k => k !== 'comment').map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                autoComplete="new-password"
                placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                className={inputClasses}
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-10 pt-6">
            <div className="w-full lg:w-8/12">
              <label className="text-[10px] tracking-[0.2em] text-white/50 uppercase font-bold mb-2 block text-left">
                Your Message
              </label>
              <textarea
                name="comment"
                placeholder="HOW CAN WE HELP YOU?"
                rows="2"
                className="w-full bg-transparent border-b border-white/40 py-2 text-white placeholder:text-white/30 outline-none focus:border-white focus:border-b-2 text-sm sm:text-base transition-all duration-300 resize-none"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Left-aligning the button on mobile, keeping right-align on large screens */}
            <div className="flex items-center justify-start md:justify-end">
              <button
                type="submit"
                className="group bg-[#87BBD7] text-[#1A2E63] px-12 py-5 rounded-full font-black flex items-center gap-4 hover:bg-white transition-all duration-500 uppercase text-sm tracking-[0.15em]"
              >
                Submit Form <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
              </button>
            </div>
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