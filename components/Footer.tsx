import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Youtube,
  Music2,
  Mail,
  Lock,
  ShieldCheck,
  MessageCircle
} from "lucide-react";

// ---- Type for props ----
type FooterProps = {
  onServiceOrder: (platform?: string, service?: string) => void;
};

const PaymentIcons = () => (
  <div className="flex gap-2 mt-2">
    <span title="Visa">
      <svg width="32" height="20" viewBox="0 0 36 24" fill="none">
        <rect width="36" height="24" rx="4" fill="#fff" />
        <text x="8" y="16" fill="#007BFF" fontWeight="bold" fontSize="13" fontFamily="sans-serif">
          VISA
        </text>
      </svg>
    </span>
    <span title="Mastercard">
      <svg width="32" height="20" viewBox="0 0 36 24" fill="none">
        <rect width="36" height="24" rx="4" fill="#fff" />
        <circle cx="14" cy="12" r="7" fill="#007BFF" fillOpacity="0.6" />
        <circle cx="22" cy="12" r="7" fill="#007BFF" fillOpacity="0.9" />
      </svg>
    </span>
    <span title="Apple Pay">
      <svg width="32" height="20" viewBox="0 0 36 24" fill="none">
        <rect width="36" height="24" rx="4" fill="#fff" />
        <circle cx="11" cy="12" r="5" fill="#007BFF" />
        <rect x="19" y="7" width="10" height="10" rx="2" fill="#005FCC" />
        <text x="19" y="21" fill="#fff" fontWeight="bold" fontSize="7" fontFamily="sans-serif">
          Pay
        </text>
      </svg>
    </span>
    <span title="Bitcoin">
      <svg width="32" height="20" viewBox="0 0 36 24" fill="none">
        <rect width="36" height="24" rx="4" fill="#fff" />
        <circle cx="18" cy="12" r="7" fill="#007BFF" />
        <text x="13" y="17" fill="#fff" fontWeight="bold" fontSize="12" fontFamily="monospace">
          ₿
        </text>
      </svg>
    </span>
  </div>
);

const SocialLinks = () => (
  <div className="flex gap-3 mt-5">
    <a
      href="https://www.instagram.com/yesviralapp"
      target="_blank"
      rel="noopener"
      aria-label="Instagram"
      className="hover:scale-110 transition"
    >
      <Instagram size={22} className="text-[#E1306C]" />
    </a>
    <a
      href="https://tiktok.com"
      target="_blank"
      rel="noopener"
      aria-label="TikTok"
      className="hover:scale-110 transition"
    >
      <Music2 size={22} className="text-[#00F2EA]" />
    </a>
    <a
      href="https://youtube.com"
      target="_blank"
      rel="noopener"
      aria-label="YouTube"
      className="hover:scale-110 transition"
    >
      <Youtube size={22} className="text-[#FF0000]" />
    </a>
    <a
      href="mailto:support@yesviral.com"
      aria-label="Email"
      className="hover:scale-110 transition"
    >
      <Mail size={22} className="text-[#007BFF]" />
    </a>
  </div>
);

