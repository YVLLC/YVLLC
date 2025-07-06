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

      <main className="px-4 max-w-6xl mx-auto py-12 space-y-24">
        {/* Hero */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-extrabold text-[#007BFF]">Grow Your Socials with YesViral</h1>
          <p className="text-[#444] max-w-2xl mx-auto">
            Buy real followers, likes, views, and more — delivered instantly, no password required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/buy">
              <button className="bg-[#007BFF] text-white px-6 py-3 rounded-xl hover:bg-[#005FCC]">
                Get Started
              </button>
            </Link>
            <Link href="/track-order">
              <button className="bg-[#E6F0FF] text-[#007BFF] px-6 py-3 rounded-xl hover:bg-[#CFE4FF]">
                Track Order
              </button>
            </Link>
          </div>
        </section>

        {/* About */}
        <section id="about" className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Why YesViral?</h2>
          <p className="text-[#444] max-w-2xl mx-auto">
            We’re not just another panel — we’re a full-scale growth engine for creators and brands. Trusted by thousands for fast, high-retention results that boost real visibility.
          </p>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="space-y-6">
          <h2 className="text-center text-2xl font-bold mb-2">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2 text-[#007BFF]">1</div>
              <p className="font-semibold mb-1">Choose a Service</p>
              <p className="text-[#444]">Pick your platform and what you want: followers, likes, views, or comments.</p>
            </div>
            <div>
              <div className="text-4xl mb-2 text-[#007BFF]">2</div>
              <p className="font-semibold mb-1">Enter Your Info</p>
              <p className="text-[#444]">Just your username or post link — no password or login required.</p>
            </div>
            <div>
              <div className="text-4xl mb-2 text-[#007BFF]">3</div>
              <p className="font-semibold mb-1">Get Fast Results</p>
              <p className="text-[#444]">Orders begin processing within minutes and results roll in fast & naturally.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="space-y-4">
          <h2 className="text-center text-2xl font-bold">What Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className="italic text-[#111]">“I gained real followers in under an hour — and they didn’t drop!”</p>
              <p className="mt-2 text-sm text-[#444] font-semibold">– Taylor M.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className="italic text-[#111]">“Great support, great pricing, real growth. Worth every cent.”</p>
              <p className="mt-2 text-sm text-[#444] font-semibold">– Jake B.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-4">
          <h2 className="text-center text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Are these real followers and likes?</p>
              <p className="text-[#444]">Yes — we use tested promotion systems that provide real and lasting engagement.</p>
            </div>
            <div>
              <p className="font-semibold">Do you need my password?</p>
              <p className="text-[#444]">Never. Just your username or post URL is enough.</p>
            </div>
            <div>
              <p className="font-semibold">How fast is delivery?</p>
              <p className="text-[#444]">Most orders start processing within 0–30 minutes after payment.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-3 mt-16">
          <h2 className="text-2xl font-bold">Ready to Go Viral?</h2>
          <p className="text-[#444]">Start growing your brand today — pick a service and see instant results.</p>
          <Link href="/buy">
            <button className="bg-[#007BFF] text-white px-6 py-3 rounded-xl hover:bg-[#005FCC]">
              Choose a Service
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
