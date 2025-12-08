import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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
      desc: "Boost Your Instagram With High-Quality Followers Fast."
    },
    {
      name: "Buy Instagram Likes",
      service: { platform: "instagram", type: "Likes" },
      icon: <ThumbsUp size={18} className="text-[#E1306C]" />,
      desc: "Boost Your Posts With High-Quality Likes Fast."
    },
    {
      name: "Buy Instagram Views",
      service: { platform: "instagram", type: "Views" },
      icon: <Eye size={18} className="text-[#E1306C]" />,
      desc: "Boost Your Reach With High-Quality Views Fast."
    }
  ],
  tiktok: [
    {
      name: "Buy TikTok Followers",
      service: { platform: "tiktok", type: "Followers" },
      icon: <UserPlus size={18} className="text-[#00F2EA]" />,
      desc: "Boost Your TikTok With High-Quality Followers Fast."
    },
    {
      name: "Buy TikTok Likes",
      service: { platform: "tiktok", type: "Likes" },
      icon: <ThumbsUp size={18} className="text-[#00F2EA]" />,
      desc: "Boost Your Videos With High-Quality Likes Fast."
    },
    {
      name: "Buy TikTok Views",
      service: { platform: "tiktok", type: "Views" },
      icon: <Eye size={18} className="text-[#00F2EA]" />,
      desc: "Boost Your TikTok Reach With High-Quality Views Fast."
    }
  ],
  youtube: [
    {
      name: "Buy YouTube Subscribers",
      service: { platform: "youtube", type: "Subscribers" },
      icon: <UserPlus size={18} className="text-[#FF0000]" />,
      desc: "Boost Your Channel With High-Quality Subscribers Fast."
    },
    {
      name: "Buy YouTube Likes",
      service: { platform: "youtube", type: "Likes" },
      icon: <ThumbsUp size={18} className="text-[#FF0000]" />,
      desc: "Boost Your Videos With High-Quality Likes Fast."
    },
    {
      name: "Buy YouTube Views",
      service: { platform: "youtube", type: "Views" },
      icon: <Eye size={18} className="text-[#FF0000]" />,
      desc: "Boost Your YouTube Growth With High-Quality Views Fast."
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
    { name: "About", href: "/about" },
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between min-h-[72px]">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group whitespace-nowrap">
          <Image
            src="/logo.png"
            alt="YesViral Logo"
            width={40}
            height={40}
            className="rounded-full group-hover:scale-105 transition-transform shadow"
            priority
          />
          <span className="text-2xl font-extrabold text-[#007BFF] group-hover:text-[#005FCC] transition">
            YesViral
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-[6px] ml-2 whitespace-nowrap">

          {megaTabs.map(tab => (
            <div
              key={tab.key}
              className="relative flex items-center h-full"
              onMouseEnter={() => startMenuHover(tab.key)}
              onMouseLeave={scheduleMenuClose}
            >
              <button
                type="button"
                className={`
                  flex items-center gap-1 px-3 py-2 rounded-full text-[15px] font-medium transition 
                  hover:bg-[#F5FAFF]
                  ${hoverTab === tab.key ? "text-[#007BFF]" : "text-[#1A1A1A]"}
                `}
              >
                {tab.icon}
                {tab.label}
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform ${hoverTab === tab.key ? "rotate-180" : ""}`}
                />
              </button>

              {/* MEGA MENU (WIDER: w-96) */}
              <div
                className={`
                  absolute left-0 top-[110%] w-96 max-w-[380px] bg-white rounded-xl border border-[#CFE4FF]
                  shadow-2xl py-3 z-50 transition-all duration-200
                  ${hoveredMenu === tab.key ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"}
                `}
                onMouseEnter={cancelMenuClose}
                onMouseLeave={scheduleMenuClose}
              >
                <div className="flex flex-col gap-1">
                  {MEGA_MENUS[tab.key].map(item => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        openOrderModal(item.service.platform, item.service.type);
                        setHoveredMenu(null);
                        setHoverTab(null);
                      }}
                      className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-[#F5FAFF] transition text-left w-full"
                    >
                      {item.icon}
                      <span>
                        <span className="font-semibold text-[#007BFF]">{item.name}</span>
                        <div className="text-xs text-[#444] mt-0.5">{item.desc}</div>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* DIVIDER */}
          <span className="w-px h-7 mx-2 bg-[#E7ECF3]" />

          {/* TOP LINKS */}
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`
                px-3 py-2 rounded-full text-[15px] font-medium transition
                ${router.asPath === link.href ? "text-[#007BFF]" : "text-[#222]"}
                hover:bg-[#F5FAFF] hover:text-[#007BFF]
              `}
            >
              {link.name}
            </Link>
          ))}

          {/* AUTH BUTTONS */}
          {!user ? (
            <>
              <Link href="/login">
                <button className="px-4 py-2 rounded-full text-[#007BFF] bg-white border border-[#007BFF] font-semibold hover:bg-[#F2F9FF]">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-4 py-2 rounded-full text-white bg-[#007BFF] border-2 border-[#007BFF] font-bold hover:bg-[#005FCC]">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <button className="px-4 py-2 rounded-lg text-[#007BFF] bg-[#F5FAFF] border border-[#E7ECF3] font-semibold hover:bg-[#E6F0FF]">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-[#007BFF] bg-white border border-[#007BFF] font-semibold hover:bg-[#F2F9FF]"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          )}

        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-[#007BFF]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white border-t border-[#CFE4FF] shadow-inner">

          {megaTabs.map(tab => (
            <details key={tab.key} className="group">
              <summary className="flex items-center gap-2 px-2 py-2 text-[#007BFF] font-semibold cursor-pointer">
                {tab.icon}
                {tab.label}
                <ChevronDown className="ml-auto w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>

              <div className="ml-6 mt-1 flex flex-col gap-1">
                {MEGA_MENUS[tab.key].map(item => (
                  <button
                    key={item.name}
                    onClick={() => {
                      openOrderModal(item.service.platform, item.service.type);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5FAFF]"
                  >
                    {item.icon}
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
              onClick={() => setIsOpen(false)}
              className={`
                block py-2 text-base font-semibold rounded-full px-3 
                hover:bg-[#E6F0FF]
                ${router.asPath === link.href ? "text-[#005FCC]" : "text-[#111]"}
              `}
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <div className="flex gap-2 mt-3">
              <Link href="/login" className="flex-1">
                <button className="w-full px-4 py-2 rounded-full text-[#007BFF] bg-white border border-[#007BFF] font-semibold hover:bg-[#F2F9FF]">
                  Login
                </button>
              </Link>
              <Link href="/signup" className="flex-1">
                <button className="w-full px-4 py-2 rounded-full text-white bg-[#007BFF] border-2 border-[#007BFF] font-bold hover:bg-[#005FCC]">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2 mt-3">
              <Link href="/dashboard" className="flex-1">
                <button className="w-full px-4 py-2 rounded-lg text-[#007BFF] bg-[#F5FAFF] border border-[#E7ECF3] font-semibold hover:bg-[#E6F0FF]">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-[#007BFF] bg-white border border-[#007BFF] font-semibold hover:bg-[#F2F9FF]"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          )}

        </div>
      )}

    </header>
  );
}
