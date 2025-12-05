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

const FAQS = [
  {
    question: "Why choose us?",
    answer:
      "Unlike other Social Growth Services, YesViral constantly upgrades our Private Delivery Networks (PDNs) to ensure users receive the Highest-Quality services every time. We focus on Fast, Reliable, and High-Quality results that evolve and improve with every order placed.",
  },
  {
    question: "What services do you offer?",
    answer:
      "Our Social Media Marketing services help Individuals, Influencers, and Brands grow their online presence with targeted High-Quality Engagement. Whether you want more Followers, Subscribers, Video views, We offer a wide range of services across platforms like Instagram, YouTube, TikTok, and more.",
  },
  {
    question: "Do I need to share my account password?",
    answer:
      "No, never. We do not require your password for any of our services. Everything is delivered securely without accessing your account. If you ever receive a message asking for your password claiming to be from us, DO NOT share it—Please report it to us immediately.",
  },
  {
    question: "Are the followers, likes, and subscribers real?",
    answer:
      "Yes. We don’t use bots or fake accounts. All engagement comes from real users, helping your account grow through authentic, organic activity that boosts your reach and credibility.",
  },
  {
    question: "Is your service safe and legal?",
    answer:
      "Absolutely. We use safe, secure, and compliant methods to deliver Likes, Followers, Views & more. Your account stays 100% Protected, and everything we do follows platform guidelines to keep your profile secure.",
  },
  {
    question: "What is your refill guarantee?",
    answer:
      "Our 30-day refill guarantee means that if any Followers, Likes, Views, or Engagement drop within 30 days of your purchase, we’ll replace them free of charge. This keeps your results strong and consistent. Just reach out through our contact form—No hassle, No extra cost.",
  },
];

