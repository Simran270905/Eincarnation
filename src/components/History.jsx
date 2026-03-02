import { motion } from "framer-motion";
import historyMain from "../assets/images/history-main.png";
import historyOverlay from "../assets/images/history-overlay.png";
import { useAboutPage } from "../hooks/useAboutPage";

export default function OurHistory() {
  const { aboutData, loading } = useAboutPage();

  const historyData = aboutData?.history || {
    title: "Our History",
    description: "Founded with a vision to transform India's e-waste management landscape, E-Incarnation has grown from a small operation to one of the country's leading authorized e-waste recyclers. Our journey reflects our commitment to environmental sustainability and responsible recycling practices.",
    image1: historyMain,
    image2: historyOverlay
  };

  if (loading) {
    return (
      <section className="bg-[#f5f4ed] py-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </section>
    );
  }

  return (
    <section className="bg-[#f5f4ed] py-24 overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-0">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col items-start order-2 md:order-1 lg:pl-4"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[20px] font-semibold text-black uppercase"
            >
              ABOUT
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-bold text-[#1A0185] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-tight mb-4 sm:mb-6"
            >
            {historyData.title}
          </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-[16px] leading-[1.8] text-gray-700 mb-10 max-w-[460px] text-justify md:text-left"
            >
              {historyData.description}
            </motion.p>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="group flex items-center gap-3 rounded-full bg-[#9bc9df] px-10 py-3 text-[15px] font-bold tracking-tight text-gray-900 transition-all hover:brightness-95 active:scale-95 shadow-sm"
            >
              KNOW MORE
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center order-1 md:order-2 py-12"
          >
            <div className="relative flex w-[320px] h-[350px] md:w-[480px] md:h-[520px] items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="w-[45%] h-[70%] overflow-hidden rounded-l-full z-10 shadow-[-10px_0px_30px_rgba(0,0,0,0.08)]"
              >
                <img
                  src={historyData.image1}
                  alt="History Main"
                  className="w-full h-full object-cover object-[22%_center] scale-[1.32]"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-[55%] h-full overflow-hidden rounded-r-full z-0 shadow-[10px_0px_30px_rgba(0,0,0,0.08)]"
              >
                <img
                  src={historyData.image2}
                  alt="History Overlay"
                  className="w-full h-full object-cover"
                />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
