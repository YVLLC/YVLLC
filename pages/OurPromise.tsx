import { ShieldCheck, RefreshCcw, Star, Zap, UserCheck, ThumbsUp, Lock, HeartHandshake } from "lucide-react";

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
            Our Promise &amp; Guarantees
          </h2>
          <p className="max-w-2xl mx-auto text-[#444] text-lg text-center font-medium">
            Experience the YesViral Difference. We’re not just another growth service—we’re your edge. Our guarantees are designed to give you <span className="text-[#007BFF] font-bold">total confidence</span> every step of the way.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/80 backdrop-blur-2xl border border-[#CFE4FF] rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform">
            <ShieldCheck size={36} className="text-[#007BFF] mb-2" />
            <h3 className="font-bold text-lg text-[#111] mb-1">100% Safe & Secure</h3>
            <p className="text-[#444] text-sm text-center">
              No passwords, no risks. All orders are protected by industry-standard SSL and full privacy—your data is never shared.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-2xl border border-[#CFE4FF] rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform">
            <UserCheck size={36} className="text-[#23C55E] mb-2" />
            <h3 className="font-bold text-lg text-[#111] mb-1">Real Results—Always</h3>
            <p className="text-[#444] text-sm text-center">
              All engagement is from real users, never bots. We guarantee authentic growth and real impact, for every order.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-2xl border border-[#CFE4FF] rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform">
            <RefreshCcw size={36} className="text-[#007BFF] mb-2" />
            <h3 className="font-bold text-lg text-[#111] mb-1">30-Day Refill Coverage</h3>
            <p className="text-[#444] text-sm text-center">
              If you experience any drop in followers, likes, or views within 30 days, we’ll refill it—fast, free, and unlimited.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-2xl border border-[#CFE4FF] rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform">
            <Zap size={36} className="text-[#FFB300] mb-2" />
            <h3 className="font-bold text-lg text-[#111] mb-1">Lightning Fast Delivery</h3>
            <p className="text-[#444] text-sm text-center">
              Most orders start within 1–10 minutes. No waiting, no delays—just instant results.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-2xl border border-[#CFE4FF] rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform">
            <ThumbsUp size={36} className="text-[#007BFF] mb-2" />
            <h3 className="font-bold text-lg text-[#111] mb-1">Satisfaction Guarantee</h3>
            <p className="text-[#444] text-sm text-center">
              If you’re not 100% happy, we’ll make it right—refunds or replacements, no questions asked.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-2xl border border-[#CFE4FF] rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform">
            <HeartHandshake size={36} className="text-[#ED4956] mb-2" />
            <h3 className="font-bold text-lg text-[#111] mb-1">24/7 Human Support</h3>
            <p className="text-[#444] text-sm text-center">
              Real people ready to help, any time. No bots, no waiting—just world-class support.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">
          <Lock size={28} className="text-[#007BFF]" />
          <span className="font-semibold text-[#111] text-base">
            We stake our reputation on your success. <span className="text-[#007BFF]">Your growth, guaranteed.</span>
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