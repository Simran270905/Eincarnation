import { motion } from "framer-motion";
import image1 from "../assets/images/events.png";
import image2 from "../assets/images/events.png";
import image3 from "../assets/images/events.png";

export default function ReversingGallery() {
  const images = [image1, image2, image3];

  return (
    <section className="w-screen h-[50vh] flex flex-col justify-center bg-[#f4f2eb] overflow-hidden">
      
      {/* Half-page Image Section */}
      <div className="relative w-[85%] h-full p-4 rounded-[28px] bg-[#efe9d6] overflow-hidden mx-auto">
        <motion.div
          className="absolute inset-4 flex h-[calc(100%-16px)] w-[200%] gap-4"
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
      <div className="w-[92%] mt-4 mx-auto">
        <h3 className="text-[#1a0b91] mb-10 font-extrabold text-2xl md:text-3xl text-center">
          Dev Dynaneshwar Society, Andheri
        </h3>
      </div>

    </section>
  );
}
