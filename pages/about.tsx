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
          content="Discover the technology, mission, and story behind YesViral — the premium growth platform trusted by creators worldwide."
        />
      </Head>

      <div className="relative min-h-screen bg-gradient-to-br from-[#E6F0FF] to-white pt-32 pb-32 overflow-hidden">

        {/* Floating Gradient Blobs */}
        <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-[#007BFF33] rounded-full blur-3xl opacity-40 animate-floatSlow"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[280px] h-[280px] bg-[#005FCC33] rounded-full blur-3xl opacity-40 animate-floatSlow2"></div>

        <div className="relative max-w-6xl mx-auto px-6">

          {/* ===========================
              HERO SECTION
          ============================ */}
          <div className="text-center mb-24 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#111] leading-tight">
              The Future of <span className="text-[#007BFF]">Creator Growth</span> Starts Here
            </h1>

            <p className="text-lg text-[#444] mt-6 max-w-2xl mx-auto leading-relaxed">
              YesViral is a technology-powered growth platform offering <strong>Instant Delivery</strong>, 
              <strong> Premium Quality</strong>, and <strong>Reliable Performance</strong> through advanced Private Delivery Networks.
            </p>
          </div>

          {/* ===========================
              STATS (ANIMATED)
          ============================ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28 animate-fadeIn">
            {[
              { label: "Creators Trust YesViral", value: "100,000+" },
              { label: "Orders Processed", value: "2 Million+" },
              { label: "Automated Delivery", value: "24/7" },
            ].map((stat, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/90 border border-[#CFE4FF] rounded-2xl shadow-xl p-8 text-center"
              >
                <h3 className="text-4xl font-extrabold text-[#007BFF] animate-counter">
                  {stat.value}
                </h3>
                <p className="text-sm text-[#444] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* ===========================
              OUR MISSION
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-24 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111] mb-6">Our Mission</h2>
            <p className="text-[#444] text-lg leading-relaxed">
              Our mission is to deliver <strong>Effortless Growth</strong> to every creator.
              <br /><br />
              Instead of outdated delivery systems and unpredictable performance, YesViral provides 
              creators with a platform engineered for <strong>Instant Delivery</strong>, 
              <strong> Consistency</strong>, and <strong>Trust</strong>.
              <br /><br />
              We focus on removing friction with the most reliable and modern growth infrastructure in the industry.
            </p>
          </div>

          {/* ===========================
              PDN EXPLAINER — VISUAL DIAGRAM
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-xl p-12 mb-24 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111] mb-6">
              What Powers YesViral: Private Delivery Networks
            </h2>

            <p className="text-lg text-[#444] leading-relaxed mb-10">
              Private Delivery Networks (PDNs) allow YesViral to deliver unmatched speed,
              stability, and premium quality — far beyond traditional delivery systems.
            </p>

            {/* Diagram */}
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-8 bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2 text-[#007BFF]">Dynamic Routing</h3>
                <p className="text-sm text-[#444]">
                  Routes every order through the fastest possible channel in real time.
                </p>
              </div>

              <div className="p-8 bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2 text-[#007BFF]">Smarter Automation</h3>
                <p className="text-sm text-[#444]">
                  Removes delays and downtime with intelligent rerouting systems.
                </p>
              </div>

              <div className="p-8 bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2 text-[#007BFF]">Premium Quality</h3>
                <p className="text-sm text-[#444]">
                  Ensures stable, consistent, and high-quality results through vetted channels.
                </p>
              </div>
            </div>
          </div>

          {/* ===========================
              TIMELINE
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-24 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111] mb-8">How YesViral Evolved</h2>

            <div className="space-y-10 border-l-4 border-[#007BFF] pl-8">
              <div>
                <h3 className="text-xl font-bold text-[#111]">2023 — Foundation</h3>
                <p className="text-[#444] mt-2">
                  YesViral begins development with a mission to modernize social growth.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#111]">2024 — PDN Infrastructure</h3>
                <p className="text-[#444] mt-2">
                  Launch of Private Delivery Networks for instant, stable delivery.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#111]">2025 — Automation Expansion</h3>
                <p className="text-[#444] mt-2">
                  Automated smart routing and upgraded systems scale YesViral globally.
                </p>
              </div>
            </div>
          </div>

          {/* ===========================
              FOUNDER INSIGHT
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-24 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111] mb-6">A Message from the Team</h2>

            <p className="text-lg text-[#444] leading-relaxed max-w-3xl">
              “We built YesViral because creators deserve a platform that values 
              speed, reliability, and real technology — not outdated systems. 
              Every feature we create is designed to help you grow without limits.”
            </p>
          </div>

          {/* ===========================
              CTA
          ============================ */}
          <div className="text-center mt-24 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111] mb-4">
              Your Growth Starts Now
            </h2>

            <p className="text-[#444] max-w-2xl mx-auto mb-8 text-lg">
              Join thousands of creators using YesViral to scale smarter and faster than ever before.
            </p>

            <Link
              href="/"
              className="inline-block bg-[#007BFF] hover:bg-[#005FCC] text-white font-semibold py-3 px-10 rounded-xl shadow-md transition-all"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
