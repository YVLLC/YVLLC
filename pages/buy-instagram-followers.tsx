// pages/buy-instagram-followers.tsx
import Head from "next/head";
import Link from "next/link";
import { Instagram, ShieldCheck, Zap, Star, Clock, RefreshCcw, UserCheck, Lock } from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";

const PRICING_TIERS = [
  {
    label: "Starter Boost",
    amount: "500 Followers",
    price: "$6.99",
    badge: "Perfect For New Accounts",
    delivery: "Fast Delivery · Starts In Minutes",
  },
  {
    label: "Growth Package",
    amount: "2,000 Followers",
    price: "$19.99",
    badge: "Best Seller",
    delivery: "Fast Delivery · 30-Day Refill Included",
  },
  {
    label: "Authority Package",
    amount: "5,000 Followers",
    price: "$39.99",
    badge: "For Brands & Creators",
    delivery: "High-Quality · Priority Routing",
  },
  {
    label: "Viral Package",
    amount: "10,000 Followers",
    price: "$74.99",
    badge: "Maximum Social Proof",
    delivery: "Fast Delivery · Priority Support",
  },
];

export default function BuyInstagramFollowersPage() {
  const { openOrderModal } = useOrderModal();

  const handleOrderClick = () => {
    // Open global order modal prefilled for Instagram Followers (if your context supports it)
    openOrderModal?.("instagram", "Followers");
  };

  return (
    <>
      <Head>
        <title>Buy Instagram Followers – Instant, High-Quality Growth | YesViral</title>
        <meta
          name="description"
          content="Buy real, high-quality Instagram followers with instant delivery. YesViral uses Private Delivery Networks (PDNs) for safe, fast, and consistent growth trusted by 100,000+ creators."
        />
        <meta
          name="keywords"
          content="buy instagram followers, buy real instagram followers, instagram growth service, instant instagram followers, safe instagram followers, yesviral instagram followers"
        />
        <link rel="canonical" href="https://www.yesviral.com/buy-instagram-followers" />
        <meta property="og:title" content="Buy Instagram Followers – Premium Growth | YesViral" />
        <meta
          property="og:description"
          content="Increase your Instagram credibility with real followers delivered through YesViral’s Private Delivery Networks. Fast, safe, and trusted."
        />
        <meta property="og:url" content="https://www.yesviral.com/buy-instagram-followers" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="YesViral" />
        <meta property="og:image" content="https://www.yesviral.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buy Instagram Followers – Instant Growth | YesViral" />
        <meta
          name="twitter:description"
          content="Premium Instagram growth with instant delivery, refill protection, and real followers. Powered by YesViral."
        />
        <meta name="twitter:image" content="https://www.yesviral.com/og-image.jpg" />
        <script
          type="application/ld+json"
          // Service / Offer schema for “Buy Instagram Followers”
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
                "Purchase high-quality Instagram followers with instant delivery and 30-day refill protection through YesViral’s Private Delivery Networks.",
              areaServed: "Worldwide",
              serviceType: "Instagram Followers",
            }),
          }}
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-[#E6F0FF] via-white to-white pt-28 pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* ===========================
              HERO SECTION
          ============================ */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Side */}
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
                Build Instant Social Proof with Premium Instagram Followers delivered through{" "}
                <strong>Private Delivery Networks (PDNs)</strong>. YesViral is engineered for{" "}
                <strong>Speed</strong>, <strong>Stability</strong>, and{" "}
                <strong>Real, High-Quality Growth</strong> — without risky shortcuts.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleOrderClick}
                  className="bg-[#007BFF] text-white font-semibold px-7 py-3 rounded-xl shadow-md hover:bg-[#005FCC] transition"
                >
                  Get Instagram Followers
                </button>
                <Link
                  href="/"
                  className="bg-white border border-[#CFE4FF] text-[#007BFF] font-semibold px-7 py-3 rounded-xl shadow hover:bg-[#F5FAFF] transition text-center"
                >
                  View All Services
                </Link>
              </div>

              <p className="text-xs text-[#555]">
                🔒 No Password Required · ⚡ Orders Typically Start In Minutes · ⭐ Trusted by 100,000+ Creators
              </p>
            </div>

            {/* Right Side – Trust / Highlights */}
            <div className="space-y-5">
              <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#E6F0FF]">
                    <ShieldCheck size={26} className="text-[#007BFF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#007BFF] uppercase tracking-wide">
                      Engineered For Trust
                    </p>
                    <p className="text-xs text-[#444]">
                      YesViral uses upgraded PDNs to keep delivery stable, discreet, and secure.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="bg-[#F5FAFF] rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-[#007BFF]">100k+</p>
                    <p className="text-[11px] text-[#444]">Creators Trust YesViral</p>
                  </div>
                  <div className="bg-[#F5FAFF] rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-[#007BFF]">2M+</p>
                    <p className="text-[11px] text-[#444]">Orders Processed</p>
                  </div>
                  <div className="bg-[#F5FAFF] rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-[#007BFF]">4.8★</p>
                    <p className="text-[11px] text-[#444]">Average Rating</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs text-[#444]">
                  <Lock size={16} className="text-[#007BFF]" />
                  <span>SSL Encrypted · Zero Password Access · Private Delivery Infrastructure</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===========================
              PRICING / PACKAGES
          ============================ */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold text-[#007BFF]">
                Choose Your Instagram Follower Package
              </h2>
              <p className="text-[#444] max-w-2xl mx-auto">
                Every package uses the same High-Quality delivery routes — you choose how much
                Social Proof you want to unlock.
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
                    <h3 className="text-lg font-bold text-[#111]">{tier.label}</h3>
                    <p className="text-xl font-extrabold text-[#007BFF]">{tier.price}</p>
                    <p className="text-sm font-medium text-[#111]">{tier.amount}</p>
                    <p className="text-xs text-[#444] mt-2">{tier.delivery}</p>
                  </div>
                  <button
                    onClick={handleOrderClick}
                    className="mt-5 w-full bg-[#007BFF] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#005FCC] transition shadow"
                  >
                    Get This Package
                  </button>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-[#777]">
              *All prices are illustrative. Your final pricing is based on real-time rates inside the YesViral checkout.
            </p>
          </section>

          {/* ===========================
              WHY YESVIRAL FOR IG FOLLOWERS
          ============================ */}
          <section className="bg-white/90 backdrop-blur-xl border border-[#CFE4FF] rounded-3xl shadow-xl p-10 space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-[#007BFF]">
                Why Buy Instagram Followers From YesViral?
              </h2>
              <p className="text-[#444] max-w-2xl mx-auto">
                Not all follower providers are built the same. YesViral uses upgraded Private
                Delivery Networks to keep your Instagram growth fast, stable, and secure.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#E6F0FF]/70 border border-[#CFE4FF] rounded-2xl p-7 flex flex-col items-center text-center shadow-md">
                <Zap className="text-[#007BFF]" size={34} />
                <h3 className="font-bold text-lg mt-3 text-[#111]">Instant Activation</h3>
                <p className="text-sm text-[#444] mt-2">
                  Orders typically start within minutes thanks to PDN-based dynamic routing systems.
                </p>
              </div>
              <div className="bg-[#E6F0FF]/70 border border-[#CFE4FF] rounded-2xl p-7 flex flex-col items-center text-center shadow-md">
                <UserCheck className="text-[#007BFF]" size={34} />
                <h3 className="font-bold text-lg mt-3 text-[#111]">High-Quality Profiles</h3>
                <p className="text-sm text-[#444] mt-2">
                  Our delivery network prioritizes stable, realistic profiles for stronger Social Proof.
                </p>
              </div>
              <div className="bg-[#E6F0FF]/70 border border-[#CFE4FF] rounded-2xl p-7 flex flex-col items-center text-center shadow-md">
                <RefreshCcw className="text-[#007BFF]" size={34} />
                <h3 className="font-bold text-lg mt-3 text-[#111]">30-Day Refill Protection</h3>
                <p className="text-sm text-[#444] mt-2">
                  If drops occur within the refill window, we re-deliver — no hassle, no tickets.
                </p>
              </div>
              <div className="bg-[#E6F0FF]/70 border border-[#CFE4FF] rounded-2xl p-7 flex flex-col items-center text-center shadow-md">
                <Clock className="text-[#007BFF]" size={34} />
                <h3 className="font-bold text-lg mt-3 text-[#111]">24/7 Priority Support</h3>
                <p className="text-sm text-[#444] mt-2">
                  Our support team is ready around the clock for questions, changes, or upgrades.
                </p>
              </div>
              <div className="bg-[#E6F0FF]/70 border border-[#CFE4FF] rounded-2xl p-7 flex flex-col items-center text-center shadow-md">
                <ShieldCheck className="text-[#007BFF]" size={34} />
                <h3 className="font-bold text-lg mt-3 text-[#111]">Safe & Secure Delivery</h3>
                <p className="text-sm text-[#444] mt-2">
                  No passwords, no risky logins. All delivery is external and privacy-focused.
                </p>
              </div>
              <div className="bg-[#E6F0FF]/70 border border-[#CFE4FF] rounded-2xl p-7 flex flex-col items-center text-center shadow-md">
                <Star className="text-[#007BFF]" size={34} />
                <h3 className="font-bold text-lg mt-3 text-[#111]">Proven Reputation</h3>
                <p className="text-sm text-[#444] mt-2">
                  YesViral is trusted by creators, brands, and agencies as a long-term growth partner.
                </p>
              </div>
            </div>
          </section>

          {/* ===========================
              FAQ SNIPPET (IG-SPECIFIC)
          ============================ */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#007BFF]">
                Instagram Followers – Frequently Asked Questions
              </h2>
              <p className="text-[#444] max-w-2xl mx-auto text-sm">
                Quick answers to the most common questions about buying Instagram Followers through YesViral.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#CFE4FF] rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[#111] mb-2 text-sm">
                  Are These Instagram Followers Real?
                </h3>
                <p className="text-sm text-[#444] leading-relaxed">
                  YesViral uses Private Delivery Networks that focus on High-Quality, realistic-looking
                  profiles. Our infrastructure is designed to provide stable, believable Social Proof —
                  not low-quality bot floods.
                </p>
              </div>

              <div className="bg-white border border-[#CFE4FF] rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[#111] mb-2 text-sm">
                  How Fast Does Delivery Start?
                </h3>
                <p className="text-sm text-[#444] leading-relaxed">
                  Most Instagram Follower orders start within a few minutes. Larger packages may roll
                  out gradually to keep growth looking more natural and controlled.
                </p>
              </div>

              <div className="bg-white border border-[#CFE4FF] rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[#111] mb-2 text-sm">
                  Do You Need My Password Or Login?
                </h3>
                <p className="text-sm text-[#444] leading-relaxed">
                  Never. YesViral will never ask for your password. All services are delivered externally,
                  using only your Instagram username or profile link.
                </p>
              </div>

              <div className="bg-white border border-[#CFE4FF] rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[#111] mb-2 text-sm">
                  What Happens If Followers Drop?
                </h3>
                <p className="text-sm text-[#444] leading-relaxed">
                  If your Followers drop within the refill period, your order can be refilled based on
                  the package terms. YesViral is built to keep your Social Proof stable over time.
                </p>
              </div>
            </div>
          </section>

          {/* ===========================
              SEO CONTENT BLOCK (BOTTOM)
          ============================ */}
          <section className="max-w-4xl mx-auto bg-white border border-[#CFE4FF] rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#111] mb-3">
              Why Buying Instagram Followers Works For Social Proof
            </h2>
            <p className="text-sm text-[#444] leading-relaxed mb-3">
              In today’s attention-driven world, Social Proof is everything. When new visitors land on
              your profile and see a strong follower count, they instantly trust you more. Brands,
              creators, and businesses use Instagram Followers strategically to unlock opportunities,
              close deals, and improve how they are perceived online.
            </p>
            <p className="text-sm text-[#444] leading-relaxed mb-3">
              Buying Instagram Followers from a Premium Provider like YesViral is not about chasing
              fake numbers — it is about accelerating the first impression, so your content has a
              better chance of performing. When paired with real content and consistent posting,
              Social Proof can help you grow faster and stand out in competitive niches.
            </p>
            <p className="text-sm text-[#444] leading-relaxed">
              YesViral focuses on High-Quality delivery, safe external routing, and long-term stability.
              If you are serious about building authority on Instagram, a carefully selected Follower
              package can be the edge that gets you noticed faster.
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
              Choose your Follower Package, complete your secure checkout, and let YesViral handle
              the rest with fast, premium-quality delivery.
            </p>
            <button
              onClick={handleOrderClick}
              className="mt-3 bg-[#007BFF] text-white px-8 py-3 text-sm md:text-base rounded-xl hover:bg-[#005FCC] font-bold shadow transition"
            >
              Buy Instagram Followers Now
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
