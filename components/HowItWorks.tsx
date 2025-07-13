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

        {/* Steps */}
        <div className="flex flex-col md:flex-row md:items-start items-center justify-center relative">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center flex-1 min-w-[180px] max-w-xs mb-12 md:mb-0"
            >
              {/* Step circle number */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full border-4 border-[#007BFF] bg-white text-2xl font-extrabold text-[#007BFF] shadow-lg mb-4 z-10">
                {step.number}
              </div>
              {/* Step Title */}
              <h2 className="text-lg font-bold text-[#111] mb-2">{step.title}</h2>
              <p className="text-[#444] text-base max-w-[240px] mx-auto">{step.desc}</p>
              {/* Connector Dots: show unless last step */}
              {idx < STEPS.length - 1 && (
                <>
                  {/* Desktop: horizontal */}
                  <div className="hidden md:block absolute top-1/2 right-[-40px] w-[80px] h-0 flex items-center z-0">
                    <div className="flex w-full items-center justify-center">
                      {[...Array(5)].map((_, d) => (
                        <span
                          key={d}
                          className="inline-block w-2 h-2 mx-[3px] rounded-full bg-[#007BFF] opacity-80"
                          style={{
                            animation: "dotPulse 1.2s infinite alternate",
                            animationDelay: `${d * 0.12}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Mobile: vertical */}
                  <div className="md:hidden flex flex-col items-center mt-4 mb-[-32px]">
                    {[...Array(5)].map((_, d) => (
                      <span
                        key={d}
                        className="inline-block w-2 h-2 my-[3px] rounded-full bg-[#007BFF] opacity-80"
                        style={{
                          animation: "dotPulse 1.2s infinite alternate",
                          animationDelay: `${d * 0.12}s`
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
      <style jsx>{`
        @keyframes dotPulse {
          0% { opacity: 0.7; transform: scale(1);}
          60% { opacity: 1; transform: scale(1.35);}
          100% { opacity: 0.7; transform: scale(1);}
        }
      `}</style>
    </>
  );
}
