// path: pages/auth/callback.tsx
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, MailCheck, ArrowRight, LogOut, ShieldCheck } from "lucide-react";

const COLORS = {
  primary: "#007BFF",
  primaryHover: "#005FCC",
  background: "#FFFFFF",
  text: "#111111",
  muted: "#6B7280",
  border: "#CFE4FF",
  accentBg: "#E6F0FF",
};

export default function EmailChangeCallback() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Why: show the now-active email if session is present after redirect
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email ?? null);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Email Updated • YesViral</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="min-h-screen relative overflow-hidden bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_100%)]">
        {/* confetti */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 26 }).map((_, i) => (
            <span key={i} className={`confetti c${(i % 6) + 1}`} />
          ))}
        </div>

        <div className="px-4 py-10 sm:py-16">
          <div className="mx-auto max-w-lg">
            {/* Brand header */}
            <div className="flex flex-col items-center mb-7">
              <div className="w-12 h-12 rounded-2xl grid place-items-center shadow-sm border" style={{ borderColor: COLORS.border, background: COLORS.accentBg }}>
                <MailCheck size={26} color={COLORS.primary} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-[#0B63E6] text-center">
                Email change confirmed
              </h1>
              <p className="text-sm text-[#3E5785] mt-2 text-center">
                {email ? <>Your account email is now <b className="text-[#0B63E6]">{email}</b>.</> : <>Your account email has been updated.</>}
              </p>
            </div>

            {/* Success card */}
            <div
              className="rounded-2xl border bg-white shadow-[0_8px_32px_rgba(0,123,255,0.10)] overflow-hidden"
              style={{ borderColor: COLORS.border }}
            >
              <div className="px-6 py-5 border-b bg-white/70" style={{ borderColor: COLORS.border }}>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full grid place-items-center" style={{ background: COLORS.accentBg }}>
                    <CheckCircle2 size={20} color={COLORS.primary} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-[#0B63E6]">Success</div>
                    <div className="text-xs text-[#64748B]">Your new email is now active for login.</div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6 space-y-4">
                <div className="rounded-xl border px-4 py-3 flex items-start gap-3" style={{ borderColor: COLORS.border, background: "#F7FBFF" }}>
                  <ShieldCheck size={18} className="mt-0.5" color={COLORS.primary} />
                  <div className="text-sm text-[#334155]">
                    For security, you may be asked to re-authenticate on other devices.
                  </div>
                </div>

                <div className="text-sm text-[#475569]">
                  What’s next:
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Use your new email the next time you sign in.</li>
                    <li>If you didn’t request this, <Link href="/support" className="text-[#0B63E6] font-semibold underline">contact support</Link> immediately.</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-white shadow transition"
                    style={{ background: COLORS.primary }}
                  >
                    Go to Dashboard <ArrowRight size={18} />
                  </Link>
                  <button
                    onClick={async () => { await supabase.auth.signOut(); window.location.href = "/login"; }}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl font-bold border transition"
                    style={{ borderColor: COLORS.border, color: COLORS.primary }}
                  >
                    <LogOut size={18} /> Log out
                  </button>
                </div>
              </div>
            </div>

            {/* tiny footer */}
            <p className="text-center text-xs text-[#667085] mt-6">
              Having trouble? <Link href="/support" className="text-[#0B63E6] font-semibold underline">Visit support</Link>
            </p>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .confetti {
          position: absolute;
          top: -10px;
          width: 8px;
          height: 14px;
          border-radius: 2px;
          opacity: 0.9;
          animation: fall 4.2s linear infinite;
        }
        .confetti.c1 { background: #007BFF; left: 8%;  animation-delay: .1s; }
        .confetti.c2 { background: #00B3FF; left: 18%; animation-delay: .6s; }
        .confetti.c3 { background: #60A5FA; left: 28%; animation-delay: .2s; }
        .confetti.c4 { background: #93C5FD; left: 44%; animation-delay: .9s; }
        .confetti.c5 { background: #A5B4FC; left: 62%; animation-delay: .5s; }
        .confetti.c6 { background: #C7D2FE; left: 82%; animation-delay: .3s; }
        @keyframes fall {
          0% { transform: translateY(-10px) rotate(0deg); }
          60% { transform: translateY(70vh) rotate(160deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
      `}</style>
    </>
  );
}
