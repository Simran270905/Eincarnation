import React from "react";

const teamData = [
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
    title: "Heading",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export default function CoreTeam() {
  return (
    <section className="bg-[#F9F9F9] py-28 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* HEADER */}
        <div className="mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-black mb-2">
            ABOUT
          </p>
          <h1 className="text-[52px] font-bold text-[#1A0185] leading-tight">
            Our Core Team
          </h1>
        </div>

        {/* CONTENT */}
        <div className="space-y-36">
          {teamData.map((item, index) => {
            if (item.type === "member") {
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-start gap-20 ${
                    item.reverse ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* PROFILE CIRCLE (unchanged color) */}
                  <div className="w-full md:w-2/5 flex justify-center">
                    <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-full bg-[#EEEBD9]" />
                  </div>

                  {/* TEXT */}
                  <div className="w-full md:w-3/5">
                    <h3 className="text-2xl font-bold text-[#2d3e50] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                      {item.role}
                    </p>
                    <p className="text-[15px] leading-relaxed text-gray-700 text-justify max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            }

            {/* FEATURE BLOCK */}
            return (
              <div key={index} className="pt-20">
                <div className="w-full h-[260px] bg-[#EEEBD9] rounded-[2.5rem] mb-14" />
                <div className="max-w-4xl">
                  <h2 className="text-[52px] font-sembold text-[#1e1494] mb-4">
                    {item.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-gray-700">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
