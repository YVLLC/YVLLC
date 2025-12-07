// pages/instagram-followers.tsx
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/buy-instagram-followers",
      permanent: true, // 301 for SEO
    },
  };
};

export default function InstagramFollowersRedirectPage() {
  // This will almost never render because of the redirect,
  // but is required for Next.js page export.
  return null;
}
