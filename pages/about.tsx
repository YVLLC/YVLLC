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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
              The Story Behind <span className="text-[#007BFF]">YesViral</span>
            </h1>

            <p className="text-lg text-[#444444] mt-5 max-w-2xl mx-auto leading-relaxed">
              A next-generation growth platform created for creators, brands, and businesses
              who expect more than just “followers.” YesViral was built to deliver **speed**, 
              **quality**, and **true reliability** in an industry that desperately needed it.
            </p>

            {/* subtle gradient banner */}
            <div className="mt-10 mx-auto max-w-3xl bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-5">
              <p className="text-sm text-[#444] leading-relaxed">
                Trusted by over <span className="font-semibold text-[#007BFF]">100,000+</span>{" "}
                creators worldwide, YesViral runs on advanced Private Delivery Networks (PDNs), 
                automated systems, and premium-quality routing to ensure your growth is instant, 
                consistent, and secure.
              </p>
            </div>
          </div>

          {/* ===========================
              OUR MISSION
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-[#111111] mb-6">Our Mission</h2>
            <p className="text-[#444444] text-lg leading-relaxed">
              At YesViral, our mission has always been simple: **make growth effortless**.
              <br /><br />
              The social media space moves fast — creators shouldn’t have to deal with 
              outdated platforms, inconsistent delivery, or unreliable services. So we 
              built a platform that combines modern engineering, smart automation, and 
              optimized delivery systems to give creators exactly what they’re looking for:
              <span className="font-semibold text-[#007BFF]"> premium results, delivered fast and safely.</span>
              <br /><br />
              Every feature of YesViral is designed to remove friction, save time, and 
              provide creators with a smooth, stress-free experience from start to finish.
            </p>
          </div>

          {/* ===========================
              WHY WE'RE DIFFERENT
          ============================ */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-12 mb-20">
            <h2 className="text-3xl font-bold text-[#111111] mb-6">Why YesViral Is Different</h2>
            <p className="text-[#444444] text-lg leading-relaxed mb-8">
              Unlike traditional platforms that rely on outdated delivery systems, YesViral is 
              powered by constantly-upgraded Private Delivery Networks. This ensures:
            </p>

            <ul className="space-y-4 text-[#444444] text-lg leading-relaxed ml-1">
              <li>• **Faster processing** powered by dynamic routing technology</li>
              <li>• **Higher consistency** with stress-tested premium-quality channels</li>
              <li>• **Smarter automation** to minimize downtime and delays</li>
              <li>• **Enhanced security** with zero-access requirements and encrypted processing</li>
              <li>• **Real, trackable performance** driven by real PDN infrastructure</li>
            </ul>

            <p className="text-[#444444] text-lg leading-relaxed mt-8">
              We’re not here to be “just another” growth service. We’re building the next 
              generation of creator tools — reliable, polished, and built to scale with you.
            </p>
          </div>

          {/* ===========================
              TRUST CARDS
          ============================ */}
          <div className="grid md:grid-cols-3 gap-10 mb-24">
            {/* Instant Delivery */}
            <div className="bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-10 text-center">
              <div className="text-[#007BFF] text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-[#111111] mb-2">Instant Delivery</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                Orders start processing automatically within minutes thanks to real-time PDN routing.
              </p>
            </div>

            {/* Secure */}
            <div className="bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-10 text-center">
              <div className="text-[#007BFF] text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-[#111111] mb-2">Safe & Secure</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                No passwords or login access required — your account stays fully protected at all times.
              </p>
            </div>

            {/* Premium Quality */}
            <div className="bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-10 text-center">
              <div className="text-[#007BFF] text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-[#111111] mb-2">Premium Quality</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                Every service is hand-picked, tested, and optimized to deliver consistent, premium growth.
              </p>
            </div>
          </div>

          {/* ===========================
              CTA / ENDING
          ============================ */}
          <div className="text-center mt-24">
            <h2 className="text-3xl font-bold text-[#111111] mb-4">
              The future of creator growth starts here.
            </h2>

            <p className="text-[#444444] max-w-2xl mx-auto mb-8 text-lg">
              Join thousands of creators and brands using YesViral to scale faster — with 
              the consistency, quality, and reliability you deserve.
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
