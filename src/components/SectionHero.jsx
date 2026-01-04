import hero from "../assets/images/hero-bg.png";

import Navbar from "./Navbar";

export default function SectionHero() {
  return (
    <section
      className="relative h-[300px] w-full bg-cover bg-center overflow-hidden rounded-b-[40px]"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <Navbar />

      <div className="relative z-10 px-12 mt-12">
        <h1 className="text-5xl font-bold text-white tracking-tight">
          Our Services
        </h1>
      </div>
    </section>
  );
}



