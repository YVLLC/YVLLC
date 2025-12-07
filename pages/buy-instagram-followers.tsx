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

  // Prefilled IG Followers (DEFAULT)
  const handleOrderClick = () => {
    openOrderModal?.("instagram", "Followers");
  };

  // STEP 1 (blank)
  const handleChooseDifferentService = () => {
    openOrderModal?.();
  };

  // ✅ FIX: Pass quantity encoded inside service string
  const handlePackageClick = (qty: number) => {
    openOrderModal?.("instagram", `Followers|${qty}`);
  };

  return (
    <>
      <Head>
        <title>
          Buy Instagram Followers – Instant, High-Quality Growth | YesViral
        </title>
        <meta
          name="description"
          content="Buy real, high-quality Instagram Followers with instant delivery. YesViral uses Private Delivery Networks for safe, fast, and consistent growth trusted by 100,000+ creators."
        />
        <meta
          name="keywords"
          content="buy Instagram followers, buy real Instagram followers, instant followers, YesViral followers, Instagram growth"
        />
        <link
          rel="canonical"
          href="https://www.yesviral.com/buy-instagram-followers"
        />

        <meta property="og:title" content="Buy Instagram Followers – YesViral" />
        <meta
          property="og:description"
          content="Increase your Instagram credibility with real followers delivered instantly through YesViral’s Private Delivery Networks."
        />
        <meta
          property="og:image"
          content="https://www.yesviral.com/og-image.jpg"
        />
        <meta
          property="og:url"
          content="https://www.yesviral.com/buy-instagram-followers"
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-[#E6F0FF] via-white to-white pt-28 pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* HERO SECTION */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FF] rounded-full text-xs font-bold text-[#007BFF]">
                <Instagram size={18} className="text-[#E1306C]" />
                <span>Buy Instagram Followers – YesViral</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111] leading-tight">
                Buy <span className="text-[#007BFF]">Instagram Followers</span>{" "}
                With Instant, High-Quality Delivery.
              </h1>

              <p className="text-base sm:text-lg text-[#444] max-w-xl leading-relaxed">
                Build Instant Social Proof with Premium Instagram Followers delivered through{" "}
                <strong>Private Delivery Networks (PDNs)</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Prefilled IG Followers */}
                <button
                  onClick={handleOrderClick}
                  className="bg-[#007BFF] text-white font-semibold px-7 py-3 rounded-xl shadow-md hover:bg-[#005FCC] transition"
                >
                  Get Instagram Followers
                </button>

                {/* OPEN MODAL STEP 1 */}
                <button
                  onClick={() => openOrderModal?.()}
                  className="bg-white border border-[#CFE4FF] text-[#007BFF] font-semibold px-7 py-3 rounded-xl shadow hover:bg-[#F5FAFF] transition"
                >
                  View All Services
                </button>
              </div>

              <p className="text-xs text-[#555]">
                🔒 No Password Required · ⚡ Starts In Minutes · ⭐ Trusted by 100,000+ Creators
              </p>
            </div>

            {/* TRUST CARD */}
            <div className="space-y-5">
              <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#E6F0FF]">
                    <ShieldCheck size={26} className="text-[#007BFF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#007BFF]">
                      Engineered For Trust
                    </p>
                    <p className="text-xs text-[#444]">
                      PDN-powered delivery keeps growth stable & secure.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3">
                  <Stat label="Creators Trust Us" value="100k+" />
                  <Stat label="Orders Delivered" value="2M+" />
                  <Stat label="Average Rating" value="4.8★" />
                </div>
              </div>
            </div>
          </section>

          {/* PRICING SECTION */}
          <section className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#007BFF]">
                Choose Your Instagram Follower Package
              </h2>
              <p className="text-[#444] max-w-2xl mx-auto">
                All packages use the same premium delivery routes — choose how much Social Proof you need.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRICING_TIERS.map((tier, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#CFE4FF] rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition p-6 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#007BFF] uppercase">
                      {tier.badge}
                    </p>
                    <h3 className="text-lg font-bold text-[#111]">{tier.label}</h3>
                    <p className="text-xl font-extrabold text-[#007BFF]">{tier.price}</p>
                    <p className="text-sm font-medium">{tier.amount}</p>
                    <p className="text-xs text-[#444]">{tier.delivery}</p>
                  </div>

                  {/* FIX: EXACT QUANTITY */}
                  <button
                    onClick={() => handlePackageClick(tier.qty)}
                    className="mt-5 w-full bg-[#007BFF] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#005FCC] transition shadow"
                  >
                    Get This Package
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#007BFF]">
              Ready To Boost Your Instagram With YesViral?
            </h2>

            <button
              onClick={handleOrderClick}
              className="mt-3 bg-[#007BFF] text-white px-8 py-3 rounded-xl hover:bg-[#005FCC] font-bold shadow transition"
            >
              Buy Instagram Followers Now
            </button>

            <div className="mt-3">
              <button
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

function Stat({ label, value }: any) {
  return (
    <div className="bg-[#F5FAFF] rounded-xl p-3 text-center">
      <p className="text-lg font-extrabold text-[#007BFF]">{value}</p>
      <p className="text-[11px] text-[#444]">{label}</p>
    </div>
  );
}
