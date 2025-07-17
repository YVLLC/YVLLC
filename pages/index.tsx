import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck, Clock, UserCheck, Zap, RefreshCcw, Star
} from "lucide-react";
import { useState } from "react";
import OrderModal from "@/components/OrderModal";
import OurPromise from "@/components/OurPromise";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import SalesNotifications from "@/components/SalesNotifications"; // 👈 IMPORT HERE

const FAQS = [
  {
    question: "Why choose us?",
    answer: "Unlike other Social Growth Services, YesViral constantly upgrades our Private Delivery Networks (PDNs) to ensure users receive the Highest-Quality services every time. We focus on Fast, Reliable, and High-Quality results that evolve and improve with every order placed."
  },
  {
    question: "What services do you offer?",
    answer: "Our Social Media Marketing services help Individuals, Influencers, and Brands grow their online presence with targeted High-Quality Engagement. Whether you want more Followers, Subscribers, Video views, We offer a wide range of services across platforms like Instagram, YouTube, Spotify, TikTok, and more."
  },
  {
    question: "Do I need to share my account password?",
    answer: "No, never. We do not require your password for any of our services. Everything is delivered securely without accessing your account. If you ever receive a message asking for your password claiming to be from us, DO NOT share it—Please report it to us immediately."
  },
  {
    question: "Are the followers, likes, and subscribers real?",
    answer: "Yes. We don’t use bots or fake accounts. All engagement comes from real users, helping your account grow through authentic, organic activity that boosts your reach and credibility."
  },
  {
    question: "Is your service safe and legal?",
    answer: "Absolutely. We use safe, secure, and compliant methods to deliver Likes, Followers, Views & more. Your account stays 100% Protected, and everything we do follows platform guidelines to keep your profile secure."
  },
  {
    question: "What is your refill guarantee?",
    answer: "Our 30-day refill guarantee means that if any Followers, Likes, Views, or Engagement drop within 30 days of your purchase, we’ll replace them free of charge. This keeps your results strong and consistent. Just reach out through our contact form—No hassle, No extra cost."
  }
];

