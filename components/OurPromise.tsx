import { Star, ShieldCheck, Sparkles, RefreshCcw } from "lucide-react";

export default function OurPromise() {
  return (
    <section
      id="our-promise"
      className="relative z-10 bg-gradient-to-br from-[#F2F9FF] via-[#E6F0FF] to-white rounded-3xl shadow-2xl px-6 py-16 md:py-24 xl:px-28 mx-auto max-w-5xl mt-20 mb-14 border-2 border-[#B4D8FF] overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 700 350" fill="none" className="opacity-30">
          <defs>
            <radialGradient id="promiseGlow" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#B4D8FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F2F9FF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="350" cy="175" rx="340" ry="140" fill="url(#promiseGlow)" />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="flex flex-col items-center mb-12">
          <Star size={50} className="text-yellow-400 animate-spin-slow mb-4 drop-shadow" />
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] via-[#1A73E8] to-[#00C6FB] text-center drop-shadow-lg mb-4 tracking-tight">
            The YesViral Promise
          </h2>
          <p className="max-w-2xl mx-auto text-[#333] text-lg md:text-xl text-center font-medium leading-relaxed">
            We’re obsessed with your growth. Our commitment: <span className="font-bold text-[#007BFF]">best-in-class results</span>, constant innovation, and your total peace of mind. Here’s how we deliver a social boost with real, lasting impact:
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {/* CARD 1 */}
          <div className="bg-white/95 backdrop-blur-2xl border-2 border-[#A8E063] rounded-2xl shadow-2xl p-8 flex flex-col items-center group hover:scale-[1.035] hover:shadow-3xl transition-transform">
            <Sparkles size={46} className="text-[#28C76F] mb-4 drop-shadow-lg group-hover:scale-110 transition-transform" />
            <h3 className="font-extrabold text-xl md:text-2xl text-[#222] mb-2 text-center tracking-tight">
              Relentless Network Innovation
            </h3>
            <p className="text-[#444] text-base md:text-lg text-center font-medium">
              We constantly upgrade and expand our networks for real, high-quality engagement. <span className="font-semibold text-[#28C76F]">Your results get better every month</span>—because we never stop improving our sources, speed, and authenticity.
            </p>
          </div>
          {/* CARD 2 */}
          <div className="bg-white/95 backdrop-blur-2xl border-2 border-[#FFD700] rounded-2xl shadow-2xl p-8 flex flex-col items-center group hover:scale-[1.035] hover:shadow-3xl transition-transform">
            <ShieldCheck size={46} className="text-[#FFD700] mb-4 drop-shadow-lg group-hover:scale-110 transition-transform" />
            <h3 className="font-extrabold text-xl md:text-2xl text-[#222] mb-2 text-center tracking-tight">
              Secure, Safe, & Transparent
            </h3>
            <p className="text-[#444] text-base md:text-lg text-center font-medium">
              No logins. No risks. <span className="font-semibold text-[#FFD700]">256-bit SSL</span>, full privacy, and ethical practices. You control your account at all times—our only goal is your secure, stress-free growth.
            </p>
          </div>
          {/* CARD 3 */}
          <div className="bg-white/95 backdrop-blur-2xl border-2 border-[#4FC3F7] rounded-2xl shadow-2xl p-8 flex flex-col items-center group hover:scale-[1.035] hover:shadow-3xl transition-transform">
            <RefreshCcw size={46} className="text-[#1A73E8] mb-4 drop-shadow-lg group-hover:scale-110 transition-transform" />
            <h3 className="font-extrabold text-xl md:text-2xl text-[#222] mb-2 text-center tracking-tight">
              Results That Last—Guaranteed
            </h3>
            <p className="text-[#444] text-base md:text-lg text-center font-medium">
              Every order is protected by our <span className="font-semibold text-[#1A73E8]">30-day refill guarantee</span> and world-class support. If your numbers drop, we restore them—fast and for free. Your trust fuels us.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14">
          <span className="font-semibold text-[#111] text-base text-center">
            <span className="text-[#007BFF]">YesViral</span> is dedicated to your growth today, and to making it even better tomorrow. <span className="text-[#007BFF] font-extrabold">We stake our name on it.</span>
          </span>
        </div>
      </div>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
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