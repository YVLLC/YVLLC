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

      <div className="min-h-screen bg-gradient-to-br from-[#E6F0FF] to-white pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-0">

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
              About <span className="text-[#007BFF]">YesViral</span>
            </h1>
            <p className="text-lg text-[#444444] mt-4 max-w-3xl mx-auto">
              A premium, creator-first growth platform built for speed, reliability, 
              and industry-leading results. We help thousands of creators, brands, 
              and businesses grow every single day.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-10 mb-14">
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Our Mission</h2>
            <p className="text-[#444444] leading-relaxed">
              YesViral was created with a simple belief: social growth should be fast, 
              reliable, and stress-free. For too long, creators have dealt with slow 
              delivery, low-quality results, and platforms that feel outdated or unsafe.
              <br/><br/>
              We set out to build something better — a modern growth platform that delivers 
              consistent results powered by upgraded Private Delivery Networks (PDNs), 
              real data routing, and smart automation. Everything we do is built around 
              **quality**, **speed**, and **trust**.
            </p>
          </div>

          {/* Why We’re Different */}
          <div className="bg-white border border-[#CFE4FF] shadow-xl rounded-2xl p-10 mb-14">
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Why YesViral Exists</h2>
            <p className="text-[#444444] leading-relaxed">
              In an industry full of recycled services and outdated systems, YesViral 
              brings a premium, technology-driven approach. Our team continuously upgrades 
              our delivery networks, optimizes routing speeds, and ensures each order is 
              processed through the highest-quality channels available.
              <br/><br/>
              We’re obsessed with performance. Our platform is engineered to deliver 
              results **fast**, while maintaining **consistency**, **precision**, and 
              **premium quality** across every service we offer.
            </p>
          </div>

          {/* Trust + Quality */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-8 text-center">
              <div className="text-[#007BFF] text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-[#111111]">Instant Delivery</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                Orders begin processing within minutes thanks to our optimized PDN 
                architecture.
              </p>
            </div>

            <div className="bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-8 text-center">
              <div className="text-[#007BFF] text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2 text-[#111111]">Safe & Secure</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                No passwords, no access needed — your privacy and security  
                are always protected.
              </p>
            </div>

            <div className="bg-white border border-[#CFE4FF] shadow-lg rounded-2xl p-8 text-center">
              <div className="text-[#007BFF] text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2 text-[#111111]">Premium Quality</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                Every service is hand-selected, stress-tested, and upgraded for the 
                highest-quality delivery possible.
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-[#111111] mb-4">
              We're just getting started.
            </h2>
            <p className="text-[#444444] max-w-2xl mx-auto mb-8">
              Join thousands of creators and brands using YesViral every day to grow 
              smarter, faster, and more consistently than ever before.
            </p>

            <Link
              href="/"
              className="inline-block bg-[#007BFF] hover:bg-[#005FCC] text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
