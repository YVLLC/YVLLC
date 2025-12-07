import Head from "next/head";
import Link from "next/link";
import {
  Instagram,
  ShieldCheck,
  Zap,
  Star,
  Clock,
  RefreshCcw,
  UserCheck,
  Lock,
} from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";

// REAL PRICING FROM ORDER MODAL – FORMAT A
const PRICING_TIERS = [
  {
    label: "Starter Boost",
    amount: "100 Followers",
    price: "$3.99",
    qty: 100,
    badge: "Perfect For New Accounts",
    delivery: "Fast Delivery · Starts In Minutes",
  },
  {
    label: "Growth Package",
    amount: "500 Followers",
    price: "$11.99",
    qty: 500,
    badge: "Best Seller",
    delivery: "Fast Delivery · 30-Day Refill Included",
  },
  {
    label: "Authority Package",
    amount: "1,000 Followers",
    price: "$14.99",
    qty: 1000,
    badge: "For Creators & Brands",
    delivery: "High-Quality · Priority Routing",
  },
  {
    label: "Viral Package",
    amount: "5,000 Followers",
    price: "$59.99",
    qty: 5000,
    badge: "Maximum Social Proof",
    delivery: "Fast Delivery · Priority Support",
  },
];

export default function BuyInstagramFollowersPage() {
  const { openOrderModal } = useOrderModal();

  // Open prefilled for Instagram Followers (DETAILS STEP)
  const handleOrderClick = () => {
    openOrderModal?.("instagram", "Followers");
  };

  // Open modal at STEP 1 – NO PREFILL
  const handleChooseDifferentService = () => {
    openOrderModal?.(); // STEP 1 — BLANK
  };

  // Package click → open modal with EXACT quantity
  const handlePackageClick = (qty: number) => {
    window.dispatchEvent(new CustomEvent("yv-set-qty", { detail: qty }));
    openOrderModal?.("instagram", "Followers");
  };

  return (
    <>
      <Head>
        <title>
          Buy Instagram Followers – Instant, High-Quality Growth | YesViral
        </title>
        <meta
          name="description"
          content="Buy real, high-quality Instagram Followers with instant delivery. YesViral uses Private Delivery Networks (PDNs) for safe, fast, and consistent growth trusted by 100,000+ creators."
        />
        <meta
          name="keywords"
          content="buy Instagram followers, buy real Instagram followers, Instagram growth service, instant Instagram followers, safe Instagram followers, YesViral Instagram followers, social proof boost, premium Instagram growth"
        />
        <link
          rel="canonical"
          href="https://www.yesviral.com/buy-instagram-followers"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Buy Instagram Followers – Premium Growth | YesViral"
        />
        <meta
          property="og:description"
          content="Increase your Instagram credibility with real Followers delivered through YesViral’s Private Delivery Networks. Fast, safe, and trusted by 100,000+ creators and brands."
        />
        <meta
          property="og:url"
          content="https://www.yesviral.com/buy-instagram-followers"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="YesViral" />
        <meta
          property="og:image"
          content="https://www.yesviral.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Buy Instagram Followers – Instant Growth | YesViral"
        />
        <meta
          name="twitter:description"
          content="Premium Instagram growth with instant delivery, refill protection, and real followers. Powered by YesViral’s Private Delivery Networks."
        />
        <meta
          name="twitter:image"
          content="https://www.yesviral.com/og-image.jpg"
        />

        {/* SEO JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Buy Instagram Followers",
              provider: {
                "@type": "Organization",
                name: "YesViral",
                url: "https://www.yesviral.com",
              },
              url: "https://www.yesviral.com/buy-instagram-followers",
              description:
                "Purchase high-quality Instagram Followers with instant delivery and 30-day refill protection through YesViral’s Private Delivery Networks.",
              areaServed: "Worldwide",
              serviceType: "Instagram Followers",
              offers: {
                "@type": "OfferCatalog",
                name: "Instagram Followers Packages",
                itemListElement: PRICING_TIERS.map((tier) => ({
                  "@type": "Offer",
                  name: tier.amount,
                  price: tier.price.replace("$", ""),
                  priceCurrency: "USD",
                  url: "https://www.yesviral.com/buy-instagram-followers",
                  category: "Instagram Followers",
                })),
              },
            }),
          }}
        />
      </Head>

      {/* ---------------- MAIN PAGE ---------------- */}
      <main className="min-h-screen bg-gradient-to-b from-[#E6F0FF] via-white to-white pt-28 pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* HERO SECTION */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FF] rounded-full text-xs font-bold text-[#007BFF]">
                <Instagram size={18} className="text-[#E1306C]" />
                <span>Buy Instagram Followers – YesViral</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111] leading-tight">
                Buy{" "}
                <span className="text-[#007BFF]">Instagram Followers</span>{" "}
                With Instant, High-Quality Delivery.
              </h1>

              <p className="text-base sm:text-lg text-[#444] max-w-xl leading-relaxed">
                Build Instant Social Proof with Premium Instagram Followers
                delivered through{" "}
                <strong>Private Delivery Networks (PDNs)</strong>. YesViral is
                engineered for <strong>Speed</strong>,{" "}
                <strong>Stability</strong>, and{" "}
                <strong>Real, High-Quality Growth</strong> — without risky
                shortcuts or outdated systems.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Prefilled IG Followers */}
                <button
                  onClick={handleOrderClick}
                  className="bg-[#007BFF] text-white font-semibold px-7 py-3 rounded-xl shadow-md hover:bg-[#005FCC] transition"
                >
                  Get Instagram Followers
                </button>

                {/* Open modal at step 1 — ALL SERVICES */}
                <button
                  onClick={() => openOrderModal?.()}
                  className="bg-white border border-[#CFE4FF] text-[#007BFF] font-semibold px-7 py-3 rounded-xl shadow hover:bg-[#F5FAFF] transition text-center"
                >
                  View All Services
                </button>
              </div>

              <p className="text-xs text-[#555]">
                🔒 No Password Required · ⚡ Orders Start In Minutes · ⭐ Trusted
                By 100,000+ Creators
              </p>
            </div>

            {/* TRUST CARDS */}
            <div className="space-y-5">
              <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#E6F0FF]">
                    <ShieldCheck size={26} className="text-[#007BFF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#007BFF] uppercase">
                      Engineered For Trust
                    </p>
                    <p className="text-xs text-[#444]">
                      YesViral uses upgraded Private Delivery Networks to keep
                      delivery Stable, Discreet, and Secure.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="bg-[#F5FAFF] rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-[#007BFF]">
                      100k+
                    </p>
                    <p className="text-[11px] text-[#444]">Creators Trust Us</p>
                  </div>
                  <div className="bg-[#F5FAFF] rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-[#007BFF]">
                      2M+
                    </p>
                    <p className="text-[11px] text-[#444]">Orders Delivered</p>
                  </div>
                  <div className="bg-[#F5FAFF] rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-[#007BFF]">
                      4.8★
                    </p>
                    <p className="text-[11px] text-[#444]">Avg Rating</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs text-[#444]">
                  <Lock size={16} className="text-[#007BFF]" />
                  <span>SSL Encrypted · Zero Password Access</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===========================
              PRICING SECTION
          ============================ */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold text-[#007BFF]">
                Choose Your Instagram Follower Package
              </h2>
              <p className="text-[#444] max-w-2xl mx-auto">
                Every package uses the same high-quality routes — you choose how
                much Social Proof you want to unlock.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRICING_TIERS.map((tier, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#CFE4FF] rounded-2xl shadow-md hover:shadow-2xl transition hover:-translate-y-1 p-6 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#007BFF] uppercase tracking-wide">
                      {tier.badge}
                    </p>
                    <h3 className="text-lg font-bold text-[#111]">
                      {tier.label}
                    </h3>
                    <p className="text-xl font-extrabold text-[#007BFF]">
                      {tier.price}
                    </p>
                    <p className="text-sm font-medium text-[#111]">
                      {tier.amount}
                    </p>
                    <p className="text-xs text-[#444] mt-2">
                      {tier.delivery}
                    </p>
                  </div>

                  {/* package now passes EXACT qty */}
                  <button
                    onClick={() => handlePackageClick(tier.qty)}
                    className="mt-5 w-full bg-[#007BFF] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#005FCC] transition shadow"
                  >
                    Get This Package
                  </button>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-[#777]">
              *Pricing reflects real-time values inside YesViral checkout.
            </p>
          </section>

          {/* ===========================
              WHY YESVIRAL
          ============================ */}
          <section className="bg-white/90 backdrop-blur-xl border border-[#CFE4FF] rounded-3xl shadow-xl p-10 space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-[#007BFF]">
                Why Buy Instagram Followers From YesViral?
              </h2>
              <p className="text-[#444] max-w-2xl mx-auto">
                YesViral uses upgraded Private Delivery Networks to keep your
                growth fast, stable, and secure.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Feature icon={<Zap size={34} />} title="Instant Activation">
                Orders typically start within minutes.
              </Feature>

              <Feature icon={<UserCheck size={34} />} title="High-Quality Profiles">
                Stable, realistic profiles → stronger Social Proof.
              </Feature>

              <Feature icon={<RefreshCcw size={34} />} title="30-Day Refill Protection">
                If drops occur, we refill — no ticket needed.
              </Feature>

              <Feature icon={<Clock size={34} />} title="24/7 Priority Support">
                Our support team is always on standby.
              </Feature>

              <Feature icon={<ShieldCheck size={34} />} title="Safe & Secure Delivery">
                No passwords, no risky logins — ever.
              </Feature>

              <Feature icon={<Star size={34} />} title="Proven Reputation">
                Trusted by creators, brands, and agencies.
              </Feature>
            </div>
          </section>

          {/* ===========================
              FAQ
          ============================ */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold text-[#007BFF]">
                Instagram Followers – FAQ
              </h2>
              <p className="text-[#444] max-w-2xl mx-auto text-sm">
                Quick answers about Instagram Followers through YesViral.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FAQCard question="Are These Instagram Followers Real?">
                Yes — we use Private Delivery Networks that provide High-Quality,
                realistic profiles designed for long-term stability.
              </FAQCard>

              <FAQCard question="How Fast Does Delivery Start?">
                Most orders begin within minutes. Bigger packages may roll out
                gradually for natural growth.
              </FAQCard>

              <FAQCard question="Do You Need My Password Or Login?">
                Never. We only use your Instagram username or profile link.
              </FAQCard>

              <FAQCard question="What Happens If Followers Drop?">
                Our 30-day refill ensures your Social Proof stays stable.
              </FAQCard>
            </div>
          </section>

          {/* ===========================
              SEO CONTENT BLOCK
          ============================ */}
          <section className="max-w-4xl mx-auto bg-white border border-[#CFE4FF] rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#111] mb-3">
              Why Buying Instagram Followers Works For Social Proof
            </h2>
            <p className="text-sm text-[#444] leading-relaxed mb-3">
              Social Proof drives first impressions. A strong follower count
              instantly boosts your credibility and trustworthiness.
            </p>
            <p className="text-sm text-[#444] leading-relaxed mb-3">
              Buying Instagram Followers from YesViral accelerates early
              momentum, helping your content perform better algorithmically.
            </p>
            <p className="text-sm text-[#444] leading-relaxed">
              When paired with real content and smart engagement, our Premium
              Delivery routes give you a competitive edge in your niche.
            </p>
          </section>

          {/* ===========================
              FINAL CTA
          ============================ */}
          <section className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#007BFF]">
              Ready To Boost Your Instagram With YesViral?
            </h2>
            <p className="text-[#444] text-sm md:text-base max-w-2xl mx-auto">
              Choose your package, complete checkout, and YesViral handles the
              rest with fast, Premium-Quality delivery.
            </p>

            <button
              onClick={handleOrderClick}
              className="mt-3 bg-[#007BFF] text-white px-8 py-3 text-sm md:text-base rounded-xl hover:bg-[#005FCC] font-bold shadow transition"
            >
              Buy Instagram Followers Now
            </button>

            <div className="mt-3">
              <button
                type="button"
                onClick={handleChooseDifferentService}
                className="text-xs md:text-sm text-[#007BFF] underline hover:text-[#005FCC] font-semibold"
              >
                Choose A Different Service
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

/* ============================================================
   REUSABLE MINI COMPONENTS
============================================================ */

function Feature({ icon, title, children }: any) {
  return (
    <div className="bg-[#E6F0FF]/70 border border-[#CFE4FF] rounded-2xl p-7 flex flex-col items-center text-center shadow-md">
      <div className="text-[#007BFF]">{icon}</div>
      <h3 className="font-bold text-lg mt-3 text-[#111]">{title}</h3>
      <p className="text-sm text-[#444] mt-2">{children}</p>
    </div>
  );
}

function FAQCard({ question, children }: any) {
  return (
    <div className="bg-white border border-[#CFE4FF] rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-[#111] mb-2 text-sm">{question}</h3>
      <p className="text-sm text-[#444] leading-relaxed">{children}</p>
    </div>
  );
}
