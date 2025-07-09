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
      initialPlatform={platform}
      initialService={service}
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
        <title>YesViral – Buy Followers & Social Media Growth</title>
        <meta
          name="description"
          content="YesViral is your #1 source to grow on Instagram, TikTok, YouTube & more. Fast delivery, real results, and premium support."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      {!shouldHide && <Header />}
      <main className="min-h-screen bg-white">
        <Component {...pageProps} />
        <OrderModalWrapper />
      </main>
      {/* CHANGED: pass modal to Footer */}
      {!shouldHide && <FooterWithOrderModal />}
    </OrderModalProvider>
  );
}
