import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function WhyChooseUsEPR({ data }) {
  if (!data || !data.reasons || data.reasons.length === 0) {
    return null;
  }

  const sortedReasons = [...data.reasons].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section className="bg-[#EBE8D7] py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Title and Reasons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A0185] mb-8">
              {data.title || 'Why Choose Us for EPR?'}
            </h2>
            
            <div className="space-y-4">
              {sortedReasons.map((reason, index) => (
                <motion.div
                  key={reason._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-[#1A0185]" />
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {reason.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image */}
          {data.image && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={data.image}
                alt={data.title || 'Why Choose Us for EPR'}
                className="w-full h-auto rounded-2xl shadow-xl"
                loading="lazy"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
