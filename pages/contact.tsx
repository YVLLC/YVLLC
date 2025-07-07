import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | YesViral</title>
        <meta name="description" content="Need help? Contact YesViral's support team and get fast assistance with your orders or questions." />
      </Head>

      <main className="bg-[#F9FAFB] min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-extrabold text-center text-[#007BFF] mb-6">
            Contact YesViral Support
          </h1>
          <p className="text-center text-[#444] mb-8">
            Have questions or need help? Our team is here for you 7 days a week.
            Fill out the form below or email us directly at{" "}
            <a href="mailto:support@yesviral.com" className="text-[#007BFF] font-medium underline">support@yesviral.com</a>.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#111] mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-[#CFE4FF] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111] mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-[#CFE4FF] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111] mb-1">Your Message</label>
              <textarea
                rows={5}
                placeholder="How can we help you?"
                className="w-full border border-[#CFE4FF] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#007BFF] hover:bg-[#005FCC] text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Send Message
            </button>
          </form>

          <div className="text-center text-sm text-[#888] mt-10">
            Response time: <span className="font-medium text-[#111]">under 24 hours</span>
          </div>
        </div>
      </main>
    </>
  );
}
