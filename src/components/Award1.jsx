import { motion } from "framer-motion";
import image1 from "../assets/images/events.png";
import image2 from "../assets/images/events.png";
import image3 from "../assets/images/events.png";

export default function ReversingGallery() {
  const images = [image1, image2, image3];

  return (
    <div className="w-full flex flex-col items-center py-10 bg-[#f4f2eb]">
      
      {/* Image Section with Background Card */}
      <div className="relative w-[90%] max-w-4xl h-[300px] p-6 overflow-hidden rounded-[20px] bg-[#efe9d6]">
        <motion.div
          className="absolute inset-6 flex h-[calc(100%-48px)] w-[200%]"
          animate={{ x: ["0%", "-90%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <img src={images[0]} className="w-1/2 h-full object-cover rounded-[16px]" />
          <img src={images[1]} className="w-1/2 h-full object-cover rounded-[16px]" />
          <img src={images[2]} className="w-1/2 h-full object-cover rounded-[16px]" />
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="w-[90%] max-w-4xl mt-6 text-left">
        <h3 className="text-[#1a0b91] font-extrabold text-2xl md:text-3xl">
          Dev Dynaneshwar Society, Andheri
        </h3>
      </div>

    </div>
  );
}
