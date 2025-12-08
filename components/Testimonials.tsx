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
      "Gave my music the push it needed. Engagement boosted instantly and support was extremely responsive. Way better results than ads.",
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
      "My store page finally grew. Within the same week I got a few new customers. Everything looks great and the growth stayed consistent.",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:py-20">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#007BFF] tracking-tight mb-4">
          Trusted by 100,000+ Creators
        </h1>
        <p className="text-lg text-[#444] max-w-2xl mx-auto leading-relaxed">
          Real, Verified feedback from Influencers, Entrepreneurs, and Artists
          who used YesViral to grow with confidence.
        </p>

        {/* ⭐ STAR RATING */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {[1, 2, 3, 4].map((_, i) => (
            <Star
              key={i}
              size={22}
              className="text-[#007BFF] fill-[#007BFF]"
            />
          ))}
          <Star
            size={22}
            className="text-[#007BFF] fill-[#007BFF] opacity-50"
          />

          <span className="ml-2 text-[#007BFF] font-semibold text-sm">
            4.8 / 5 rating
          </span>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-5xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="
              bg-white/90 backdrop-blur-md border border-[#CFE4FF]
              rounded-2xl p-6 md:p-7 shadow-lg hover:shadow-xl
              transition-all duration-300 hover:-translate-y-1
            "
          >
            {/* TOP */}
            <div className="flex items-center mb-3">
              <div className="bg-[#E6F0FF] p-2 rounded-full">{t.icon}</div>

              <div className="ml-3">
                <h3 className="text-lg font-bold text-[#111]">{t.name}</h3>
                <p className="text-sm text-[#777]">{t.title}</p>
              </div>

              <div className="ml-auto flex items-center gap-1 bg-[#007BFF] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                <CheckCircle size={14} className="text-blue-200" />
                Verified Buyer
              </div>
            </div>

            {/* QUOTE */}
            <p className="text-[#222] leading-relaxed italic text-[15.5px] mb-4">
              “{t.quote}”
            </p>

            {/* FOOTER */}
            <div className="flex items-center text-sm text-[#444]">
              <span>{t.title}</span>
              <span className="mx-2 text-[#888]">•</span>
              <span className="font-semibold text-[#007BFF]">
                {t.platform}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
