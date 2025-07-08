import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ShieldCheck, Clock, UserCheck, Zap, Star, ThumbsUp, MessageCircle } from "lucide-react";
import { useState } from "react";

const BRAND = {
  blue: "#007BFF",
  blueDark: "#005FCC",
  bgLight: "#F5FAFF",
  border: "#CFE4FF",
  text: "#222",
  textMuted: "#444"
};

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
  },
  {
    question: "What payment methods do you accept?",
    answer: "All major cards, Apple Pay, Google Pay, and secure crypto payments."
  }
];

const SERVICES = [
  {
    name: "Instagram Service",
    price: "$0.09 / 100",
    description: "Boost your IG presence with real followers.",
    icon: (
      <svg width={28} height={28} viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="16" fill="#F9E5F6"/>
        <g>
          <circle cx="24" cy="24" r="14" fill="#fff"/>
          <path d="M24 16a8 8 0 100 16 8 8 0 000-16zm0 13a5 5 0 110-10 5 5 0 010 10zm6.25-12.5a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z" fill="#E1306C"/>
        </g>
      </svg>
    ),
    tag: "Bestseller",
    count: "2,000+ bought this week"
  },
  {
    name: "TikTok Service",
    price: "$0.08 / 100",
    description: "Get instant likes on your videos.",
    icon: (
      <svg width={28} height={28} viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="16" fill="#E3F4FE"/>
        <g>
          <circle cx="24" cy="24" r="14" fill="#fff"/>
          <path d="M32 20.19a4.09 4.09 0 01-2.13-.61 4.09 4.09 0 01-1.44-1.71V30.5a6.5 6.5 0 11-6.5-6.5" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
          <path d="M29 13v4.41a4.09 4.09 0 002.13.61" stroke="#00F2EA" strokeWidth="2" strokeLinecap="round"/>
          <path d="M27.5 17.4V29.4a4.9 4.9 0 11-4.9-4.9" stroke="#FE2C55" strokeWidth="2" strokeLinecap="round"/>
        </g>
      </svg>
    ),
    tag: "🔥 Hot",
    count: "1,400+ bought this week"
  },
  {
    name: "YouTube Service",
    price: "$0.05 / 1000",
    description: "Skyrocket your video reach and impressions.",
    icon: (
      <svg width={28} height={28} viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="16" fill="#FEECE3"/>
        <g>
          <circle cx="24" cy="24" r="14" fill="#fff"/>
          <path d="M30 24l-8 5V19l8 5z" fill="#FF0000"/>
        </g>
      </svg>
    ),
    tag: "",
    count: "950+ bought this week"
  }
];

const HOW_IT_WORKS = [
  {
    icon: <Zap size={32} className="mx-auto text-blue-400" />,
    title: "Choose a Service",
    description: "Pick your platform and what you need — followers, likes, or views."
  },
  {
    icon: <UserCheck size={32} className="mx-auto text-blue-400" />,
    title: "Enter Info",
    description: "Just your username or post URL. No password ever required."
  },
  {
    icon: <Clock size={32} className="mx-auto text-blue-400" />,
    title: "Get Results",
    description: "See growth begin in minutes — smooth, secure, and fast."
  }
];

const TESTIMONIALS = [
  {
    quote: "I gained real followers in under an hour — and they didn’t drop!",
    name: "Taylor M.",
    platform: "Instagram",
    icon: (
      <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="16" fill="#F9E5F6"/>
        <g>
          <circle cx="24" cy="24" r="14" fill="#fff"/>
          <path d="M24 16a8 8 0 100 16 8 8 0 000-16zm0 13a5 5 0 110-10 5 5 0 010 10zm6.25-12.5a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z" fill="#E1306C"/>
        </g>
      </svg>
    )
  },
  {
    quote: "Great support, great pricing, real growth. Worth every cent.",
    name: "Jake B.",
    platform: "TikTok",
    icon: (
      <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="16" fill="#E3F4FE"/>
        <g>
          <circle cx="24" cy="24" r="14" fill="#fff"/>
          <path d="M32 20.19a4.09 4.09 0 01-2.13-.61 4.09 4.09 0 01-1.44-1.71V30.5a6.5 6.5 0 11-6.5-6.5" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
          <path d="M29 13v4.41a4.09 4.09 0 002.13.61" stroke="#00F2EA" strokeWidth="2" strokeLinecap="round"/>
          <path d="M27.5 17.4V29.4a4.9 4.9 0 11-4.9-4.9" stroke="#FE2C55" strokeWidth="2" strokeLinecap="round"/>
        </g>
      </svg>
    )
  },
  {
    quote: "The only site I trust. Super fast and my YouTube blew up.",
    name: "Lina S.",
    platform: "YouTube",
    icon: (
      <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="16" fill="#FEECE3"/>
        <g>
          <circle cx="24" cy="24" r="14" fill="#fff"/>
          <path d="M30 24l-8 5V19l8 5z" fill="#FF0000"/>
        </g>
      </svg>
    )
  }
];

