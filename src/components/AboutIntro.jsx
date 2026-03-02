import { motion } from "framer-motion";
import hero from "../assets/images/hero-bg.png";
import recyclingImg from "../assets/images/recycling.png";
import { useAboutPage } from "../hooks/useAboutPage";

export default function AboutPage() {
  const { aboutData, loading } = useAboutPage();

  console.log('AboutIntro - aboutData:', aboutData);
  console.log('AboutIntro - intro section:', aboutData?.intro);

  const introData = {
    title: aboutData?.intro?.title || "Trusted Partner for Secure & Sustainable E-Waste Recycling",
    description1: aboutData?.intro?.description1 || "E-Incarnation Recycling Pvt. Ltd. is an authorized e-waste recycler providing secure, compliant, and sustainable recycling solutions across India. We ensure safe e-waste disposal with strong data security, regulatory compliance, full traceability, and zero landfill practices.",
    description2: aboutData?.intro?.description2 || "Our structured processes, certified data destruction, and circular economy approach help organizations reduce environmental impact while managing e-waste responsibly and transparently.",
    image: aboutData?.intro?.image || recyclingImg
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EBE8D7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#EBE8D7]">
      

      {/* --- INTRO SECTION --- */}
      <section className="px-6 py-16 md:px-12 lg:py-24">
        <div className="relative mx-auto max-w-7xl">
          {introData.image && (
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative z-0 h-[400px] w-full md:h-[520px] md:w-[45%]"
            >
              <img
                src={introData.image}
                alt="E-waste recycling facility"
                className="h-full w-full rounded-[45px] object-cover shadow-2xl"
              />
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative z-10 -mt-32 ml-auto w-full rounded-[30px] bg-[#F4F3EF] p-8 shadow-sm md:absolute md:right-0 md:top-1/2 md:mt-0 md:w-[70%] md:-translate-y-1/2 md:p-14 lg:p-20"
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-8 text-xl font-bold text-black md:text-2xl"
            >
              {introData.title}
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2"
            >
              <p className="text-[15px] text-black leading-relaxed">
                {introData.description1}
              </p>
              <p className="text-[15px] text-black leading-relaxed">
                {introData.description2}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-10 flex justify-end"
            >
              <button className="group flex items-center gap-3 rounded-[20px] bg-[#96C2DB] px-9 py-3 text-[14px] font-bold tracking-wide text-[#232f3e] transition-all hover:brightness-95 md:rounded-full">
                VIEW MORE
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
    );
}
