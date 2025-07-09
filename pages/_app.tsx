import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Add more routes here if you want to hide header/footer elsewhere!
  const hideHeaderFooter = ["/dashboard"];
  const shouldHide = hideHeaderFooter.some((route) =>
    router.pathname.startsWith(route)
  );

  return (
    <>
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
        {/* You can add more meta here if needed */}
      </Head>
      {!shouldHide && <Header />}
      <main className="min-h-screen bg-white">
        <Component {...pageProps} />
      </main>
      {!shouldHide && <Footer />}
    </>
  );
}
