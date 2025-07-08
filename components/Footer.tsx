import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#E6F0FF] text-[#111] pt-16 pb-10 px-4 border-t border-[#CFE4FF]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 – Logo + About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="YesViral Logo"
              width={36}
              height={36}
              className="rounded-xl shadow-md"
            />
            <h3 className="text-2xl font-extrabold text-[#007BFF]">YesViral</h3>
          </div>
          <p className="text-sm text-[#444] leading-relaxed">
            The #1 source for premium social media growth. Trusted by thousands of creators and businesses worldwide.
          </p>
        </div>

        {/* Column 2 – Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-[#111] mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[#444]">
            <li><Link className="hover:text-[#005FCC]" href="/">Home</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/faq">FAQ</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/track-order">Track Order</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/login">Login</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/admin">Admin</Link></li>
          </ul>
        </div>

        {/* Column 3 – Free Tools */}
        <div>
          <h4 className="text-lg font-semibold text-[#111] mb-3">Free Tools</h4>
          <ul className="space-y-2 text-sm text-[#444]">
            <li><Link className="hover:text-[#005FCC]" href="/tools/instagram-video-downloader">Instagram Video Downloader</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/profile-picture-viewer">IG Profile Picture Viewer</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/story-downloader">Instagram Story Downloader</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/followers-counter">IG Followers Counter</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/free-likes">Free Likes Trial</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/free-followers">Free Followers Trial</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/story-viewer">Instagram Story Viewer</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/twitter-video">Twitter Video Downloader</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/twitter-gif">Twitter GIF Downloader</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/tiktok-video">TikTok Video Downloader</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/facebook-video">Facebook Video Downloader</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/tools/facebook-reels">Facebook Reels Downloader</Link></li>
          </ul>
        </div>

        {/* Column 4 – Legal */}
        <div>
          <h4 className="text-lg font-semibold text-[#111] mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-[#444]">
            <li><Link className="hover:text-[#005FCC]" href="/terms">Terms & Conditions</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-[#005FCC]" href="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-[#888] mt-12">
        &copy; {new Date().getFullYear()} YesViral. All rights reserved.
      </div>
    </footer>
  );
}
