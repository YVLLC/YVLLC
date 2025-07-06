import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | YesViral</title>
      </Head>
      <main className="container py-10 space-y-6">
        <h1 className="text-3xl font-bold text-center">Terms & Conditions</h1>
        <p>
          By using YesViral, you agree to abide by these terms. Our services are intended solely for lawful use. You agree not to use our platform for fraudulent or abusive purposes.
        </p>
        <p>
          YesViral does not guarantee specific results, such as follower retention, or continued platform engagement. We are not liable for any account action taken by social media platforms.
        </p>
        <p>
          All payments are final. Chargebacks or unauthorized disputes will result in account suspension and permanent blacklisting.
        </p>
        <p>
          We reserve the right to modify these terms at any time without prior notice.
        </p>
      </main>
    </>
  );
}
