// pages/about.tsx
import Head from "next/head";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us – YesViral</title>
        <meta
          name="description"
          content="Learn how YesViral delivers fast, reliable, and premium-quality social growth through technology, infrastructure, and a creator-first approach."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#E6F0FF] to-white pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6">

          {/* ===========================
              HERO
          ============================ */}
          <section className="grid gap-10 md:grid-cols-[1.4fr,1fr] items-center mb-20 animate-fadeIn">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#888] uppercase mb-4">
                About YesViral
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111] mb-5">
                Premium Growth, Engineered for Creators.
              </h1>
              <p className="text-base md:text-lg text-[#444] leading-relaxed max-w-xl">
                YesViral is a performance-driven growth platform built for creators, brands, and businesses
                that care about more than just numbers. We focus on <strong>speed</strong>,{" "}
                <strong>stability</strong>, and <strong>quality</strong> — so every order feels consistent,
                predictable, and worth the investment.
              </p>
            </div>

            <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-xl p-6 md:p-7">
              <h2 className="text-sm font-semibold text-[#111] mb-4">
                By the Numbers
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-extrabold text-[#007BFF] leading-tight">
                    100K+
                  </div>
                  <p className="text-[11px] text-[#666] mt-1">
                    Creators And Brands Served
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#007BFF] leading-tight">
                    2M+
                  </div>
                  <p className="text-[11px] text-[#666] mt-1">
                    Orders Processed Across Platforms
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#007BFF] leading-tight">
                    24/7
                  </div>
                  <p className="text-[11px] text-[#666] mt-1">
                    Automated Delivery Infrastructure
                  </p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E3EEFF]">
                <p className="text-xs text-[#666] leading-relaxed">
                  Every system is built to minimize downtime and keep delivery moving – even while you sleep.
                </p>
              </div>
            </div>
          </section>

          {/* ===========================
              WHO WE ARE
          ============================ */}
          <section className="grid gap-10 md:grid-cols-2 mb-20 animate-fadeIn">
            <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-md p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-4">
                Who We Are
              </h2>
              <p className="text-[#444] text-base leading-relaxed mb-4">
                YesViral is a modern growth platform focused on delivering results that feel{" "}
                <strong>reliable</strong>, not random. We combine infrastructure, automation, and careful
                service selection to make social growth feel closer to a product — not a gamble.
              </p>
              <p className="text-[#444] text-base leading-relaxed">
                Our team continually monitors performance, optimizes routes, and upgrades delivery sources
                so that each order benefits from the latest improvements behind the scenes.
              </p>
            </div>

            <div className="space-y-5">
              <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-[#111] mb-1">
                  Creator-First Perspective
                </h3>
                <p className="text-sm text-[#444] leading-relaxed">
                  We build from the point of view of the creator and brand owner. That means clear flows,
                  fast delivery, and no unnecessary complexity in how you place, track, and manage orders.
                </p>
              </div>
              <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-[#111] mb-1">
                  Infrastructure, Not Hype
                </h3>
                <p className="text-sm text-[#444] leading-relaxed">
                  Behind every order is real routing logic, performance monitoring, and delivery logic —
                  not just a button that sends traffic to a random source.
                </p>
              </div>
            </div>
          </section>

          {/* ===========================
              HOW YESVIRAL WORKS
          ============================ */}
          <section className="mb-20 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-2">
                  How YesViral Works
                </h2>
                <p className="text-sm md:text-base text-[#444] max-w-xl">
                  Under the hood, YesViral runs on an optimized delivery stack that keeps things simple on
                  the surface — and highly controlled in the background.
                </p>
            </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-6">
                <div className="text-xs font-semibold text-[#007BFF] mb-2 uppercase tracking-[0.18em]">
                  Step One
                </div>
                <h3 className="text-sm font-semibold text-[#111] mb-2">
                  You Choose What You Need
                </h3>
                <p className="text-sm text-[#444] leading-relaxed">
                  Select the platform, service, and quantity that match your goals. Pricing and
                  expectations are clear before you pay.
                </p>
              </div>
              <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-6">
                <div className="text-xs font-semibold text-[#007BFF] mb-2 uppercase tracking-[0.18em]">
                  Step Two
                </div>
                <h3 className="text-sm font-semibold text-[#111] mb-2">
                  Our System Routes Your Order
                </h3>
                <p className="text-sm text-[#444] leading-relaxed">
                  Your order is sent through optimized delivery paths that balance speed, stability, and
                  completion rate — no manual guesswork.
                </p>
              </div>
              <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-6">
                <div className="text-xs font-semibold text-[#007BFF] mb-2 uppercase tracking-[0.18em]">
                  Step Three
                </div>
                <h3 className="text-sm font-semibold text-[#111] mb-2">
                  You Track and Scale Confidently
                </h3>
                <p className="text-sm text-[#444] leading-relaxed">
                  Orders are easy to track and repeat. When something works for you, it is simple to scale
                  the exact same flow again.
                </p>
              </div>
            </div>
          </section>

          {/* ===========================
              WHAT SETS US APART
          ============================ */}
          <section className="mb-20 animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-6">
              What Sets YesViral Apart
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-6 flex flex-col">
                <h3 className="text-sm font-semibold text-[#111] mb-2">
                  Built for Real Usage
                </h3>
                <p className="text-sm text-[#444] leading-relaxed flex-1">
                  YesViral is designed around repeat customers, not one-off transactions. The goal is to be
                  a dependable part of your growth stack — not a one-time experiment.
                </p>
              </div>

              <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-6 flex flex-col">
                <h3 className="text-sm font-semibold text-[#111] mb-2">
                  Consistent, Not Chaotic
                </h3>
                <p className="text-sm text-[#444] leading-relaxed flex-1">
                  We prioritize stability and repeatability over “flashy” numbers. If we cannot keep a
                  service stable, we do not keep it live.
                </p>
              </div>

              <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-6 flex flex-col">
                <h3 className="text-sm font-semibold text-[#111] mb-2">
                  Clear, Honest Positioning
                </h3>
                <p className="text-sm text-[#444] leading-relaxed flex-1">
                  No exaggerated claims, no fake dashboards. YesViral is straightforward about what it does,
                  how it works, and what you can expect.
                </p>
              </div>
            </div>
          </section>

          {/* ===========================
              CTA
          ============================ */}
          <section className="animate-fadeIn">
            <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-2">
                  Ready To Treat Growth Like Infrastructure?
                </h2>
                <p className="text-sm md:text-base text-[#444] max-w-xl">
                  Start using YesViral as a consistent part of your acquisition and trust-building strategy.
                  Place your first order or log in to continue scaling what already works.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center bg-[#007BFF] hover:bg-[#005FCC] text-white text-sm font-semibold py-3 px-6 rounded-xl shadow-md transition-all"
                >
                  View Services
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center bg-white border border-[#CFE4FF] text-[#111] text-sm font-semibold py-3 px-6 rounded-xl shadow-sm hover:bg-[#F3F6FF] transition-all"
                >
                  Login To Dashboard
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
