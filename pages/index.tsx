import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    question: "Are these real followers and likes?",
    answer: "Yes — we use tested promotion systems that provide real and lasting engagement."
  },
  {
    question: "Do you need my password?",
    answer: "Never. Just your username or post URL is enough."
  },
  {
    question: "How fast is delivery?",
    answer: "Most orders start processing within 0–30 minutes after payment."
  }
];

const SERVICES = [
  {
    name: "Instagram Followers",
    price: "$0.09 / 100",
    description: "Boost your IG presence with real followers."
  },
  {
    name: "TikTok Likes",
    price: "$0.08 / 100",
    description: "Get instant likes on your videos."
  },
  {
    name: "YouTube Views",
    price: "$0.05 / 1000",
    description: "Skyrocket your video reach and impressions."
  }
];

const HOW_IT_WORKS = [
  {
    title: "Choose a Service",
    description: "Pick your platform and what you need — followers, likes, or views."
  },
  {
    title: "Enter Info",
    description: "Just your username or post URL. No password ever required."
  },
  {
    title: "Get Results",
    description: "See growth begin in minutes — smooth, secure, and fast."
  }
];

const TESTIMONIALS = [
  {
    quote: "I gained real followers in under an hour — and they didn’t drop!",
    name: "Taylor M."
  },
  {
    quote: "Great support, great pricing, real growth. Worth every cent.",
    name: "Jake B."
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  return (
    <>
      <Head>
        <title>YesViral – Buy Real Followers, Likes & Views</title>
        <meta
          name="description"
          content="Grow your social media with YesViral. Buy real followers, likes, views, and more across Instagram, TikTok, YouTube & beyond — fast, secure, and trusted."
        />
      </Head>

      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-16 space-y-28 select-none">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#007BFF] leading-tight">
              Supercharge Your Social Growth Instantly
            </h1>
            <p className="text-[#444] text-base sm:text-lg max-w-xl mx-auto md:mx-0">
              Get real followers, likes, and views in minutes. Trusted by over 100,000 creators and brands worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link href="#order">
                <button className="bg-[#007BFF] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-[#005FCC] transition text-lg">
                  Order Now
                </button>
              </Link>
              <Link href="/track-order">
                <button className="bg-white text-[#007BFF] border border-[#007BFF] font-semibold px-8 py-3 rounded-xl hover:bg-[#E6F0FF] transition text-lg">
                  Try Free Likes
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <Image
              src="/hero-illustration.png"
              alt="Social Media Growth"
              width={500}
              height={400}
              className="w-full max-w-[400px] h-auto object-contain"
              draggable={false}
              unselectable="on"
            />
          </div>
        </section>

        {/* Instant Order */}
        <section id="order" className="space-y-10">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">Place Your Order Instantly</h2>
          <p className="text-[#444] text-center max-w-2xl mx-auto">
            Choose your service and get started without logging in.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ name, price, description }, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#CFE4FF] rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#111] mb-2">{name}</h3>
                  <p className="text-sm text-[#444] mb-4">{description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#007BFF]">{price}</span>
                  <Link href="/checkout">
                    <button className="bg-[#007BFF] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#005FCC]">
                      Order
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="about" className="bg-[#F9FAFB] p-10 rounded-2xl text-center shadow-sm space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111]">Why Choose YesViral?</h2>
          <p className="text-[#444] max-w-3xl mx-auto text-base sm:text-lg">
            We’re not just another reseller. We’re a full-scale growth engine. Lightning-fast delivery, 24/7 support, and real engagement from real users.
          </p>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="space-y-10">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">How It Works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {HOW_IT_WORKS.map(({ title, description }, i) => (
              <div key={i} className="bg-white border border-[#CFE4FF] rounded-xl p-6 shadow-md hover:shadow-xl transition">
                <div className="text-4xl font-bold text-[#007BFF] mb-3">{i + 1}</div>
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-sm text-[#444]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="space-y-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map(({ quote, name }, i) => (
              <div key={i} className="bg-white border border-gray-200 p-6 rounded-xl shadow">
                <p className="italic text-[#111]">“{quote}”</p>
                <p className="mt-3 text-sm text-[#444] font-semibold">– {name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section id="faq" className="space-y-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map(({ question, answer }, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 cursor-pointer" onClick={() => toggleFaq(index)}>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-[#111]">{question}</p>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === index ? "rotate-180" : "rotate-0"}`} />
                </div>
                {openFaq === index && (
                  <p className="mt-3 text-sm text-[#444]">{answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call To Action */}
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