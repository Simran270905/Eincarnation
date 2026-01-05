import hero from "../assets/images/hero-bg.png";
import Navbar from "./Navbar";

export default function SectionHero() {
  return (
    <section
      className="relative min-h-[250px] md:min-h-[300px] lg:min-h-[350px] w-full bg-cover bg-center overflow-hidden rounded-b-[30px] md:rounded-b-[40px]"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Navbar Container */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 mt-8 md:mt-12 lg:mt-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight">
          Our Services
        </h1>
        {/* Subtle decorative underline for brand consistency */}
        <div className="h-1 w-12 md:w-20 bg-[#87BBD7] mt-4 rounded-full" />
      </div>
    </section>
  );
}