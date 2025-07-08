import Head from "next/head";
import { ShieldCheck, CreditCard, Globe, Lock, Mail, RefreshCw } from "lucide-react";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | YesViral</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-8">
          <ShieldCheck className="text-[#007BFF]" size={40} />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#007BFF] mt-3 mb-1 text-center">Privacy Policy</h1>
          <div className="flex flex-wrap gap-2 items-center text-xs mt-1 text-[#444]">
            <span className="bg-[#E8F1FF] text-[#007BFF] px-2 py-1 rounded-full font-bold">Published: May 18, 2018</span>
            <span className="bg-[#F2F9FF] text-[#005FCC] px-2 py-1 rounded-full font-semibold">Last Updated: February 3, 2025</span>
          </div>
        </div>

        <div className="space-y-8 text-base leading-7">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <Lock className="text-[#007BFF]" size={20} /> Your Privacy, Guaranteed
            </h2>
            <p>
              At <b>YesViral</b>, your privacy is at the core of everything we do. This policy explains exactly how we collect, use, protect, and respect your personal data—no fine print, no hidden tricks. Using our website or services means you agree to these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <CreditCard className="text-[#007BFF]" size={20} /> Payment Security
            </h2>
            <ul className="list-disc pl-6">
              <li>All payments are processed via industry-leading, PCI-compliant providers (e.g., Stripe, PayPal).</li>
              <li><span className="font-semibold">We never store your full credit card number.</span> Only card type and last 4 digits may be stored for reference.</li>
              <li>All transactions are SSL encrypted. <span className="inline-flex items-center text-green-600 font-semibold"><Lock size={16} className="mr-1" /> Secure as banks.</span></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <Globe className="text-[#007BFF]" size={20} /> What We Collect & Why
            </h2>
            <ul className="list-disc pl-6">
              <li><b>Account/order info:</b> Only the data needed to deliver your order, support you, or comply with law.</li>
              <li><b>No selling or sharing:</b> We do <u>not</u> sell or rent your data. Period.</li>
              <li><b>Analytics:</b> We use Google Analytics (with privacy features enabled) to improve site experience. Your usage data is anonymized and never used for personal ads.</li>
              <li><b>Cookies:</b> Used only to optimize your experience. No personal data stored.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <RefreshCw className="text-[#007BFF]" size={20} /> Data Retention & Control
            </h2>
            <ul className="list-disc pl-6">
              <li>We only keep your data as long as required for your order, support, or compliance.</li>
              <li>You can <b>request deletion</b> of your account or data at any time.</li>
              <li>Reasonable safeguards are in place to prevent loss, misuse, or unauthorized access.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <ShieldCheck className="text-[#007BFF]" size={20} /> Your Rights
            </h2>
            <ul className="list-disc pl-6">
              <li><b>Transparency:</b> You can request a summary of your stored data any time.</li>
              <li><b>Consent:</b> We only collect what's required and with your clear consent.</li>
              <li><b>Opt-Out:</b> You can disable non-essential cookies or analytics any time.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <Globe className="text-[#007BFF]" size={20} /> Law & Updates
            </h2>
            <ul className="list-disc pl-6">
              <li>This Policy is governed by the laws of the United Arab Emirates.</li>
              <li>We update this policy as needed. Major changes will be posted here—keep an eye on the <span className="font-semibold text-[#007BFF]">Last Updated</span> date above.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#222] mb-2">
              <Mail className="text-[#007BFF]" size={20} /> Contact & Support
            </h2>
            <p>
              Have questions, want your data deleted, or just want to understand more? Email us anytime at <a href="mailto:support@yesviral.com" className="text-[#007BFF] underline font-semibold">support@yesviral.com</a>.
            </p>
            <p className="mt-3">
              Or get instant help via our <a href="/support" className="text-[#007BFF] underline font-semibold">support chat</a>.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-[#444]">
          By using YesViral, you confirm that you have read, understood, and accepted this Privacy Policy.
        </div>
      </main>
    </>
  );
}
