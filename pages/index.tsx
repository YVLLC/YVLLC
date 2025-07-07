import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

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

      <main className="px-4 sm:px-6 max-w-7xl mx-auto py-16 space-y-28">
        {/* Hero */}
        <section className="text-center space-y-8">
          <Image
            src="/hero-growth.svg"
            alt="Social Media Growth"
            width={200}
            height={200}
            className="mx-auto"
          />
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#007BFF] leading-tight">
            Buy Real Followers, Likes & Views
            <br className="hidden sm:inline" /> Boost Your Social Presence Fast.
          </h1>
          <p className="text-[#444] text-base sm:text-xl max-w-2xl mx-auto">
            Join 100,000+ creators and brands growing daily with YesViral’s lightning-fast services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link href="/checkout">
              <button className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 rounded-full shadow hover:scale-105 transition-transform">
                View Services
              </button>
            </Link>
            <Link href="/track-order">
              <button className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 rounded-full hover:scale-105 transition-transform">
                Try Free Likes
              </button>
            </Link>
          </div>
        </section>

        {/* About */}
        <section id="about" className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Why YesViral?</h2>
          <p className="max-w-3xl mx-auto text-[#444] text-base sm:text-lg">
            We’re not just a reseller panel. YesViral is a premium performance-based platform trusted by influencers, agencies, and creators who demand real results — fast.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            {["Instant Delivery", "Real Engagement", "Secure & Private"].map((label, i) => (
              <div key={i} className="bg-white border border-[#CFE4FF] p-6 rounded-xl shadow hover:shadow-md transition">
                <p className="text-lg font-semibold mb-2 text-[#007BFF]">{label}</p>
                <p className="text-[#444] text-sm">
                  {label === "Instant Delivery"
                    ? "Your orders start in minutes — no waiting, no guessing."
                    : label === "Real Engagement"
                    ? "Authentic followers, likes, and views from verified traffic sources."
                    : "We never ask for passwords. Your data stays 100% safe."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="space-y-10">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[{
              step: "1",
              title: "Choose a Service",
              desc: "Select what you need — followers, likes, views, or more."
            }, {
              step: "2",
              title: "Enter Your Info",
              desc: "Input your username or post URL. No login needed."
            }, {
              step: "3",
              title: "Watch Growth Begin",
              desc: "Our system activates in minutes. Real results, fast."
            }].map(({ step, title, desc }) => (
              <div key={step} className="bg-white p-6 rounded-xl shadow border border-[#eee] hover:shadow-lg transition">
                <div className="text-4xl font-bold text-[#007BFF] mb-3">{step}</div>
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-[#444] text-sm sm:text-base">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="space-y-8">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">Customer Love 💙</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[{
              quote: "I gained real followers in under an hour — and they didn’t drop!",
              name: "Taylor M."
            }, {
              quote: "Great support, great pricing, real growth. Worth every cent.",
              name: "Jake B."
            }].map(({ quote, name }) => (
              <div key={name} className="bg-white border border-[#ddd] p-6 rounded-xl shadow-sm hover:shadow-md">
                <p className="italic text-[#111]">“{quote}”</p>
                <p className="mt-3 text-sm text-[#444] font-semibold">– {name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">FAQs</h2>
          <div className="space-y-5 max-w-3xl mx-auto">
            {[{
              q: "Are these real followers and likes?",
              a: "Yes — we use proven promotional systems to deliver authentic and lasting engagement."
            }, {
              q: "Do you need my password?",
              a: "Never. We only ask for your username or post URL — nothing else."
            }, {
              q: "How fast is delivery?",
              a: "Most orders begin processing within 0–30 minutes after payment."
            }].map(({ q, a }) => (
              <div key={q}>
                <p className="font-semibold text-[#111]">{q}</p>
                <p className="text-[#444] text-sm sm:text-base">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center space-y-5 mt-24">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Dominate Social Media?</h2>
          <p className="text-[#444] text-base sm:text-lg">
            Choose your service, place your order, and watch your profile blow up — instantly.
          </p>
          <Link href="/checkout">
            <button className="btn-primary px-6 sm:px-10 py-3 text-base sm:text-lg rounded-full hover:scale-105 transition">
              Start Growing Now
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