// ---- EXAMPLE SERVICES (minimal, for demo - you should replace with your real UI/cards) ----
const SERVICES = [
  {
    name: "Instagram Followers",
    platform: "instagram"
  },
  {
    name: "TikTok Followers",
    platform: "tiktok"
  },
  {
    name: "YouTube Subscribers",
    platform: "youtube"
  }
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
        <meta name="description" content="Grow your social media with YesViral. Buy real followers, likes, views, and more across Instagram, TikTok, YouTube & beyond — fast, secure, and trusted." />
      </Head>
      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPlatform={modalPlatform ?? undefined}
        initialService={modalService ?? undefined}
      />
      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-4 sm:py-8 space-y-6 md:space-y-10 select-none">
        {/* HERO SECTION */}
        <section className="flex flex-col-reverse md:grid md:grid-cols-2 md:gap-12 items-center pt-6 md:pt-10">
          <div className="w-full flex flex-col items-center md:items-start space-y-7 text-center md:text-left mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FF] rounded-full mb-2 mt-6 sm:mt-0 text-xs font-bold text-[#007BFF] tracking-wide shadow-sm">
              <Star size={18} className="text-yellow-400 star-animate" />
              Trusted by 100,000+ Creators
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#007BFF] leading-tight drop-shadow-sm">
              Blow Up Your Socials. <br className="hidden sm:block" />
              <span className="text-[#005FCC]">Real Growth.</span> No Waiting.
            </h1>
            <p className="text-[#444] text-base sm:text-lg max-w-md sm:max-w-xl mx-auto md:mx-0 font-medium">
              Unlock Social Growth with YesViral — Trusted by Creators and Brands for High-Quality Followers, Likes, & Views powered by Exclusive Private Networks built for Speed, Trust, and Results.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto justify-center md:justify-start">
              <button
                className="bg-[#007BFF] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#005FCC] transition text-base sm:text-lg w-full xs:w-auto"
                onClick={openOrderModalPlatform}
              >
                Order Now
              </button>
              <Link href="/track-order">
                <button className="bg-white text-[#007BFF] border border-[#007BFF] font-semibold px-6 py-3 rounded-xl hover:bg-[#E6F0FF] transition text-base sm:text-lg w-full xs:w-auto">
                  Try Free Likes
                </button>
              </Link>
            </div>
            <span className="text-xs text-[#555] font-medium mt-2">
              Trusted by 100K+ Creators · 100% Secure Payments · High Quality Growth
            </span>
          </div>
          <div className="w-full hidden md:flex justify-center mb-0">
            <Image
              src="/hero-illustration.png"
              alt="Social Media Growth"
              width={340}
              height={260}
              className="w-full max-w-[340px] sm:max-w-[420px] h-auto object-contain drop-shadow-2xl"
              draggable={false}
              unselectable="on"
              priority
            />
          </div>
        </section>
        {/* SERVICES SECTION (replace with your cards/list) */}
        <section className="py-8">
          <h2 className="text-center text-4xl font-extrabold mb-6">Place Your Order Instantly</h2>
          <div className="flex justify-center gap-5">
            {SERVICES.map((svc, idx) => (
              <button
                key={idx}
                className="bg-[#007BFF] text-white px-5 py-3 rounded-lg shadow font-bold text-lg hover:bg-[#005FCC] transition"
                onClick={() => openOrderModalService(svc.platform)}
              >
                {svc.name}
              </button>
            ))}
          </div>
        </section>
        {/* ABOUT SECTION */}
        <section id="about" className="bg-[#F5FAFF] p-8 md:p-12 rounded-2xl text-center shadow-sm space-y-8 py-8 md:py-14">
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
              <span className="text-sm text-[#444]">100% High Quality, lasting</span>
            </div>
            <div className="flex flex-col items-center max-w-[170px]">
              <ShieldCheck className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">Safe & Secure</span>
              <span className="text-sm text-[#444]">No passwords, 256-bit SSL</span>
            </div>
            <div className="flex flex-col items-center max-w-[170px]">
              <Clock className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">24/7 Support</span>
              <span className="text-sm text-[#444]">Chat any time, any day.</span>
            </div>
            <div className="flex flex-col items-center max-w-[170px]">
              <RefreshCcw className="text-[#007BFF]" size={32} />
              <span className="font-semibold mt-2">30 Day Refill</span>
              <span className="text-sm text-[#444]">If drops occur, we'll refill for 30 days—free.</span>
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-7 text-[#007BFF] font-bold text-lg">
            <span>100k+ Followers Delivered</span>
            <span className="hidden sm:inline">Rated 4.8/5 by 10,000+ Clients</span>
          </div>
        </section>
        {/* HOW IT WORKS */}
        <section className="py-4 md:py-6 mb-3 md:mb-5">
          <HowItWorks />
        </section>
        {/* OUR PROMISE */}
        <section className="py-4 md:py-6">
          <OurPromise />
        </section>
        {/* TESTIMONIALS */}
        <section className="py-4 md:py-6">
          <Testimonials />
        </section>
        {/* FAQ */}
        <section>
          <FAQ faqs={FAQS} />
        </section>
        {/* CTA */}
        <section className="text-center space-y-5 mt-10 py-6 md:py-10">
          <h2 className="text-4xl font-extrabold mb-3">Ready to try YesViral?</h2>
          <p className="text-[#444] text-lg mb-8">
            Join over 100,000+ Creators already growing with YesViral—choose your service and unlock High-Quality results in minutes.
          </p>
          <div className="mt-8 mb-8">
            <button
              className="bg-[#007BFF] text-white px-8 py-3 text-lg rounded-xl hover:bg-[#005FCC] font-bold shadow transition"
              onClick={openOrderModalPlatform}
            >
              View Services
            </button>
          </div>
        </section>
      </main>
      {/* SALES NOTIFICATIONS (OUTSIDE MAIN, GLOBAL!) */}
      <SalesNotifications />
      {/* ANIMATED STAR STYLE */}
      <style jsx global>{`
        @keyframes starGlow {
          0% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 0 #FFD700);}
          30% { transform: rotate(8deg) scale(1.16); filter: drop-shadow(0 0 8px #FFD700);}
          55% { transform: rotate(-7deg) scale(1.09); filter: drop-shadow(0 0 12px #FFF78A);}
          80% { transform: rotate(0deg) scale(1.13); filter: drop-shadow(0 0 10px #FFD700);}
          100% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 0 #FFD700);}
        }
        .star-animate {
          animation: starGlow 2.6s cubic-bezier(.65,.05,.36,1) infinite;
          will-change: transform, filter;
        }
      `}</style>
    </>
  );
}
