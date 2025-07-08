import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Menu, X, ChevronDown, Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, LogOut } from "lucide-react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const MEGA_MENUS = {
  instagram: [
    {
      name: "Buy Instagram Followers",
      href: "/checkout?service=instagram-followers",
      icon: <UserPlus size={18} className="text-[#E1306C]" />,
      desc: "Real, lasting followers. Instant start."
    },
    {
      name: "Buy Instagram Likes",
      href: "/checkout?service=instagram-likes",
      icon: <ThumbsUp size={18} className="text-[#E1306C]" />,
      desc: "Boost post engagement. Organic style."
    },
    {
      name: "Buy Instagram Views",
      href: "/checkout?service=instagram-views",
      icon: <Eye size={18} className="text-[#E1306C]" />,
      desc: "Go viral on Stories & Reels."
    }
  ],
  tiktok: [
    {
      name: "Buy TikTok Followers",
      href: "/checkout?service=tiktok-followers",
      icon: <UserPlus size={18} className="text-[#00F2EA]" />,
      desc: "Jumpstart your audience. Fast delivery."
    },
    {
      name: "Buy TikTok Likes",
      href: "/checkout?service=tiktok-likes",
      icon: <ThumbsUp size={18} className="text-[#00F2EA]" />,
      desc: "Get videos trending with real likes."
    },
    {
      name: "Buy TikTok Views",
      href: "/checkout?service=tiktok-views",
      icon: <Eye size={18} className="text-[#00F2EA]" />,
      desc: "Push your content to FYP."
    }
  ],
  youtube: [
    {
      name: "Buy YouTube Subscribers",
      href: "/checkout?service=youtube-subscribers",
      icon: <UserPlus size={18} className="text-[#FF0000]" />,
      desc: "Grow your channel authentically."
    },
    {
      name: "Buy YouTube Likes",
      href: "/checkout?service=youtube-likes",
      icon: <ThumbsUp size={18} className="text-[#FF0000]" />,
      desc: "Like boosts for every video."
    },
    {
      name: "Buy YouTube Views",
      href: "/checkout?service=youtube-views",
      icon: <Eye size={18} className="text-[#FF0000]" />,
      desc: "Skyrocket your views. Real users."
    }
  ]
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTab, setHoverTab] = useState<string | null>(null);
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();

  const navLinks = [
    { name: "FAQ", href: "/#faq" },
    { name: "Contact Us", href: "/contact" },
  ];

  const megaTabs = [
    {
      label: "Instagram Services",
      key: "instagram",
      icon: <Instagram size={18} className="text-[#E1306C]" />
    },
    {
      label: "TikTok Services",
      key: "tiktok",
      icon: <Music2 size={18} className="text-[#00F2EA]" />
    },
    {
      label: "YouTube Services",
      key: "youtube",
      icon: <Youtube size={18} className="text-[#FF0000]" />
    }
  ];

  // SIGN OUT logic
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/"); // redirect home or wherever
  };

  return (
    <header className="bg-white border-b border-[#CFE4FF] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between min-h-[72px]">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="YesViral Logo"
            width={40}
            height={40}
            className="rounded-full group-hover:scale-105 transition-transform duration-150 shadow"
            priority
          />
          <span className="text-2xl font-extrabold text-[#007BFF] group-hover:text-[#005FCC] tracking-tight transition-colors duration-200">
            YesViral
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {megaTabs.map(tab => (
            <div
              key={tab.key}
              className="relative flex items-center h-full"
              onMouseEnter={() => setHoverTab(tab.key)}
              onMouseLeave={() => setHoverTab(null)}
            >
              <button
                className={`
                  flex items-center gap-1 px-3 py-2 rounded-full text-[16px] font-medium transition 
                  hover:bg-[#F5FAFF] focus:outline-none
                  ${hoverTab === tab.key ? "text-[#007BFF]" : "text-[#1A1A1A]"}
                `}
                type="button"
              >
                {tab.icon}
                <span>{tab.label}</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-150 ${hoverTab === tab.key ? "rotate-180" : ""}`} />
              </button>
              {hoverTab === tab.key && (
                <div className="absolute left-0 top-[110%] w-80 bg-white rounded-xl border border-[#CFE4FF] shadow-2xl z-50 py-3 animate-fadeInFast">
                  <div className="flex flex-col gap-1">
                    {MEGA_MENUS[tab.key as keyof typeof MEGA_MENUS].map(item => (
                      <Link
                        href={item.href}
                        key={item.name}
                        className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-[#F5FAFF] transition group"
                      >
                        <span>{item.icon}</span>
                        <span>
                          <span className="font-semibold text-[#007BFF] group-hover:underline">{item.name}</span>
                          <div className="text-xs text-[#444]">{item.desc}</div>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <span className="w-px h-7 mx-3 bg-[#E7ECF3]" />

          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-2 rounded-full text-[15px] font-medium transition 
                ${router.asPath === link.href ? "text-[#007BFF]" : "text-[#222]"}
                hover:bg-[#F5FAFF] hover:text-[#007BFF]`}
            >
              {link.name}
            </Link>
          ))}

          {/* AUTH BUTTONS */}
          {!user ? (
            <>
              <Link href="/login" className="ml-4">
                <button className="px-5 py-2 rounded-full text-[#007BFF] bg-white border border-[#007BFF] font-semibold shadow-sm hover:bg-[#F2F9FF] hover:text-[#005FCC] transition text-base focus:outline-none focus:ring-2 focus:ring-[#E6F0FF]">
                  Login
                </button>
              </Link>
              <Link href="/signup" className="ml-2">
                <button className="px-5 py-2 rounded-full text-white bg-[#007BFF] border-2 border-[#007BFF] font-bold shadow hover:bg-[#005FCC] transition text-base focus:outline-none focus:ring-2 focus:ring-[#E6F0FF]">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="ml-4">
                <button className="px-5 py-2 rounded-full text-white bg-[#007BFF] border-2 border-[#007BFF] font-bold shadow hover:bg-[#005FCC] transition text-base focus:outline-none focus:ring-2 focus:ring-[#E6F0FF]">
                  Dashboard
                </button>
              </Link>
              <button
                className="ml-2 flex items-center gap-1 px-5 py-2 rounded-full text-[#007BFF] bg-white border border-[#007BFF] font-semibold shadow-sm hover:bg-[#F2F9FF] hover:text-[#005FCC] transition text-base focus:outline-none focus:ring-2 focus:ring-[#E6F0FF]"
                onClick={handleSignOut}
              >
                <LogOut size={18} className="mr-1" /> Sign Out
              </button>
            </>
          )}
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
          {megaTabs.map(tab => (
            <details key={tab.key} className="group">
              <summary className="flex items-center gap-2 px-2 py-2 text-[#007BFF] font-semibold cursor-pointer select-none">
                {tab.icon}
                {tab.label}
                <ChevronDown className="ml-auto w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="ml-6 my-1 flex flex-col gap-1">
                {MEGA_MENUS[tab.key as keyof typeof MEGA_MENUS].map(item => (
                  <Link
                    href={item.href}
                    key={item.name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5FAFF] transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span className="font-semibold text-[#007BFF]">{item.name}</span>
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
              className={`block py-2 text-base font-semibold rounded-full px-3 hover:bg-[#E6F0FF] transition ${
                router.asPath === link.href ? "text-[#005FCC]" : "text-[#111]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile auth */}
          {!user ? (
            <div className="flex gap-2 mt-3">
              <Link href="/login" className="flex-1">
                <button className="w-full px-4 py-2 rounded-full text-[#007BFF] bg-white border border-[#007BFF] font-semibold shadow-sm hover:bg-[#F2F9FF] hover:text-[#005FCC] transition text-base">
                  Login
                </button>
              </Link>
              <Link href="/signup" className="flex-1">
                <button className="w-full px-4 py-2 rounded-full text-white bg-[#007BFF] border-2 border-[#007BFF] font-bold shadow hover:bg-[#005FCC] transition text-base">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2 mt-3">
              <Link href="/dashboard" className="flex-1">
                <button className="w-full px-4 py-2 rounded-full text-white bg-[#007BFF] border-2 border-[#007BFF] font-bold shadow hover:bg-[#005FCC] transition text-base">
                  Dashboard
                </button>
              </Link>
              <button
                className="flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-full text-[#007BFF] bg-white border border-[#007BFF] font-semibold shadow-sm hover:bg-[#F2F9FF] hover:text-[#005FCC] transition text-base"
                onClick={handleSignOut}
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInFast {
          from { opacity: 0; transform: translateY(20px);}
          to   { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInFast {
          animation: fadeInFast 0.18s cubic-bezier(.39,1.7,.47,.99);
        }
      `}</style>
    </header>
  );
}