export default function Footer({ onServiceOrder }: FooterProps) {
  return (
    <footer className="bg-gradient-to-t from-[#E6F0FF] via-[#F5FAFF] to-[#fff] text-[#111] pt-16 pb-10 px-4 border-t border-[#CFE4FF]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 – Logo + About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="YesViral Logo"
              width={42}
              height={42}
              className="rounded-xl shadow-lg"
            />
            <span className="text-2xl font-extrabold text-[#007BFF] tracking-tight drop-shadow">
              YesViral
            </span>
          </div>
          <p className="text-sm text-[#444] leading-relaxed mb-3">
            Trusted by 100,000+ creators & businesses. YesViral helps you get High-Quality Followers, Views & Engagement via Instagram, TikTok & YouTube—Fast, Safe, and Guaranteed.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Link href="/track-order">
              <button className="bg-[#007BFF] text-white text-xs px-4 py-2 rounded-lg shadow hover:bg-[#005FCC] font-semibold transition">
                Track Order
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white border border-[#007BFF] text-[#007BFF] text-xs px-4 py-2 rounded-lg shadow hover:bg-[#E6F0FF] font-semibold transition">
                24/7 Support
              </button>
            </Link>
          </div>
          <SocialLinks />
        </div>

        {/* Column 2 – Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-[#111] mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[#444]">
            <li>
              <Link className="hover:text-[#005FCC]" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#005FCC]" href="/#faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#005FCC]" href="/track-order">
                Track Order
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#005FCC]" href="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#005FCC]" href="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 – Services (calls the modal) */}
        <div>
          <h4 className="text-lg font-bold text-[#111] mb-3">Top Services</h4>
          <ul className="space-y-2 text-sm text-[#444]">
            <li>
              <button
                type="button"
                className="hover:text-[#005FCC] underline"
                onClick={() => onServiceOrder("instagram", "Followers")}
              >
                Instagram Followers
              </button>
            </li>
            <li>
              <button
                type="button"
                className="hover:text-[#005FCC] underline"
                onClick={() => onServiceOrder("instagram", "Likes")}
              >
                Instagram Likes
              </button>
            </li>
            <li>
              <button
                type="button"
                className="hover:text-[#005FCC] underline"
                onClick={() => onServiceOrder("tiktok", "Followers")}
              >
                TikTok Followers
              </button>
            </li>
            <li>
              <button
                type="button"
                className="hover:text-[#005FCC] underline"
                onClick={() => onServiceOrder("tiktok", "Likes")}
              >
                TikTok Likes
              </button>
            </li>
            <li>
              <button
                type="button"
                className="hover:text-[#005FCC] underline"
                onClick={() => onServiceOrder("youtube", "Views")}
              >
                YouTube Views
              </button>
            </li>
            <li>
              <button
                type="button"
                className="hover:text-[#005FCC] underline"
                onClick={() => onServiceOrder("youtube", "Subscribers")}
              >
                YouTube Subscribers
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4 – Legal & Free Tools */}
        <div>
          <h4 className="text-lg font-bold text-[#111] mb-3">Legal & Free Tools</h4>
          <ul className="space-y-2 text-sm text-[#444]">
            <li>
              <Link className="hover:text-[#005FCC]" href="/terms">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#005FCC]" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#005FCC]" href="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Trust Bar AT THE BOTTOM */}
      <div className="max-w-7xl mx-auto my-10 grid md:grid-cols-4 grid-cols-2 gap-4 py-6 px-4 bg-white rounded-2xl shadow-lg border border-[#CFE4FF]">
        <div className="flex items-center gap-2 text-[#007BFF] font-semibold text-sm">
          <ShieldCheck size={20} className="text-[#007BFF]" /> 100% Safe & Secure
        </div>
        <div className="flex items-center gap-2 text-[#007BFF] font-semibold text-sm">
          <Lock size={20} className="text-[#007BFF]" /> SSL Encrypted Checkout
        </div>
        <div className="flex items-center gap-2 text-[#007BFF] font-semibold text-sm">
          <MessageCircle size={20} className="text-[#007BFF]" /> 24/7 Live Support
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs font-bold text-[#888] mb-1">Accepted Payments</span>
          <PaymentIcons />
        </div>
      </div>

      {/* Copyright & Powered */}
      <div className="text-center text-xs text-[#888] mt-6 flex flex-col items-center gap-2">
        <span>
          &copy; {new Date().getFullYear()} YesViral. All rights reserved.
        </span>
        <span className="flex items-center gap-1">
          Powered by <span className="font-bold text-[#007BFF]">YesViral</span> ·{" "}
          <Link href="/privacy" className="hover:underline hover:text-[#005FCC]">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="hover:underline hover:text-[#005FCC]">
            Terms
          </Link>
        </span>
      </div>
    </footer>
  );
}
