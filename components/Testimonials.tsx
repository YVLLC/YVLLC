import Head from "next/head";
import {
  Instagram,
  Youtube,
  Music2,
  Briefcase,
  CheckCircle,
  Star,
} from "lucide-react";

const testimonials = [
  {
    name: "Maya J.",
    title: "Lifestyle Blogger",
    platform: "Instagram",
    icon: <Instagram className="text-[#E1306C]" size={22} />,
    quote:
      "Honestly one of the best social growth services I've used. Followers arrived fast, looked real, and I never had to share my password. Super smooth.",
  },
  {
    name: "Trevor P.",
    title: "Music Producer",
    platform: "TikTok",
    icon: <Music2 className="text-[#25F4EE]" size={22} />,
    quote:
      "Gave my tracks the push they needed. Engagement boosted instantly and support was extremely responsive. Way better results than ads.",
  },
  {
    name: "Evan W.",
    title: "YouTube Reviewer",
    platform: "YouTube",
    icon: <Youtube className="text-[#FF0000]" size={22} />,
    quote:
      "My subs and views delivered exactly how they promised. I saw more comments and even landed a small brand collab after my growth kicked in.",
  },
  {
    name: "Samiya H.",
    title: "Shop Owner",
    platform: "Business",
    icon: <Briefcase className="text-[#007BFF]" size={22} />,
    quote:
      "My store page finally grew. Within the same week I got new customers. Everything looked natural and the growth stayed consistent.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <Head>
        <title>YesViral Testimonials – Trusted by Creators & Businesses</title>
        <meta
          name="description"
          content="Read real customer reviews about YesViral’s premium follower, like, and view services."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-[#E6F0FF] px-4 py-20">
        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#007BFF] tracking-tight mb-4">
            Trusted by Over 50,000+ Creators
          </h1>
          <p className="text-lg text-[#444] max-w-2xl mx-auto leading-relaxed">
            Real, verified feedback from influencers, entrepreneurs, and artists
            who use YesViral to grow with confidence.
          </p>

          {/* PREMIUM STAR RATING */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3, 4].map((_, i) => (
              <Star
                key={i}
                size={24}
                className="text-[#007BFF] fill-[#007BFF]"
              />
            ))}
            <Star
              size={24}
              className="text-[#007BFF] fill-[#007BFF] opacity-50"
            />

            <span className="ml-2 text-[#007BFF] font-semibold text-sm">
              4.8 / 5 based on 2,000+ reviews
            </span>
          </div>
        </div>

        {/* GRID */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="
              bg-white/90 backdrop-blur-md border border-[#CFE4FF]
              rounded-2xl p-7 shadow-lg hover:shadow-xl
              transition-all duration-300 hover:-translate-y-1
            "
            >
              {/* TOP ROW */}
              <div className="flex items-center mb-3">
                <div className="bg-[#E6F0FF] p-2 rounded-full">
                  {t.icon}
                </div>

                <div className="ml-3">
                  <h3 className="text-lg font-bold text-[#111]">{t.name}</h3>
                  <p className="text-sm text-[#777] -mt-0.5">{t.title}</p>
                </div>

                {/* VERIFIED BADGE */}
                <div className="ml-auto flex items-center gap-1 bg-[#007BFF] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  <CheckCircle size={14} className="text-blue-200" />
                  Verified Buyer
                </div>
              </div>

              {/* QUOTE */}
              <p className="text-[#222] leading-relaxed italic mb-4 text-[15.5px]">
                “{t.quote}”
              </p>

              {/* FOOTER */}
              <div className="flex items-center text-sm text-[#444]">
                <span>{t.title}</span>
                <span className="mx-2 text-[#888]">•</span>
                <span className="font-semibold text-[#007BFF]">{t.platform}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center mt-16">
          <h2 className="text-2xl font-bold text-[#111] mb-2">
            Ready to Grow Your Social Presence?
          </h2>
          <p className="text-[#444] mb-6">
            Join thousands of creators getting premium, fast, and safe engagement.
          </p>

          <a
            href="/"
            className="inline-block bg-[#007BFF] hover:bg-[#005FCC] text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all"
          >
            Get Started Today
          </a>
        </div>
      </main>
    </>
  );
}
