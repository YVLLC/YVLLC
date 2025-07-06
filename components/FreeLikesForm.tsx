import { useState } from "react";
import axios from "axios";

export default function FreeLikesForm() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "already">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await axios.post("/api/free-likes", { username });
      if (res.data.status === "already_used") {
        setStatus("already");
        setMessage("You’ve already used your free likes trial.");
      } else {
        setStatus("success");
        setMessage("✅ 5 free likes sent! Please allow a few minutes for delivery.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="bg-[#f9f9f9] py-16 px-4 border-t border-gray-200">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Get 5 Free Instagram Likes</h2>
        <p className="text-[#444] mb-6">No strings attached. One-time use only.</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Instagram Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full sm:w-auto border border-[#CFE4FF] px-4 py-2 rounded-md focus:outline-none focus:border-[#0056B3]"
            required
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Get Likes"}
          </button>
        </form>

        {status !== "idle" && (
          <p
            className={`mt-4 text-sm ${
              status === "success"
                ? "text-green-600"
                : status === "error"
                ? "text-red-600"
                : status === "already"
                ? "text-yellow-600"
                : ""
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
