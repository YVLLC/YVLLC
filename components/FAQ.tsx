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
    <section id="faq" className="space-y-7 py-8 md:py-14">
      <h2 className="text-center text-4xl font-extrabold">Frequently Asked Questions</h2>
      <p className="text-center text-[#444] mb-4">
        Everything you need to know about our Services, Safety, and Support.
      </p>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map(({ question, answer }, idx) => (
          <div
            key={idx}
            className={`border border-gray-200 rounded-2xl px-5 py-4 cursor-pointer transition-all duration-200 ${
              open === idx ? "bg-[#F5FAFF] shadow-lg" : "bg-white"
            }`}
            onClick={() => toggle(idx)}
            tabIndex={0}
            onKeyDown={e => { if (e.key === "Enter") toggle(idx); }}
          >
            <div className="flex justify-between items-center select-none">
              <p className="font-semibold text-[#111] text-base">{question}</p>
              <ChevronDown
                className={`w-6 h-6 transition-transform ${open === idx ? "rotate-180" : "rotate-0"}`}
              />
            </div>
            <div
              style={{
                maxHeight: open === idx ? 200 : 0,
                overflow: "hidden",
                transition: "max-height 0.3s"
              }}
            >
              {open === idx && (
                <p className="mt-3 text-sm text-[#444]">{answer}</p>
              )}
            </div>
          </div>
        ))}
        <div className="text-center mt-4">
          <a href="/contact" className="text-[#007BFF] underline font-semibold hover:text-[#005FCC] text-sm">
            Didn’t find your answer? Chat with us!
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
