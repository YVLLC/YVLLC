import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import { OrderModalProvider, useOrderModal } from "@/context/OrderModalContext";

// Wraps OrderModal so you don't have to use context directly here
function OrderModalWrapper() {
  const { open, closeOrderModal, platform, service } = useOrderModal();
  return (
    <OrderModal
      open={open}
      onClose={closeOrderModal}
      initialPlatform={platform ?? undefined}
      initialService={service ?? undefined}
    />
  );
}

// NEW: Wrap Footer to connect to modal context
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

  return (
    <OrderModalProvider>
      <Head>
        {/* ==============================
            🔥 GLOBAL SEO SUPERCHARGED
        =============================== */}

        <title>YesViral – Buy Followers & Social Media Growth</title>

        <meta
          name="description"
          content="YesViral is your #1 source to grow on Instagram, TikTok, YouTube & more. Fast delivery, real results, and premium support."
        />

        {/* High-authority keywords (SAFE, no text changes) */}
        <meta
          name="keywords"
          content="YesViral, buy Instagram followers, buy TikTok followers, social media growth, buy YouTube subscribers, PDN delivery, premium growth service, fast Instagram followers, safe social media growth"
        />

        <meta name="author" content="YesViral" />
        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.yesviral.com" />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* ==============================
            🔥 PRELOAD ASSETS (SEO + SPEED)
        =============================== */}
        <link
          rel="preload"
          href="/fonts/Inter.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="/hero-illustration.png" />

        {/* ==============================
            🔥 GOOGLE ANALYTICS (GA4)
            Measurement ID: G-XYD80ZBH20
        =============================== */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-XYD80ZBH20`}></script>
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

        {/* OPEN GRAPH */}
        <meta property="og:title" content="YesViral – Buy Followers & Social Media Growth" />
        <meta
          property="og:description"
          content="Grow your social media instantly with YesViral. Premium, fast, and safe delivery for Instagram, TikTok, YouTube and more."
        />
        <meta property="og:url" content="https://www.yesviral.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="YesViral" />
        <meta property="og:image" content="https://www.yesviral.com/og-image.jpg" />

        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YesViral – Buy Followers & Social Media Growth" />
        <meta
          name="twitter:description"
          content="Premium social media growth trusted by thousands. Fast delivery, high quality, and consistent results."
        />
        <meta name="twitter:image" content="https://www.yesviral.com/og-image.jpg" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* ==============================
            🔥 GLOBAL BRAND SCHEMA (JSON-LD)
        =============================== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "YesViral",
              legalName: "Hyrica Labs",
              url: "https://www.yesviral.com",
              logo: "https://www.yesviral.com/logo.png",
              sameAs: [
                "https://instagram.com/yesviralapp",
                "https://twitter.com/yesviral",
                "https://tiktok.com/@yesviral",
              ],
            }),
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
