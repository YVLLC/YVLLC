import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) {
        router.push("/login");
        return;
      }

      setUserEmail(session.user.email || "");
    };

    fetchUser();
  }, [router]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userEmail}</h1>
      <p className="text-[#444]">This is your YesViral user dashboard. We'll add order history, profile settings, and more here soon.</p>
    </main>
  );
}
