import Head from "next/head";
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

/* =============================
    PREMIUM FAQ CONTENT
============================= */
const FAQS = [
  {
    question: "Why choose YesViral?",
    answer:
      "Because quality matters. YesViral uses advanced Private Delivery Networks engineered for speed, consistency, and natural-looking engagement. No recycled networks. No outdated systems. Just premium growth that delivers every time.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We provide high-quality social growth services across Instagram, TikTok, YouTube, and more — including Followers, Likes, Subscribers, Views, and targeted engagement solutions for creators, influencers, and brands.",
  },
  {
    question: "Do I need to share my account password?",
    answer:
      "Never. All YesViral services are delivered securely from the outside without requiring login credentials of any kind. Your privacy and account security remain fully protected.",
  },
  {
    question: "Are the followers, likes, and views high quality?",
    answer:
      "Yes. Our networks deliver high-quality, natural-looking engagement designed to enhance your social proof, boost visibility, and help your profile perform better organically.",
  },
  {
    question: "Is YesViral safe to use?",
    answer:
      "Absolutely. YesViral uses safe delivery methods, SSL-encrypted checkout, and fully PCI-compliant payment processing. We never access your account and we never store sensitive information.",
  },
  {
    question: "What is the 30-day refill guarantee?",
    answer:
      "If any Followers, Likes, or Views drop within 30 days of your order, we refill them at no additional cost. No forms. No headaches. Just fast, premium support.",
  },
];

