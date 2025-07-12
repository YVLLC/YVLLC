import Head from "next/head";

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How It Works – YesViral</title>
        <meta
          name="description"
          content="Learn how YesViral delivers real Followers, Likes, and Views to your social media profiles in 3 simple steps."
        />
      </Head>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-4">How It Works</h1>
        <p className="text-center text-[#444] mb-12">
          Getting real social media growth with YesViral is Simple, Fast, and Secure.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {/* Step 1 */}
          <div className="text-center">
            <div className="text-5xl mb-4 text-[#007BFF]">1</div>
            <h2 className="text-lg font-semibold mb-2">Choose a Service</h2>
            <p className="text-[#444]">
              Select from a wide range of services like Followers, Likes, or Views across Instagram, TikTok, YouTube, and more.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="text-5xl mb-4 text-[#007BFF]">2</div>
            <h2 className="text-lg font-semibold mb-2">Enter Your Info</h2>
            <p className="text-[#444]">
              Just provide your username or a post link — No password ever required. All orders are 100% safe and encrypted.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="text-5xl mb-4 text-[#007BFF]">3</div>
            <h2 className="text-lg font-semibold mb-2">Watch Results Happen</h2>
            <p className="text-[#444]">
              Orders are delivered fast and naturally. You can track your status anytime and contact support if needed.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
