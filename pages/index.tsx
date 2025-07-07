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
        <section className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#007BFF] leading-tight">
            Get Real Followers, Likes & Views – Fast.
          </h1>
          <p className="text-[#444] text-base sm:text-lg max-w-2xl mx-auto">
            Join 100,000+ creators and brands using YesViral to grow faster and smarter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link href="/checkout">
              <button className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 rounded-lg shadow hover:scale-105 transition-transform">
                View Services
              </button>
            </Link>
            <Link href="/track-order">
              <button className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 rounded-lg hover:scale-105 transition-transform">
                Try Free Likes
              </button>
            </Link>
          </div>
        </section>

        {/* About */}
        <section id="about" className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Why YesViral?</h2>
          <p className="max-w-3xl mx-auto text-[#444] text-base sm:text-lg">
            YesViral isn’t just another panel. It’s a trusted engine for real growth. Thousands trust our platform for reliable, secure, and high-quality services across social platforms.
          </p>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="space-y-10">
          <h2 className="text-center text-2xl sm:text-3xl font-bold">How It Works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {["Choose a Service", "Enter Info", "Get Results"].map((title, i) => (
              <div key={i} className="bg-white border border-[#CFE4FF] rounded-xl p-6 shadow-sm hover:shadow-md transition">
                <div className="text-4xl font-bold text-[#007BFF] mb-3">{i + 1}</div>
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-sm text-[#444]">
                  {i === 0
                    ? "Pick your platform and what you need — followers, likes, or views."
                    : i === 1
                    ? "Just your username or post URL. No password ever required."
                    : "See growth begin in minutes — smooth, secure, and fast."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="space-y-6">
          <h2 className="text-center text-2xl sm:text-3xl font-bold">What Customers Say</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[{
              quote: "I gained real followers in under an hour — and they didn’t drop!",
              name: "Taylor M."
            }, {
              quote: "Great support, great pricing, real growth. Worth every cent.",
              name: "Jake B."
            }].map(({ quote, name }) => (
              <div key={name} className="bg-white border border-[#eee] p-6 rounded-lg shadow-sm">
                <p className="italic text-[#111]">“{quote}”</p>
                <p className="mt-3 text-sm text-[#444] font-medium">– {name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-6">
          <h2 className="text-center text-2xl sm:text-3xl font-bold">FAQs</h2>
          <div className="space-y-5 max-w-3xl mx-auto">
            {[{
              q: "Are these real followers and likes?",
              a: "Yes — we use tested promotion systems that provide real and lasting engagement."
            }, {
              q: "Do you need my password?",
              a: "Never. Just your username or post URL is enough."
            }, {
              q: "How fast is delivery?",
              a: "Most orders start processing within 0–30 minutes after payment."
            }].map(({ q, a }) => (
              <div key={q}>
                <p className="font-semibold text-[#111]">{q}</p>
                <p className="text-[#444] text-sm sm:text-base">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4 mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Go Viral?</h2>
          <p className="text-[#444] text-base sm:text-lg">
            Start growing now — choose your package and watch your stats climb.
          </p>
          <Link href="/checkout">
            <button className="btn-primary px-6 sm:px-8 py-3 text-base sm:text-lg rounded-lg hover:scale-105 transition">
              View Services
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
