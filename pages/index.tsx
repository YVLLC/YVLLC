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

      <main className="px-4 max-w-7xl mx-auto py-16 space-y-32 text-[#111]">
        {/* Hero */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
            Supercharge Your Social Growth
          </h1>
          <p className="text-lg text-[#444] max-w-2xl mx-auto">
            Buy real followers, likes, and views for Instagram, TikTok, YouTube & more. Instant delivery. No password needed. Trusted by 10,000+ creators.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link href="/checkout">
              <button className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition">
                Get Started
              </button>
            </Link>
            <Link href="/track-order">
              <button className="px-6 py-3 rounded-xl text-blue-700 border border-blue-200 bg-white hover:bg-blue-50 transition">
                Track Order
              </button>
            </Link>
          </div>
        </section>

        {/* Why YesViral */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Why Choose YesViral?</h2>
          <p className="text-[#444] max-w-2xl mx-auto">
            We go beyond typical panels — our smart delivery engine ensures real engagement that sticks. No fake bots. Just growth that builds brand trust.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            <div className="p-6 bg-white rounded-2xl shadow border text-left">
              <h3 className="font-bold text-lg mb-2">⚡ Instant Delivery</h3>
              <p className="text-sm text-[#444]">Most orders start in under 60 seconds. Seriously fast.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow border text-left">
              <h3 className="font-bold text-lg mb-2">🔒 100% Safe</h3>
              <p className="text-sm text-[#444]">No password required. We never ask for sensitive info.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow border text-left">
              <h3 className="font-bold text-lg mb-2">💬 24/7 Support</h3>
              <p className="text-sm text-[#444]">Chat with a real human whenever you need help.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-10">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              ["1", "Choose a Service", "Pick what you need: followers, likes, views or comments."],
              ["2", "Enter Info", "Provide just your username or post link. No login needed."],
              ["3", "Get Results", "Orders start within minutes. Real, organic-style growth."],
            ].map(([step, title, desc]) => (
              <div key={step} className="bg-white p-6 rounded-2xl border shadow-sm">
                <div className="text-5xl font-bold text-blue-600 mb-3">{step}</div>
                <p className="font-semibold text-lg mb-1">{title}</p>
                <p className="text-[#444] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-8">
          <h2 className="text-center text-3xl font-bold">Real Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow border text-sm">
              <p className="italic">“Insane speed and support. Gained 1k followers in 30 mins!”</p>
              <p className="mt-2 font-semibold text-[#444]">– Ayesha K.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow border text-sm">
              <p className="italic">“Tried others but YesViral is the only one that actually works.”</p>
              <p className="mt-2 font-semibold text-[#444]">– Marcus L.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-6">
          <h2 className="text-center text-3xl font-bold">FAQs</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-left">
            <div>
              <p className="font-semibold mb-1">Are these real followers?</p>
              <p className="text-[#444]">Yes. All services are backed by real promotions and tested methods.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Is my account safe?</p>
              <p className="text-[#444]">100%. No password is ever requested or stored.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What if I need help?</p>
              <p className="text-[#444]">Live chat or email — we’ve got 24/7 support ready for you.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-20 space-y-4">
          <h2 className="text-3xl font-bold">Ready to Go Viral?</h2>
          <p className="text-[#444]">Select your service and see real growth — today.</p>
          <Link href="/checkout">
            <button className="px-8 py-3 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition">
              Order Now
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
