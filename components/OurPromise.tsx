import { TrendingUp, ShieldCheck, UserCheck, Rocket } from "lucide-react";

export default function OurPromise() {
  return (
    <section
      id="our-promise"
      className="relative z-20 bg-white rounded-3xl shadow-3xl px-5 py-20 md:py-28 xl:px-28 mx-auto max-w-6xl mt-24 mb-16 border border-[#e5f2ff] overflow-hidden"
    >
      {/* Animated blue pulse bar */}
      <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[#003EFF] via-[#009DFF] to-[#20DEFF] animate-pulse z-30 rounded-t-3xl" />
      
      <div className="relative z-20 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-black text-[#003EFF] tracking-tighter mb-4">
          The YesViral Growth Pledge
        </h2>
        <p className="max-w-2xl mx-auto text-[#22426A] text-lg md:text-2xl font-semibold mb-12">
          Relentless innovation. Legendary security. Explosive social proof.<br />
          <span className="font-bold text-[#009DFF]">
            We’re always expanding, always upgrading—so you’re always ahead.
          </span>
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8 mt-2 relative z-20">
        {/* CARD 1 */}
        <div className="group bg-[#F7FBFF] border border-[#009DFF]/30 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-all duration-200">
          <Rocket size={44} className="text-[#009DFF] mb-3 animate-bounce" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#003EFF] mb-2">
            Relentless Growth
          </h3>
          <p className="text-[#22426A] text-base md:text-lg font-medium mb-2">
            Our network is always evolving. We’re unlocking new sources and strategies for viral results every month.
          </p>
          <span className="text-[#20DEFF] text-xs font-semibold uppercase tracking-wide">
            7X Network Expansion in 2024
          </span>
        </div>

        {/* CARD 2 */}
        <div className="group bg-[#F7FBFF] border border-[#1FA6FF]/25 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-all duration-200">
          <TrendingUp size={44} className="text-[#1FA6FF] mb-3 animate-pulse" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#003EFF] mb-2">
            Real Social Proof
          </h3>
          <p className="text-[#22426A] text-base md:text-lg font-medium mb-2">
            100% genuine engagement, never bots. Our reach and quality get stronger, so your results keep climbing.
          </p>
          <span className="text-[#1FA6FF] text-xs font-semibold uppercase tracking-wide">
            Avg. 21% More Engagement, Q2 2024
          </span>
        </div>

        {/* CARD 3 */}
        <div className="group bg-[#F7FBFF] border border-[#00DEB6]/25 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-all duration-200">
          <ShieldCheck size={44} className="text-[#00DEB6] mb-3 animate-pulse" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#003EFF] mb-2">
            Ironclad Security
          </h3>
          <p className="text-[#22426A] text-base md:text-lg font-medium mb-2">
            No passwords. No risks. Bank-level SSL and ethical practices—full control stays with you, always.
          </p>
          <span className="text-[#00DEB6] text-xs font-semibold uppercase tracking-wide">
            0 Security Incidents Since Launch
          </span>
        </div>

        {/* CARD 4 */}
        <div className="group bg-[#F7FBFF] border border-[#006CFF]/25 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-all duration-200">
          <UserCheck size={44} className="text-[#006CFF] mb-3 animate-bounce" />
          <h3 className="font-extrabold text-xl md:text-2xl text-[#003EFF] mb-2">
            Proactive Support
          </h3>
          <p className="text-[#22426A] text-base md:text-lg font-medium mb-2">
            30-day refill guarantee. Human support. If you drop, we restore—free, fast, no questions asked.
          </p>
          <span className="text-[#006CFF] text-xs font-semibold uppercase tracking-wide">
            98% Satisfaction, 24/7 Help
          </span>
        </div>
      </div>

      {/* Footer Statement */}
      <div className="flex flex-col items-center justify-center gap-4 mt-14">
        <span className="font-semibold text-[#003EFF] text-lg text-center px-2">
          <span className="font-black">YesViral</span> means you grow with the best—backed by constant innovation, trusted by creators everywhere.
        </span>
      </div>

      {/* Minimal keyframes for icons */}
      <style jsx>{`
        .animate-bounce {
          animation: bounce 1.7s infinite cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          40% { transform: translateY(-14%);}
        }
        .animate-pulse {
          animation: pulse 1.7s infinite cubic-bezier(.4,0,.6,1);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1;}
          50% { opacity: 0.7;}
        }
      `}</style>
    </section>
  );
}
