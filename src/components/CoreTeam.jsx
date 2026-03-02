import React from "react";
import { motion } from "framer-motion";
import { useAboutPage } from "../hooks/useAboutPage";

const fallbackTeamData = [
  {
    type: "member",
    name: "Shamsuddin Khan",
    role: "Director – E-Incarnation Recycling Pvt. Ltd.",
    description:
      "Mr. Shamsuddin Khan is the Director of E-Incarnation Recycling Pvt. Ltd., with over 12 years of experience in the Information Technology (IT) sector. He holds a Bachelor of Arts (B.A.) degree and brings strong hands-on industry exposure and leadership experience. With deep expertise in IT systems, technology lifecycle management, and operational efficiency, he plays a key role in shaping the company's strategic vision and operations. His leadership drives ethical recycling, data security, environmental compliance, and circular economy initiatives, strengthening the organization's commitment to innovation and long-term sustainability.",
    reverse: false,
  },
  {
    type: "member",
    name: "Amruta Babar",
    role: "Chief Operating Officer (COO) – E-Incarnation Recycling Pvt. Ltd.",
    description:
      "Ms. Amruta Babar is the Chief Operating Officer (COO) of E-Incarnation Recycling Pvt. Ltd. She holds a B.Sc. in Botany and a Master's degree in Environment from Griffith University, Queensland, bringing a strong academic foundation in environmental science. With over 15 years of experience in the e-waste recycling industry and 12 years with E-Incarnation, she has deep expertise in regulatory compliance, process optimization, and operational excellence.",
    reverse: true,
  },
  {
    type: "feature",
    title: "Our Commitment to Excellence",
    description:
      "Under the leadership of our experienced management team, E-Incarnation continues to set industry standards in e-waste recycling. We combine technical expertise with environmental consciousness to deliver sustainable solutions that benefit both our clients and the planet. Our team's dedication ensures every project meets the highest standards of quality, compliance, and environmental responsibility.",
  },
];

export default function CoreTeam() {
  const { aboutData, loading } = useAboutPage();

  // Use new team structure from backend, fallback to old structure if needed
  const teamData = aboutData?.team && aboutData.team.length > 0 
    ? aboutData.team 
    : fallbackTeamData;

  // Get landscape image data from backend
  const landscapeImage = aboutData?.landscapeImage;

  if (loading) {
    return (
      <section className="bg-[#F9F9F9] py-16 md:py-28 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </section>
    );
  }

  return (
    <section className="bg-[#F9F9F9] py-16 md:py-28 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20"
        >
          <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-black mb-2">
            ABOUT
          </p>
          <h1 className="text-4xl md:text-[52px] font-bold text-[#1A0185] leading-tight">
            Our Core Team
          </h1>
        </motion.div>

        {/* CONTENT */}
        <div className="space-y-20 md:space-y-36">
          {teamData.map((item, index) => {
            // Render landscape image before feature blocks
            if (item.type === "feature" && landscapeImage && landscapeImage.image) {
              return (
                <React.Fragment key={index}>
                  {/* LANDSCAPE IMAGE - Replaces beige placeholder */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-full h-[180px] sm:h-[260px] md:h-[320px] bg-[#EEEBD9] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
                      {landscapeImage.image && (
                        <img 
                          src={landscapeImage.image} 
                          alt={landscapeImage.title || "Team landscape"}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {(landscapeImage.title || landscapeImage.description) && (
                      <div className="max-w-4xl text-center md:text-left mx-auto md:mx-0 mt-6 md:mt-8">
                        {landscapeImage.title && (
                          <h2 className="text-3xl md:text-[52px] font-semibold text-[#1e1494] mb-4">
                            {landscapeImage.title}
                          </h2>
                        )}
                        {landscapeImage.description && (
                          <p className="text-sm md:text-[15px] leading-relaxed text-gray-700">
                            {landscapeImage.description}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                  
                  {/* FEATURE BLOCK - "Our Commitment to Excellence" */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="pt-10 md:pt-20"
                  >
                    <div className="max-w-4xl text-center md:text-left mx-auto md:mx-0">
                      <h2 className="text-3xl md:text-[52px] font-semibold text-[#1e1494] mb-4">
                        {item.title}
                      </h2>
                      <p className="text-sm md:text-[15px] leading-relaxed text-gray-700">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </React.Fragment>
              );
            }
            
            if (item.type === "member") {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20 ${
                    item.reverse ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* PROFILE CIRCLE */}
                  <div className="w-full md:w-2/5 flex justify-center">
                    <div className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-[#EEEBD9] flex-shrink-0 overflow-hidden">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className="w-full md:w-3/5 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-[#2d3e50] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 md:mb-6">
                      {item.role || item.position}
                    </p>
                    <p className="text-sm md:text-[15px] leading-relaxed text-gray-700 md:text-justify max-w-xl mx-auto md:mx-0">
                      {item.description || item.bio}
                    </p>
                  </div>
                </motion.div>
              );
            }

            {/* FEATURE BLOCK - Only if no landscape image */}
            if (item.type === "feature" && (!landscapeImage || !landscapeImage.image)) {
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="pt-10 md:pt-20"
                >
                  <div className="w-full h-[180px] sm:h-[260px] bg-[#EEEBD9] rounded-[1.5rem] md:rounded-[2.5rem] mb-8 md:mb-14" />
                  <div className="max-w-4xl text-center md:text-left mx-auto md:mx-0">
                    <h2 className="text-3xl md:text-[52px] font-semibold text-[#1e1494] mb-4">
                      {item.title}
                    </h2>
                    <p className="text-sm md:text-[15px] leading-relaxed text-gray-700">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            }
            
            return null;
          })}
        </div>


      </div>
    </section>
  );
}