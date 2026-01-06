import { motion } from "framer-motion"; 
import image1 from "../assets/images/events.png";

export default function Events() {
  const events = [
    { id: 1, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 2, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 3, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 4, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 5, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 6, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 7, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 8, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 9, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 10, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 11, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
    { id: 12, title: "Dev Dynaneshwar Society", location: "Andheri", img: image1 },
  ];

  return (
    <section className="w-full min-h-screen py-16 px-4 md:px-12 bg-[#f4f2eb] font-sans">

      {/* Header Section */}
      <div className="mb-12 max-w-7xl mx-auto text-center">
        <p className="text-[#3b2db0] font-bold tracking-wider text-lg mb-2 uppercase">
          Awards
        </p>
        <h2 className="text-[#1a0b91] font-black text-4xl md:text-5xl">
          Explore Our Events
        </h2>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ y: -5 }} // Subtle lift effect when hovered
            className="group p-4 rounded-[28px] cursor-pointer transition-all duration-300 bg-[#efe9d6] hover:bg-[#0a1a16] flex flex-col items-center"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-[24px] mb-4 w-full">
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-60 object-cover"
              />
              {/* Location Tag */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#13233b]/90 text-white text-xs font-medium px-4 py-1.5 rounded-full backdrop-blur-sm">
                {event.location}
              </div>
            </div>

            {/* Event Details */}
            <div className="px-2 pb-4 text-center">
              <h3 className="text-xl md:text-2xl font-bold leading-tight text-[#1a0b91] group-hover:text-white transition-colors duration-300">
                {event.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
