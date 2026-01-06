import historyMain from "../assets/images/history-main.png";
import historyOverlay from "../assets/images/history-overlay.png";

export default function OurHistory() {
  return (
    <section className="bg-[#f5f4ed] py-24 overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-0">
          
          <div className="flex flex-col items-start order-2 md:order-1 lg:pl-4">
            <p className="text-[20px] font-semibold text-black uppercase opacity-90">
              ABOUT
            </p>
            <h2 className="md:text-[60px] font-semibold text-[#1e1494]">
              Our History
            </h2>

            <p className="text-[16px] leading-[1.8] text-gray-700 mb-10 max-w-[460px] text-justify md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>

            <button className="group flex items-center gap-3 rounded-full bg-[#9bc9df] px-10 py-3 text-[15px] font-bold tracking-tight text-gray-900 transition-all hover:brightness-95 active:scale-95 shadow-sm">
              KNOW MORE
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="relative flex items-center justify-center order-1 md:order-2 py-12">
            <div className="relative flex w-[320px] h-[350px] md:w-[480px] md:h-[520px] items-center">
              
              <div className="w-[45%] h-[70%] overflow-hidden rounded-l-full z-10 shadow-[-10px_0px_30px_rgba(0,0,0,0.08)]">
                <img
                  src={historyMain}
                  alt="History Main"
                  className="w-full h-full object-cover object-[22%_center] scale-[1.32]"
                />
              </div>

              <div className="w-[55%] h-full overflow-hidden rounded-r-full z-0 shadow-[10px_0px_30px_rgba(0,0,0,0.08)]">
                <img
                  src={historyOverlay}
                  alt="History Overlay"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
