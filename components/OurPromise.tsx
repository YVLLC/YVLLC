import { TrendingUp, ShieldCheck, Rocket } from "lucide-react";

export default function OurPromise() {
  return (
    <section
      id="our-promise"
      className="
        relative z-10 
        bg-white/90 backdrop-blur-xl 
        rounded-3xl shadow-xl 
        px-6 py-16 md:py-24 
        mx-auto max-w-5xl 
        mt-20 mb-14 
        border border-[#CFE4FF]
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div className="flex flex-col items-center text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#007BFF]">
         Our Promise
        </h2>
        <p className="max-w-2xl mx-auto text-[#444444] text-lg md:text-xl leading-relaxed font-medium">
          We are always growing—expanding our network, upgrading our technology,
          and obsessing over your results. Experience real engagement,
          ironclad safety, and relentless innovation.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        
        {/* CARD 1 */}
        <div
          className="
            group bg-[#E6F0FF]/70 backdrop-blur-md 
            border border-[#CFE4FF] 
            rounded-2xl shadow-md 
            p-8 flex flex-col items-center text-center
            transition-all duration-300 
            hover:-translate-y-1 hover:shadow-lg hover:border-[#007BFF]
          "
        >
          <Rocket size={42} className="text-[#007BFF] mb-3" />
          <h3 className="font-extrabold text-xl text-[#111111] mb-2">
            Always Expanding
          </h3>
          <p className="text-[#444444] text-base font-medium leading-relaxed">
            Our network grows constantly—unlocking new sources, platforms, 
            and strategies for unmatched reach.
          </p>
          <span className="text-[#888888] text-xs mt-3">
            7X network scale since 2021
          </span>
        </div>

        {/* CARD 2 */}
        <div
          className="
            group bg-[#E6F0FF]/70 backdrop-blur-md 
            border border-[#CFE4FF] 
            rounded-2xl shadow-md 
            p-8 flex flex-col items-center text-center
            transition-all duration-300 
            hover:-translate-y-1 hover:shadow-lg hover:border-[#007BFF]
          "
        >
          <TrendingUp size={42} className="text-[#007BFF] mb-3" />
          <h3 className="font-extrabold text-xl text-[#111111] mb-2">
            High-Quality Results
          </h3>
          <p className="text-[#444444] text-base font-medium leading-relaxed">
            Only real, high-quality engagement—no bots.  
            Your growth is authentic, natural, and built to last.
          </p>
          <span className="text-[#888888] text-xs mt-3">
            21% avg. engagement lift in 2024
          </span>
        </div>

        {/* CARD 3 */}
        <div
          className="
            group bg-[#E6F0FF]/70 backdrop-blur-md 
            border border-[#CFE4FF] 
            rounded-2xl shadow-md 
            p-8 flex flex-col items-center text-center
            transition-all duration-300 
            hover:-translate-y-1 hover:shadow-lg hover:border-[#007BFF]
          "
        >
          <ShieldCheck size={42} className="text-[#007BFF] mb-3" />
          <h3 className="font-extrabold text-xl text-[#111111] mb-2">
            Total Security
          </h3>
          <p className="text-[#444444] text-base font-medium leading-relaxed">
            No logins, no risks.  
            SSL encryption & privacy-first design ensure your account stays safe.
          </p>
          <span className="text-[#888888] text-xs mt-3">
            0 security incidents. 100% safe.
          </span>
        </div>
      </div>

      {/* FOOTER TEXT */}
      <div className="flex flex-col items-center justify-center gap-2 mt-14 px-4">
        <span className="font-semibold text-[#111111] text-base text-center leading-relaxed">
          <span className="text-[#007BFF] font-black">YesViral</span> is committed to your growth.  
          Every service is Powered by Eexclusive, High-Performance Private Networks—
          Elevating quality, Reliability, and results across the industry.
        </span>
      </div>
    </section>
  );
}
