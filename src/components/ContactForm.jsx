import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    orgName: "",
    industry: "",
    services: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = `
    w-full bg-transparent border-b border-white/40 py-4
    text-white placeholder:text-white/50 placeholder:uppercase
    placeholder:text-[10px] sm:placeholder:text-xs tracking-[0.2em]
    outline-none focus:border-white focus:border-b-2 transition-all duration-300
    text-sm sm:text-base
  `;

  return (
    <div className="w-full bg-[#3451A3] text-white py-16 px-6 sm:px-10 md:py-24 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 md:mb-20 text-center md:text-left">
          <div className="inline-block mb-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/60 font-bold">Get In Touch</span>
            <div className="h-[1px] w-12 bg-[#87BBD7] mt-1 mx-auto md:mx-0"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Let's Talk
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
            Got something on your mind? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </header>

        {/* Form Section */}
        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={inputClasses}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={inputClasses}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={inputClasses}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className={inputClasses}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className={inputClasses}
              onChange={handleChange}
            />
            <input
              type="text"
              name="orgName"
              placeholder="Organisation Name"
              className={inputClasses}
              onChange={handleChange}
            />
            <input
              type="text"
              name="industry"
              placeholder="Industry Type"
              className={inputClasses}
              onChange={handleChange}
            />
            <input
              type="text"
              name="services"
              placeholder="Services Needed"
              className={inputClasses}
              onChange={handleChange}
            />
          </div>

          {/* Footer Section */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-10 pt-6">
            <div className="w-full lg:w-7/12">
              <label className="text-[10px] tracking-[0.2em] text-white/50 uppercase font-bold mb-4 block">
                Your Message
              </label>
              <textarea
                name="comment"
                placeholder="HOW CAN WE HELP YOU?"
                rows="3"
                className="w-full bg-white/5 border border-white/20 rounded-2xl p-6 text-white placeholder:text-white/30 outline-none focus:border-[#87BBD7] focus:bg-white/10 text-sm sm:text-base transition-all duration-300 backdrop-blur-sm"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex items-center justify-center md:justify-end lg:pb-2">
              <button
                type="submit"
                className="group relative bg-[#87BBD7] text-[#1A2E63] px-12 py-5 rounded-full font-black flex items-center gap-4 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500 uppercase text-sm tracking-[0.15em] active:scale-95"
              >
                Submit Form 
                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;