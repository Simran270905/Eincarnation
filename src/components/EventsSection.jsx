import { motion } from "framer-motion"; 
import { Calendar, MapPin, Clock } from "lucide-react";
import { useEvents } from "../hooks/useEvents";

export default function EventsSection() {
  const { events: backendEvents, loading } = useEvents();
  const events = backendEvents.filter(e => e.isActive).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section className="w-full min-h-screen pt-28 pb-16 md:py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-[#f4f2eb] to-[#e8e5d8] font-sans">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-7xl mx-auto text-center"
      >
        <span className="inline-block px-4 py-2 bg-[#1A0185]/10 text-[#1A0185] rounded-full text-sm font-bold tracking-wider uppercase mb-4">
          Events & Awards
        </span>
        <h1 className="text-[#1A0185] font-black text-4xl md:text-5xl lg:text-6xl mb-4">
          Explore Our Events
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our latest initiatives, awards, and community engagement activities
        </p>
      </motion.div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#1A0185]"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No events available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event._id || event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container */}
              {(event.image || event.img) && (
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={event.image || event.img}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Location Badge */}
                  {event.location && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[#1A0185] text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Date */}
                {event.date && (
                  <div className="flex items-center gap-2 text-[#87BBD7] text-sm font-semibold mb-3">
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-[#1A0185] mb-3 leading-tight group-hover:text-[#3451A3] transition-colors">
                  {event.title}
                </h3>

                {/* Description */}
                {event.description && (
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </section>
  );
}
