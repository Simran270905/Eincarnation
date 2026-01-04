import heroImage from "../assets/images/hero.png";

const HeroMain = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center px-6 sm:px-10 md:px-20 lg:px-24 py-12 sm:py-16 lg:py-35 gap-10 lg:gap-16 bg-[#F4F3EF]">
      {/* LEFT */}
      <div className="text-center lg:text-left">
        <p className="font-semibold tracking-widest text-sm mb-4 text-[#061512]">
          #EINCARNATION
        </p>

        <h1 className="font-bold leading-tight text-[#1A0185] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          BREATHING LIFE INTO <br /> A GREENER FUTURE
        </h1>

        <p className="text-[#060C0C] mt-6 max-w-md sm:max-w-lg mx-auto lg:mx-0 text-sm sm:text-base">
          Join the movement to reduce waste and protect our planet for future generations.
        </p>

        <button className="mt-6 bg-[#87BBD7] text-[#000000] px-6 sm:px-7 py-3 rounded-full text-sm sm:text-base font-medium flex items-center gap-2 mx-auto lg:mx-0">
          KNOW MORE →
        </button>

        {/* STATS */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-12 text-[#060C0C] justify-center lg:justify-start">
          {[
            ["REAL-TIME", ""],
            ["RECYCLING", "10000 MT"],
            ["REUSE", "10000 MT"],
            ["FORECAST FOR 2026", "10000 MT"],
          ].map(([title, value], index) => (
            <div
            key={index}
            className="relative flex flex-col items-center sm:items-start sm:pl-4">

              {index !== 0 && (
                <span className="hidden sm:block absolute  left-0 top-0 h-14 w-1 bg-[#1A0185] rounded-full"></span>
              )}
              <p className="text-sm font-light ">{title}</p>
              {value && <p className="text-sm mt-1">{value}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex justify-center lg:justify-end mt-10 lg:mt-0">
        <img
          src={heroImage}
          alt="Nature"
          className="w-64 sm:w-80 md:w-96 lg:w-[480px] object-contain"
        />
      </div>
    </section>
  );
};

export default HeroMain;
