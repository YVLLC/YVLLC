import Head from "next/head";

const STEPS = [
  {
    title: "Choose a Service",
    desc: "Select Followers, Likes, or Views for any major platform. Every option is High-Quality, Fast, and Safe.",
    number: 1,
  },
  {
    title: "Enter Your Info",
    desc: "No passwords. Just your @Username or a Link. Orders are Private, Secure, and Encrypted.",
    number: 2,
  },
  {
    title: "See Instant Results",
    desc: "Your Boost starts in minutes and grows naturally. Track your order and reach support anytime.",
    number: 3,
  },
];

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How It Works – YesViral</title>
        <meta
          name="description"
          content="Learn how YesViral delivers real Followers, Likes, and Views to your social media in 3 easy steps."
        />
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#007BFF] text-center mb-2">
          How YesViral Works
        </h1>
        <p className="text-center text-[#444] mb-12 text-lg max-w-xl mx-auto">
          Getting real growth is simple. Three steps, Zero Hassle—just results.
        </p>

        <div className="relative flex flex-col md:flex-row md:items-start items-center md:justify-between">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center flex-1 min-w-[180px] max-w-xs md:mx-0 mb-12 md:mb-0"
            >
              {/* Step Circle */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-[#007BFF] bg-white text-2xl font-extrabold text-[#007BFF] shadow-lg z-10 mb-4" />
              <span className="absolute left-1/2 top-0 -translate-x-1/2 w-full flex justify-center items-center pointer-events-none">
                {/* Space holder for consistent layout */}
              </span>
              <span className="absolute left-1/2 top-0 -translate-x-1/2 w-full flex justify-center items-center pointer-events-none">
                {/* Space holder for consistent layout */}
              </span>
              <span className="absolute left-1/2 top-0 -translate-x-1/2 w-full flex justify-center items-center pointer-events-none">
                {/* Space holder for consistent layout */}
              </span>
              <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-[#007BFF] bg-white text-2xl font-extrabold text-[#007BFF] shadow-lg z-10 mb-4">
                {step.number}
              </div>
              {/* Connector Dots */}
              {idx < STEPS.length - 1 && (
                <>
                  {/* Desktop: horizontal dots with extra margin */}
                  <div className="hidden md:flex absolute top-1/2 right-[-90px] left-auto translate-y-[-50%]">
                    <div className="flex gap-2" style={{ marginLeft: 32, marginRight: 32 }}>
                      {[...Array(7)].map((_, d) => (
                        <span
                          key={d}
                          className="block w-2 h-2 rounded-full bg-[#007BFF] opacity-80 animate-dot-pulse"
                          style={{
                            animationDelay: `${d * 0.12}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Mobile: vertical dots with extra margin */}
                  <div className="md:hidden flex flex-col items-center mt-4 mb-[-30px]" style={{ marginTop: 24 }}>
                    {[...Array(7)].map((_, d) => (
                      <span
                        key={d}
                        className="block w-2 h-2 rounded-full bg-[#007BFF] opacity-80 animate-dot-pulse"
                        style={{
                          animationDelay: `${d * 0.12}s`,
                          marginTop: d === 0 ? 0 : 4,
                          marginBottom: d === 6 ? 0 : 4,
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
              {/* Step Title */}
              <h2 className="text-lg font-extrabold text-[#111] mb-2 mt-5">{step.title}</h2>
              <p className="text-[#444] text-base max-w-[240px] mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <style jsx>{`
        /* Dots Animation */
        @keyframes dot-pulse {
          0% { opacity: 0.6; transform: scale(1);}
          60% { opacity: 1; transform: scale(1.25);}
          100% { opacity: 0.6; transform: scale(1);}
        }
        .animate-dot-pulse {
          animation: dot-pulse 1.15s infinite alternate;
        }
        /* Desktop: step spacing */
        @media (min-width: 768px) {
          .md\\:flex > div.relative:not(:last-child) {
            margin-right: 80px;
          }
        }
      `}</style>
    </>
  );
}
