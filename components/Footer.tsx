import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#E6F0FF] text-[#111] py-12 px-4 border-t border-[#CFE4FF]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 – Logo + About */}
        <div>
          <h3 className="text-xl font-bold mb-2">YesViral</h3>
          <p className="text-sm text-[#444]">
            The #1 source for premium social media growth. Trusted by 1,000s of creators and businesses.
          </p>
        </div>

        {/* Column 2 – Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-[#444]">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/track-order">Track Order</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/admin">Admin</Link></li>
          </ul>
        </div>

        {/* Column 3 – Free Tools */}
        <div>
          <h4 className="font-semibold mb-2">Free Tools</h4>
          <ul className="space-y-1 text-sm text-[#444]">
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
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-sm text-[#444]">
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-[#888] mt-10">
        &copy; {new Date().getFullYear()} YesViral. All rights reserved.
      </div>
    </footer>
  );
}
