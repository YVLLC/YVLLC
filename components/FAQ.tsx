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
    <section id="faq" className="py-10 md:py-14">
      <h2 className="text-center text-4xl font-extrabold mb-3">Frequently Asked Questions</h2>
      <p className="text-center text-[#444] mb-8 text-lg">Everything you need to know about our Services, Safety, and Support.</p>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map(({ question, answer }, idx) => (
          <div
            key={idx}
            tabIndex={0}
            aria-expanded={open === idx}
            aria-controls={`faq-ans-${idx}`}
            className={`
              transition-all duration-300
              border border-[#e3edfc]
              rounded-2xl px-6 py-5
              bg-white/80 backdrop-blur
              shadow-[0_2px_16px_0_rgba(24,124,255,0.07)]
              hover:shadow-[0_4px_32px_0_rgba(24,124,255,0.14)]
              group cursor-pointer
              outline-none
              ${open === idx ? "border-[#007BFF] shadow-lg scale-[1.017]" : "hover:border-[#81cbff]"}
            `}
            onClick={() => toggle(idx)}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") toggle(idx); }}
            style={{ marginBottom: 0 }}
          >
            <div className="flex items-center gap-3">
              {/* Sleek, tiny dot accent */}
              <span className={`w-[7px] h-[7px] rounded-full transition bg-[#007BFF] ${open === idx ? "scale-110 shadow" : "opacity-70"}`} />
              <span className="font-semibold text-[#111] text-base sm:text-lg flex-1">{question}</span>
              <ChevronDown
                className={`
                  w-6 h-6 ml-2 transition-transform
                  ${open === idx ? "rotate-180 text-[#007BFF]" : "text-[#A0B3C7]"}
                `}
              />
            </div>
            <div
              id={`faq-ans-${idx}`}
              className="transition-all duration-300 overflow-hidden"
              style={{
                maxHeight: open === idx ? 200 : 0,
                opacity: open === idx ? 1 : 0,
                marginTop: open === idx ? 12 : 0
              }}
            >
              <div className="text-[#222] text-[15px] leading-relaxed">
                {answer}
              </div>
            </div>
          </div>
        ))}
        <div className="text-center mt-6">
          <a
            href="/contact"
            className="inline-block text-[#007BFF] font-semibold underline underline-offset-2 hover:text-[#005FCC] transition text-base"
            style={{ textDecorationThickness: 2 }}
          >
            Didn’t find your answer? Chat with us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
