import hero from "../assets/images/hero-bg.png";
import Navbar from "./Navbar";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[250px] md:min-h-[350px] lg:min-h-[400px] w-full bg-cover bg-center overflow-hidden rounded-b-[30px] md:rounded-b-[50px] lg:rounded-b-[80px]"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/50"></div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 mt-10 md:mt-20 lg:mt-24">
        <div className="inline-block mb-2 md:mb-4">
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70 font-bold">
            WHO WE ARE
          </span>
          <div className="h-[2px] w-10 bg-[#87BBD7] mt-1" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
          About Us
        </h1>
      </div>
    </section>
  );
}