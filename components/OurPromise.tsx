import { TrendingUp, ShieldCheck, UserCheck, Rocket } from "lucide-react";

export default function OurPromise() {
  return (
    <section
      id="our-promise"
      className="relative z-10 bg-white rounded-3xl shadow-xl px-5 py-16 md:py-24 xl:px-20 mx-auto max-w-5xl mt-20 mb-14 border border-[#CFE4FF] overflow-hidden"
    >
      <div className="flex flex-col items-center text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-4 tracking-tight">
          The YesViral Promise
        </h2>
        <p className="max-w-2xl mx-auto text-[#444444] text-lg md:text-xl font-medium">
          We are always growing—expanding our network, upgrading our technology, and obsessing over your results.
          Experience real engagement, ironclad safety, and relentless innovation, every single day.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {/* CARD 1 */}
        <div className="group bg-[#E6F0FF] border border-[#CFE4FF] rounded-2xl shadow-md p-8 flex flex-col items-center transition-all duration-150 hover:border-[#005FCC] hover:shadow-lg">
          <Rocket size={40} className="text-[#007BFF] mb-3" />
          <h3 className="font-extrabold text-xl text-[#111111] mb-2 text-center">
            Always Expanding
          </h3>
          <p className="text-[#444444] text-base text-center font-medium mb-2">
            Our network keeps growing—unlocking new sources, platforms, and strategies for your next-level reach.
          </p>
          <span className="text-[#888888] text-xs mt-1">
            7X network scale since 2023
          </span>
        </div>
        {/* CARD 2 */}
        <div className="group bg-[#E6F0FF] border border-[#CFE4FF] rounded-2xl shadow-md p-8 flex flex-col items-center transition-all duration-150 hover:border-[#005FCC] hover:shadow-lg">
          <TrendingUp size={40} className="text-[#007BFF] mb-3" />
          <h3 className="font-extrabold text-xl text-[#111111] mb-2 text-center">
            Real Results
          </h3>
          <p className="text-[#444444] text-base text-center font-medium mb-2">
            Only real, high-quality engagement—no bots, ever. Your growth is authentic and designed to last.
          </p>
          <span className="text-[#888888] text-xs mt-1">
            21% avg. engagement lift in 2024
          </span>
        </div>
        {/* CARD 3 */}
        <div className="group bg-[#E6F0FF] border border-[#CFE4FF] rounded-2xl shadow-md p-8 flex flex-col items-center transition-all duration-150 hover:border-[#005FCC] hover:shadow-lg">
          <ShieldCheck size={40} className="text-[#007BFF] mb-3" />
          <h3 className="font-extrabold text-xl text-[#111111] mb-2 text-center">
            Total Security
          </h3>
          <p className="text-[#444444] text-base text-center font-medium mb-2">
            No logins, no risks. 256-bit SSL and privacy-first by design—your account stays safe and in your control.
          </p>
          <span className="text-[#888888] text-xs mt-1">
            0 security incidents. 100% safe.
          </span>
        </div>
      </div>
      {/* Footer Statement */}
      <div className="flex flex-col items-center justify-center gap-2 mt-12">
        <span className="font-semibold text-[#111111] text-base text-center px-2">
          <span className="text-[#007BFF] font-black">YesViral</span> is committed to your growth—today, tomorrow, and every step forward.
        </span>
      </div>
    </section>
  );
}
