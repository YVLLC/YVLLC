import { Instagram, Music2, Youtube } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const US_CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX",
  "San Diego, CA", "Dallas, TX", "San Jose, CA", "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH",
  "Charlotte, NC", "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Nashville, TN", "Washington, DC",
  "Boston, MA", "El Paso, TX", "Detroit, MI", "Oklahoma City, OK", "Portland, OR", "Las Vegas, NV", "Memphis, TN",
  "Louisville, KY", "Baltimore, MD", "Milwaukee, WI", "Albuquerque, NM", "Tucson, AZ", "Fresno, CA", "Mesa, AZ", "Sacramento, CA",
  "Atlanta, GA", "Kansas City, MO", "Colorado Springs, CO", "Miami, FL", "Raleigh, NC", "Omaha, NE", "Long Beach, CA", "Virginia Beach, VA",
  "Oakland, CA", "Minneapolis, MN", "Tulsa, OK", "Arlington, TX", "New Orleans, LA"
];

const TIMEAGO = [
  "just now", "10 seconds ago", "a minute ago", "2 minutes ago", "5 minutes ago", "8 minutes ago", "12 minutes ago",
  "18 minutes ago", "20 minutes ago", "30 minutes ago", "45 minutes ago", "an hour ago", "2 hours ago", "3 hours ago",
  "6 hours ago", "10 hours ago", "12 hours ago", "18 hours ago", "22 hours ago", "a day ago", "2 days ago", "3 days ago",
  "5 days ago", "a week ago", "8 days ago", "10 days ago", "12 days ago", "2 weeks ago", "20 days ago", "3 weeks ago",
  "a month ago", "5 weeks ago"
];

// -- Services --
const SERVICES = [
  {
    platform: "Instagram",
    type: "Followers",
    icon: <Instagram className="text-[#E1306C]" size={19} />,
    amounts: [100, 200, 350, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000],
    label: (amt: number) => `${amt.toLocaleString()} Instagram Followers`
  },
  {
    platform: "Instagram",
    type: "Likes",
    icon: <Instagram className="text-[#E1306C]" size={19} />,
    amounts: [50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000],
    label: (amt: number) => `${amt.toLocaleString()} Instagram Likes`
  },
  {
    platform: "Instagram",
    type: "Views",
    icon: <Instagram className="text-[#E1306C]" size={19} />,
    amounts: [500, 2000, 5000, 10000, 20000, 50000],
    label: (amt: number) => `${amt.toLocaleString()} Instagram Views`
  },
  {
    platform: "TikTok",
    type: "Followers",
    icon: <Music2 className="text-[#25F4EE]" size={19} />,
    amounts: [100, 250, 500, 1000, 2000, 5000, 10000],
    label: (amt: number) => `${amt.toLocaleString()} TikTok Followers`
  },
  {
    platform: "TikTok",
    type: "Likes",
    icon: <Music2 className="text-[#25F4EE]" size={19} />,
    amounts: [100, 250, 500, 1000, 2000, 5000, 10000],
    label: (amt: number) => `${amt.toLocaleString()} TikTok Likes`
  },
  {
    platform: "TikTok",
    type: "Views",
    icon: <Music2 className="text-[#25F4EE]" size={19} />,
    amounts: [1000, 2000, 5000, 10000, 20000, 50000],
    label: (amt: number) => `${amt.toLocaleString()} TikTok Views`
  },
  {
    platform: "YouTube",
    type: "Subscribers",
    icon: <Youtube className="text-[#FF0000]" size={19} />,
    amounts: [200, 500, 1000, 2000, 5000, 10000],
    label: (amt: number) => `${amt.toLocaleString()} YouTube Subscribers`
  },
  {
    platform: "YouTube",
    type: "Likes",
    icon: <Youtube className="text-[#FF0000]" size={19} />,
    amounts: [250, 500, 1000, 2000, 5000, 10000],
    label: (amt: number) => `${amt.toLocaleString()} YouTube Likes`
  },
  {
    platform: "YouTube",
    type: "Views",
    icon: <Youtube className="text-[#FF0000]" size={19} />,
    amounts: [200, 500, 1000, 2000, 5000, 10000],
    label: (amt: number) => `${amt.toLocaleString()} YouTube Views`
  },
];

// -- Utility --
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type NotificationData = {
  location: string;
  platform: string;
  type: string;
  amount: number;
  timeAgo: string;
};

function makeNotifications(howMany = 50): NotificationData[] {
  const cities = shuffle(US_CITIES);
  let count = 0;
  const all: NotificationData[] = [];
  while (count < howMany) {
    const svc = SERVICES[Math.floor(Math.random() * SERVICES.length)];
    const amt = svc.amounts[Math.floor(Math.random() * svc.amounts.length)];
    const city = cities[count % cities.length];
    const time = TIMEAGO[Math.floor(Math.random() * TIMEAGO.length)];
    all.push({
      location: city,
      platform: svc.platform,
      type: svc.type,
      amount: amt,
      timeAgo: time
    });
    count++;
  }
  return shuffle(all);
}

