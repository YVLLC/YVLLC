import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Menu, X, ChevronDown, Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye } from "lucide-react";

// --- Type for platform keys ---
type PlatformKey = "instagram" | "tiktok" | "youtube";

// --- Services ---
const SERVICES: Record<PlatformKey, { label: string; href: string; icon: JSX.Element }[]> = {
  instagram: [
    { label: "Buy Followers", href: "/checkout?service=instagram-followers", icon: <UserPlus size={18} className="text-[#E1306C]" /> },
    { label: "Buy Likes", href: "/checkout?service=instagram-likes", icon: <ThumbsUp size={18} className="text-[#E1306C]" /> },
    { label: "Buy Views", href: "/checkout?service=instagram-views", icon: <Eye size={18} className="text-[#E1306C]" /> }
  ],
  tiktok: [
    { label: "Buy Followers", href: "/checkout?service=tiktok-followers", icon: <UserPlus size={18} className="text-[#00F2EA]" /> },
    { label: "Buy Likes", href: "/checkout?service=tiktok-likes", icon: <ThumbsUp size={18} className="text-[#00F2EA]" /> },
    { label: "Buy Views", href: "/checkout?service=tiktok-views", icon: <Eye size={18} className="text-[#00F2EA]" /> }
  ],
  youtube: [
    { label: "Buy Subscribers", href: "/checkout?service=youtube-subscribers", icon: <UserPlus size={18} className="text-[#FF0000]" /> },
    { label: "Buy Likes", href: "/checkout?service=youtube-likes", icon: <ThumbsUp size={18} className="text-[#FF0000]" /> },
    { label: "Buy Views", href: "/checkout?service=youtube-views", icon: <Eye size={18} className="text-[#FF0000]" /> }
  ]
};

const DROPDOWN_TABS = [
  { key: "instagram", label: "Instagram Services", icon: <Instagram size={18} className="text-[#E1306C]" /> },
  { key: "tiktok", label: "TikTok Services", icon: <Music2 size={18} className="text-[#00F2EA]" /> },
  { key: "youtube", label: "YouTube Services", icon: <Youtube size={18} className="text-[#FF0000]" /> }
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Track Order", href: "/track-order" },
  { name: "FAQ", href: "/#faq" },
  { name: "Login", href: "/login" },
  { name: "Sign Up", href: "/signup" }
];

export default function Header() {
  const [dropdown, setDropdown] = useState<PlatformKey | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-white border-b border-[#CFE4FF] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3 min-h-[74px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="YesViral Logo"
            width={46}
            height={46}
            className="rounded-full group-hover:scale-110 transition-transform duration-200"
            priority
          />
          <span className="text-2xl sm:text-3xl font-extrabold text-[#007BFF] group-hover:text-[#005FCC] transition-colors duration-200 tracking-tight">
            YesViral
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 relative" onMouseLeave={() => setDropdown(null)}>
          {DROPDOWN_TABS.map(tab => (
            <div key={tab.key} className="relative flex items-center h-full">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-base hover:bg-[#F5FAFF] transition group ${
                  dropdown === tab.key ? "text-[#007BFF]" : "text-[#111]"
                }`}
                onMouseEnter={() => setDropdown(tab.key as PlatformKey)}
                onFocus={() => setDropdown(tab.key as PlatformKey)}
                onClick={() => setDropdown(dropdown === tab.key ? null : (tab.key as PlatformKey))}
                type="button"
                aria-haspopup="true"
                aria-expanded={dropdown === tab.key}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-150 ${dropdown === tab.key ? "rotate-180" : ""}`} />
              </button>
              {/* Dropdown: Only if active */}
              {dropdown === tab.key && (
                <div className="absolute left-0 top-[110%] w-64 bg-white border border-[#CFE4FF] rounded-xl shadow-xl p-2 flex flex-col gap-1 z-50 animate-dropdown">
                  {SERVICES[tab.key as PlatformKey].map(item => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#E6F0FF] transition font-semibold text-[#111] hover:text-[#007BFF]"
                      onClick={() => setDropdown(null)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Divider */}
          <span className="w-px h-7 bg-[#CFE4FF] mx-4"></span>
          {/* Simple nav links */}
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-2 rounded-lg transition text-base font-semibold ${
                router.asPath === link.href ? "text-[#007BFF]" : "text-[#222]"
              } hover:bg-[#F5FAFF] hover:text-[#007BFF]`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#007BFF] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white border-t border-[#CFE4FF] shadow-inner">
          {/* Dropdowns as accordions */}
          {DROPDOWN_TABS.map(tab => (
            <details key={tab.key} className="group">
              <summary className="flex items-center gap-2 px-2 py-2 text-[#007BFF] font-semibold cursor-pointer select-none">
                {tab.icon}
                {tab.label}
                <ChevronDown className="ml-auto w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="ml-6 my-1 flex flex-col gap-1">
                {SERVICES[tab.key as PlatformKey].map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5FAFF] transition font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <div className="border-t border-[#CFE4FF] my-2" />
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`block py-2 text-base font-semibold rounded-md px-3 hover:bg-[#E6F0FF] transition ${
                router.asPath === link.href ? "text-[#005FCC]" : "text-[#111]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translateY(20px);}
          to   { opacity: 1; transform: translateY(0);}
        }
        .animate-dropdown {
          animation: dropdown 0.16s cubic-bezier(.39,1.7,.47,.99);
        }
      `}</style>
    </header>
  );
}
