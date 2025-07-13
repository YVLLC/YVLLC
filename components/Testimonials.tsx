import Head from "next/head";
import { Star, Instagram, Youtube, Music2, Briefcase } from "lucide-react";

const testimonials = [
  {
    name: "Sophia R.",
    title: "Fashion Influencer",
    platform: "Instagram",
    icon: <Instagram className="text-[#E1306C]" size={26} />,
    quote:
      "After using YesViral, my account finally took off. I gained over 10,000 new followers—real people who interact with my posts daily. My DMs and collab offers doubled. Worth every penny.",
  },
  {
    name: "Devin L.",
    title: "YouTube Creator",
    platform: "YouTube",
    icon: <Youtube className="text-[#FF0000]" size={26} />,
    quote:
      "I tried other sites, but YesViral was the first where the views actually stuck. My video landed on the recommended page, and my subscriber count keeps growing. Support replied within minutes when I had a question.",
  },
  {
    name: "Jasmine T.",
    title: "Business Owner",
    platform: "Business",
    icon: <Briefcase className="text-[#007BFF]" size={26} />,
    quote:
      "My IG business page looked flat until I tried YesViral. I saw new likes and followers roll in almost instantly. The growth looks natural, and clients trust my page more. Professional and totally stress-free.",
  },
  {
    name: "Marcus D.",
    title: "TikTok Artist",
    platform: "TikTok",
    icon: <Music2 className="text-[#25F4EE]" size={26} />,
    quote:
      "Most growth services I used before dropped off within days. YesViral is different—my numbers stayed up, and the engagement is real. Their team even checked in to make sure I was happy. Highly recommended.",
  },
];

export default function Testimonials() {
  return (
    <>
      <Head>
        <title>Testimonials – YesViral</title>
        <meta
          name="description"
          content="Read real customer reviews and testimonials about YesViral’s premium social media services."
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#007BFF] text-center mb-2 tracking-tight">
          Loved by Creators. Trusted by Brands.
        </h1>
        <p className="text-center text-[#444] text-lg max-w-xl mx-auto mb-12">
          Real results, real growth—here’s what our customers say about YesViral.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-[#E6F0FF] border border-[#CFE4FF] rounded-2xl shadow-lg px-7 pt-7 pb-6 flex flex-col h-full"
              style={{
                boxShadow: "0 2px 16px 0 #CFE4FF30",
              }}
            >
              {/* Top blue bar */}
              <div className="absolute top-0 left-0 right-0 h-2 rounded-t-2xl bg-gradient-to-r from-[#007BFF] via-[#005FCC] to-[#22C55E]" />
              
              {/* Icon & badge row */}
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-10 h-10 bg-white border-2 border-[#CFE4FF] rounded-full shadow-sm">
                  {t.icon}
                </span>
                <span className="font-bold text-[#111] text-lg">{t.name}</span>
                <span className="bg-[#007BFF] text-white font-semibold text-xs px-2 py-0.5 rounded ml-2 shadow">
                  Verified
                </span>
              </div>
              {/* 5-star display */}
              <div className="flex items-center gap-1 mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, j) => (
                    <Star key={j} size={16} className="text-[#FACC15]" />
                  ))}
              </div>
              {/* Quote */}
              <p className="text-[#222] font-medium italic mb-4">“{t.quote}”</p>
              {/* Title & platform */}
              <div className="flex justify-between items-end mt-auto">
                <span className="text-[#444] text-sm font-semibold">{t.title}</span>
                <span className="text-xs text-[#007BFF] font-bold">{t.platform}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
