// SemiCircleClients.jsx
import React from "react";

const topClients = [
  "/images/indusind.png",
  "/images/rbl.png",
  "/images/dbs.png",
  "/images/godrej.png",
];

const bottomClients = [
  "/images/times.png",
  "/images/timesindia.png",
  "/images/godrej.png",
  "/images/vi.png",
];

export default function Clients() {
  const radius = 150; // increased radius for bigger semi-circle
  const logoSize = 24; // increased logo size (in Tailwind units)
  
  const semiCircle = (clients, startAngle = 0) =>
    clients.map((logo, i) => {
      const angle = (180 / (clients.length - 1)) * i + startAngle; // semi-circle spread
      return (
        <div
          key={i}
          className={`absolute w-${logoSize} h-${logoSize} rounded-full overflow-hidden`}
          style={{
            top: `calc(50% - ${logoSize * 2}px + ${-radius * Math.sin((angle * Math.PI) / 180)}px)`,
            left: `calc(50% - ${logoSize * 2}px + ${radius * Math.cos((angle * Math.PI) / 180)}px)`,
            transition: "all 0.5s linear",
          }}
        >
          <img
            src={logo}
            alt={`Client ${i}`}
            className="w-full h-full object-contain bg-white p-2 rounded-full"
          />
        </div>
      );
    });

  return (
    <section className="relative w-full h-[550px] bg-[#f7f6f3] overflow-hidden">
      {/* Left text */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 max-w-md px-12">
        <p className="text-lg mb-2 tracking-wide">MEET</p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1A0185] mb-4">
          Our Clients
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Reliable recycling services that reduce waste and turn materials into reusable resources.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-200 w-12 h-12 rounded-full">&lt;</button>
          <button className="bg-blue-200 w-12 h-12 rounded-full">&gt;</button>
        </div>
      </div>

      {/* Top-right semi-circle */}
      <div className="absolute top-0 right-0 w-[350px] h-[175px]">
        {semiCircle(topClients)}
      </div>

      {/* Bottom-right semi-circle */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[175px]">
        {semiCircle(bottomClients, 180)}
      </div>
    </section>
  );
}
