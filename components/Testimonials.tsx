import Head from "next/head";
import { Star, Instagram, Youtube, Music2, Briefcase } from "lucide-react";

const testimonials = [
  {
    name: "Sophia R.",
    title: "Fashion Influencer",
    platform: <Instagram className="text-[#E1306C]" size={28} />,
    quote:
      "After using YesViral, my account finally took off. I gained over 10,000 new followers—real people who interact with my posts daily. My DMs and collab offers doubled. Worth every penny.",
  },
  {
    name: "Devin L.",
    title: "YouTube Creator",
    platform: <Youtube className="text-[#FF0000]" size={28} />,
    quote:
      "I tried other sites, but YesViral was the first where the views actually stuck. My video landed on the recommended page, and my subscriber count keeps growing. Support replied within minutes when I had a question.",
  },
  {
    name: "Jasmine T.",
    title: "Business Owner",
    platform: <Briefcase className="text-[#007BFF]" size={28} />,
    quote:
      "My IG business page looked flat until I tried YesViral. I saw new likes and followers roll in almost instantly. The growth looks natural, and clients trust my page more. Professional and totally stress-free.",
  },
  {
    name: "Marcus D.",
    title: "TikTok Artist",
    platform: <Music2 className="text-[#25F4EE]" size={28} />,
    quote:
      "Most growth services I used before dropped off within days. YesViral is different—my numbers stayed up, and the engagement is real. Their team even checked in to make sure I was happy. Highly recommended.",
  },
];

export default function TestimonialsPage() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          What People Are Saying
        </h1>
        <p className="text-center text-[#444] mb-12">
          Verified feedback from creators, influencers, and businesses using YesViral.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-[#E6F0FF] rounded-2xl p-8 shadow-md flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-3">
                <span>{t.platform}</span>
                <span className="font-semibold text-[#111] text-lg">
                  {t.name}
                </span>
                <span className="ml-1 bg-[#E6F0FF] text-[#007BFF] font-bold text-xs px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, j) => (
                    <Star key={j} size={16} className="text-[#FACC15]" />
                  ))}
              </div>
              <p className="text-[#222] font-medium italic mb-4">“{t.quote}”</p>
              <span className="text-[#444] text-sm font-semibold">{t.title}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
