import Head from "next/head";

const STEPS = [
  {
    title: "Choose a Service",
    desc: "Select followers, likes, or views for any major platform. Every option is real, fast, and safe.",
    number: 1,
  },
  {
    title: "Enter Your Info",
    desc: "No passwords. Just your @username or a link. Orders are private, secure, and encrypted.",
    number: 2,
  },
  {
    title: "See Instant Results",
    desc: "Your boost starts in minutes and grows naturally. Track your order and reach support anytime.",
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
      <main className="max-w-4xl mx-auto px-4 py-20 relative">
        {/* Decorative Blue Glow (behind steps) */}
        <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
          <svg width="600" height="320" className="hidden md:block" style={{position:'absolute',top:'-50px',left:'50%',transform:'translateX(-50%)',zIndex:0}}><defs><radialGradient id="glow1" cx="50%" cy="55%" r="65%"><stop offset="0%" stopColor="#B4D8FF" stopOpacity="0.55"/><stop offset="95%" stopColor="#fff" stopOpacity="0"/></radialGradient></defs><ellipse cx="300" cy="150" rx="260" ry="110" fill="url(#glow1)"/></svg>
          <svg width="370" height="370" className="md:hidden" style={{position:'absolute',top:'0',left:'50%',transform:'translateX(-50%)',zIndex:0}}><defs><radialGradient id="glow2" cx="50%" cy="55%" r="65%"><stop offset="0%" stopColor="#B4D8FF" stopOpacity="0.55"/><stop offset="95%" stopColor="#fff" stopOpacity="0"/></radialGradient></defs><ellipse cx="185" cy="170" rx="140" ry="80" fill="url(#glow2)"/></svg>
        </div>

        {/* Decorative Connector Lines */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Desktop horizontal line */}
          <svg className="hidden md:block" width="100%" height="100" style={{position:'absolute',top:'70px',left:0,right:0}}><line x1="17%" y1="50%" x2="83%" y2="50%" stroke="#CFE4FF" strokeWidth="3" strokeDasharray="12 8" strokeLinecap="round" /></svg>
          {/* Mobile vertical line */}
          <svg className="md:hidden" width="100" height="270" style={{position:'absolute',top:'110px',left:'50%',transform:'translateX(-50%)'}}><line x1="50" y1="10" x2="50" y2="260" stroke="#CFE4FF" strokeWidth="3" strokeDasharray="10 10" strokeLinecap="round" /></svg>
        </div>

        <h1 className="text-4xl font-extrabold text-[#007BFF] text-center mb-2 relative z-10">
          How YesViral Works
        </h1>
        <p className="text-center text-[#444] mb-12 text-lg max-w-xl mx-auto relative z-10">
          Getting real growth is simple. Three steps, zero hassle—just results.
        </p>

        {/* Steps */}
        <div className="flex flex-col md:flex-row md:items-start items-center justify-center relative z-10">
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
          60% { opacity: 1; transform: scale(1.25);}
          100% { opacity: 0.7; transform: scale(1);}
        }
      `}</style>
    </>
  );
}