const SERVICES = [
  {
    name: "Instagram Services",
    key: "instagram",
    price: "$0.09 / 100",
    description: [
      "💎 Quality Followers, Likes & Views",
      "⚡️ Rapid Delivery",
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
      "🚀 Instant Order Start",
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
      "🤖 Algorithm Friendly",
    ],
    icon: <Youtube className="text-[#FF0000]" size={28} />,
    tag: "",
    count: "950+ bought this week",
  },
];

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
        <title>YesViral – Buy High-Quality Followers, Likes & Views.</title>
        <meta
          name="description"
          content="Grow your social media with YesViral. Buy real followers, likes, views, and more across Instagram, TikTok, YouTube & beyond — fast, secure, and trusted."
        />
      </Head>

      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPlatform={modalPlatform ?? undefined}
        initialService={modalService ?? undefined}
      />

      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-4 sm:py-8 space-y-6 md:space-y-10 select-none">
        {/* ============================================= */}
        {/*       ULTRA-PREMIUM 300× HERO SECTION         */}
        {/* ============================================= */}
        <section className="relative flex flex-col-reverse md:grid md:grid-cols-2 md:gap-14 items-center pt-4 md:pt-10">
          {/* FLOATING TRUST BADGE */}
          <div className="absolute top-4 left-1/2 md:left-24 transform -translate-x-1/2 md:translate-x-0 bg-white/70 backdrop-blur-xl border border-[#CFE4FF] shadow-xl rounded-2xl px-5 py-2.5 flex items-center gap-2 z-[5]">
            <Star className="text-[#007BFF]" size={18} />
            <span className="text-sm font-semibold text-[#111]">
              Trusted by 100,000+ Creators
            </span>
          </div>

          {/* LEFT SIDE */}
          <div className="w-full flex flex-col items-center md:items-start space-y-8 text-center md:text-left">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.15] tracking-tight text-[#111]">
              Elevate Your Social Presence
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#007BFF] to-[#005FCC] bg-clip-text text-transparent drop-shadow-sm">
                Premium Followers. Real Impact.
              </span>
            </h1>

            <p className="text-[#444] text-lg max-w-lg sm:max-w-xl mx-auto md:mx-0 font-medium leading-relaxed">
              Experience the next evolution of Social Growth — powered by
              YesViral’s Private Delivery Networks engineered for unmatched
              Quality, Speed, and Retention. Your brand deserves results that
              look and feel real.
            </p>

            <div className="flex flex-col xs:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
              <button
                className="bg-[#007BFF] text-white font-semibold px-7 py-3.5 rounded-xl shadow-xl hover:bg-[#005FCC] transition text-lg w-full xs:w-auto transform hover:scale-[1.03] active:scale-95"
                onClick={openOrderModalPlatform}
              >
                Get Started
              </button>
            </div>

            {/* PREMIUM STATS BAR */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              <div className="bg-white/60 backdrop-blur-md border border-[#CFE4FF] rounded-xl px-4 py-2 text-sm font-medium text-[#111] shadow">
                🔒 Secure SSL Checkout
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-[#CFE4FF] rounded-xl px-4 py-2 text-sm font-medium text-[#111] shadow">
                ⭐ 4.8/5 Rating
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-[#CFE4FF] rounded-xl px-4 py-2 text-sm font-medium text-[#111] shadow">
                ⚡ Delivery Starts in Minutes
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE + FLOATING NOTIFICATION CARDS */}
          <div className="w-full flex justify-center relative mt-8 md:mt-0">
            {/* Soft glow */}
            <div className="absolute -top-4 -right-6 bg-[#E6F0FF] w-40 h-40 rounded-full blur-3xl opacity-40"></div>

            {/* FLOATING NOTIFICATION CARDS */}
            <div className="hidden md:flex flex-col gap-3">
              {/* left side cards */}
              <div className="absolute -top-6 -left-4 yv-float-1">
                <div className="bg-white/95 backdrop-blur-lg border border-[#CFE4FF] rounded-2xl px-4 py-2 shadow-xl min-w-[210px]">
                  <div className="text-[11px] font-semibold text-[#007BFF] mb-0.5">
                    YesViral • Order Update
                  </div>
                  <div className="text-[13px] font-medium text-[#111]">
                    📥 Order Confirmed — Processing Now
                  </div>
                </div>
              </div>

              <div className="absolute top-20 -left-10 yv-float-2">
                <div className="bg-white/95 backdrop-blur-lg border border-[#CFE4FF] rounded-2xl px-4 py-2 shadow-xl min-w-[210px]">
                  <div className="text-[11px] font-semibold text-[#007BFF] mb-0.5">
                    Instagram • Followers
                  </div>
                  <div className="text-[13px] font-medium text-[#111]">
                    ✨ +350 New Followers Delivered
                  </div>
                </div>
              </div>

              {/* right side cards */}
              <div className="absolute -bottom-2 -right-2 yv-float-3">
                <div className="bg-white/95 backdrop-blur-lg border border-[#CFE4FF] rounded-2xl px-4 py-2 shadow-xl min-w-[210px]">
                  <div className="text-[11px] font-semibold text-[#007BFF] mb-0.5">
                    Instagram • Likes
                  </div>
                  <div className="text-[13px] font-medium text-[#111]">
                    ❤️ You received 120 new likes
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 -right-16 yv-float-4 hidden lg:block">
                <div className="bg-white/95 backdrop-blur-lg border border-[#CFE4FF] rounded-2xl px-4 py-2 shadow-xl min-w-[230px]">
                  <div className="text-[11px] font-semibold text-[#007BFF] mb-0.5">
                    Reels • Views
                  </div>
                  <div className="text-[13px] font-medium text-[#111]">
                    🔥 +2,900 Views Delivered
                  </div>
                </div>
              </div>

              <div className="absolute top-36 right-2 yv-float-5 hidden lg:block">
                <div className="bg-white/95 backdrop-blur-lg border border-[#CFE4FF] rounded-2xl px-4 py-2 shadow-xl min-w-[230px]">
                  <div className="text-[11px] font-semibold text-[#007BFF] mb-0.5">
                    YesViral • Live Order
                  </div>
                  <div className="text-[13px] font-medium text-[#111]">
                    🚀 Order Started — Delivery in progress
                  </div>
                </div>
              </div>
            </div>

            <Image
              src="/hero-illustration.png"
              alt="YesViral Growth Visual"
              width={480}
              height={380}
              className="w-full max-w-[480px] h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)] select-none"
              draggable={false}
              priority
            />
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="order" className="space-y-7 py-8 md:py-14">
          <h2 className="text-center text-4xl font-extrabold">
            Place Your Order Instantly
          </h2>
          <p className="text-[#444] text-center max-w-2xl mx-auto">
            Choose your service — No logins needed, No Hassle.{" "}
            <span className="font-semibold text-[#007BFF]">
              Instant delivery starts within minutes.
            </span>
          </p>

          <div className="flex items-center justify-center gap-1 mb-6 mt-1">
            {[1, 2, 3, 4].map((_, i) => (
              <Star
                key={i}
                size={20}
                className="text-[#007BFF] fill-[#007BFF]"
              />
            ))}
            <Star
              size={20}
              className="text-[#007BFF] fill-[#007BFF] opacity-50"
            />
            <span className="ml-2 font-semibold text-[#007BFF] text-sm">
              4.8 / 5 rating
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(
              ({ name, price, description, icon, tag, count, key }, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-2xl transition group flex flex-col gap-3 relative"
                >
                  {tag && (
                    <span className="absolute top-4 right-5 bg-[#E8F1FF] text-[#007BFF] text-xs font-bold px-3 py-1 rounded-full shadow">
                      {tag}
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-[#F5FAFF] p-2 rounded-full">
                      {icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#111]">{name}</h3>
                  </div>

                  <ul className="text-sm text-[#444] pl-5 list-disc space-y-1">
                    {description.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-medium text-[#007BFF]">
                      {price}
                    </span>
                    <span className="text-xs text-[#111] bg-[#E8F1FF] px-2 py-0.5 rounded">
                      {count}
                    </span>
                  </div>

                  <button
                    className="mt-4 w-full bg-[#007BFF] text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-[#005FCC] shadow transition transform hover:scale-[1.03] active:scale-95"
                    onClick={() => openOrderModalService(key)}
                  >
                    Order
                  </button>
                </div>
              )
            )}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="bg-[#F5FAFF] p-8 md:p-12 rounded-2xl text-center shadow-sm space-y-8 py-8 md:py-14"
        >
          <h2 className="text-4xl font-extrabold text-[#111]">
            Why Choose YesViral?
          </h2>

          <div className="flex flex-wrap gap-7 justify-center mt-6">
            <div className="flex flex-col items-center max-w-[170px]">
              <Zap className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Instant Start</span>
              <span className="text-sm text-[#444]">
                Growth begins in 1–10 min
              </span>
            </div>

            <div className="flex flex-col items-center max-w-[170px]">
              <UserCheck className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Quality Results</span>
              <span className="text-sm text-[#444]">100% High Quality</span>
            </div>

            <div className="flex flex-col items-center max-w-[170px]">
              <ShieldCheck className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Safe & Secure</span>
              <span className="text-sm text-[#444]">
                No passwords, 256-bit SSL
              </span>
            </div>

            <div className="flex flex-col items-center max-w-[170px]">
              <Clock className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">24/7 Support</span>
              <span className="text-sm text-[#444]">
                Chat any time, any day.
              </span>
            </div>

            <div className="flex flex-col items-center max-w-[170px]">
              <RefreshCcw className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">30 Day Refill</span>
              <span className="text-sm text-[#444]">
                If drops occur, we'll refill for 30 days—free.
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-7 text-[#007BFF] font-bold text-lg">
            <span>100k+ Followers Delivered</span>
            <span className="hidden sm:inline">
              Rated 4.8/5 by 10,000+ Clients
            </span>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-2 md:py-3 mb-2 md:mb-3">
          <HowItWorks />
        </section>

        {/* OUR PROMISE */}
        <section className="py-2 md:py-3">
          <OurPromise />
        </section>

        {/* TESTIMONIALS */}
        <section className="py-2 md:py-3">
          <Testimonials />
        </section>

        {/* FAQ */}
        <section className="mb-4 md:mb-6">
          <FAQ faqs={FAQS} />
        </section>

        {/* FINAL CTA */}
        <section className="text-center space-y-4 mt-6 py-4 md:py-6">
          <h2 className="text-4xl font-extrabold mb-2">
            Ready to try YesViral?
          </h2>
          <p className="text-[#444] text-lg mb-6">
            Join over 100,000+ Creators already growing with YesViral—choose
            your service and unlock High-Quality results in minutes.
          </p>
          <div className="mt-6 mb-6">
            <button
              className="bg-[#007BFF] text-white px-8 py-3 text-lg rounded-xl hover:bg-[#005FCC] font-bold shadow transition"
              onClick={openOrderModalPlatform}
            >
              View Services
            </button>
          </div>
        </section>
      </main>

      <SalesNotifications />

      <style jsx global>{`
        @keyframes starGlow {
          0% {
            transform: rotate(0deg) scale(1);
            filter: drop-shadow(0 0 0 #ffd700);
          }
          30% {
            transform: rotate(8deg) scale(1.16);
            filter: drop-shadow(0 0 8px #ffd700);
          }
          55% {
            transform: rotate(-7deg) scale(1.09);
            filter: drop-shadow(0 0 12px #fff78a);
          }
          80% {
            transform: rotate(0deg) scale(1.13);
            filter: drop-shadow(0 0 10px #ffd700);
          }
          100% {
            transform: rotate(0deg) scale(1);
            filter: drop-shadow(0 0 0 #ffd700);
          }
        }
        .star-animate {
          animation: starGlow 2.6s cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
          will-change: transform, filter;
        }

        @keyframes yvFloat1 {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-8px) translateX(4px);
          }
          100% {
            transform: translateY(-3px) translateX(0px);
          }
        }

        @keyframes yvFloat2 {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(10px) translateX(6px);
          }
          100% {
            transform: translateY(4px) translateX(2px);
          }
        }

        @keyframes yvFloat3 {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-10px) translateX(-4px);
          }
          100% {
            transform: translateY(-4px) translateX(-2px);
          }
        }

        @keyframes yvFloat4 {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(12px) translateX(-6px);
          }
          100% {
            transform: translateY(5px) translateX(-3px);
          }
        }

        @keyframes yvFloat5 {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-12px) translateX(6px);
          }
          100% {
            transform: translateY(-5px) translateX(2px);
          }
        }

        .yv-float-1 {
          animation: yvFloat1 10s ease-in-out infinite alternate;
        }
        .yv-float-2 {
          animation: yvFloat2 11s ease-in-out infinite alternate;
        }
        .yv-float-3 {
          animation: yvFloat3 12s ease-in-out infinite alternate;
        }
        .yv-float-4 {
          animation: yvFloat4 13s ease-in-out infinite alternate;
        }
        .yv-float-5 {
          animation: yvFloat5 14s ease-in-out infinite alternate;
        }
      `}</style>
    </>
  );
}
