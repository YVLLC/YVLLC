import { TrendingUp, ShieldCheck, UserCheck, Rocket } from "lucide-react";

export default function OurPromise() {
  return (
    <section
      id="our-promise"
      className="relative z-10 bg-gradient-to-br from-[#EFF7FF] via-[#F3FAFF] to-white rounded-4xl shadow-3xl px-7 py-20 md:py-28 xl:px-32 mx-auto max-w-5xl mt-24 mb-20 border border-[#B8DFFF]/70 overflow-hidden"
    >
<<<<<<< HEAD
      {/* Animated blue pulse bar */}
      <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[#003EFF] via-[#009DFF] to-[#20DEFF] animate-pulse z-30 rounded-t-3xl" />
      
            <radialGradient id="promiseGlow" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#70B7FF" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#F6FAFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="350" cy="175" rx="340" ry="130" fill="url(#promiseGlow)" />
        </svg>
        <div className="absolute left-0 right-0 bottom-0 h-28 bg-gradient-to-t from-[#D3EDFF] to-transparent opacity-70"></div>
>>>>>>> dae33b2e9a3b27cf0cccd7fdcebebdece940ee6a
      </div>
<<<<<<< HEAD

        {/* CARD 1 */}
        <div className="group bg-[#F7FBFF] border border-[#009DFF]/30 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-all duration-200">
          <Rocket size={44} className="text-[#009DFF] mb-3 animate-bounce" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#003EFF] mb-2">
            Relentless Growth
          </h3>
          <p className="text-[#22426A] text-base md:text-lg font-medium mb-2">
            Our network is always evolving. We’re unlocking new sources and strategies for viral results every month.
=======
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
>>>>>>> dae33b2e9a3b27cf0cccd7fdcebebdece940ee6a
          </p>
          <span className="text-[#20DEFF] text-xs font-semibold uppercase tracking-wide">
            7X Network Expansion in 2024
          </span>
        </div>
<<<<<<< HEAD

        {/* CARD 2 */}
        <div className="group bg-[#F7FBFF] border border-[#1FA6FF]/25 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-all duration-200">
          <TrendingUp size={44} className="text-[#1FA6FF] mb-3 animate-pulse" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#003EFF] mb-2">
            Real Social Proof
          </h3>
          <p className="text-[#22426A] text-base md:text-lg font-medium mb-2">
            100% genuine engagement, never bots. Our reach and quality get stronger, so your results keep climbing.
          </p>
          <span className="text-[#1FA6FF] text-xs font-semibold uppercase tracking-wide">
            Avg. 21% More Engagement, Q2 2024
          </span>
=======
        {/* CARD 2 */}
        <div className="group bg-white/95 backdrop-blur-2xl border border-[#FFD700]/50 rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-200">
          <ShieldCheck size={44} className="text-[#FFD700] mb-3 drop-shadow-md group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#193354] mb-2 tracking-tight">
            Safety First. Always.
            No passwords. No risks. Bank-level SSL and ethical practices—full control stays with you, always.
          </p>
          <span className="text-[#00DEB6] text-xs font-semibold uppercase tracking-wide">
            0 Security Incidents Since Launch
          </span>
=======
        {/* CARD 3 */}
        <div className="group bg-white/95 backdrop-blur-2xl border border-[#19AFFF]/50 rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-200">
          <RefreshCcw size={44} className="text-[#1997FF] mb-3 drop-shadow-md group-hover:scale-110 transition-transform" />
            Lasting Results—Guaranteed
          </h3>
          <p className="text-[#23364D] text-base md:text-lg font-medium leading-snug">
            Covered by our 30-day refill promise and pro support. If your numbers drop, we restore them—fast, free, and friendly.
          </p>
>>>>>>> dae33b2e9a3b27cf0cccd7fdcebebdece940ee6a
        </div>

        {/* CARD 4 */}
        <div className="group bg-[#F7FBFF] border border-[#006CFF]/25 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-all duration-200">
          <UserCheck size={44} className="text-[#006CFF] mb-3 animate-bounce" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#003EFF] mb-2">
            Proactive Support
          </h3>
          <p className="text-[#22426A] text-base md:text-lg font-medium mb-2">
            30-day refill guarantee. Human support. If you drop, we restore—free, fast, no questions asked.
          </p>
          <span className="text-[#006CFF] text-xs font-semibold uppercase tracking-wide">
            98% Satisfaction, 24/7 Help
          </span>
        </div>
      </div>
<<<<<<< HEAD

      {/* Footer Statement */}
      <div className="flex flex-col items-center justify-center gap-4 mt-14">
        <span className="font-semibold text-[#003EFF] text-lg text-center px-2">
          <span className="font-black">YesViral</span> means you grow with the best—backed by constant innovation, trusted by creators everywhere.
        </span>
      </div>

      {/* Minimal keyframes for icons */}
=======
      {/* Footer Statement */}
      <div className="flex flex-col items-center justify-center gap-4 mt-16">
        <span className="font-semibold text-[#222] text-lg text-center px-2">
          <span className="text-[#1572FF] font-black">YesViral</span> is built for creators who want real, lasting growth—today, tomorrow, always.
        </span>
      </div>
>>>>>>> dae33b2e9a3b27cf0cccd7fdcebebdece940ee6a
      <style jsx>{`
<<<<<<< HEAD
        .animate-bounce {
          animation: bounce 1.7s infinite cubic-bezier(.68,-0.55,.27,1.55);
=======
        .animate-spin-slow {
          animation: spin 5.5s linear infinite;
>>>>>>> dae33b2e9a3b27cf0cccd7fdcebebdece940ee6a
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          40% { transform: translateY(-14%);}
        }
<<<<<<< HEAD
        .animate-pulse {
          animation: pulse 1.7s infinite cubic-bezier(.4,0,.6,1);
        }
        @keyframes pulse {