function getServiceLabel(platform: string, type: string, amount: number): string {
  const svc = SERVICES.find(
    s => s.platform === platform && s.type === type
  );
  if (svc) return svc.label(amount);
  return `${amount.toLocaleString()} ${platform} ${type}`;
}

function getServiceIcon(platform: string): JSX.Element {
  switch (platform) {
    case "Instagram":
      return <Instagram className="text-[#E1306C]" size={19} />;
    case "TikTok":
      return <Music2 className="text-[#25F4EE]" size={19} />;
    case "YouTube":
      return <Youtube className="text-[#FF0000]" size={19} />;
    default:
      return <span />;
  }
}

const NOTIFY_INTERVAL = 3 * 60 * 1000;

export default function SalesNotifications() {
  const [notifs, setNotifs] = useState<NotificationData[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Setup notifications data and initial idx
  useEffect(() => {
    if (typeof window === "undefined") return;
    let notifications: NotificationData[];
    let idxInit = 0;
    try {
      const prev = window.sessionStorage.getItem("sales_notifs_data");
      if (prev) {
        notifications = JSON.parse(prev) as NotificationData[];
      } else {
        notifications = makeNotifications(50);
        window.sessionStorage.setItem("sales_notifs_data", JSON.stringify(notifications));
      }
      const prevIdx = window.sessionStorage.getItem("sales_notifs_idx");
      idxInit = prevIdx ? parseInt(prevIdx, 10) : 0;
    } catch (err) {
      notifications = makeNotifications(50);
      idxInit = 0;
    }
    setNotifs(notifications);
    setIdx(idxInit);

    // Show notification after interval (or immediately if time has passed)
    const now = Date.now();
    const lastShownRaw = window.sessionStorage.getItem("sales_notifs_last_time");
    const lastShown = lastShownRaw ? parseInt(lastShownRaw, 10) : 0;
    const msAgo = now - lastShown;
    if (msAgo >= NOTIFY_INTERVAL) {
      setVisible(true);
      window.sessionStorage.setItem("sales_notifs_last_time", now.toString());
    } else {
      setVisible(false);
      showTimeoutRef.current = setTimeout(() => {
        setVisible(true);
        window.sessionStorage.setItem("sales_notifs_last_time", Date.now().toString());
      }, NOTIFY_INTERVAL - msAgo);
    }
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    };
  }, []);

  // Fade out and schedule next notification
  useEffect(() => {
    if (!visible) return;
    // Show notification for ~5s, then fade out
    fadeTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      // After fade animation (0.7s), increment idx and schedule next notification
      setTimeout(() => {
        let newIdx: number;
        if (typeof window !== "undefined" && window.sessionStorage) {
          newIdx = idx + 1;
          setIdx(newIdx);
          window.sessionStorage.setItem("sales_notifs_idx", newIdx.toString());
        } else {
          newIdx = idx + 1;
          setIdx(newIdx);
        }
        // Only show next if there are more notifications
        if (notifs && newIdx < notifs.length) {
          showTimeoutRef.current = setTimeout(() => {
            setVisible(true);
            window.sessionStorage.setItem("sales_notifs_last_time", Date.now().toString());
          }, NOTIFY_INTERVAL);
        }
      }, 700); // matches fade-out duration
    }, 4800 + Math.random() * 600);
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    };
    // eslint-disable-next-line
  }, [visible, idx, notifs]);

  if (!notifs || idx >= notifs.length) return null;
  const notification = notifs[idx];
  const icon = getServiceIcon(notification.platform);
  const label = getServiceLabel(notification.platform, notification.type, notification.amount);

  return (
    <>
      <div
        className={`
          fixed z-[60] bottom-7 left-4 sm:left-8 md:left-12
          max-w-xs sm:max-w-sm bg-white border-2 border-[#CFE4FF] rounded-2xl shadow-2xl flex items-center gap-3 px-4 py-3
          transition-all duration-700
          ${visible ? "opacity-100 translate-y-0 pointer-events-auto animate-notify-in" : "opacity-0 translate-y-8 pointer-events-none"}
        `}
        style={{
          minWidth: 235,
          willChange: "opacity,transform",
          fontFamily: "inherit"
        }}
        aria-live="polite"
      >
        <div className="bg-[#F5FAFF] p-2 rounded-full">{icon}</div>
        <div>
          <div className="font-semibold text-[#007BFF] text-sm mb-0.5 flex items-center gap-1">
            Recent Sale
            <span className="inline-block w-1.5 h-1.5 bg-[#22C55E] rounded-full ml-1 animate-pulse" />
          </div>
          <div className="text-xs text-[#444] font-medium">{notification.location}</div>
          <div className="text-sm font-bold text-[#222] mt-1">{label}</div>
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