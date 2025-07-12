import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ShieldCheck,
  Clock,
  UserCheck,
  Zap,
  RefreshCcw,
  Star,
  MessageCircle,
  ThumbsUp,
  Lock,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import OrderModal from "@/components/OrderModal";
import OurPromise from "@/components/OurPromise";

type Service = {
  name: string;
  key: string;
  price: string;
  description: string[];
  icon: JSX.Element;
  tag: string;
  count: string;
};

const SERVICES: Service[] = [
  {
    name: "Instagram Services",
    key: "instagram",
    price: "$0.09 / 100",
    description: [
      "💎 Quality Followers & Likes",
      "⚡️ Rapid Delivery",
      "🛡️ Drop Protection",
      "🔒 100% Secure Checkout"
    ],
    icon: <ShieldCheck className="text-pink-500" size={28} />,
    tag: "Bestseller",
    count: "2,000+ bought this week"
  },
  {
    name: "TikTok Services",
    key: "tiktok",
    price: "$0.08 / 100",
    description: [
      "✨ High-impact Likes & Views",
      "🚀 Instant Order Start",
      "🙅‍♂️ No Login Needed",
      "🛡️ Protected Service"
    ],
    icon: <Zap className="text-blue-400" size={28} />,
    tag: "🔥 Hot",
    count: "1,400+ bought this week"
  },
  {
    name: "YouTube Services",
    key: "youtube",
    price: "$0.05 / 1000",
    description: [
      "🏆 Premium Views & Watch time",
      "📈 Boosts Channel Performance",
      "🤫 Private Delivery",
      "🤖 Algorithm Friendly"
    ],
    icon: <Star className="text-red-500" size={28} />,
    tag: "",
    count: "950+ bought this week"
  }
];

