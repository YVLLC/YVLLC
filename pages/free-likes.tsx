import Head from "next/head";
import FreeLikesTrial from "@/components/FreeLikesTrial";
export default function FreeLikesPage() {
  return (
    <>
      <Head>
        <title>Free Instagram Likes – YesViral</title>
        <meta
          name="description"
          content="Claim your free 5 Instagram likes trial. No login required, no payment, no strings attached — just enter your username and get started!"
        />
      </Head>

      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-4">Get Free Instagram Likes</h1>
        <p className="text-center text-[#444] mb-8">
          We’re confident you’ll love our services — that’s why your first 5 likes are completely free.
        </p>

        <FreeLikesTrial />
      </main>
    </>
  );
}
