import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#E6F0FF] text-[#111] pt-16 pb-10 px-6 border-t border-[#CFE4FF]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Column 1 – Logo + About */}
        <div className="text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-2">
              <Image
                src="/logo.png"
                alt="YesViral Logo"
                width={60}
                height={60}
                className="rounded-full select-none pointer-events-none"
                draggable={false}
              />
            </div>
            <h3 className="text-2xl font-extrabold text-[#007BFF]">YesViral</h3>
          </div>
          <p className="text-sm text-[#444] mt-4 max-w-xs mx-auto md:mx-0">
            YesViral is a high-quality destination for social media growth, trusted by thousands. We offer a comprehensive selection of high-quality services designed to help you increase followers, engagement, and visibility across major platforms. Backed by top-tier customer support, YesViral makes it easy to elevate your online presence with speed, reliability, and confidence.
          </p>
        </div>

        {/* Column 2 – Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[#444]">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#faq">FAQ</Link></li>
            <li><Link href="/track-order">Track Order</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/admin">Admin</Link></li>
          </ul>
        </div>

        {/* Column 3 – Free Tools */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Free Tools</h4>
          <ul className="space-y-2 text-sm text-[#444]">
            <li><Link href="/tools/instagram-video-downloader">Instagram Video Downloader</Link></li>
            <li><Link href="/tools/profile-picture-viewer">IG Profile Picture Viewer</Link></li>
            <li><Link href="/tools/story-downloader">Instagram Story Downloader</Link></li>
            <li><Link href="/tools/followers-counter">IG Followers Counter</Link></li>
            <li><Link href="/tools/free-likes">Free Likes Trial</Link></li>
            <li><Link href="/tools/free-followers">Free Followers Trial</Link></li>
            <li><Link href="/tools/story-viewer">Instagram Story Viewer</Link></li>
            <li><Link href="/tools/twitter-video">Twitter Video Downloader</Link></li>
            <li><Link href="/tools/twitter-gif">Twitter GIF Downloader</Link></li>
            <li><Link href="/tools/tiktok-video">TikTok Video Downloader</Link></li>
            <li><Link href="/tools/facebook-video">Facebook Video Downloader</Link></li>
            <li><Link href="/tools/facebook-reels">Facebook Reels Downloader</Link></li>
          </ul>
        </div>

        {/* Column 4 – Legal */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-[#444]">
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-[#888] mt-12">
        &copy; {new Date().getFullYear()} YesViral. All rights reserved.
      </div>
    </footer>
  );
}
