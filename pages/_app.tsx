import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>YesViral – Buy Followers & Social Media Growth</title>
        <meta
          name="description"
          content="YesViral is your #1 source to grow on Instagram, TikTok, YouTube & more. Fast delivery, real results, and premium support."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="min-h-screen bg-white">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
