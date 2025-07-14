import Head from "next/head";
import { FileText, Ban, ShieldCheck, CreditCard, Globe, RefreshCw, MessageCircle, ExternalLink } from "lucide-react";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | YesViral</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-8">
          <FileText className="text-[#007BFF]" size={40} />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#007BFF] mt-3 mb-1 text-center">Terms & Conditions</h1>
          <div className="flex flex-wrap gap-2 items-center text-xs mt-1 text-[#444]">
            <span className="bg-[#F2F9FF] text-[#005FCC] px-2 py-1 rounded-full font-semibold">Last Updated: April 3rd, 2025</span>
          </div>
        </div>

        <section className="space-y-8 text-base leading-7">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <ShieldCheck className="text-[#007BFF]" size={20} /> Welcome to YesViral
            </h2>
            <p>
              By using or accessing YesViral (“we”, “our”, “us”), you agree to these Terms. If you do not accept, discontinue use immediately.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <Ban className="text-[#007BFF]" size={20} /> Limited License & Prohibited Uses
            </h2>
            <ul className="list-disc pl-6">
              <li>You’re granted a personal, non-commercial, revocable license to use our services.</li>
              <li><b>Not allowed:</b> Resale, redistribution, reverse engineering, automation, scraping, or mirroring our content/software.</li>
              <li>Commercial use, including using stats for business, is strictly prohibited.</li>
              <li>Violations may result in account ban and legal action.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <CreditCard className="text-[#007BFF]" size={20} /> Billing & Payments
            </h2>
            <ul className="list-disc pl-6">
              <li>All payments are processed securely with SSL encryption.</li>
              <li>Chargebacks or fraudulent disputes result in permanent account suspension.</li>
              <li>By paying, you confirm you’re authorized to use the payment method.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <ShieldCheck className="text-[#007BFF]" size={20} /> Service Scope & Platform Responsibility
            </h2>
            <ul className="list-disc pl-6">
              <li>YesViral is not affiliated with Instagram, TikTok, Meta, ByteDance, YouTube, or any third-party platform.</li>
              <li>Your account must remain public during delivery. Username changes or privacy settings may disrupt or cancel your order.</li>
              <li>By using YesViral, you accept full responsibility for platform outcomes.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <Ban className="text-[#007BFF]" size={20} /> No Commercial Exploitation
            </h2>
            <ul className="list-disc pl-6">
              <li>No reselling or brand deal leverage allowed.</li>
              <li>Commercial usage, business benefit, or representing a company is a breach.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <RefreshCw className="text-[#007BFF]" size={20} /> Disclaimer, Accuracy & Revisions
            </h2>
            <ul className="list-disc pl-6">
              <li>All services are provided “as is.” Results may vary, are not guaranteed, and can be impacted by platform changes.</li>
              <li>Content may be updated at any time without notice.</li>
              <li>We do not guarantee accuracy, reliability, or uptime of the service or results.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <ExternalLink className="text-[#007BFF]" size={20} /> External Links
            </h2>
            <p>
              We may link to third-party websites. We’re not responsible for their content or privacy. Access at your own discretion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <CreditCard className="text-[#007BFF]" size={20} /> Refunds & Disputes
            </h2>
            <ul className="list-disc pl-6">
              <li>30-day money-back guarantee applies if we fail to deliver as promised.</li>
              <li>No refunds on: promotional/complimentary credits, successfully delivered orders, or user term violations.</li>
              <li>To request a refund, contact support with your order number. Approved refunds processed within 7–10 business days.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <Globe className="text-[#007BFF]" size={20} /> Law, Jurisdiction & Updates
            </h2>
            <ul className="list-disc pl-6">
              <li>Terms governed by the laws of the United Arab Emirates.</li>
              <li>Legal disputes handled in UAE courts, in English.</li>
              <li>We may update these Terms at any time. Continued use after updates = acceptance.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <MessageCircle className="text-[#007BFF]" size={20} /> Customer Support
            </h2>
            <p>
              For questions or support, email <a href="mailto:support@yesviral.com" className="text-[#007BFF] underline font-semibold">support@yesviral.com</a>.<br />
              We aim to respond within 24–48 hours. Or try our <a href="/support" className="text-[#007BFF] underline font-semibold">support chat</a> for fast help.
            </p>
          </div>
        </section>

        <div className="mt-10 text-center text-sm text-[#444]">
          By continuing to use YesViral, you confirm that you have read, understood, and agree to these Terms and Conditions.
        </div>
      </main>
    </>
  );
}
