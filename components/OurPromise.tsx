import { Star, ShieldCheck, Sparkles, RefreshCcw } from "lucide-react";

export default function OurPromise() {
  return (
    <section
      id="our-promise"
      className="relative z-10 bg-gradient-to-br from-[#EFF7FF] via-[#F3FAFF] to-white rounded-4xl shadow-3xl px-7 py-20 md:py-28 xl:px-32 mx-auto max-w-5xl mt-24 mb-20 border border-[#B8DFFF]/70 overflow-hidden"
    >
      {/* Decorative Glow & Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 700 350" fill="none" className="opacity-25">
          <defs>
            <radialGradient id="promiseGlow" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#70B7FF" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#F6FAFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="350" cy="175" rx="340" ry="130" fill="url(#promiseGlow)" />
        </svg>
        <div className="absolute left-0 right-0 bottom-0 h-28 bg-gradient-to-t from-[#D3EDFF] to-transparent opacity-70"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Star */}
        <Star
          size={54}
          className="text-[#1997FF] animate-spin-slow mb-4 drop-shadow-[0_4px_32px_rgba(25,151,255,0.15)]"
        />
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1572FF] via-[#19C0FF] to-[#29F1C3] drop-shadow-lg mb-5 tracking-tight">
          The YesViral Promise
        </h2>
        <p className="max-w-2xl mx-auto text-[#23364D] text-lg md:text-2xl font-medium leading-relaxed mb-6">
          <span className="font-bold text-[#1572FF]">Your growth, delivered:</span> Real, lasting social proof with innovation, transparency, and a guarantee you can trust.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mt-16 relative z-10">
        {/* CARD 1 */}
        <div className="group bg-white/95 backdrop-blur-2xl border border-[#32DAC6]/60 rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-200">
          <Sparkles size={44} className="text-[#22CFC3] mb-3 drop-shadow-md group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#193354] mb-2 tracking-tight">
            Cutting-Edge Network
          </h3>
          <p className="text-[#23364D] text-base md:text-lg font-medium leading-snug">
            Reach real people—always. We upgrade our network monthly so your results keep improving, with unmatched authenticity.
          </p>
        </div>
        {/* CARD 2 */}
        <div className="group bg-white/95 backdrop-blur-2xl border border-[#FFD700]/50 rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-200">
          <ShieldCheck size={44} className="text-[#FFD700] mb-3 drop-shadow-md group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#193354] mb-2 tracking-tight">
            Safety First. Always.
          </h3>
          <p className="text-[#23364D] text-base md:text-lg font-medium leading-snug">
            No logins or risks. Bank-level SSL, true privacy, and 100% control—guaranteed. Grow with total confidence.
          </p>
        </div>
        {/* CARD 3 */}
        <div className="group bg-white/95 backdrop-blur-2xl border border-[#19AFFF]/50 rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-200">
          <RefreshCcw size={44} className="text-[#1997FF] mb-3 drop-shadow-md group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#193354] mb-2 tracking-tight">
            Lasting Results—Guaranteed
          </h3>
          <p className="text-[#23364D] text-base md:text-lg font-medium leading-snug">
            Covered by our 30-day refill promise and pro support. If your numbers drop, we restore them—fast, free, and friendly.
          </p>
        </div>
      </div>
      {/* Footer Statement */}
      <div className="flex flex-col items-center justify-center gap-4 mt-16">
        <span className="font-semibold text-[#222] text-lg text-center px-2">
          <span className="text-[#1572FF] font-black">YesViral</span> is built for creators who want real, lasting growth—today, tomorrow, always.
        </span>
      </div>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 5.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </section>
  );
}
