import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  faqs: FAQItem[];
};

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (idx: number) => setOpen(open === idx ? null : idx);

  return (
    <section id="faq" className="py-12 px-2 sm:px-0 relative">
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#e3f1ff00] via-[#eef7ff0f] to-[#d8e8ff55]" />
      <h2 className="text-center text-4xl font-extrabold mb-3">Frequently Asked Questions</h2>
      <p className="text-center text-[#444] mb-8 text-lg">Everything you need to know about our Services, Safety, and Support.</p>
      <div className="max-w-3xl mx-auto space-y-7 relative z-10">
        {faqs.map(({ question, answer }, idx) => (
          <div
            key={idx}
            tabIndex={0}
            role="button"
            aria-expanded={open === idx}
            aria-controls={`faq-ans-${idx}`}
            className={`group border-2 bg-white bg-opacity-80 backdrop-blur rounded-2xl px-6 py-5 shadow-xl transition-all duration-300
              cursor-pointer transform
              ${open === idx
                ? "border-[#2EB0FF] ring-2 ring-[#88e0ff80] scale-[1.03] animate-glow"
                : "border-[#e3edfc] hover:scale-102 hover:shadow-2xl"}
            `}
            onClick={() => toggle(idx)}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") toggle(idx); }}
            style={{
              boxShadow: open === idx
                ? "0 4px 32px 0 #30d0ff29, 0 2px 18px #45a7f33a"
                : "0 2px 14px 0 #b5d2ff2a"
            }}
          >
            <div className="flex justify-between items-center gap-3 select-none">
              <p className="font-bold text-[#111] text-base sm:text-lg tracking-tight">{question}</p>
              <span
                className={`transition-transform duration-300 ease-[cubic-bezier(.7,1.7,.3,.8)] 
                  flex items-center justify-center
                  ${open === idx ? "rotate-180 text-[#2EB0FF] animate-bouncechev" : "text-[#A0B3C7]"}`}
              >
                <ChevronDown className="w-7 h-7 drop-shadow" />
              </span>
            </div>
            <div
              id={`faq-ans-${idx}`}
              className="transition-all duration-400 ease-[cubic-bezier(.7,1.7,.3,.8)] overflow-hidden"
              style={{
                maxHeight: open === idx ? 500 : 0,
                paddingTop: open === idx ? 20 : 0,
                opacity: open === idx ? 1 : 0,
              }}
            >
              <div className="rounded-xl bg-gradient-to-br from-[#ebf6ff] via-[#d7f1ff] to-[#f3fbff] px-4 py-3 shadow-inner text-[#0b2540] text-sm sm:text-base font-medium">
                {answer}
              </div>
            </div>
          </div>
        ))}
        <div className="text-center mt-6">
          <a
            href="/contact"
            className="inline-block px-6 py-2 rounded-xl bg-gradient-to-br from-[#2EB0FF] to-[#63f0e8] text-white font-bold shadow-md hover:from-[#007BFF] hover:to-[#00e3ff] transition text-base"
          >
            Didn’t find your answer? Chat with us!
          </a>
        </div>
      </div>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes glow {
          0% { box-shadow: 0 0 0 #30d0ff00; }
          50% { box-shadow: 0 0 24px #40e2ff88, 0 2px 18px #45a7f34a; }
          100% { box-shadow: 0 0 0 #30d0ff00; }
        }
        .animate-glow {
          animation: glow 2s infinite alternate;
        }
        @keyframes bouncechev {
          0% { transform: rotate(180deg) translateY(0);}
          30% { transform: rotate(180deg) translateY(-4px);}
          55% { transform: rotate(180deg) translateY(1.5px);}
          80% { transform: rotate(180deg) translateY(-2.5px);}
          100% { transform: rotate(180deg) translateY(0);}
        }
        .animate-bouncechev {
          animation: bouncechev 1.7s cubic-bezier(.67,.2,.36,1.38) infinite;
        }
      `}</style>
    </section>
  );
};

export default FAQ;
