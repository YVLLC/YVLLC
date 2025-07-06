import Head from "next/head";

const faqList = [
  {
    question: "Is it safe to buy followers and likes from YesViral?",
    answer:
      "Yes. We use secure, encrypted methods to fulfill every order without requiring your password. All services are delivered through trusted, industry-leading providers.",
  },
  {
    question: "How fast are orders delivered?",
    answer:
      "Most orders begin processing within minutes and are typically completed within 1–24 hours, depending on the service type and size.",
  },
  {
    question: "Do you need my Instagram or TikTok password?",
    answer:
      "Never. We only require your username or a post URL — we will never ask for login credentials or access to your account.",
  },
  {
    question: "Will my followers or likes drop after purchase?",
    answer:
      "All of our services are backed by refill guarantees, and we only use stable providers. If a drop occurs, we will restore the balance automatically or upon request.",
  },
  {
    question: "Can I try a free sample before buying?",
    answer:
      "Yes! We offer a one-time trial of 5 free Instagram likes or followers. No strings attached.",
  },
  {
    question: "Do you support tracking orders?",
    answer:
      "Absolutely. Use the 'Track Order' link in the footer and enter your order ID to see real-time status updates.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>FAQ – YesViral</title>
        <meta name="description" content="Common questions about YesViral social media growth services." />
      </Head>
      <main className="container py-16">
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-subtext">Honest answers to your most common concerns.</p>

        <div className="faq-list mt-8 space-y-6">
          {faqList.map((item, index) => (
            <div key={index} className="faq-item border-b pb-6">
              <h3 className="faq-question text-lg font-semibold text-[#111]">{item.question}</h3>
              <p className="faq-answer text-gray-600 mt-2">{item.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
