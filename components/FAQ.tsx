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
    <section id="faq" className="py-12 md:py-16">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-3 text-[#007BFF]">
        Frequently Asked Questions
      </h2>

      <p className="text-center text-[#444] mb-10 text-lg max-w-2xl mx-auto">
        Everything you need to know about our Services, Safety, and Support.
      </p>

      <div className="max-w-3xl mx-auto space-y-5">
        {faqs.map(({ question, answer }, idx) => {
          const isOpen = open === idx;

          return (
            <div
              key={idx}
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`faq-ans-${idx}`}
              onClick={() => toggle(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggle(idx);
              }}
              className={`
                border rounded-2xl px-6 py-5 cursor-pointer outline-none
                bg-white/90 backdrop-blur-md
                shadow-[0_4px_20px_rgba(0,123,255,0.06)]
                transition-all duration-300
                group 
                ${isOpen ? "border-[#007BFF] shadow-xl scale-[1.02]" : "border-[#dce9ff] hover:border-[#A5D1FF] hover:shadow-lg"}
              `}
            >
              {/* Header Row */}
              <div className="flex items-center gap-3">
                <span
                  className={`
                    w-[7px] h-[7px] rounded-full transition-all
                    ${isOpen ? "bg-[#007BFF] scale-125 shadow-sm" : "bg-[#99BEEB]"}
                  `}
                />

                <span className="font-semibold text-[#111] text-base sm:text-lg flex-1">
                  {question}
                </span>

                <ChevronDown
                  className={`
                    w-6 h-6 transition-transform
                    ${isOpen ? "rotate-180 text-[#007BFF]" : "text-[#A0B3C7]"}
                  `}
                />
              </div>

              {/* Answer */}
              <div
                id={`faq-ans-${idx}`}
                className={`overflow-hidden transition-all duration-300`}
                style={{
                  maxHeight: isOpen ? 300 : 0,
                  opacity: isOpen ? 1 : 0,
                  marginTop: isOpen ? 14 : 0,
                }}
              >
                <div className="text-[#222] text-[15px] leading-relaxed">
                  {answer}
                </div>
              </div>
            </div>
          );
        })}

        {/* Contact CTA */}
        <div className="text-center mt-8">
          <a
            href="/contact"
            className="inline-block text-[#007BFF] font-semibold underline underline-offset-4 hover:text-[#005FCC] transition text-base"
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
