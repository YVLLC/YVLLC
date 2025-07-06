import Head from "next/head";

const testimonials = [
  {
    name: "Sophia R.",
    title: "Fashion Influencer",
    quote:
      "YesViral helped me break through the algorithm. I gained 10k real followers and my engagement rate skyrocketed. 100% recommend.",
  },
  {
    name: "Devin L.",
    title: "YouTube Creator",
    quote:
      "Super fast delivery and responsive support. My video hit explore for the first time. The views were real and actually stuck.",
  },
  {
    name: "Jasmine T.",
    title: "Business Owner",
    quote:
      "Used them to grow my IG business page. Saw results within minutes. It's professional, reliable, and looks completely natural.",
  },
  {
    name: "Marcus D.",
    title: "TikTok Artist",
    quote:
      "Most services I tried before dropped off after a week — not YesViral. Everything stayed consistent, and support was quick to respond.",
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
        <h1 className="text-3xl font-bold text-center mb-4">What People Are Saying</h1>
        <p className="text-center text-[#444] mb-12">
          Real feedback from creators, influencers, and businesses using YesViral.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <p className="text-[#111] font-medium italic mb-4">“{t.quote}”</p>
              <div className="text-sm text-[#444] font-semibold">
                {t.name}, <span className="font-normal">{t.title}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
