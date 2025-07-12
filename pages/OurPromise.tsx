import { ShieldCheck, BarChart3, RefreshCcw, Star } from "lucide-react";

export default function OurPromise() {
  return (
    <section
      id="our-promise"
      className="relative z-10 bg-gradient-to-b from-[#F2F9FF] to-white rounded-3xl shadow-xl px-6 py-16 md:py-20 xl:px-24 mx-auto max-w-6xl mt-20 mb-14 border-2 border-[#CFE4FF] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 600 300" fill="none" className="opacity-30">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#CFE4FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F2F9FF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="300" cy="150" rx="270" ry="120" fill="url(#glow)" />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="flex flex-col items-center mb-10">
          <Star size={48} className="text-yellow-400 star-animate mb-4" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#007BFF] text-center drop-shadow-sm mb-3">
            The YesViral Difference
          </h2>
          <p className="max-w-2xl mx-auto text-[#444] text-lg text-center font-medium">
            Our commitment to your social growth is unmatched. We don't just promise results — we deliver, innovate, and support you at every step. Here’s what sets YesViral apart:
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {/* CARD 1 */}
          <div className="bg-white/90 backdrop-blur-2xl border-2 border-[#CFE4FF] rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-transform">
            <ShieldCheck size={40} className="text-[#007BFF] mb-5" />
            <h3 className="font-bold text-xl text-[#111] mb-2 text-center">
              Unmatched Safety & Trust
            </h3>
            <p className="text-[#444] text-base text-center font-medium">
              Your privacy is sacred. No passwords. No risks. Every transaction is protected with enterprise-grade security and a transparent, ethical approach.
            </p>
          </div>
          {/* CARD 2 */}
          <div className="bg-white/90 backdrop-blur-2xl border-2 border-[#FFD700] rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-transform">
            <BarChart3 size={40} className="text-[#FFD700] mb-5" />
            <h3 className="font-bold text-xl text-[#111] mb-2 text-center">
              Relentless Network Improvement
            </h3>
            <p className="text-[#444] text-base text-center font-medium">
              YesViral is always evolving. We constantly optimize our networks and sources to ensure <span className="text-[#007BFF] font-semibold">the highest-quality, fastest, and most reliable engagement</span> in the industry. Your growth today is even better tomorrow.
            </p>
          </div>
          {/* CARD 3 */}
          <div className="bg-white/90 backdrop-blur-2xl border-2 border-[#CFE4FF] rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-transform">
            <RefreshCcw size={40} className="text-[#007BFF] mb-5" />
            <h3 className="font-bold text-xl text-[#111] mb-2 text-center">
              Results Guaranteed — Or We Refill
            </h3>
            <p className="text-[#444] text-base text-center font-medium">
              Every order is backed by our <span className="text-[#007BFF] font-semibold">30-day refill guarantee</span>. If your followers, likes, or views drop, we restore them immediately — no hassle, no cost, no questions.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14">
          <span className="font-semibold text-[#111] text-base text-center">
            <span className="text-[#007BFF]">YesViral</span> is your growth partner — dedicated to constant improvement, real support, and your long-term success.
          </span>
        </div>
      </div>
      <style jsx>{`
        .star-animate {
          animation: starGlow 2.6s cubic-bezier(.65,.05,.36,1) infinite;
          will-change: transform, filter;
        }
        @keyframes starGlow {
          0% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 0 #FFD700);}
          30% { transform: rotate(8deg) scale(1.16); filter: drop-shadow(0 0 8px #FFD700);}
          55% { transform: rotate(-7deg) scale(1.09); filter: drop-shadow(0 0 12px #FFF78A);}
          80% { transform: rotate(0deg) scale(1.13); filter: drop-shadow(0 0 10px #FFD700);}
          100% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 0 #FFD700);}
        }
      `}</style>
    </section>
  );
}