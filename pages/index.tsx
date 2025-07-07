import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Are these real followers and likes?",
      a: "Yes — we use tested promotion systems that provide real and lasting engagement."
    },
    {
      q: "Do you need my password?",
      a: "Never. Just your username or post URL is enough."
    },
    {
      q: "How fast is delivery?",
      a: "Most orders start processing within 0–30 minutes after payment."
    }
  ];

  return (
    <>
      <Head>
        <title>YesViral – Buy Real Followers, Likes & Views</title>
        <meta
          name="description"
          content="Grow your social media with YesViral. Buy real followers, likes, views, and more across Instagram, TikTok, YouTube & beyond — fast, secure, and trusted."
        />
      </Head>

      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-16 space-y-28">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#007BFF] leading-tight">
              Supercharge Your Social Growth Instantly
            </h1>
            <p className="text-[#444] text-base sm:text-lg max-w-xl mx-auto md:mx-0">
              Get real followers, likes, and views in minutes. Trusted by over 100,000 creators and brands worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link href="/checkout">
                <button className="bg-[#007BFF] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-[#005FCC] transition text-lg">
                  View Services
                </button>
              </Link>
              <Link href="/track-order">
                <button className="bg-white text-[#007BFF] border border-[#007BFF] font-semibold px-8 py-3 rounded-xl hover:bg-[#E6F0FF] transition text-lg">
                  Try Free Likes
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/hero-illustration.svg"
              alt="Social Media Growth"
              width={500}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Why YesViral */}
        <section id="about" className="bg-[#F9FAFB] p-10 rounded-2xl text-center shadow-sm space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111]">Why Choose YesViral?</h2>
          <p className="text-[#444] max-w-3xl mx-auto text-base sm:text-lg">
            We’re not just another reseller. We’re a full-scale growth engine. Lightning-fast delivery, 24/7 support, and real engagement.
          </p>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="space-y-10">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">How It Works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {["Choose a Service", "Enter Info", "Get Results"].map((title, i) => (
              <div key={i} className="bg-white border border-[#CFE4FF] rounded-xl p-6 shadow-md hover:shadow-xl transition">
                <div className="text-4xl font-bold text-[#007BFF] mb-3">{i + 1}</div>
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-sm text-[#444]">
                  {i === 0
                    ? "Pick your platform and what you need — followers, likes, or views."
                    : i === 1
                    ? "Just your username or post URL. No password ever required."
                    : "See growth begin in minutes — smooth, secure, and fast."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="space-y-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[{
              quote: "I gained real followers in under an hour — and they didn’t drop!",
              name: "Taylor M."
            }, {
              quote: "Great support, great pricing, real growth. Worth every cent.",
              name: "Jake B."
            }].map(({ quote, name }) => (
              <div key={name} className="bg-white border border-gray-200 p-6 rounded-xl shadow">
                <p className="italic text-[#111]">“{quote}”</p>
                <p className="mt-3 text-sm text-[#444] font-semibold">– {name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map(({ q, a }, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 cursor-pointer" onClick={() => toggleFaq(index)}>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-[#111]">{q}</p>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${openFaq === index ? "rotate-180" : "rotate-0"}`}
                  />
                </div>
                {openFaq === index && (
                  <p className="mt-3 text-sm text-[#444]">{a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4 mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Go Viral?</h2>
          <p className="text-[#444] text-base sm:text-lg">
            Start growing now — choose your package and watch your stats climb.
          </p>
          <Link href="/checkout">
            <button className="bg-[#007BFF] text-white px-8 py-3 text-lg rounded-xl hover:bg-[#005FCC] transition">
              View Services
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
