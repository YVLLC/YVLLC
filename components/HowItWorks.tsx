import Head from "next/head";
import { Zap, UserCheck, Clock } from "lucide-react";

const STEPS = [
  {
    icon: <Zap className="text-[#007BFF]" size={30} />,
    title: "Choose a Service",
    desc: "Select what you want to grow—Followers, Likes, or Views for Instagram, TikTok, YouTube, and more.",
  },
  {
    icon: <UserCheck className="text-[#007BFF]" size={30} />,
    title: "Enter Your Info",
    desc: "No password needed. Just your username or a post link. Private, secure, and encrypted every time.",
  },
  {
    icon: <Clock className="text-[#007BFF]" size={30} />,
    title: "Watch Real Results",
    desc: "Orders start within minutes. Growth looks 100% natural and you can track your order live. Support is always one tap away.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How It Works – YesViral</title>
        <meta
          name="description"
          content="How YesViral delivers real followers, likes, and views in 3 super-simple steps."
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#007BFF] text-center mb-3">
          How YesViral Works
        </h1>
        <p className="text-center text-[#444] mb-12 text-lg max-w-2xl mx-auto">
          Simple, instant, and 100% safe. Here’s exactly how your growth happens.
        </p>
        <div className="relative z-0 bg-gradient-to-b from-[#fafdff] via-[#f4f8ff] to-[#fafdff] rounded-3xl shadow-xl py-10 px-3 sm:px-12 flex flex-col gap-10 sm:gap-12">
          <div className="absolute inset-0 z-0 pointer-events-none rounded-3xl" style={{boxShadow: "0 12px 36px 0 #82bfff1b"}}></div>
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-10 sm:gap-8 relative z-10">
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center text-center px-2 sm:px-4 py-5 bg-white/90 rounded-2xl shadow-lg border border-[#e8f1ff] relative transition-transform hover:-translate-y-1 group"
                style={{
                  minWidth: 0,
                  boxShadow: "0 4px 28px #97cbff18",
                }}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#E8F4FF] shadow-sm mb-4 border-2 border-[#007BFF]/20 group-hover:scale-105 transition">
                  <span className="block group-hover:rotate-6 transition">{step.icon}</span>
                </div>
                <div className="text-[#007BFF] font-extrabold text-2xl mb-2 drop-shadow-sm">Step {idx + 1}</div>
                <h3 className="text-lg font-bold text-[#111] mb-1">{step.title}</h3>
                <p className="text-[#444] text-base">{step.desc}</p>
                {idx < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute right-[-40px] top-1/2 -translate-y-1/2">
                    {/* Connector Dots (desktop) */}
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(6)].map((_, i) => (
                        <span
                          key={i}
                          className="inline-block w-1.5 h-1.5 rounded-full bg-[#007BFF] opacity-70 animate-dot-pulse"
                          style={{ animationDelay: `${i * 0.14}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <style jsx>{`
        @keyframes dot-pulse {
          0% { opacity: 0.5; transform: scale(1);}
          60% { opacity: 1; transform: scale(1.2);}
          100% { opacity: 0.5; transform: scale(1);}
        }
        .animate-dot-pulse {
          animation: dot-pulse 1.25s infinite alternate;
        }
      `}</style>
    </>
  );
}
