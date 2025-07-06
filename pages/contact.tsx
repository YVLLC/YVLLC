import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | YesViral</title>
      </Head>
      <main className="container py-10 space-y-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Contact Us</h1>
        <p className="text-center text-[#444]">
          Have a question, issue, or need support? Reach out and we’ll get back to you fast.
        </p>
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full" required />
          <input type="email" placeholder="Your Email" className="w-full" required />
          <textarea placeholder="Your Message" rows={5} className="w-full" required />
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
        <p className="text-sm text-center text-[#888] mt-6">
          For urgent support, email us at <a href="mailto:support@yesviral.com" className="text-[#007BFF]">support@yesviral.com</a>
        </p>
      </main>
    </>
  );
}
