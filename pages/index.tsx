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

/* ✅ ADDED — FREE LIKES TRIAL (ONLY ADDITION) */
import FreeLikesTrial from "@/components/FreeLikesTrial";

const SalesNotifications = dynamic(
  () => import("@/components/SalesNotifications"),
  { ssr: false }
);

// ----------------------------------------------------------
// FAQ CONTENT
// ----------------------------------------------------------
const FAQS = [
  {
    question: "Why choose YesViral?",
    answer:
      "YesViral was built for customers who want Premium, High-Quality Growth without Inconsistencies or Delays. Our priority is simple: Fast Delivery, High-Quality Results, and a Smooth Experience from start to finish. Everything we provide is designed to strengthen your Credibility and make your profile look Established Immediately.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer Premium Followers, Likes, Views, Comments, and Subscribers for Instagram, TikTok, and YouTube. Our services help Creators, Influencers, and Businesses present a Stronger, more Trusted Social Presence the moment the order begins.",
  },
  {
    question: "Do I need to share my password?",
    answer:
      "No. You never share your Password with us. Your account stays fully Secure and 100% in your Control. We only need your Public Username or Post Link to complete your order.",
  },
  {
    question: "Are the followers real?",
    answer:
      "Yes, We deliver High-Quality, Premium Engagement designed to make your profile Active and Credible. We avoid Low-Grade methods entirely. Our priority is High-Quality Social Growth that enhances your Presence while keeping your account Safe.",
  },
  {
    question: "Is your service safe?",
    answer:
      "Yes. Every order is processed through Secure, Proven Systems, and we never ask for Sensitive Information. Thousands of Customers use YesViral daily because the process is Stable, Consistent, and built with Account Safety in mind.",
  },
  {
    question: "How does the 30-day refill guarantee work?",
    answer:
      "If you experience any Drops within 30 Days after your order is completed, we Refill them quickly at No Additional Cost. Simply provide your Order ID and our team handles the rest. The guarantee ensures your Results stay exactly as Strong as they were on Day One.",
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
      {/* ---------------------------------------------------------- */}
      {/* FIXED SEO HEAD — THIS IS THE ONLY SECTION MODIFIED */}
      {/* ---------------------------------------------------------- */}

      <Head>
        <title>YesViral – Buy High-Quality Followers, Likes & Views</title>

        <meta
          name="description"
          content="Grow your Social Media with YesViral. Buy Real Followers, Likes & Views — Fast Delivery, Safe & Trusted by 100,000+ Creators."
        />

        <link rel="canonical" href="https://www.yesviral.com/" />

        <meta
          name="keywords"
          content="buy instagram followers, buy tiktok followers, buy youtube views, buy instagram likes, social media growth, premium followers, yesviral, yes viral, fast delivery followers, private delivery networks"
        />

        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="YesViral – Buy High-Quality Followers, Likes & Views"
        />
        <meta
          property="og:description"
          content="Buy real, high-quality followers, likes & views for Instagram, TikTok, and YouTube. Instant delivery. Trusted by 100,000+ creators."
        />
        <meta
          property="og:image"
          content="https://www.yesviral.com/og-image.jpg"
        />
        <meta property="og:url" content="https://www.yesviral.com/" />
        <meta property="og:site_name" content="YesViral" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="YesViral – Buy High-Quality Followers, Likes & Views"
        />
        <meta
          name="twitter:description"
          content="Unlock instant social media growth with YesViral. High-quality followers, likes & views delivered in minutes."
        />
        <meta
          name="twitter:image"
          content="https://www.yesviral.com/og-image.jpg"
        />

        <meta name="theme-color" content="#007BFF" />
        <meta name="apple-mobile-web-app-title" content="YesViral" />
        <meta name="application-name" content="YesViral" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "YesViral – Buy High-Quality Followers, Likes & Views",
              "url": "https://www.yesviral.com/",
              "isPartOf": {
                "@type": "WebSite",
                "name": "YesViral",
                "url": "https://www.yesviral.com/"
              },
              "publisher": {
                "@type": "Organization",
                "name": "YesViral",
                "logo": "https://www.yesviral.com/logo.png"
              },
              "description": "YesViral delivers premium social media growth with instant, secure, high-quality followers, likes, and views for Instagram, TikTok, and YouTube."
            }
          `}
        </script>
      </Head>

      {/* NOTHING BELOW THIS LINE WAS CHANGED */}

      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPlatform={modalPlatform ?? undefined}
        initialService={modalService ?? undefined}
      />

      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-6 sm:py-10 space-y-10 select-none">
        {/* =============================================== */}
        {/* HERO SECTION */}
        {/* =============================================== */}
        <section className="relative flex flex-col-reverse md:grid md:grid-cols-2 md:gap-8 items-center">
          {/* LEFT SIDE */}
          <div className="w-full flex flex-col items-center md:items-start space-y-7 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FF] rounded-full text-xs font-bold text-[#007BFF]">
              <Star size={18} className="text-yellow-400 star-animate" />
              Trusted by 100,000+ Creators
            </div>
<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#007bff] leading-[1.15] sm:leading-tight md:leading-snug tracking-tight text-balance">
  Buy Instagram & TikTok Followers, Likes & Views. Delivery in Minutes!
</h1>
            <p className="text-[#444] text-base sm:text-lg max-w-md sm:max-w-xl font-medium">
              Premium Social Growth with YesViral — #1 Trusted for Delivering
              High-Quality Followers, Likes & Views through Exclusive Private
              Delivery Networks.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                className="bg-[#007BFF] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-[#005FCC] transition"
                onClick={openOrderModalPlatform}
              >
                Get Started
              </button>

              <Link
                href="#FreeLikesTrial"
                className="bg-white border border-[#CFE4FF] text-[#007BFF] font-semibold px-6 py-3 rounded-xl shadow hover:bg-[#F5FAFF] transition"
              >
                Try Free Likes
              </Link>
            </div>

            <span className="text-xs text-[#555]">
              🔒 SSL-secured payments · ⭐ 4.8/5 rating · ⚡ Orders typically
              start in minutes
            </span>
          </div>

          {/* RIGHT SIDE PHONE */}
          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative inline-block">
              <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-nowrap gap-3">
                <div className="bg-white/95 border border-[#CFE4FF] rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap yv-card-1">
                  <span className="text-[#007BFF] text-lg">💙</span>
                  <p className="text-[13px] font-semibold text-[#111]">
                    Trusted by Brands & Creators
                  </p>
                </div>

                <div className="bg-white/95 border border-[#CFE4FF] rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap yv-card-2">
                  <span className="text-[#007BFF] text-lg">📦</span>
                  <p className="text-[13px] font-semibold text-[#111]">
                    Millions of Orders Delivered
                  </p>
                </div>
              </div>

              <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 flex flex-nowrap gap-3">
                <div className="bg-white/95 border border-[#CFE4FF] rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap yv-card-3">
                  <span className="text-[#007BFF] text-lg">🔒</span>
                  <p className="text-[13px] font-semibold text-[#111]">
                    Private Delivery Networks
                  </p>
                </div>

                <div className="bg-white/95 border border-[#CFE4FF] rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap yv-card-4">
                  <span className="text-[#007BFF] text-lg">⚡</span>
                  <p className="text-[13px] font-semibold text-[#111]">
                    Industry-Leading Speed & Quality
                  </p>
                </div>
              </div>

              <Image
                src="/hero-illustration.png"
                alt="YesViral Hero"
                width={420}
                height={420}
                className="w-full max-w-[420px] h-auto object-contain drop-shadow-2xl"
                draggable={false}
                priority
              />
            </div>
          </div>
        </section>

        {/* =============================================== */}
        {/* SERVICES SECTION */}
        {/* =============================================== */}
        <section id="order" className="space-y-7 py-8 md:py-14">
          <h2 className="text-center text-4xl font-extrabold text-[#007BFF]">
            Place Your Order Instantly
          </h2>
          <p className="text-[#444] text-center max-w-2xl mx-auto">
            Choose your service —{" "}
            <span className="font-semibold text-[#007BFF]">
              Instant delivery starts within minutes.
            </span>
          </p>

          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4].map((i) => (
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
            <span className="ml-2 text-[#007BFF] text-sm font-semibold">
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
                    {description.map((d, i) => (
                      <li key={i}>{d}</li>
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
                    className="mt-4 w-full bg-[#007BFF] text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-[#005FCC] shadow transition"
                    onClick={() => openOrderModalService(key)}
                  >
                    Order
                  </button>
                </div>
              )
            )}
          </div>
        </section>

        {/* =============================================== */}
        {/* TESTIMONIALS (MOVED HERE ONLY) */}
        {/* =============================================== */}
        <section className="py-2 md:py-3">
          <Testimonials />
        </section>

        {/* =============================================== */}
        {/* WHY CHOOSE YESVIRAL */}
        {/* =============================================== */}
        <section
          id="about"
          className="bg-white/90 backdrop-blur-xl p-10 md:p-14 rounded-3xl shadow-xl border border-[#CFE4FF] space-y-10 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#007BFF] tracking-tight">
            Why Choose YesViral?
          </h2>

          <p className="text-[#444] text-lg max-w-2xl mx-auto -mt-2">
            Delivering unmatched quality, speed, and reliability through
            advanced Private Delivery Networks.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
            {/* CARD 1 */}
            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-[#007BFF] transition flex flex-col items-center">
              <Zap className="text-[#007BFF]" size={38} />
              <h3 className="font-bold text-lg mt-3 text-[#111]">
                Instant Activation
              </h3>
              <p className="text-sm text-[#444] leading-relaxed">
                Orders begin processing within minutes through our Private
                Delivery Networks (PDNS).
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-[#007BFF] transition flex flex-col items-center">
              <UserCheck className="text-[#007BFF]" size={38} />
              <h3 className="font-bold text-lg mt-3 text-[#111]">
                High-Quality Engagement
              </h3>
              <p className="text-sm text-[#444] leading-relaxed">
                Exclusive Private Networks ensure Fast, Stable & Premium
                Engagement, every order.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-[#007BFF] transition flex flex-col items-center">
              <ShieldCheck className="text-[#007BFF]" size={38} />
              <h3 className="font-bold text-lg mt-3 text-[#111]">
                Advanced Security
              </h3>
              <p className="text-sm text-[#444] leading-relaxed">
                Zero passwords required. Full SSL encryption + Strict privacy
                safeguards.
              </p>
            </div>

            {/* CARD 4 */}
            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-[#007BFF] transition flex flex-col items-center">
              <Clock className="text-[#007BFF]" size={38} />
              <h3 className="font-bold text-lg mt-3 text-[#111]">
                24/7 Priority Support
              </h3>
              <p className="text-sm text-[#444] leading-relaxed">
                Real support available around the clock to help with anything
                you need.
              </p>
            </div>

            {/* CARD 5 */}
            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-[#007BFF] transition flex flex-col items-center">
              <RefreshCcw className="text-[#007BFF]" size={38} />
              <h3 className="font-bold text-lg mt-3 text-[#111]">
                30-Day Refill Guarantee
              </h3>
              <p className="text-sm text-[#444] leading-relaxed">
                Drops? We instantly refill your order at no cost for 30-days —
                Fully Guaranteed.
              </p>
            </div>

            {/* CARD 6 */}
            <div className="bg-[#E6F0FF]/70 backdrop-blur-md border border-[#CFE4FF] rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-[#007BFF] transition flex flex-col items-center">
              <Star className="text-[#007BFF]" size={38} />
              <h3 className="font-bold text-lg mt-3 text-[#111]">
                Proven Reputation
              </h3>
              <p className="text-sm text-[#444] leading-relaxed">
                Trusted by over 100,000+ creators worldwide with a 4.8/5 rating.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 mt-10 text-[#007BFF] font-bold text-lg">
            <span>100k+ Followers Delivered</span>
            <span className="hidden sm:inline">•</span>
            <span>Rated 4.8/5 by 10,000+ Clients</span>
          </div>
        </section>

        {/* OTHER SECTIONS */}
        <section className="py-2 md:py-3">
          <HowItWorks />
        </section>

        <section className="py-2 md:py-3">
          <OurPromise />
        </section>

        <section className="mb-4 md:mb-6">
          <FAQ faqs={FAQS} />
        </section>

        {/* ✅ ADDED — FREE LIKES SECTION (ONLY ADDITION) */}
        {/* ✅ FIX: add matching anchor id so hero button scrolls here */}
        <section id="FreeLikesTrial">
          <FreeLikesTrial />
        </section>

        {/* FINAL CTA */}
        <section className="text-center space-y-4 py-4 md:py-6">
          <h2 className="text-4xl font-extrabold mb-2 text-[#007BFF]">
            Ready to try YesViral?
          </h2>
          <p className="text-[#444] text-lg">
            Join over 100,000+ Creators already growing with YesViral — Choose
            your Service and unlock High-Quality results in minutes.
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
          animation: starGlow 2.6s cubic-bezier(0.65, 0.05, 0.36, 1)
            infinite;
        }

        @keyframes yvFloat {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .yv-card-1 {
          animation: yvFloat 7s ease-in-out infinite;
        }
        .yv-card-2 {
          animation: yvFloat 8s ease-in-out infinite;
        }
        .yv-card-3 {
          animation: yvFloat 9s ease-in-out infinite;
        }
        .yv-card-4 {
          animation: yvFloat 10s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
