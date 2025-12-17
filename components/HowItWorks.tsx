import { Zap, UserCheck, Clock } from "lucide-react";

const STEPS = [
  {
    icon: <Zap className="text-[#007BFF]" size={36} />,
    title: "Choose a Service",
    desc: "Pick what you want—Followers, Likes, or Views for any major platform. Every order is High-Quality, Fast, and Safe.",
  },
  {
    icon: <UserCheck className="text-[#007BFF]" size={36} />,
    title: "Enter Your Info",
    desc: "No passwords ever. Just your username or a link—100% Private, Secure, and Encrypted ordering.",
  },
  {
    icon: <Clock className="text-[#007BFF]" size={36} />,
    title: "See Instant Results",
    desc: "Your boost starts in minutes, Grows naturally, and you can track your order or reach our support anytime.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-4xl font-extrabold text-[#007BFF] text-center mb-2 drop-shadow-sm">
          How YesViral Works
        </h2>
        <p className="text-center text-[#444] mb-8 text-lg max-w-xl mx-auto font-medium">
          Real growth made simple. Three steps, zero hassle—just high-quality results.
        </p>

        <div className="relative flex flex-col md:flex-row items-center justify-between md:gap-12">
          {/* Step Cards */}
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 flex flex-col items-center text-center bg-white rounded-3xl shadow-xl border-2 border-[#e4f0ff] px-8 py-10 w-full max-w-xs md:max-w-md mx-auto md:mx-0 mb-8 md:mb-0"
              style={{
                minHeight: 230,
                minWidth: 280,
                boxShadow: "0 4px 32px 0 #007bff0c, 0 1.5px 6px #b6d8ff1f",
              }}
            >
              <div className="mb-4">{step.icon}</div>

              <div className="w-11 h-11 mb-3 rounded-full flex items-center justify-center bg-[#F5FAFF] border-2 border-[#b1dbff] font-bold text-2xl text-[#007BFF] shadow">
                {idx + 1}
              </div>

              <h3 className="text-xl font-extrabold text-[#111] mb-2">
                {step.title}
              </h3>
              <p className="text-[#444] text-base font-medium">
                {step.desc}
              </p>
            </div>
          ))}

          {/* Desktop Connector Line */}
          <div
            className="absolute md:top-1/2 md:left-0 md:right-0 md:h-0 md:flex hidden z-0"
            style={{
              top: "calc(50% - 7px)",
              left: "11%",
              right: "11%",
              height: 0,
            }}
          >
            <div className="w-full flex items-center justify-between px-[8%]">
              {[...Array(STEPS.length - 1)].map((_, idx) => (
                <div key={idx} className="flex-1 flex items-center">
                  <div className="h-2 w-full bg-gradient-to-r from-[#CFE9FF] to-[#E8F6FF] rounded-full relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                      {[...Array(7)].map((_, d) => (
                        <span
                          key={d}
                          className="block w-2 h-2 rounded-full bg-[#36afff] opacity-80 animate-dot-pulse"
                          style={{ animationDelay: `${d * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Connector */}
          <div
            className="absolute left-1/2 top-[120px] md:hidden flex flex-col items-center z-0"
            style={{ height: "calc(100% - 120px)" }}
          >
            {[...Array(STEPS.length - 1)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center h-[85px] justify-center"
              >
                {[...Array(7)].map((_, d) => (
                  <span
                    key={d}
                    className="block w-1.5 h-1.5 rounded-full bg-[#36afff] opacity-80 animate-dot-pulse"
                    style={{
                      animationDelay: `${d * 0.1}s`,
                      marginTop: d === 0 ? 0 : 2,
                      marginBottom: d === 6 ? 0 : 2,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes dot-pulse {
          0% { opacity: 0.4; transform: scale(1); }
          60% { opacity: 1; transform: scale(1.28); }
          100% { opacity: 0.4; transform: scale(1); }
        }

        .animate-dot-pulse {
          animation: dot-pulse 1.16s infinite alternate;
        }
      `}</style>
    </>
  );
}
