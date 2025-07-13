import Head from "next/head";

const STEPS = [
  {
    title: "Choose a Service",
    desc: "Pick what you need—followers, likes, or views—across Instagram, TikTok, YouTube and more. Every option is real, fast, and totally secure.",
    number: 1,
  },
  {
    title: "Enter Your Info",
    desc: "Just your username or post link—never your password. Your privacy is always protected with encrypted, no-login orders.",
    number: 2,
  },
  {
    title: "See Results Instantly",
    desc: "Sit back and watch your numbers grow within minutes. Track your order live, and our team is here for support any time.",
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
          content="Learn how YesViral delivers real Followers, Likes, and Views to your social media profiles in 3 simple steps."
        />
      </Head>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#007BFF] text-center mb-2">How YesViral Works</h1>
        <p className="text-center text-[#444] mb-14 text-lg max-w-xl mx-auto">
          Growth made simple. Here’s how thousands use YesViral every day to boost their socials—fast, secure, and with total confidence.
        </p>

        <div className="relative flex flex-col md:flex-row items-center md:justify-between gap-10 md:gap-0">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center flex-1 relative z-10">
              <div className="w-14 h-14 flex items-center justify-center rounded-full border-4 border-[#007BFF] bg-white text-2xl font-extrabold text-[#007BFF] shadow-md mb-3">
                {step.number}
              </div>
              <h2 className="text-lg font-bold text-[#111] mb-1">{step.title}</h2>
              <p className="text-[#444] text-base max-w-[240px]">{step.desc}</p>
              {/* Connector Dots (except last step) */}
              {idx < STEPS.length - 1 && (
                <div className="hidden md:block absolute right-[-30px] top-1/2 -translate-y-1/2 z-0">
                  <div className="flex items-center">
                    {/* 3 blue dots for visual flow */}
                    {[...Array(3)].map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className="inline-block w-2 h-2 mx-[3px] rounded-full bg-[#007BFF] opacity-80 animate-pulse"
                        style={{ animationDelay: `${dotIdx * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <style jsx>{`
        @media (max-width: 767px) {
          .connector {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