const TRUST_ICONS = [
  { src: "/visa.svg", alt: "Visa" },
  { src: "/mastercard.svg", alt: "Mastercard" },
  { src: "/applepay.svg", alt: "Apple Pay" },
  { src: "/googlepay.svg", alt: "Google Pay" },
  { src: "/btc.svg", alt: "Bitcoin" }
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
      {/* Sticky Chat/Support CTA */}
      <Link href="/support" className="fixed bottom-6 right-6 z-50">
        <button className="flex items-center gap-2 bg-white shadow-lg px-5 py-3 rounded-full border border-[#CFE4FF] hover:bg-[#F2F9FF] transition group">
          <MessageCircle className="text-[#007BFF] group-hover:scale-110 transition" size={20} />
          <span className="font-semibold text-[#007BFF] text-sm">Live Support</span>
        </button>
      </Link>

      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-14 space-y-28 select-none">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-7 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FF] rounded-full mb-2 text-xs font-bold text-[#007BFF] tracking-wide shadow-sm">
              <Star size={16} className="text-yellow-400" />
              Trusted by 100,000+ Creators
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-[#007BFF] leading-tight drop-shadow-sm">
              Blow Up Your Socials. <br /> Real Growth. No Waiting.
            </h1>
            <p className="text-[#444] text-lg max-w-xl mx-auto md:mx-0 font-medium">
              Get real followers, likes, and views in minutes. No logins, no risk. Start your viral growth journey with YesViral.
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
            {/* Trust icons */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
              {TRUST_ICONS.map(({ src, alt }, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={alt}
                  width={36}
                  height={36}
                  className="object-contain opacity-80"
                  unselectable="on"
                  draggable={false}
                />
              ))}
              <span className="ml-2 text-xs text-[#555] font-medium mt-2 hidden sm:inline">
                100% Secure Payments
              </span>
            </div>
          </div>
          <div className="hidden md:flex justify-center animate-fadeIn">
            <Image
              src="/hero-illustration.png"
              alt="Social Media Growth"
              width={480}
              height={400}
              className="w-full max-w-[420px] h-auto object-contain drop-shadow-2xl"
              draggable={false}
              unselectable="on"
              priority
            />
          </div>
        </section>

        {/* Instant Order */}
        <section id="order" className="space-y-10">
          <h2 className="text-center text-4xl font-extrabold">Place Your Order Instantly</h2>
          <p className="text-[#444] text-center max-w-2xl mx-auto">
            Choose your service — no logins, no commitment. <span className="font-semibold text-[#007BFF]">Instant delivery starts within minutes.</span>
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(({ name, price, description, icon, tag, count }, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-2xl transition group flex flex-col gap-3 relative"
              >
                {tag && (
                  <span className="absolute top-4 right-5 bg-[#E8F1FF] text-[#007BFF] text-xs font-bold px-3 py-1 rounded-full shadow">{tag}</span>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-[#F5FAFF] p-2 rounded-full">{icon}</div>
                  <h3 className="text-xl font-bold text-[#111]">{name}</h3>
                </div>
                <p className="text-sm text-[#444]">{description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium text-[#007BFF]">{price}</span>
                  <span className="text-xs text-[#111] bg-[#E8F1FF] px-2 py-0.5 rounded">{count}</span>
                </div>
                <Link href="/checkout" className="mt-4">
                  <button className="w-full bg-[#007BFF] text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-[#005FCC] shadow transition transform hover:scale-[1.03] active:scale-95">
                    Order
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="about" className="bg-[#F5FAFF] p-12 rounded-2xl text-center shadow-sm space-y-8">
          <h2 className="text-4xl font-extrabold text-[#111]">Why Choose YesViral?</h2>
          <div className="flex flex-wrap gap-7 justify-center mt-6">
            <div className="flex flex-col items-center max-w-[170px]">
              <Zap className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Instant Start</span>
              <span className="text-sm text-[#444]">Growth begins in 1–10 min</span>
            </div>
            <div className="flex flex-col items-center max-w-[170px]">
              <UserCheck className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Real Users</span>
              <span className="text-sm text-[#444]">100% authentic, lasting</span>
            </div>
            <div className="flex flex-col items-center max-w-[170px]">
              <ShieldCheck className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Safe & Secure</span>
              <span className="text-sm text-[#444]">No passwords, 256-bit SSL</span>
            </div>
            <div className="flex flex-col items-center max-w-[170px]">
              <Clock className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">24/7 Support</span>
              <span className="text-sm text-[#444]">Chat any time, any day</span>
            </div>
            <div className="flex flex-col items-center max-w-[170px]">
              <Star className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Money-back</span>
              <span className="text-sm text-[#444]">If not delivered as promised</span>
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-7 text-[#007BFF] font-bold text-lg">
            <span>19M+ followers delivered</span>
            <span className="hidden sm:inline">Rated 4.8/5 by 10,000+ clients</span>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="space-y-10">
          <h2 className="text-center text-4xl font-extrabold">How It Works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {HOW_IT_WORKS.map(({ title, description, icon }, i) => (
              <div key={i} className="bg-white border border-[#CFE4FF] rounded-2xl p-7 shadow hover:shadow-lg transition">
                <div className="mb-2">{icon}</div>
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-sm text-[#444]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="space-y-7">
          <h2 className="text-center text-4xl font-extrabold">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-7">
            {TESTIMONIALS.map(({ quote, name, platform, icon }, i) => (
              <div key={i} className="bg-white border border-gray-200 p-7 rounded-2xl shadow flex flex-col items-center text-center">
                <div className="mb-2">{icon}</div>
                <div className="flex items-center gap-1 mb-1">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => (
                      <Star key={j} size={16} className="text-yellow-400" />
                    ))}
                </div>
                <p className="italic text-[#222] text-base font-medium mb-2">“{quote}”</p>
                <p className="mt-1 text-sm text-[#007BFF] font-semibold">
                  {name} <span className="text-[#444] font-normal">· {platform}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section id="faq" className="space-y-7">
          <h2 className="text-center text-4xl font-extrabold">FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map(({ question, answer }, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-2xl px-5 py-4 cursor-pointer transition-all duration-200 ${
                  openFaq === index ? "bg-[#F5FAFF] shadow-lg" : "bg-white"
                }`}
                onClick={() => toggleFaq(index)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter") toggleFaq(index); }}
              >
                <div className="flex justify-between items-center select-none">
                  <p className="font-semibold text-[#111] text-base">{question}</p>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${openFaq === index ? "rotate-180" : "rotate-0"}`}
                  />
                </div>
                <div
                  style={{
                    maxHeight: openFaq === index ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s"
                  }}
                >
                  {openFaq === index && (
                    <p className="mt-3 text-sm text-[#444]">{answer}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="text-center mt-4">
              <Link href="/support" className="text-[#007BFF] underline font-semibold hover:text-[#005FCC] text-sm">
                Didn’t find your answer? Chat with us!
              </Link>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="text-center space-y-5 mt-24">
          <h2 className="text-4xl font-extrabold">Ready to Go Viral?</h2>
          <p className="text-[#444] text-lg">
            Start growing now — choose your package and watch your stats climb.
          </p>
          <Link href="/checkout">
            <button className="bg-[#007BFF] text-white px-8 py-3 text-lg rounded-xl hover:bg-[#005FCC] font-bold shadow transition">
              View Services
            </button>
          </Link>
        </section>
      </main>

      {/* Soft Footer */}
      <footer className="mt-14 py-8 text-center text-sm text-[#444]">
        <div>
          © {new Date().getFullYear()} YesViral. All rights reserved.
        </div>
        <div className="flex gap-4 justify-center mt-2">
          <Link href="/privacy" className="hover:underline hover:text-[#007BFF]">Privacy</Link>
          <Link href="/terms" className="hover:underline hover:text-[#007BFF]">Terms</Link>
          <Link href="/support" className="hover:underline hover:text-[#007BFF]">Support</Link>
        </div>
      </footer>
    </>
  );
}
