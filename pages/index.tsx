import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ShieldCheck,
  Clock,
  UserCheck,
  Zap,
  RefreshCcw,
  Star,
  Instagram,
  Music2,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import OrderModal from "@/components/OrderModal";
import OurPromise from "@/components/OurPromise";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

const SalesNotifications = dynamic(
  () => import("@/components/SalesNotifications"),
  { ssr: false }
);

// ----------------------------------------------------------
// FAQ CONTENT
// ----------------------------------------------------------

const FAQS = [
  {
    question: "Why choose us?",
    answer:
      "Unlike other Social Growth Services, YesViral constantly upgrades our Private Delivery Networks (PDNs) to ensure users receive the Highest-Quality services every time.",
  },
  {
    question: "What services do you offer?",
    answer:
      "High-Quality Engagement across Instagram, YouTube, TikTok, and more.",
  },
  {
    question: "Do I need to share my account password?",
    answer: "No. We never require your password for delivery.",
  },
  {
    question: "Are the followers real?",
    answer: "Yes. All engagement comes from real users — never bots.",
  },
  {
    question: "Is your service safe and legal?",
    answer: "Absolutely. Our delivery systems are secure and compliant.",
  },
  {
    question: "What is your refill guarantee?",
    answer: "30 days of free refills if drops occur.",
  },
];

// ----------------------------------------------------------
// SERVICES LIST
// ----------------------------------------------------------

const SERVICES = [
  {
    name: "Instagram Services",
    key: "instagram",
    price: "$0.09 / 100",
    description: [
      "💎 High-Quality Followers, Likes & Views",
      "⚡ Rapid Delivery",
      "🛡️ Drop Protection",
      "🔒 100% Secure Checkout",
    ],
    icon: <Instagram className="text-[#E1306C]" size={28} />,
    tag: "Bestseller",
    count: "2,000+ bought this week",
  },
  {
    name: "TikTok Services",
    key: "tiktok",
    price: "$0.08 / 100",
    description: [
      "✨ High-impact Likes & Views",
      "🚀 Instant Start",
      "🙅‍♂️ No Login Needed",
      "🛡️ Protected Service",
    ],
    icon: <Music2 className="text-[#25F4EE]" size={28} />,
    tag: "🔥 Hot",
    count: "1,400+ bought this week",
  },
  {
    name: "YouTube Services",
    key: "youtube",
    price: "$0.05 / 1000",
    description: [
      "🏆 Premium Views & Watch time",
      "📈 Boosts Channel Performance",
      "🤫 Private Delivery",
      "🤖 Algorithm-Friendly",
    ],
    icon: <Youtube className="text-[#FF0000]" size={28} />,
    tag: "",
    count: "950+ bought this week",
  },
];

// ----------------------------------------------------------
// PAGE COMPONENT
// ----------------------------------------------------------