/* =============================
    PREMIUM SERVICE CONTENT
============================= */
const SERVICES = [
  {
    name: "Instagram Services",
    key: "instagram",
    price: "$0.09 / 100",
    description: [
      "💎 Premium Followers, Likes & Views",
      "⚡ Fast, natural delivery",
      "🛡 30-Day protection included",
      "🔒 Secure, encrypted checkout",
    ],
    icon: <Instagram className="text-[#E1306C]" size={28} />,
    tag: "Bestseller",
    count: "2,000+ orders this week",
  },
  {
    name: "TikTok Services",
    key: "tiktok",
    price: "$0.08 / 100",
    description: [
      "✨ High-impact engagement",
      "🚀 Orders begin within minutes",
      "🙅‍♂️ No login required",
      "🛡 Protected delivery system",
    ],
    icon: <Music2 className="text-[#25F4EE]" size={28} />,
    tag: "🔥 Trending",
    count: "1,400+ orders this week",
  },
  {
    name: "YouTube Services",
    key: "youtube",
    price: "$0.05 / 1000",
    description: [
      "🏆 Premium Views & Watch Time",
      "📈 Channel performance boost",
      "🤫 Private delivery networks",
      "🤖 Algorithm-friendly growth",
    ],
    icon: <Youtube className="text-[#FF0000]" size={28} />,
    tag: "",
    count: "950+ orders this week",
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
        <title>YesViral – Premium Social Growth for Instagram, TikTok & YouTube</title>
        <meta
          name="description"
          content="YesViral delivers high-quality followers, likes, views, and engagement using premium private delivery networks. Trusted by 100,000+ creators worldwide. Fast, secure, and results-driven."
        />
      </Head>

      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPlatform={modalPlatform ?? undefined}
        initialService={modalService ?? undefined}
      />

      {/* =============================
          MAIN CONTENT
      ============================== */}
      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-4 sm:py-8 space-y-6 md:space-y-10 select-none">

        {/* =============================  
            HERO (PREMIUM)  
        ============================== */}
        <section className="flex flex-col-reverse md:grid md:grid-cols-2 md:gap-12 items-center">
          <div className="flex flex-col items-center md:items-start space-y-7 text-center md:text-left">

            {/* TRUST BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FF] rounded-full text-xs font-bold text-[#007BFF] shadow">
              <Star size={18} className="text-yellow-400 star-animate" />
              Trusted by 100,000+ Creators
            </div>

            {/* HEADLINE — PREMIUM AF */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111] leading-tight">
              The Premium Standard in
              <br className="hidden sm:block" />
              <span className="text-[#007BFF]">Social Growth.</span>
            </h1>

            {/* SUBHEAD — PREMIUM LUXURY VIBE */}
            <p className="text-[#444] text-base sm:text-lg max-w-md sm:max-w-xl font-medium">
              YesViral delivers high-quality social growth powered by advanced Private Delivery Networks.
              Industry-leading consistency. Natural-looking results. Zero logins required. Fully secure.
            </p>

            {/* CTA */}
            <button
              onClick={openOrderModalPlatform}
              className="bg-[#007BFF] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#005FCC] transition text-base sm:text-lg"
            >
              View Services & Pricing
            </button>

            {/* MICRO-TRUST BAR */}
            <span className="text-xs text-[#555] font-medium">
              🔒 SSL-Encrypted Payments · ⭐ Rated 4.8/5 · ⚡ Delivery Starts in Minutes
            </span>
          </div>

          {/* HERO IMAGE */}
          <div className="hidden md:flex justify-center">
            <Image
              src="/hero-illustration.png"
              alt="YesViral social growth illustration"
              width={420}
              height={320}
              className="drop-shadow-2xl"
              priority
            />
          </div>
        </section>

        {/* =============================
            SERVICES (PREMIUM)
        ============================== */}
        <section className="space-y-7 py-8 md:py-14">
          <h2 className="text-center text-4xl font-extrabold">
            Premium Services for Every Platform
          </h2>
          <p className="text-[#444] text-center max-w-2xl mx-auto">
            Explore our high-quality engagement services across Instagram, TikTok, and YouTube.
            <span className="font-semibold text-[#007BFF]">
              {" "}Delivered quickly, naturally, and securely.
            </span>
          </p>

          {/* RATING */}
          <div className="flex items-center justify-center gap-1">
            {[1,2,3,4].map((n) => (
              <Star key={n} size={20} className="text-[#007BFF] fill-[#007BFF]" />
            ))}
            <Star size={20} className="text-[#007BFF] fill-[#007BFF] opacity-40" />
            <span className="ml-2 font-semibold text-[#007BFF] text-sm">
              4.8 / 5 from 10,000+ verified clients
            </span>
          </div>

          {/* SERVICE CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(({ name, price, description, icon, tag, count, key }, i) => (
              <div
                key={i}
                className="bg-white border-2 border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-2xl transition"
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
                  {description.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium text-[#007BFF]">{price}</span>
                  <span className="text-xs bg-[#E8F1FF] px-2 py-0.5 rounded">{count}</span>
                </div>

                <button
                  onClick={() => openOrderModalService(key)}
                  className="mt-4 w-full bg-[#007BFF] text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-[#005FCC] transition-transform transform hover:scale-[1.03]"
                >
                  View {name}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* OTHER SECTIONS */}
        <section className="py-2 md:py-3"><HowItWorks /></section>
        <section className="py-2 md:py-3"><OurPromise /></section>
        <section className="py-2 md:py-3"><Testimonials /></section>
        <section className="mb-6"><FAQ faqs={FAQS} /></section>

        {/* FINAL CTA */}
        <section className="text-center space-y-4 py-6">
          <h2 className="text-4xl font-extrabold">Start Growing with YesViral</h2>
          <p className="text-[#444] text-lg max-w-xl mx-auto">
            Join over 100,000 creators and brands leveling up their presence with premium,
            reliable, high-quality social growth.
          </p>
          <button
            onClick={openOrderModalPlatform}
            className="bg-[#007BFF] text-white px-8 py-3 text-lg rounded-xl hover:bg-[#005FCC] font-bold shadow transition"
          >
            Get Started
          </button>
        </section>
      </main>

      <SalesNotifications />

      {/* STAR ANIMATION */}
      <style jsx global>{`
        @keyframes starGlow {
          0% { transform: scale(1); filter: drop-shadow(0 0 0 #ffd700); }
          50% { transform: scale(1.17); filter: drop-shadow(0 0 10px #ffd700); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0 #ffd700); }
        }
        .star-animate {
          animation: starGlow 2.4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
