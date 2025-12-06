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
      "Unlike other Social Growth Services, YesViral constantly upgrades our Private Delivery Networks (PDNs) to ensure users receive the Highest-Quality services every time.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer a wide range of services across Instagram, YouTube, TikTok, and more.",
  },
  {
    question: "Do I need to share my password?",
    answer:
      "Never. We do not require your password for any service.",
  },
  {
    question: "Are the followers & likes real?",
    answer:
      "Yes. All engagement comes from real users.",
  },
  {
    question: "Is your service safe?",
    answer:
      "Absolutely — everything is delivered safely and securely.",
  },
  {
    question: "What is your refill guarantee?",
    answer:
      "30-day refill guarantee on all services.",
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
      "🔒 Secure Checkout",
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
      "🏆 Premium Views",
      "📈 Boost Channel Performance",
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
        <title>YesViral – Buy High-Quality Followers, Likes & Views</title>
      </Head>

      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPlatform={modalPlatform ?? undefined}
        initialService={modalService ?? undefined}
      />

      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-8 space-y-10 select-none">

        {/* HERO SECTION */}
        <section className="relative flex flex-col-reverse md:grid md:grid-cols-2 items-center">

          {/* LEFT SIDE */}
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FF] text-[#007BFF] rounded-full text-xs font-bold shadow-sm">
              <Star size={18} className="text-yellow-400 star-animate" />
              Trusted by 100,000+ Creators
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-snug text-[#007BFF]">
              Boost Your Social Presence Instantly.
              <br />
              <span className="text-[#005FCC]">
                Premium Growth for Instagram, TikTok, YouTube & More.
              </span>
            </h1>

            <p className="text-[#444] text-base sm:text-lg max-w-xl font-medium">
              Unlock Social Growth with YesViral — Trusted by Creators & Brands
              for High-Quality Followers, Likes & Views delivered through
              Exclusive Private Networks.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openOrderModalPlatform}
                className="bg-[#007BFF] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#005FCC] shadow-lg"
              >
                Get Started
              </button>

              <Link
                href="/track-order"
                className="bg-white border border-[#CFE4FF] text-[#007BFF] px-6 py-3 rounded-xl font-semibold hover:bg-[#F5FAFF] shadow"
              >
                Track Order
              </Link>
            </div>

            <span className="text-xs text-[#555]">
              🔒 SSL-encrypted payments · ⭐ 4.8/5 rating · ⚡ Starts in minutes
            </span>
          </div>

          {/* RIGHT SIDE — PHONE + 4 FLOATING CARDS FIXED */}
          <div className="relative hidden md:flex justify-center items-center">
            <div className="relative inline-block">

              {/* TOP LEFT CARD */}
              <div className="absolute top-[48px] left-[6px] bg-white/95 border border-[#CFE4FF] px-4 py-2 rounded-xl shadow-lg flex gap-2 yv-card-1">
                <span className="text-[#007BFF] text-lg">💙</span>
                <p className="text-[13px] font-semibold">Trusted by Brands & Creators</p>
              </div>

              {/* TOP RIGHT CARD */}
              <div className="absolute top-[48px] right-[6px] bg-white/95 border border-[#CFE4FF] px-4 py-2 rounded-xl shadow-lg flex gap-2 yv-card-2">
                <span className="text-[#007BFF] text-lg">📦</span>
                <p className="text-[13px] font-semibold">Millions of Orders Delivered</p>
              </div>

              {/* BOTTOM LEFT CARD */}
              <div className="absolute bottom-[48px] left-[6px] bg-white/95 border border-[#CFE4FF] px-4 py-2 rounded-xl shadow-lg flex gap-2 yv-card-3">
                <span className="text-[#007BFF] text-lg">🔒</span>
                <p className="text-[13px] font-semibold">Private Delivery Networks</p>
              </div>

              {/* BOTTOM RIGHT CARD */}
              <div className="absolute bottom-[48px] right-[6px] bg-white/95 border border-[#CFE4FF] px-4 py-2 rounded-xl shadow-lg flex gap-2 yv-card-4">
                <span className="text-[#007BFF] text-lg">⚡</span>
                <p className="text-[13px] font-semibold">Industry-Leading Speed & Quality</p>
              </div>

              {/* HERO IMAGE */}
              <Image
                src="/hero-illustration.png"
                alt="YesViral Notifications"
                width={420}
                height={420}
                className="drop-shadow-2xl object-contain"
                priority
                draggable={false}
              />
            </div>
          </div>
        </section>

        {/* ----------------- SERVICES SECTION ----------------- */}
        <section id="order" className="space-y-7 py-8 md:py-14">
          <h2 className="text-center text-4xl font-extrabold">Place Your Order Instantly</h2>

          <p className="text-[#444] text-center max-w-2xl mx-auto">
            Choose your service — no logins needed, no hassle.
            <span className="font-semibold text-[#007BFF]">
              {" "}
              Delivery starts within minutes.
            </span>
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-xl transition"
              >
                {service.tag && (
                  <span className="absolute top-4 right-5 bg-[#E8F1FF] text-[#007BFF] text-xs font-bold px-3 py-1 rounded-full shadow">
                    {service.tag}
                  </span>
                )}

                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-[#F5FAFF] p-2 rounded-full">{service.icon}</div>
                  <h3 className="text-xl font-bold text-[#111]">{service.name}</h3>
                </div>

                <ul className="text-sm text-[#444] pl-5 list-disc space-y-1">
                  {service.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium text-[#007BFF]">{service.price}</span>
                  <span className="text-xs text-[#111] bg-[#E8F1FF] px-2 py-0.5 rounded">
                    {service.count}
                  </span>
                </div>

                <button
                  className="mt-4 w-full bg-[#007BFF] text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-[#005FCC] shadow transition"
                  onClick={() => openOrderModalService(service.key)}
                >
                  Order
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-4">
          <HowItWorks />
        </section>

        {/* OUR PROMISE */}
        <section className="py-4">
          <OurPromise />
        </section>

        {/* TESTIMONIALS */}
        <section className="py-4">
          <Testimonials />
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <FAQ faqs={FAQS} />
        </section>

      </main>

      <SalesNotifications />

      <style jsx global>{`
        @keyframes yvFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
        .yv-card-1 { animation: yvFloat 6s ease-in-out infinite; }
        .yv-card-2 { animation: yvFloat 7s ease-in-out infinite; }
        .yv-card-3 { animation: yvFloat 8s ease-in-out infinite; }
        .yv-card-4 { animation: yvFloat 9s ease-in-out infinite; }
      `}</style>
    </>
  );
}