const FAQS = [
  {
    question: "Why choose us?",
    answer: "We combine unbeatable prices, real results, and blazing-fast delivery to help you grow on social media with confidence. Every order is backed by our satisfaction guarantee and refill policy, so you can grow your presence safely, quickly, and with real users. Trusted by over 100,000 creators and businesses."
  },
  {
    question: "What services do you offer?",
    answer: "Our Social Media Marketing services help individuals, influencers, and brands grow their online presence with targeted engagement. Whether you want more followers, subscribers, video views, or music plays, we offer a wide range of services across platforms like Instagram, YouTube, Spotify, TikTok, and more."
  },
  {
    question: "Do I need to share my account password?",
    answer: "No, never. We do not require your password for any of our services. Everything is delivered securely without accessing your account. If you ever receive a message asking for your password claiming to be from us, do not share it—please report it to us immediately."
  },
  {
    question: "Are the followers, likes, and subscribers real?",
    answer: "Yes. We don’t use bots or fake accounts. All engagement comes from real users, helping your account grow through authentic, organic activity that boosts your reach and credibility."
  },
  {
    question: "Is your service safe and legal?",
    answer: "Absolutely. We use safe, secure, and compliant methods to deliver likes, followers, and more. Your account stays 100% protected, and everything we do follows platform guidelines to keep your profile secure."
  },
  {
    question: "What is your refill guarantee?",
    answer: "Our 30-day refill guarantee means that if any followers, likes, views, or engagement drop within 30 days of your purchase, we’ll replace them free of charge. This keeps your results strong and consistent. Just reach out through our contact form—no hassle, no extra cost."
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
    icon: <ShieldCheck className="text-[#E1306C]" size={32} />
  },
  {
    quote: "Great support, great pricing, real growth. Worth every cent.",
    name: "Jake B.",
    platform: "TikTok",
    icon: <Zap className="text-[#00F2EA]" size={32} />
  },
  {
    quote: "The only site I trust. Super fast and my YouTube blew up.",
    name: "Lina S.",
    platform: "YouTube",
    icon: <Star className="text-[#FF0000]" size={32} />
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  return (
    <>
      <Head>
        <title>YesViral – Buy Real Followers, Likes & Views</title>
        <meta name="description" content="Grow your social media with YesViral. Buy real followers, likes, views, and more across Instagram, TikTok, YouTube & beyond — fast, secure, and trusted." />
      </Head>
      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPlatform={modalPlatform}
        initialService={modalService}
      />
      <Link href="/support" className="fixed bottom-6 right-6 z-50">
        <button className="flex items-center gap-2 bg-white shadow-lg px-5 py-3 rounded-full border border-[#CFE4FF] hover:bg-[#F2F9FF] transition group">
          <MessageCircle className="text-[#007BFF] group-hover:scale-110 transition" size={20} />
          <span className="font-semibold text-[#007BFF] text-sm">Live Support</span>
        </button>
      </Link>
      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-14 space-y-28 select-none">
        {/* HERO SECTION */}
        <section className="flex flex-col-reverse md:grid md:grid-cols-2 md:gap-12 items-center">
          <div className="w-full flex flex-col items-center md:items-start space-y-7 text-center md:text-left mt-6 md:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FF] rounded-full mb-2 text-xs font-bold text-[#007BFF] tracking-wide shadow-sm">
              <Star size={18} className="text-yellow-400 star-animate" />
              Trusted by 100,000+ Creators
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#007BFF] leading-tight drop-shadow-sm">
              Blow Up Your Socials. <br className="hidden sm:block" />
              <span className="text-[#005FCC]">Real Growth.</span> No Waiting.
            </h1>
            <p className="text-[#444] text-base sm:text-lg max-w-md sm:max-w-xl mx-auto md:mx-0 font-medium">
              Elevate your social presence with genuine Followers, Likes, and Views—delivered seamlessly. No logins required.
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
              100% Secure Payments
            </span>
          </div>
          <div className="w-full flex justify-center mb-6 md:mb-0">
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
        {/* SERVICES SECTION */}
        <section id="order" className="space-y-10">
          <h2 className="text-center text-4xl font-extrabold">Place Your Order Instantly</h2>
          <p className="text-[#444] text-center max-w-2xl mx-auto">
            Choose your service — no logins, no commitment. <span className="font-semibold text-[#007BFF]">Instant delivery starts within minutes.</span>
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(({ name, price, description, icon, tag, count, key }, idx) => (
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
                <ul className="text-sm text-[#444] pl-5 list-disc space-y-1">
                  {description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium text-[#007BFF]">{price}</span>
                  <span className="text-xs text-[#111] bg-[#E8F1FF] px-2 py-0.5 rounded">{count}</span>
                </div>
                <button
                  className="mt-4 w-full bg-[#007BFF] text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-[#005FCC] shadow transition transform hover:scale-[1.03] active:scale-95"
                  onClick={() => openOrderModalService(key)}
                >
                  Order
                </button>
              </div>
            ))}
          </div>
        </section>
        {/* ABOUT SECTION */}
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
        {/* HOW IT WORKS SECTION */}
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
        {/* OUR PROMISE / GUARANTEES SECTION */}
        <OurPromise />
        {/* TESTIMONIALS SECTION */}
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
        {/* FAQ SECTION */}
        <section id="faq" className="space-y-7">
          <h2 className="text-center text-4xl font-extrabold">Frequently Asked Questions</h2>
          <p className="text-center text-[#444] mb-4">Everything you need to know about our services, safety, and support.</p>
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
              <Link href="/contact" className="text-[#007BFF] underline font-semibold hover:text-[#005FCC] text-sm">
                Didn’t find your answer? Chat with us!
              </Link>
            </div>
          </div>
        </section>
        {/* CTA SECTION */}
        <section className="text-center space-y-5 mt-24">
          <h2 className="text-4xl font-extrabold mb-3">Ready to try YesViral?</h2>
          <p className="text-[#444] text-lg mb-8">
            Join thousands already boosting their socials—choose your package and grow now.
          </p>
          <div className="mt-8">
            <button
              className="bg-[#007BFF] text-white px-8 py-3 text-lg rounded-xl hover:bg-[#005FCC] font-bold shadow transition"
              onClick={openOrderModalPlatform}
            >
              View Services
            </button>
          </div>
        </section>
      </main>
      {/* --- ANIMATED STAR STYLE --- */}
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