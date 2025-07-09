import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Loader2, Download, Instagram } from "lucide-react";

export default function IGDownloader() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault();
    setVideoUrl(null);
    setCover(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/igdownloader?url=${encodeURIComponent(input)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch video.");
      setVideoUrl(json.videoUrl);
      setCover(json.cover);
    } catch (err: any) {
      setError(err.message || "Failed to fetch video.");
    }
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Instagram Video Downloader – YesViral</title>
        <meta name="description" content="Download Instagram Reels, Posts, and Videos easily for free." />
      </Head>
      <main className="min-h-screen py-16 px-4 bg-gradient-to-t from-[#E6F0FF] via-[#F5FAFF] to-[#fff]">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-[#CFE4FF] p-8 text-center">
          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center justify-center bg-[#E1306C]/10 rounded-full w-16 h-16 mb-2">
              <Instagram size={38} className="text-[#E1306C]" />
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#007BFF] mb-3">Instagram Video Downloader</h1>
          <p className="mb-7 text-[#444]">Download Reels, Videos, or Posts. Paste the public Instagram link below:</p>
          <form onSubmit={handleDownload} className="flex gap-2 mb-4">
            <input
              required
              type="url"
              placeholder="Paste Instagram video/reel/post URL"
              className="flex-1 px-4 py-3 rounded-lg border border-[#CFE4FF] bg-white text-base focus:outline-[#007BFF]"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#007BFF] text-white font-bold hover:bg-[#005FCC] transition flex items-center gap-1"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />} Download
            </button>
          </form>
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
          {videoUrl && (
            <div className="mt-7">
              {cover && (
                <Image
                  src={cover}
                  alt="IG Video Cover"
                  width={420}
                  height={420}
                  className="rounded-lg mx-auto mb-3"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
              <video src={videoUrl} controls autoPlay loop className="rounded-xl w-full max-w-lg mx-auto mb-4 mt-2 shadow" />
              <a
                href={videoUrl}
                download
                className="inline-flex items-center gap-2 bg-[#007BFF] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#005FCC] transition mt-4"
              >
                <Download size={20} /> Download Video
              </a>
            </div>
          )}
          <div className="mt-10 text-xs text-[#888]">
            For public videos/reels only. Not affiliated with Instagram.
          </div>
        </div>
      </main>
    </>
  );
}
