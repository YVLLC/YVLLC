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
        {/* Steps Timeline */}
        <div className="relative flex flex-col md:flex-row items-center md:justify-between md:space-x-0 space-y-12 md:space-y-0">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center w-full md:w-1/3 relative">
              {/* Circle Number */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-[#007BFF] bg-white text-2xl font-extrabold text-[#007BFF] shadow-lg z-10 mb-4">
                {step.number}
              </div>
              {/* Connector line: show unless last */}
              {idx < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-full z-0">
                  <div className="w-[calc(100%+36px)] h-2 flex items-center">
                    {/* Dotted line effect */}
                    <div className="flex-1 border-t-4 border-dotted border-[#007BFF] mx-2"></div>
                  </div>
                </div>
              )}
              {/* Step Text */}
              <h2 className="text-lg font-extrabold text-[#111] mb-2 text-center">{step.title}</h2>
              <p className="text-[#444] text-base max-w-[260px] mx-auto text-center">{step.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <style jsx>{`
        @media (max-width: 767px) {
          .step-connector {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
