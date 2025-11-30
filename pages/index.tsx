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
      "Unlike other social growth services, YesViral continually upgrades our Private Delivery Networks (PDNs) to keep performance sharp and consistent. We focus on Fast, Reliable, High-Quality results that evolve and improve with every order placed.",
  },
  {
    question: "What services do you offer?",
    answer:
      "Our social media marketing services help Individuals, Creators, Influencers, and Brands grow their online presence with targeted high-quality engagement. Whether you want more Followers, Subscribers, or Video Views, we offer a wide range of services across platforms like Instagram, YouTube, TikTok, and more.",
  },
  {
    question: "Do I need to share my account password?",
    answer:
      "No, never. We do not require your password for any of our services. Everything is delivered securely from the outside without logging into your account. If you ever receive a message asking for your password claiming to be from us, DO NOT share it—please report it to us immediately.",
  },
  {
    question: "Are the followers, likes, and subscribers real?",
    answer:
      "Yes. We don’t use bots or fake accounts. All engagement is sourced from real users or high-quality networks designed to look natural, helping your account grow through authentic-style activity that boosts your reach and social proof.",
  },
  {
    question: "Is your service safe and legal?",
    answer:
      "Yes. We use safe and secure delivery methods designed to protect your account while providing high-quality results. We never ask for your password, and all payments are processed through encrypted, PCI-compliant providers so your billing details remain protected.",
  },
  {
    question: "What is your refill guarantee?",
    answer:
      "Our 30-day refill guarantee means that if any Followers, Likes, Views, or Engagement drop within 30 days of your purchase, we’ll replace them free of charge. This keeps your results strong and consistent—just reach out through our contact form. No hassle, no extra cost.",
  },
];

