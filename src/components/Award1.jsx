import { motion } from "framer-motion";
import image1 from "../assets/images/events.png";
import image2 from "../assets/images/events.png";
import image3 from "../assets/images/events.png";

export default function ReversingGallery() {
  const images = [image1, image2, image3];

  return (
    <section className="w-screen min-h-screen flex flex-col items-center justify-center bg-[#f4f2eb] overflow-hidden">
      
      {/* Fullscreen Image Section */}
      <div className="relative w-[92%] h-[75vh] p-8 rounded-[28px] bg-[#efe9d6] overflow-hidden">
        <motion.div
          className="absolute inset-8 flex h-[calc(100%-64px)] w-[200%] gap-6"
          animate={{ x: ["0%", "-90%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-1/2 h-full object-cover rounded-[20px]"
              alt=""
            />
          ))}
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="w-[92%] mt-8">
        <h3 className="text-[#1a0b91] font-extrabold text-3xl md:text-4xl">
          Dev Dynaneshwar Society, Andheri
        </h3>
      </div>

    </section>
  );
}
