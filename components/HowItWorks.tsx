import Head from "next/head";
import { CheckCircle, Zap, UserCheck, Clock } from "lucide-react";

const STEPS = [
  {
    title: "Choose a Service",
    desc: "Pick your boost—Followers, Likes, or Views for IG, TikTok, YouTube, and more. Every service is authentic, safe, and results-driven.",
    icon: <Zap className="text-[#007BFF]" size={28} />,
  },
  {
    title: "Enter Your Info",
    desc: "No password required—just your username or post link. We keep everything 100% private and secure.",
    icon: <UserCheck className="text-[#007BFF]" size={28} />,
  },
  {
    title: "Watch Growth Begin",
    desc: "Orders start within minutes. Track progress and get live support anytime. Real results, no waiting.",
    icon: <Clock className="text-[#007BFF]" size={28} />,
  },
];

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How It Works – YesViral</title>
        <meta
          name="description"
          content="Learn how YesViral delivers real Followers, Likes, and Views in 3 ultra-simple steps."
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-14 sm:py-20">
        <h1 className="text-4xl font-extrabold text-[#007BFF] text-center mb-2">
          How YesViral Works
        </h1>
        <p className="text-center text-[#444] mb-12 text-lg max-w-xl mx-auto">
          Zero hassle, instant impact. Here’s how to unlock real growth with YesViral.
        </p>

        {/* Responsive Timeline */}
        <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-0">
          {/* Vertical/Horizontal connector */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1 -translate-x-1/2 bg-gradient-to-b from-[#E8F6FF] via-[#B3E0FF] to-[#E8F6FF] rounded-full z-0" />
          <div className="block md:hidden absolute left-8 right-8 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-[#E8F6FF] via-[#B3E0FF] to-[#E8F6FF] rounded-full z-0" />

          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center z-10 w-full md:w-1/3"
            >
              {/* Step Circle with icon */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#007BFF] bg-white shadow-lg mb-3`}>
                  {step.icon}
                </div>
                <div className="text-[#007BFF] font-bold text-xl mb-2">Step {idx + 1}</div>
              </div>
              {/* Content */}
              <div className="text-center px-3">
                <h3 className="text-lg font-bold text-[#111] mb-1">{step.title}</h3>
                <p className="text-[#444] text-base">{step.desc}</p>
              </div>
              {/* Dot connector (between steps, mobile only) */}
              {idx < STEPS.length - 1 && (
                <div className="block md:hidden my-4">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#007BFF] opacity-80 animate-dot-pulse" />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#007BFF] opacity-70 mx-1 animate-dot-pulse" style={{ animationDelay: "0.13s" }} />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#007BFF] opacity-60 animate-dot-pulse" style={{ animationDelay: "0.26s" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <style jsx>{`
        @keyframes dot-pulse {
          0% { opacity: 0.5; transform: scale(1);}
          60% { opacity: 1; transform: scale(1.2);}
          100% { opacity: 0.5; transform: scale(1);}
        }
        .animate-dot-pulse {
          animation: dot-pulse 1.2s infinite alternate;
        }
      `}</style>
    </>
  );
}