const SERVICES = [
  {
    name: "Instagram Services",
    key: "instagram",
    price: "$0.09 / 100",
    description: [
      "💎 High-Quality Followers, Likes & Views",
      "⚡ Fast, Gradual Delivery",
      "🛡 30-Day Drop Protection",
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
      "✨ High-Impact Likes & Views",
      "🚀 Orders Start in Minutes",
      "🙅‍♂️ No Login or Password Needed",
      "🛡 Protected Service & Refills",
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
      "🏆 Premium Views & Watch Time",
      "📈 Boosts Channel Performance",
      "🤫 Private Delivery Networks",
      "🤖 Algorithm-Friendly Growth",
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
        <title>YesViral – Buy High-Quality Followers, Likes &amp; Views.</title>
        <meta
          name="description"
          content="Grow your social media with YesViral. Buy high-quality followers, likes, views, and more across Instagram, TikTok, YouTube & beyond — fast, secure, and trusted by 100,000+ creators."
        />
      </Head>

      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPlatform={modalPlatform ?? undefined}
        initialService={modalService ?? undefined}
      />

      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-4 sm:py-8 space-y-6 md:space-y-10 select-none">
        {/* HERO SECTION */}
        <section className="flex flex-col-reverse md:grid md:grid-cols-2 md:gap-12 items-center pt-0 md:pt-0">
          <div className="w-full flex flex-col items-center md:items-start space-y-7 text-center md:text-left mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FF] rounded-full mb-2 mt-6 sm:mt-0 text-xs font-bold text-[#007BFF] tracking-wide shadow-sm">
              <Star size={18} className="text-yellow-400 star-animate" />
              Trusted by 100,000+ Creators
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#007BFF] leading-tight drop-shadow-sm">
              Premium Social Growth —
              <br className="hidden sm:block" />
              <span className="text-[#005FCC]">Real Results Delivered Fast.</span>
            </h1>

            <p className="text-[#444] text-base sm:text-lg max-w-md sm:max-w-xl mx-auto md:mx-0 font-medium">
              Trusted by creators, influencers, and brands worldwide. YesViral uses exclusive Private
              Delivery Networks built for speed, consistency, and high-quality engagement across
              Instagram, TikTok, YouTube &amp; more.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto justify-center md:justify-start">
              <button
                className="bg-[#007BFF] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#005FCC] transition text-base sm:text-lg w-full xs:w-auto"
                onClick={openOrderModalPlatform}
              >
                View Services &amp; Pricing
              </button>
            </div>

            <span className="text-xs text-[#555] font-medium mt-2">
              🔒 SSL-Encrypted Payments · ⭐ Rated 4.8/5 by 10,000+ Clients · ⚡ Orders Start in 1–10
              Minutes
            </span>
          </div>

          <div className="w-full hidden md:flex justify-center mb-0">
            <Image
              src="/hero-illustration.png"
              alt="YesViral Notifications Illustration"
              width={420}
              height={320}
              className="w-full max-w-[420px] h-auto object-contain drop-shadow-2xl m-0 p-0"
              draggable={false}
              unselectable="on"
              priority
            />
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="order" className="space-y-7 py-8 md:py-14">
          <h2 className="text-center text-4xl font-extrabold">
            Premium Services for Instagram, TikTok &amp; YouTube
          </h2>
          <p className="text-[#444] text-center max-w-2xl mx-auto">
            Choose your platform and service — no logins needed, no hassle.{" "}
            <span className="font-semibold text-[#007BFF]">
              Delivery typically begins within minutes of placing your order.
            </span>
          </p>

          {/* ⭐⭐⭐⭐⭐ YESVIRAL RATING (4.8/5) */}
          <div className="flex items-center justify-center gap-1 mb-6 mt-1">
            {[1, 2, 3, 4].map((_, i) => (
              <Star key={i} size={20} className="text-[#007BFF] fill-[#007BFF]" />
            ))}
            <Star size={20} className="text-[#007BFF] fill-[#007BFF] opacity-50" />
            <span className="ml-2 font-semibold text-[#007BFF] text-sm">
              4.8 / 5 rating from 10,000+ clients
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(({ name, price, description, icon, tag, count, key }, idx) => (
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
                  <div className="bg-[#F5FAFF] p-2 rounded-full">{icon}</div>
                  <h3 className="text-xl font-bold text-[#111]">{name}</h3>
                </div>

                <ul className="text-sm text-[#444] pl-5 list-disc space-y-1">
                  {description.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium text-[#007BFF]">{price}</span>
                  <span className="text-xs text-[#111] bg-[#E8F1FF] px-2 py-0.5 rounded">
                    {count}
                  </span>
                </div>

                <button
                  className="mt-4 w-full bg-[#007BFF] text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-[#005FCC] shadow transition-transform duration-150 ease-out transform hover:scale-[1.03] active:scale-95"
                  onClick={() => openOrderModalService(key)}
                >
                  View {name} Packages
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="bg-[#F5FAFF] p-8 md:p-12 rounded-2xl text-center shadow-sm space-y-8 py-8 md:py-14"
        >
          <h2 className="text-4xl font-extrabold text-[#111]">Why Choose YesViral?</h2>

          <div className="flex flex-wrap gap-7 justify-center mt-6">
            <div className="flex flex-col items-center max-w-[170px]">
              <Zap className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Instant Start</span>
              <span className="text-sm text-[#444]">Growth typically begins in 1–10 minutes.</span>
            </div>

            <div className="flex flex-col items-center max-w-[170px]">
              <UserCheck className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Quality Results</span>
              <span className="text-sm text-[#444]">
                High-quality engagement designed to look natural.
              </span>
            </div>

            <div className="flex flex-col items-center max-w-[170px]">
              <ShieldCheck className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Safe &amp; Secure</span>
              <span className="text-sm text-[#444]">
                No passwords required, 256-bit SSL encryption.
              </span>
            </div>

            <div className="flex flex-col items-center max-w-[170px]">
              <Clock className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">24/7 Support</span>
              <span className="text-sm text-[#444]">Reach out any time, any day.</span>
            </div>

            <div className="flex flex-col items-center max-w-[170px]">
              <RefreshCcw className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">30-Day Refill</span>
              <span className="text-sm text-[#444]">
                If drops occur, we refill for 30 days—free.
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-7 text-[#007BFF] font-bold text-lg">
            <span>100K+ Orders Processed</span>
            <span className="hidden sm:inline">Rated 4.8/5 by 10,000+ Clients</span>
          </div>
        </section>

        {/* HOW IT WORKS — TIGHTER SPACING */}
        <section className="py-2 md:py-3 mb-2 md:mb-3">
          <HowItWorks />
        </section>

        {/* OUR PROMISE — TIGHTER SPACING */}
        <section className="py-2 md:py-3">
          <OurPromise />
        </section>

        {/* TESTIMONIALS — TIGHTER SPACING */}
        <section className="py-2 md:py-3">
          <Testimonials />
        </section>

        {/* FAQ — TIGHTER SPACING */}
        <section className="mb-4 md:mb-6">
          <FAQ faqs={FAQS} />
        </section>

        {/* FINAL CTA — TIGHTER TOP SPACING */}
        <section className="text-center space-y-4 mt-6 py-4 md:py-6">
          <h2 className="text-4xl font-extrabold mb-2">Ready to try YesViral?</h2>
          <p className="text-[#444] text-lg mb-6">
            Join over 100,000+ creators, influencers, and brands already growing with YesViral. Choose
            your platform, pick a package, and unlock high-quality results in minutes.
          </p>
          <div className="mt-6 mb-6">
            <button
              className="bg-[#007BFF] text-white px-8 py-3 text-lg rounded-xl hover:bg-[#005FCC] font-bold shadow transition"
              onClick={openOrderModalPlatform}
            >
              View Services &amp; Pricing
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
      `}</style>
    </>
  );
}
