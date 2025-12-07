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

        {/* Floating Orbs (YesViral Clean Premium) */}
        <div className="absolute top-[-140px] left-[-140px] w-[280px] h-[280px] bg-[#007BFF22] rounded-full blur-3xl opacity-40 animate-floatSlow"></div>
        <div className="absolute bottom-[-140px] right-[-140px] w-[260px] h-[260px] bg-[#005FCC22] rounded-full blur-3xl opacity-40 animate-floatSlow2"></div>

        <div className="relative max-w-6xl mx-auto px-6">

          {/* ===========================
              HERO SECTION
          ============================ */}
          <div className="text-center mb-24 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#111] leading-tight">
              The Story Behind <span className="text-[#007BFF]">YesViral</span>
            </h1>

            <p className="text-lg text-[#444] mt-6 max-w-2xl mx-auto leading-relaxed">
              Built for creators who expect <strong>Instant Delivery</strong>, <strong>Premium Quality</strong>, 
              and <strong>Reliable Performance</strong>. YesViral brings modern engineering to a space that needed it.
            </p>
          </div>

          {/* ===========================
              STATS — PREMIUM CLEAN
          ============================ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28 animate-fadeIn">
            {[
              { label: "Creators Trust YesViral", value: "100,000+" },
              { label: "Orders Processed", value: "2 Million+" },
              { label: "Automated Delivery", value: "24/7" },
            ].map((stat, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/80 border border-[#CFE4FF] rounded-2xl shadow-xl p-8 text-center"
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
              At YesViral, our mission is simple: <strong>Make Growth Effortless</strong>.
              <br /><br />
              Outdated systems slow creators down. YesViral fixes that with advanced routing,
              optimized delivery, and automated systems built to deliver <strong>Instant Results</strong>,
              <strong> Consistency</strong>, and <strong>Trust</strong>.
              <br /><br />
              Every tool and feature is built around making growth feel easy, seamless, and modern.
            </p>
          </div>

          {/* ===========================
              PDN EXPLAINER
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-xl p-12 mb-24 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111] mb-6">
              What Powers YesViral: Private Delivery Networks
            </h2>

            <p className="text-lg text-[#444] leading-relaxed mb-10">
              Private Delivery Networks (PDNs) allow YesViral to deliver unmatched speed,
              stability, and premium quality — far beyond traditional services.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-8 bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2 text-[#007BFF]">Dynamic Routing</h3>
                <p className="text-sm text-[#444]">
                  Every order is routed through the fastest channel in real-time.
                </p>
              </div>

              <div className="p-8 bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2 text-[#007BFF]">Smart Automation</h3>
                <p className="text-sm text-[#444]">
                  Eliminates downtime using intelligent rerouting systems.
                </p>
              </div>

              <div className="p-8 bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2 text-[#007BFF]">Premium Quality</h3>
                <p className="text-sm text-[#444]">
                  Delivers stable, high-quality results through optimized networks.
                </p>
              </div>
            </div>
          </div>

          {/* ===========================
              WHY YESVIRAL IS DIFFERENT
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-24 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111] mb-6">Why YesViral Is Different</h2>

            <ul className="space-y-4 text-[#444] text-lg leading-relaxed ml-1">
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Faster Processing</strong> using real-time dynamic routing
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Higher Consistency</strong> through stress-tested delivery channels
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Smart Automation</strong> that minimizes delays
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Enhanced Security</strong> with encrypted, zero-access workflows
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Real Performance Tracking</strong> powered by PDN tech
              </li>
            </ul>
          </div>

          {/* ===========================
              CTA
          ============================ */}
          <div className="text-center mt-24 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111] mb-4">
              Your Growth Starts Now
            </h2>

            <p className="text-[#444] max-w-2xl mx-auto mb-8 text-lg">
              Join thousands of creators who trust YesViral to help them grow smarter and faster.
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
