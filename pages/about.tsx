// pages/about.tsx
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us – YesViral</title>
        <meta
          name="description"
          content="Learn about YesViral – the premium growth platform trusted by thousands of creators worldwide."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#E6F0FF] to-white pt-32 pb-28">
        <div className="max-w-6xl mx-auto px-6">

          {/* ===========================
              HERO / INTRO
          ============================ */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#007BFF]">
              The Story Behind <span className="text-[#007BFF]">YesViral</span>
            </h1>

            <p className="text-lg text-[#444444] mt-5 max-w-2xl mx-auto leading-relaxed">
              A Next-Generation Growth Platform created for Creators, Brands, and Businesses
              who expect more than just “Followers.” YesViral was built to deliver{" "}
              <strong>Speed</strong>, <strong>Quality</strong>, and{" "}
              <strong>True Reliability</strong> in an industry that desperately needed it.
            </p>

            <div className="mt-10 mx-auto max-w-3xl bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-5">
              <p className="text-sm text-[#444] leading-relaxed">
                Trusted by over <span className="font-semibold text-[#007BFF]">100,000+</span>{" "}
                creators worldwide, YesViral runs on Advanced Private Delivery Networks (PDNs), 
                Automated Systems, and Premium-Quality Routing to ensure your Growth is Instant, 
                Consistent, and Secure.
              </p>
            </div>
          </div>

          {/* ===========================
              OUR MISSION
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-[#111111] mb-6">Our Mission</h2>
            <p className="text-[#444444] text-lg leading-relaxed">
              At YesViral, our mission has always been simple:{" "}
              <strong>Make Growth Effortless</strong>.
              <br /><br />
              The Social Media landscape moves quickly — Creators shouldn’t have to deal with 
              Outdated Platforms, Inconsistent Delivery, or Unreliable Services. So we 
              built a platform that combines Modern Engineering, Smart Automation, and 
              Optimized Delivery Systems to give Creators exactly what they’re looking for:{" "}
              <span className="font-semibold text-[#007BFF]">Premium Results, Delivered Fast and Safely.</span>
              <br /><br />
              Every feature of YesViral is designed to remove Friction, Save Time, and 
              provide Creators with a Smooth, Stress-Free Experience from start to finish.
            </p>
          </div>

          {/* ===========================
              WHY WE'RE DIFFERENT
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-20">
            <h2 className="text-3xl font-bold text-[#111111] mb-6">Why YesViral Is Different</h2>

            <p className="text-[#444444] text-lg leading-relaxed mb-8">
              Unlike Traditional Platforms that rely on outdated delivery systems, YesViral is 
              powered by Constantly-Upgraded Private Delivery Networks. This ensures:
            </p>

            <ul className="space-y-4 text-[#444444] text-lg leading-relaxed ml-1">
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Faster Processing</strong> powered by Dynamic Routing Technology
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Higher Consistency</strong> with Stress-Tested, Premium-Quality Channels
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Smarter Automation</strong> to minimize Downtime and Delays
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Enhanced Security</strong> with Zero-Access Requirements and Encrypted Processing
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-[#007BFF] rounded-full mr-3"></span>
                <strong>Real, Trackable Performance</strong> driven by Real PDN Infrastructure
              </li>
            </ul>

            <p className="text-[#444444] text-lg leading-relaxed mt-8">
              We’re not here to be “Just Another” Growth Service — we’re building the Next 
              Generation of Creator Tools: Reliable, Polished, and Built To Scale With You.
            </p>
          </div>

          {/* ===========================
              TRUST CARDS
          ============================ */}
          <div className="grid md:grid-cols-3 gap-10 mb-24">
            <div className="bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-10 text-center">
              <div className="text-[#007BFF] text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-[#111111] mb-2">Instant Delivery</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                Orders begin processing within minutes thanks to Real-Time PDN Routing.
              </p>
            </div>

            <div className="bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-10 text-center">
              <div className="text-[#007BFF] text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-[#111111] mb-2">Safe & Secure</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                No Passwords or Access Required — your Privacy and Account Security are always protected.
              </p>
            </div>

            <div className="bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-10 text-center">
              <div className="text-[#007BFF] text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-[#111111] mb-2">Premium Quality</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                Every service is Vetted, Optimized, and Tested to deliver the Highest-Quality Growth Possible.
              </p>
            </div>
          </div>

          {/* ===========================
              CTA / ENDING
          ============================ */}
          <div className="text-center mt-24">
            <h2 className="text-3xl font-bold text-[#007bff] mb-4">
              The Future of Creator Growth Starts Here.
            </h2>

            <p className="text-[#444444] max-w-2xl mx-auto mb-8 text-lg">
              Join thousands of creators and brands using YesViral to scale faster — with 
              the Consistency, Quality, and Reliability you deserve.
            </p>

            <Link
              href="/"
              className="inline-block bg-[#007BFF] hover:bg-[#005FCC] text-white hover:text-white font-semibold py-3 px-10 rounded-xl shadow-md transition-all"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
