import hero from "../assets/images/hero-bg.png";
import Navbar from "./common/Navbar";
import { useServicesPage } from "../hooks/useServicesPage";

export default function SectionHero() {
  const { servicesPageData, loading } = useServicesPage();

  const heroData = servicesPageData || {
    pageTitle: "Our Services",
    pageDescription: "Comprehensive waste management and recycling solutions",
    heroImage: hero
  };

  if (loading) {
    return (
      <section className="relative min-h-[320px] md:min-h-[300px] lg:min-h-[350px] w-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </section>
    );
  }

  return (
    <section
      className="relative h-[280px] md:h-[260px] lg:h-[300px] w-full bg-cover bg-center overflow-hidden rounded-b-[30px] md:rounded-b-[40px]"
      style={{
        backgroundImage: `url(${heroData.heroImage || hero})`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Navbar Container */}
      <div className="relative z-20">
        <Navbar variant="transparent" />
      </div>

      {/* Content Container */}
      {/* Content positioned below navbar */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 pt-28 md:pt-24 lg:pt-28 pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight">
          {heroData.pageTitle}
        </h1>
        <p className="text-white/90 text-lg md:text-xl mt-4 max-w-2xl">
          {heroData.pageDescription}
        </p>
        {/* Subtle decorative underline for brand consistency */}
        <div className="h-1 w-12 md:w-20 bg-[#87BBD7] mt-4 rounded-full" />
      </div>
    </section>
  );
}