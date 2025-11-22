import Head from "next/head";
import { Instagram, Youtube, Music2, Briefcase, CheckCircle, Star } from "lucide-react";

const testimonials = [
  {
    name: "Maya J.",
    title: "Lifestyle Blogger",
    platform: "Instagram",
    icon: <Instagram className="text-[#E1306C]" size={20} />,
    quote: "Honestly one of the best social growth services i've found. Got followers in 10 minutes and they all stuck. Super easy, didn’t ask for my password. I’d use it again.",
  },
  {
    name: "Trevor P.",
    title: "Music Producer",
    platform: "TikTok",
    icon: <Music2 className="text-[#25F4EE]" size={20} />,
    quote: "Actually worked better than running ads. The boost started right away and my engagement was higher than before. Support replied fast, too.",
  },
  {
    name: "Evan W.",
    title: "YouTube Reviewer",
    platform: "YouTube",
    icon: <Youtube className="text-[#FF0000]" size={20} />,
    quote: "Was worried at first, but my subs and views came in as expected. Saw more comments and even got a brand deal after my channel grew.",
  },
  {
    name: "Samiya H.",
    title: "Shop Owner",
    platform: "Business",
    icon: <Briefcase className="text-[#007BFF]" size={20} />,
    quote: "Helped my store’s Instagram grow. Orders came in the same week. No weird drops, everything looked natural. Best $20 spent.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <Head>
        <title>YesViral – Buy High-Quality Followers, Likes & Views.</title>
        <meta
          name="description"
          content="Read real customer reviews about YesViral’s social growth services."
        />
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-extrabold text-[#007BFF] text-center mb-2">
          Real Customer Reviews
        </h1>
        <p className="text-center text-[#444] mb-3">
          Genuine feedback from Creators, Business Owners, and Artists who trust YesViral.
        </p>

        {/* ⭐⭐⭐⭐⭐ RATING STARS — ADDED BELOW */}
        <div className="flex items-center justify-center gap-1 mb-10">
          {/* 4 full stars */}
          {[1,2,3,4].map((_, i) => (
            <Star key={i} size={20} className="text-[#007BFF] fill-[#007BFF]" />
          ))}
          {/* half star (using opacity) */}
          <Star size={20} className="text-[#007BFF] fill-[#007BFF] opacity-50" />
          
          <span className="ml-2 font-semibold text-[#007BFF] text-sm">
            4.8 / 5 rating
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-[#CFE4FF] rounded-xl shadow-sm p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-[#E6F0FF] p-1">{t.icon}</span>
                <span className="font-bold text-[#111]">{t.name}</span>
                <span className="ml-auto flex items-center gap-1 bg-[#007BFF] text-white text-xs font-semibold px-2 py-0.5 rounded">
                  <CheckCircle size={14} className="text-blue-300" /> Verified Buyer
                </span>
              </div>
              <p className="text-[#222] mb-4 italic leading-snug">“{t.quote}”</p>
              <div className="flex items-center gap-2 text-sm text-[#555] mt-auto">
                <span>{t.title}</span>
                <span className="text-[#007BFF] font-semibold">· {t.platform}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