export default function Home() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [modalPlatform, setModalPlatform] = useState<string | null>(null);
  const [modalService, setModalService] = useState<string | null>(null);

  const openOrderModalPlatform = () => {
    setModalPlatform(null);
    setModalService(null);
    setOrderModalOpen(true);
  };

  const openOrderModalService = (platformKey: string) => {
    setModalPlatform(platformKey);
    setModalService(null);
    setOrderModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>YesViral – Buy High-Quality Followers, Likes & Views</title>
        <meta name="description" content="Grow your social media with YesViral. Buy real followers, likes, views, and more — fast, secure, and trusted by 100,000+ creators." />
      </Head>

      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPlatform={modalPlatform ?? undefined}
        initialService={modalService ?? undefined}
      />

      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-6 sm:py-10 space-y-10 select-none">

        {/* HERO */}
        <section className="relative flex flex-col-reverse md:grid md:grid-cols-2 md:gap-8 items-center">
          <div className="w-full flex flex-col items-center md:items-start space-y-7 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FF] rounded-full text-xs font-bold text-[#007BFF]">
              <Star size={18} className="text-yellow-400 star-animate" />
              Trusted by 100,000+ Creators
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#007BFF] leading-snug">
              Boost Your Social Presence Instantly.
              <br className="hidden sm:block" />
              <span className="text-[#005FCC]">Premium Growth for Instagram, TikTok, YouTube & More.</span>
            </h1>

            <p className="text-[#444] text-base sm:text-lg max-w-md sm:max-w-xl font-medium">
              Unlock Social Growth with YesViral — High-Quality Followers, Likes & Views via Private Delivery Networks.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button className="bg-[#007BFF] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-[#005FCC] transition" onClick={openOrderModalPlatform}>
                Get Started
              </button>

              <Link href="/track-order" className="bg-white border border-[#CFE4FF] text-[#007BFF] font-semibold px-6 py-3 rounded-xl shadow hover:bg-[#F5FAFF] transition">
                Track Order
              </Link>
            </div>

            <span className="text-xs text-[#555]">🔒 SSL-secured · ⭐ 4.8/5 rating · ⚡ Orders start in minutes</span>
          </div>

          {/* HERO IMAGE + FLOATING CARDS */}
          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative inline-block">

              <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex gap-3">
                <div className="bg-white/95 border border-[#CFE4FF] rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 text-[13px] yv-card-1">
                  💙 <p className="font-semibold text-[#111]">Trusted by Brands</p>
                </div>

                <div className="bg-white/95 border border-[#CFE4FF] rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 text-[13px] yv-card-2">
                  📦 <p className="font-semibold text-[#111]">Millions Delivered</p>
                </div>
              </div>

              <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 flex gap-3">
                <div className="bg-white/95 border border-[#CFE4FF] rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 text-[13px] yv-card-3">
                  🔒 <p className="font-semibold text-[#111]">Private Networks</p>
                </div>

                <div className="bg-white/95 border border-[#CFE4FF] rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 text-[13px] yv-card-4">
                  ⚡ <p className="font-semibold text-[#111]">Fastest Delivery</p>
                </div>
              </div>

              <Image src="/hero-illustration.png" alt="YesViral Hero" width={420} height={420} className="w-full max-w-[420px] drop-shadow-2xl" priority />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="order" className="space-y-7 py-8 md:py-14">
          <h2 className="text-center text-4xl font-extrabold">Place Your Order Instantly</h2>

          <p className="text-[#444] text-center max-w-2xl mx-auto">
            Choose your service — <span className="text-[#007BFF] font-semibold">Instant delivery starts within minutes.</span>
          </p>

          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} size={20} className="text-[#007BFF] fill-[#007BFF]" />
            ))}
            <Star size={20} className="text-[#007BFF] fill-[#007BFF] opacity-50" />
            <span className="ml-2 text-[#007BFF] text-sm font-semibold">4.8 / 5 rating</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(({ name, price, description, icon, tag, count, key }, idx) => (
              <div key={idx} className="bg-white border-2 border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-2xl transition flex flex-col gap-3 relative">
                {tag && <span className="absolute top-4 right-5 bg-[#E8F1FF] text-[#007BFF] text-xs font-bold px-3 py-1 rounded-full shadow">{tag}</span>}

                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-[#F5FAFF] p-2 rounded-full">{icon}</div>
                  <h3 className="text-xl font-bold text-[#111]">{name}</h3>
                </div>

                <ul className="text-sm text-[#444] pl-5 list-disc space-y-1">
                  {description.map((d, i) => <li key={i}>{d}</li>)}
                </ul>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium text-[#007BFF]">{price}</span>
                  <span className="text-xs text-[#111] bg-[#E8F1FF] px-2 py-0.5 rounded">{count}</span>
                </div>

                <button className="mt-4 w-full bg-[#007BFF] text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-[#005FCC] shadow transition" onClick={() => openOrderModalService(key)}>
                  Order
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 🔥 WHY CHOOSE YESVIRAL — FULLY FIXED, SINGLE-LINE CLASSNAMES */}
        {/* -------------------------------------------------------------- */}
        <section id="about" className="bg-white/90 backdrop-blur-xl p-10 md:p-14 rounded-3xl shadow-xl border border-[#CFE4FF] space-y-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#007BFF] tracking-tight">Why Choose YesViral?</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">

            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#007BFF] flex flex-col items-center text-center">
              <Zap className="text-[#007BFF]" size={40} />
              <span className="font-bold text-lg mt-3 text-[#111]">Instant Start</span>
              <span className="text-sm text-[#444] leading-relaxed">Growth begins in 1–10 minutes.</span>
            </div>

            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#007BFF] flex flex-col items-center text-center">
              <UserCheck className="text-[#007BFF]" size={40} />
              <span className="font-bold text-lg mt-3 text-[#111]">Quality Results</span>
              <span className="text-sm text-[#444] leading-relaxed">Real, High-Quality engagement only.</span>
            </div>

            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#007BFF] flex flex-col items-center text-center">
              <ShieldCheck className="text-[#007BFF]" size={40} />
              <span className="font-bold text-lg mt-3 text-[#111]">Safe & Secure</span>
              <span className="text-sm text-[#444] leading-relaxed">No passwords. 256-bit SSL. Fully protected.</span>
            </div>

            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#007BFF] flex flex-col items-center text-center">
              <Clock className="text-[#007BFF]" size={40} />
              <span className="font-bold text-lg mt-3 text-[#111]">24/7 Support</span>
              <span className="text-sm text-[#444] leading-relaxed">Always online when you need us.</span>
            </div>

            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#007BFF] flex flex-col items-center text-center">
              <RefreshCcw className="text-[#007BFF]" size={40} />
              <span className="font-bold text-lg mt-3 text-[#111]">30 Day Refill</span>
              <span className="text-sm text-[#444] leading-relaxed">Drops? We refill instantly — free 30 days.</span>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 text-[#007BFF] font-bold text-lg">
            <span>100k+ Followers Delivered</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Rated 4.8/5 by 10,000+ Clients</span>
          </div>
        </section>

        {/* OTHER SECTIONS */}
        <section className="py-2 md:py-3">
          <HowItWorks />
        </section>

        <section className="py-2 md:py-3">
          <OurPromise />
        </section>

        <section className="py-2 md:py-3">
          <Testimonials />
        </section>

        <section className="mb-6">
          <FAQ faqs={FAQS} />
        </section>

      </main>

      <SalesNotifications />

      {/* GLOBAL ANIMATIONS */}
      <style jsx global>{`
        @keyframes starGlow {
          0% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 0 #ffd700); }
          30% { transform: rotate(8deg) scale(1.16); filter: drop-shadow(0 0 8px #ffd700); }
          55% { transform: rotate(-7deg) scale(1.09); filter: drop-shadow(0 0 12px #fff78a); }
          80% { transform: rotate(0deg) scale(1.13); filter: drop-shadow(0 0 10px #ffd700); }
          100% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 0 #ffd700); }
        }

        .star-animate {
          animation: starGlow 2.6s ease-in-out infinite;
        }

        @keyframes yvFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .yv-card-1 { animation: yvFloat 7s infinite; }
        .yv-card-2 { animation: yvFloat 8s infinite; }
        .yv-card-3 { animation: yvFloat 9s infinite; }
        .yv-card-4 { animation: yvFloat 10s infinite; }
      `}</style>
    </>
  );
}
