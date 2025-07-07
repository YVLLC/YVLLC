import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>YesViral – Buy Real Followers, Likes & Views</title>
        <meta
          name="description"
          content="Grow your social media with YesViral. Buy real followers, likes, views, and more across Instagram, TikTok, YouTube & beyond — fast, secure, and trusted."
        />
      </Head>

      <main className="px-6 max-w-7xl mx-auto py-16 space-y-28">
        {/* Hero */}
        <section className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-[#007BFF] leading-tight">
            Buy Social Media Followers, Likes & Views. Fast.
            Boost your Social-Proof in Minutes!
          </h1>
          <p className="text-[#444] text-lg sm:text-xl max-w-2xl mx-auto">
Over 100,000 creators, brands, and influencers trust us to power their growth — because results matter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link href="/checkout">
              <button className="btn-primary text-lg px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
                View Services
              </button>
            </Link>
            <Link href="/track-order">
              <button className="btn-secondary text-lg px-8 py-3 rounded-xl hover:scale-105 transition-transform">
                Try Free Likes
              </button>
            </Link>
          </div>
        </section>

        {/* About */}
        <section id="about" className="text-center space-y-5">
          <h2 className="section-title text-3xl sm:text-4xl">Why YesViral?</h2>
          <p className="section-subtext max-w-3xl mx-auto text-base sm:text-lg">
            YesViral is a full-scale, top-tier growth engine. Thousands of influencers, brands, and agencies trust us for results that don’t just stick — they snowball.
          </p>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="space-y-10">
          <h2 className="section-title text-center text-3xl sm:text-4xl">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "1",
                title: "Choose a Service",
                desc: "Pick a platform and what you need — followers, likes, views, or comments."
              },
              {
                step: "2",
                title: "Enter Your Info",
                desc: "Provide your username or post link. Never your password."
              },
              {
                step: "3",
                title: "Get Fast Results",
                desc: "Orders start within minutes. You’ll see results roll in naturally and rapidly."
              }
            ].map(({ step, title, desc }) => (
              <div key={step} className="card transition hover:shadow-xl">
                <div className="text-5xl font-bold text-[#007BFF] mb-3">{step}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-[#444] text-sm sm:text-base">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="space-y-6">
          <h2 className="section-title text-center text-3xl sm:text-4xl">What Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "I gained real followers in under an hour — and they didn’t drop!",
                name: "Taylor M."
              },
              {
                quote: "Great support, great pricing, real growth. Worth every cent.",
                name: "Jake B."
              }
            ].map(({ quote, name }) => (
              <div
                key={name}
                className="card border border-gray-200 p-6 rounded-xl shadow-md bg-white"
              >
                <p className="italic text-[#111]">“{quote}”</p>
                <p className="mt-3 text-sm text-[#444] font-semibold">– {name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-6">
          <h2 className="section-title text-center text-3xl sm:text-4xl">Frequently Asked Questions</h2>
          <div className="space-y-5 max-w-3xl mx-auto">
            {[
              {
                q: "Are these real followers and likes?",
                a: "Yes — we use tested promotion systems that provide real and lasting engagement."
              },
              {
                q: "Do you need my password?",
                a: "Never. Just your username or post URL is enough."
              },
              {
                q: "How fast is delivery?",
                a: "Most orders start processing within 0–30 minutes after payment."
              }
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="font-semibold text-[#111]">{q}</p>
                <p className="text-[#444] text-sm sm:text-base">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4 mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Go Viral?</h2>
          <p className="text-[#444] text-base sm:text-lg">
            Start growing your brand today — choose a service and go big.
          </p>
          <Link href="/checkout">
            <button className="btn-primary px-8 py-3 text-lg rounded-xl hover:scale-105 transition">
              Choose a Service
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
