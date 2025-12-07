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
          content="Learn about YesViral — the premium, technology-driven growth platform trusted by thousands of creators worldwide."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#E6F0FF] to-white pt-32 pb-28">
        <div className="max-w-6xl mx-auto px-6">

          {/* ===========================
              HERO / INTRO
          ============================ */}
          <div className="text-center mb-24 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
              The Story Behind <span className="text-[#007BFF]">YesViral</span>
            </h1>

            <p className="text-lg text-[#444444] mt-5 max-w-2xl mx-auto leading-relaxed">
              A premium, next-generation platform created for creators, brands, and businesses
              who expect more than just engagement — they expect <strong>Instant Delivery</strong>,
              <strong> Premium Quality</strong>, and <strong>Reliable Performance</strong>.
            </p>

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white border border-[#CFE4FF] rounded-xl shadow-lg p-6">
                <h3 className="text-3xl font-extrabold text-[#007BFF]">100K+</h3>
                <p className="text-sm text-[#444] mt-1">Creators Trust YesViral</p>
              </div>

              <div className="bg-white border border-[#CFE4FF] rounded-xl shadow-lg p-6">
                <h3 className="text-3xl font-extrabold text-[#007BFF]">2M+</h3>
                <p className="text-sm text-[#444] mt-1">Orders Processed</p>
              </div>

              <div className="bg-white border border-[#CFE4FF] rounded-xl shadow-lg p-6">
                <h3 className="text-3xl font-extrabold text-[#007BFF]">24/7</h3>
                <p className="text-sm text-[#444] mt-1">Automated Delivery</p>
              </div>
            </div>
          </div>

          {/* ===========================
              OUR MISSION
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-20 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111111] mb-6">Our Mission</h2>
            <p className="text-[#444444] text-lg leading-relaxed">
              Our mission is simple: <strong>make growth effortless</strong>.
              <br /><br />
              The creator economy is evolving fast. Outdated delivery systems, inconsistent
              platforms, and unreliable services slow creators down. YesViral was designed
              from the ground up to remove those limitations using advanced technology,
              optimized routing systems, and premium delivery solutions.
              <br /><br />
              Everything we build is focused on <strong>speed</strong>, 
              <strong> consistency</strong>, and <strong>trust</strong>.
            </p>
          </div>

          {/* ===========================
              PDN EXPLAINER
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-20 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111111] mb-6">
              What Powers YesViral: Private Delivery Networks
            </h2>

            <p className="text-[#444] text-lg leading-relaxed mb-6">
              Instead of relying on traditional outdated systems, YesViral uses 
              <strong> Private Delivery Networks (PDNs)</strong> — advanced, constantly-optimized
              routing frameworks that allow true <strong>Instant Delivery</strong>,
              <strong> Premium Quality</strong>, and <strong>Real Performance Tracking</strong>.
            </p>

            {/* PDN Card */}
            <div className="bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl p-8 text-center shadow-lg">
              <p className="text-[#444] text-lg leading-relaxed">
                PDNs enable dynamic routing, minimize downtime, improve accuracy, and deliver
                orders through the highest-quality channels available — all without requiring
                any access to your accounts.
              </p>
            </div>
          </div>

          {/* ===========================
              WHY YESVIRAL IS DIFFERENT
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-20 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111111] mb-6">Why YesViral Is Different</h2>

            <p className="text-[#444444] text-lg leading-relaxed mb-8">
              YesViral stands apart from traditional platforms by focusing on modern engineering
              and automated optimization. Here's what sets us apart:
            </p>

            <ul className="space-y-4 text-[#444444] text-lg leading-relaxed ml-1">
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Faster Processing</strong> powered by dynamic routing technology
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Higher Consistency</strong> with stress-tested delivery channels
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Smart Automation</strong> to minimize downtime and delays
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Enhanced Security</strong> with encrypted, zero-access processing
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Real Performance Tracking</strong> using real PDN infrastructure
              </li>
            </ul>
          </div>

          {/* ===========================
              CTA
          ============================ */}
          <div className="text-center mt-24 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#111111] mb-4">
              The Future of Creator Growth Starts Here
            </h2>

            <p className="text-[#444444] max-w-2xl mx-auto mb-8 text-lg">
              Join the creators and brands using YesViral to grow smarter, faster, and
              more consistently — backed by premium-quality delivery and real automation.
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
