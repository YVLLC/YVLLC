import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | YesViral</title>
      </Head>
      <main className="container py-10 space-y-6">
        <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
        <p>
          YesViral values your privacy. We do not collect sensitive personal information or share your data with third parties. All order data is used solely for processing and support.
        </p>
        <p>
          Payment details are processed securely through Stripe. We never store your credit card information.
        </p>
        <p>
          By using our service, you agree to the collection of basic technical data for site optimization and analytics.
        </p>
        <p>
          You may contact us at any time regarding your data or to request deletion.
        </p>
      </main>
    </>
  );
}
