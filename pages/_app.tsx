import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script"; // ✅ REQUIRED
import Header from "@/components/Header";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import { OrderModalProvider, useOrderModal } from "@/context/OrderModalContext";
import { useEffect } from "react"; // ✅ REQUIRED

// Wraps OrderModal so it receives platform, service AND quantity
function OrderModalWrapper() {
  const { open, closeOrderModal, platform, service, quantity } = useOrderModal();

  return (
    <OrderModal
      open={open}
      onClose={closeOrderModal}
      initialPlatform={platform ?? undefined}
      initialService={service ?? undefined}
      initialQuantity={quantity ?? undefined}
    />
  );
}

function FooterWithOrderModal() {
  const { openOrderModal } = useOrderModal();
  return <Footer onServiceOrder={openOrderModal} />;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideHeaderFooter = ["/dashboard"];
  const shouldHide = hideHeaderFooter.some((route) =>
    router.pathname.startsWith(route)
  );

  // ✅ META PIXEL SPA PAGEVIEW FIX (REQUIRED)
  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "PageView");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <OrderModalProvider>

      {/* ================= META PIXEL ================= */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1196656872434686');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* ================= NOSCRIPT FALLBACK ================= */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1196656872434686&ev=PageView&noscript=1"
        />
      </noscript>

      <Head>
        <title>YesViral – Buy High-Quality Followers, Likes & Views.</title>
        <meta
          name="description"
          content="YesViral is your #1 source to grow on Instagram, TikTok, YouTube & more. Fast delivery, real results, and premium support."
        />
        <meta
          name="keywords"
          content="YesViral, buy Instagram followers, buy TikTok followers, social media growth, buy YouTube subscribers, PDN delivery, premium growth service, fast Instagram followers, safe social media growth"
        />
        <meta name="author" content="YesViral" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.yesviral.com" />

        {/* GOOGLE ANALYTICS */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XYD80ZBH20"></script>
        <script
          id="ga4-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XYD80ZBH20', { send_page_view: true });
            `,
          }}
        />
      </Head>

      {!shouldHide && <Header />}
      <main className="min-h-screen bg-white">
        <Component {...pageProps} />
        <OrderModalWrapper />
      </main>
      {!shouldHide && <FooterWithOrderModal />}
    </OrderModalProvider>
  );
}
