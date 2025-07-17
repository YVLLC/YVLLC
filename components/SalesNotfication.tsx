import { Instagram, Music2, Youtube } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ---- US CITIES (add more if you want even more variety!) ----
const US_CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX",
  "San Diego, CA", "Dallas, TX", "San Jose, CA", "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH",
  "Charlotte, NC", "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Nashville, TN", "Washington, DC",
  "Boston, MA", "El Paso, TX", "Detroit, MI", "Oklahoma City, OK", "Portland, OR", "Las Vegas, NV", "Memphis, TN",
  "Louisville, KY", "Baltimore, MD", "Milwaukee, WI", "Albuquerque, NM", "Tucson, AZ", "Fresno, CA", "Mesa, AZ", "Sacramento, CA",
  "Atlanta, GA", "Kansas City, MO", "Colorado Springs, CO", "Miami, FL", "Raleigh, NC", "Omaha, NE", "Long Beach, CA", "Virginia Beach, VA",
  "Oakland, CA", "Minneapolis, MN", "Tulsa, OK", "Arlington, TX", "New Orleans, LA"
];

// ---- SERVICE DEFS AND AMOUNTS ----
const SERVICES = [
  {
    platform: "Instagram",
    type: "Followers",
    icon: <Instagram className="text-[#E1306C]" size={19} />,
    amounts: [100, 200, 350, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000],
    label: (amt) => `${amt.toLocaleString()} Instagram Followers`
  },
  {
    platform: "Instagram",
    type: "Likes",
    icon: <Instagram className="text-[#E1306C]" size={19} />,
    amounts: [50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000],
    label: (amt) => `${amt.toLocaleString()} Instagram Likes`
  },
  {
    platform: "Instagram",
    type: "Views",
    icon: <Instagram className="text-[#E1306C]" size={19} />,
    amounts: [500, 2000, 5000, 10000, 20000, 50000],
    label: (amt) => `${amt.toLocaleString()} Instagram Views`
  },
  {
    platform: "TikTok",
    type: "Followers",
    icon: <Music2 className="text-[#25F4EE]" size={19} />,
    amounts: [100, 250, 500, 1000, 2000, 5000, 10000],
    label: (amt) => `${amt.toLocaleString()} TikTok Followers`
  },
  {
    platform: "TikTok",
    type: "Likes",
    icon: <Music2 className="text-[#25F4EE]" size={19} />,
    amounts: [100, 250, 500, 1000, 2000, 5000, 10000],
    label: (amt) => `${amt.toLocaleString()} TikTok Likes`
  },
  {
    platform: "TikTok",
    type: "Views",
    icon: <Music2 className="text-[#25F4EE]" size={19} />,
    amounts: [1000, 2000, 5000, 10000, 20000, 50000],
    label: (amt) => `${amt.toLocaleString()} TikTok Views`
  },
  {
    platform: "YouTube",
    type: "Subscribers",
    icon: <Youtube className="text-[#FF0000]" size={19} />,
    amounts: [200, 500, 1000, 2000, 5000, 10000],
    label: (amt) => `${amt.toLocaleString()} YouTube Subscribers`
  },
  {
    platform: "YouTube",
    type: "Likes",
    icon: <Youtube className="text-[#FF0000]" size={19} />,
    amounts: [250, 500, 1000, 2000, 5000, 10000],
    label: (amt) => `${amt.toLocaleString()} YouTube Likes`
  },
  {
    platform: "YouTube",
    type: "Views",
    icon: <Youtube className="text-[#FF0000]" size={19} />,
    amounts: [200, 500, 1000, 2000, 5000, 10000],
    label: (amt) => `${amt.toLocaleString()} YouTube Views`
  },
];

// ---- TIME AGO OPTIONS ----
const TIMEAGO = [
  "just now", "10 seconds ago", "a minute ago", "2 minutes ago", "5 minutes ago", "8 minutes ago", "12 minutes ago",
  "18 minutes ago", "20 minutes ago", "30 minutes ago", "45 minutes ago", "an hour ago", "2 hours ago", "3 hours ago",
  "6 hours ago", "10 hours ago", "12 hours ago", "18 hours ago", "22 hours ago", "a day ago", "2 days ago", "3 days ago",
  "5 days ago", "a week ago", "8 days ago", "10 days ago", "12 days ago", "2 weeks ago", "20 days ago", "3 weeks ago",
  "a month ago", "5 weeks ago"
];

// ---- HELPERS ----
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- MAKE 50 HIGH QUALITY, ALL-USA, NONREPEATING NOTIFICATIONS ----
function makeNotifications(howMany = 50) {
  const cities = shuffle(US_CITIES);
  let count = 0;
  const all = [];
  while (count < howMany) {
    // Services/amounts shuffled every loop for max variety
    const svc = SERVICES[Math.floor(Math.random() * SERVICES.length)];
    const amt = svc.amounts[Math.floor(Math.random() * svc.amounts.length)];
    const city = cities[count % cities.length];
    const time = TIMEAGO[Math.floor(Math.random() * TIMEAGO.length)];
    all.push({
      location: city,
      service: svc.label(amt),
      icon: svc.icon,
      timeAgo: time
    });
    count++;
  }
  return shuffle(all);
}

// ---- SALES NOTIFICATION COMPONENT ----
function SalesNotifications() {
  const [notifs] = useState(() => makeNotifications(50));
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (idx >= notifs.length) return;
    timerRef.current = setTimeout(() => setVisible(false), 4200 + Math.random() * 800);
    return () => clearTimeout(timerRef.current);
  }, [idx]);

  useEffect(() => {
    if (!visible && idx < notifs.length - 1) {
      timerRef.current = setTimeout(() => {
        setIdx(i => i + 1);
        setVisible(true);
      }, 550);
      return () => clearTimeout(timerRef.current);
    }
  }, [visible, idx, notifs.length]);

  if (idx >= notifs.length) return null;

  const notification = notifs[idx];

  return (
    <>
      <div
        className={`
          fixed z-[60] bottom-7 left-4 sm:left-8 md:left-12
          max-w-xs sm:max-w-sm bg-white border-2 border-[#CFE4FF] rounded-2xl shadow-2xl flex items-center gap-3 px-4 py-3
          animate-notify-in transition-all duration-500
          ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}
        `}
        style={{
          minWidth: 235,
          willChange: "opacity,transform",
          fontFamily: "inherit"
        }}
      >
        <div className="bg-[#F5FAFF] p-2 rounded-full">{notification.icon}</div>
        <div>
          <div className="font-semibold text-[#007BFF] text-sm mb-0.5 flex items-center gap-1">
            Someone
            <span className="inline-block w-1.5 h-1.5 bg-[#22C55E] rounded-full ml-1 animate-pulse" />
          </div>
          <div className="text-xs text-[#444] font-medium">{notification.location}</div>
          <div className="text-sm font-bold text-[#222] mt-1">{notification.service}</div>
          <div className="text-[11px] text-[#888] mt-0.5">{notification.timeAgo}</div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes notify-in {
          0% { opacity:0; transform: translateY(40px);}
          65% { opacity:1; transform: translateY(-4px);}
          100% { opacity:1; transform: translateY(0);}
        }
        .animate-notify-in { animation: notify-in 0.8s cubic-bezier(.52,2,.24,1) 1; }
      `}</style>
    </>
  );
}

export default SalesNotifications;
