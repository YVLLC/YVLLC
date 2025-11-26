import Head from "next/head";
import { Mail, MessageCircle, ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | YesViral</title>
        <meta name="description" content="Need help? Contact YesViral's support team and get fast assistance with your orders or questions." />
      </Head>

      <main className="bg-[#F9FAFB] min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-14 animate-fadeInFast">
          {/* Logo & Heading */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <Image
              src="/logo.png"
              alt="YesViral Logo"
              width={60}
              height={60}
              className="rounded-full shadow"
              priority
            />
            <h1 className="text-4xl font-extrabold text-center text-[#007BFF] drop-shadow mb-1">
              Contact YesViral Support
            </h1>
            <div className="flex items-center gap-2 text-[#444] text-base font-medium">
              <ShieldCheck className="text-[#007BFF]" size={20} />
              100% Secure & Private Support
            </div>
          </div>

          {/* Info Bar – fixed to always be clean and responsive! */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-3 mb-8">
            <div className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-[#F5FAFF] rounded-xl px-4 py-3 text-[#007BFF] text-sm font-semibold shadow text-center whitespace-nowrap">
              <MessageCircle size={18} /> 
              <div className="flex flex-col items-center md:items-start">
                <span>Live Support, 7 Days a Week</span>
              </div>
            </div>
            <div className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-[#F5FAFF] rounded-xl px-4 py-3 text-[#007BFF] text-sm font-semibold shadow text-center whitespace-nowrap">
              <Mail size={18} />
              <a href="mailto:support@yesviral.com" className="underline break-all">
                support@yesviral.com
              </a>
            </div>
            <div className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-[#F5FAFF] rounded-xl px-4 py-3 text-[#007BFF] text-sm font-semibold shadow text-center whitespace-nowrap">
              <Clock size={18} />
              <div className="flex flex-col items-center md:items-start">
                <span>Replies <span className="font-bold">in under 48h</span></span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-7">
            <div>
              <label className="block text-[15px] font-semibold text-[#111] mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-[#CFE4FF] rounded-lg px-4 py-3 bg-[#FAFBFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-base"
                required
              />
            </div>
            <div>
              <label className="block text-[15px] font-semibold text-[#111] mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-[#CFE4FF] rounded-lg px-4 py-3 bg-[#FAFBFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-base"
                required
              />
            </div>
            <div>
              <label className="block text-[15px] font-semibold text-[#111] mb-1">Your Message</label>
              <textarea
                rows={5}
                placeholder="How can we help you? (Order ID, details, feedback…)"
                className="w-full border border-[#CFE4FF] rounded-lg px-4 py-3 bg-[#FAFBFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-base resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#007BFF] hover:bg-[#005FCC] text-white font-extrabold py-3 rounded-xl text-lg shadow transition duration-150 tracking-wide"
            >
              Send Message
            </button>
          </form>

          {/* Extra Support Info */}
          <div className="text-center mt-10 space-y-2">
            <div className="text-[#222] text-sm font-semibold flex items-center justify-center gap-2">
              <Clock size={16} className="text-[#007BFF]" />
              Fastest responses: <span className="font-medium text-[#005FCC]">10am – 10pm (GMT+4)</span>
            </div>
            <div className="text-xs text-[#888]">
              All queries answered within 48 hours. Order-related? Please include your <span className="font-medium text-[#007BFF]">Order ID</span> for the fastest help.
            </div>
          </div>
        </div>
      </main>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeInFast {
          from { opacity: 0; transform: translateY(30px);}
          to   { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInFast {
          animation: fadeInFast 0.38s cubic-bezier(.39,1.7,.47,.99);
        }
      `}</style>
    </>
  );
}
