import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  Menu, X, ChevronDown, Instagram, Youtube, Music2,
  UserPlus, ThumbsUp, Eye, LogOut
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useOrderModal } from "@/context/OrderModalContext";

const MEGA_MENUS = {
  instagram: [
    {
      name: "Buy Instagram Followers",
      service: { platform: "instagram", type: "Followers" },
      icon: <UserPlus size={18} className="text-[#E1306C]" />,
      desc: "High-Quality Followers. Instant, Reliable Growth."
    },
    {
      name: "Buy Instagram Likes",
      service: { platform: "instagram", type: "Likes" },
      icon: <ThumbsUp size={18} className="text-[#E1306C]" />,
      desc: "Premium Likes for Stronger Engagement."
    },
    {
      name: "Buy Instagram Views",
      service: { platform: "instagram", type: "Views" },
      icon: <Eye size={18} className="text-[#E1306C]" />,
      desc: "Boost Story & Reels Reach with Real Views."
    }
  ],

  tiktok: [
    {
      name: "Buy TikTok Followers",
      service: { platform: "tiktok", type: "Followers" },
      icon: <UserPlus size={18} className="text-[#00F2EA]" />,
      desc: "Kickstart Your Growth with High-Quality Followers."
    },
    {
      name: "Buy TikTok Likes",
      service: { platform: "tiktok", type: "Likes" },
      icon: <ThumbsUp size={18} className="text-[#00F2EA]" />,
      desc: "Boost Engagement & Help Videos Take Off."
    },
    {
      name: "Buy TikTok Views",
      service: { platform: "tiktok", type: "Views" },
      icon: <Eye size={18} className="text-[#00F2EA]" />,
      desc: "Premium Views to Push Your Content to the FYP."
    }
  ],

  youtube: [
    {
      name: "Buy YouTube Subscribers",
      service: { platform: "youtube", type: "Subscribers" },
      icon: <UserPlus size={18} className="text-[#FF0000]" />,
      desc: "Authentic Subscriber Growth for Your Channel."
    },
    {
      name: "Buy YouTube Likes",
      service: { platform: "youtube", type: "Likes" },
      icon: <ThumbsUp size={18} className="text-[#FF0000]" />,
      desc: "Strengthen Engagement Across Your Videos."
    },
    {
      name: "Buy YouTube Views",
      service: { platform: "youtube", type: "Views" },
      icon: <Eye size={18} className="text-[#FF0000]" />,
      desc: "Real Views to Boost Ranking & Visibility."
    }
  ]
};

type MegaKey = keyof typeof MEGA_MENUS;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTab, setHoverTab] = useState<MegaKey | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<MegaKey | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const { openOrderModal } = useOrderModal();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // --- Bulletproof hover logic ---
  function startMenuHover(key: MegaKey) {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoverTab(key);
    setHoveredMenu(key);
  }
  function scheduleMenuClose() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHoveredMenu(null);
      setHoverTab(null);
    }, 160);
  }
  function cancelMenuClose() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  }

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
              onMouseEnter={() => startMenuHover(tab.key as MegaKey)}
              onMouseLeave={scheduleMenuClose}
            >
              <button
                className={`
                  flex items-center gap-1 px-3 py-2 rounded-full text-[16px] font-medium transition 
                  hover:bg-[#F5FAFF] focus:outline-none
                  ${hoverTab === tab.key ? "text-[#007BFF]" : "text-[#1A1A1A]"}
                `}
                type="button"
                onFocus={() => startMenuHover(tab.key as MegaKey)}
                onBlur={scheduleMenuClose}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-150 ${hoverTab === tab.key ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`
                  absolute left-0 top-[110%] w-96 bg-white rounded-xl border border-[#CFE4FF] shadow-2xl z-50 py-3
                  ${hoveredMenu === tab.key ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2"}
                  transition-all duration-200
                `}
                onMouseEnter={cancelMenuClose}
                onMouseLeave={scheduleMenuClose}
                style={{ transitionTimingFunction: "cubic-bezier(.45,1.8,.25,.99)" }}
              >
                <div className="flex flex-col gap-1">
                  {MEGA_MENUS[tab.key as MegaKey].map(item => (
                    <button
                      type="button"
                      key={item.name}
                      className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-[#F5FAFF] transition group w-full text-left"
                      onClick={() => {
                        openOrderModal(item.service.platform, item.service.type);
                        setHoverTab(null);
                        setHoveredMenu(null);
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>
                        <span className="font-semibold text-[#007BFF] group-hover:underline">{item.name}</span>
                        <div className="text-xs text-[#444]">{item.desc}</div>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
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

          {!user ? (
            <>
              <Link href="/login" className="ml-4">
                <button className="px-5 py-2 rounded-full text-[#007BFF] bg-white border border-[#007BFF] font-semibold shadow-sm hover:bg-[#F2F9FF] hover:text-[#005FCC] transition text-base focus:outline-none">
                  Login
                </button>
              </Link>
              <Link href="/signup" className="ml-2">
                <button className="px-5 py-2 rounded-full text-white bg-[#007BFF] border-2 border-[#007BFF] font-bold shadow hover:bg-[#005FCC] transition text-base focus:outline-none">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2 ml-5">
              <Link href="/dashboard">
                <button className="px-4 py-2 rounded-lg text-[#007BFF] bg-[#F5FAFF] border border-[#E7ECF3] font-semibold hover:bg-[#E6F0FF] hover:text-[#005FCC] text-base shadow-none transition-all focus:outline-none">
                  Dashboard
                </button>
              </Link>
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-[#007BFF] bg-white border border-[#007BFF] font-semibold shadow-sm hover:bg-[#F2F9FF] hover:text-[#005FCC] transition-all text-base focus:outline-none"
                onClick={handleSignOut}
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
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
                {MEGA_MENUS[tab.key as MegaKey].map(item => (
                  <button
                    type="button"
                    key={item.name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5FAFF] transition w-full text-left"
                    onClick={() => {
                      openOrderModal(item.service.platform, item.service.type);
                      setIsOpen(false);
                    }}
                  >
                    <span>{item.icon}</span>
                    <span className="font-semibold text-[#007BFF]">{item.name}</span>
                  </button>
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
                <button className="w-full px-4 py-2 rounded-lg text-[#007BFF] bg-[#F5FAFF] border border-[#E7ECF3] font-semibold hover:bg-[#E6F0FF] hover:text-[#005FCC] text-base shadow-none transition-all focus:outline-none">
                  Dashboard
                </button>
              </Link>
              <button
                className="flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-[#007BFF] bg-white border border-[#007BFF] font-semibold shadow-sm hover:bg-[#F2F9FF] hover:text-[#005FCC] transition-all text-base"
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