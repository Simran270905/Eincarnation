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
    w-full bg-transparent border-b border-white/60 py-3
    text-white placeholder:text-white/70 placeholder:uppercase
    placeholder:text-[10px] sm:placeholder:text-xs tracking-widest
    outline-none focus:border-white transition-colors
  `;

  return (
    <div className="w-full bg-[#3451A3] text-white p-6 sm:p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 md:mb-12 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
            Let's Talk
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-md mx-auto md:mx-0 leading-snug">
            Got something on your mind? Fill out the form and we will get back to you.
          </p>
        </header>

        {/* Form Section */}
        <form className="space-y-8 md:space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-8">
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
              placeholder="Email"
              className={inputClasses}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className={inputClasses}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="Select City"
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
              placeholder="Select Industry"
              className={inputClasses}
              onChange={handleChange}
            />
            <input
              type="text"
              name="services"
              placeholder="Services You Are Looking For"
              className={inputClasses}
              onChange={handleChange}
            />
          </div>

          {/* Footer Section */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8 pt-2 sm:pt-4">
            <div className="w-full md:w-5/12">
              <textarea
                name="comment"
                placeholder="WRITE YOUR COMMENT"
                rows="4"
                className="w-full bg-transparent border border-white/60 rounded-xl p-4 text-white placeholder:text-white/70 outline-none focus:border-white text-sm sm:text-base transition-colors"
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#87BBD7] text-slate-900 px-8 sm:px-10 py-3 rounded-full font-bold flex items-center gap-2 sm:gap-3 hover:bg-[#A9D1E0] transition-all uppercase text-sm sm:text-base tracking-widest self-start md:self-auto"
            >
              Submit <span className="text-xl">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
