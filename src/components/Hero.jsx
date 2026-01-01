//import heroImage from "../assets/hero.png";

const Hero = () => {
  return (
    <section className="grid grid-cols-2 items-center px-24 py-20 gap-16">
      {/* LEFT */}
      <div>
        <p className="font-semibold tracking-widest text-sm mb-4">
          #EINCARNATION
        </p>

        <h1 className="text-[52px] font-bold leading-tight text-[#1A0185]">
          BREATHING LIFE INTO <br /> A GREENER FUTURE
        </h1>

        <p className="text-gray-700 mt-6 max-w-lg">
          Join the movement to reduce waste and protect our planet
          for future generations.
        </p>

        <button className="mt-6 bg-[#8FBBD7] px-7 py-3 rounded-full text-sm font-medium flex items-center gap-2">
          KNOW MORE →
        </button>

        {/* STATS */}
        <div className="flex gap-10 mt-14">
          {[
            ["REAL-TIME", ""],
            ["RECYCLING", "10000 MT"],
            ["REUSE", "10000 MT"],
            ["FORECAST FOR 2026", "10000 MT"],
          ].map(([title, value], index) => (
            <div key={index} className="border-l-4 border-[#3451A3] pl-4">
              <p className="text-sm font-semibold">{title}</p>
              {value && <p className="text-sm mt-1">{value}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
          alt="Nature"
          className="w-[480px] object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
