import Head from "next/head";
import { useState, useRef } from "react";
import { Download, Instagram, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

export default function IGDownloader() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"error"|"success">("idle");
  const [error, setError] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDownload = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    setStatus("loading");
    setVideoUrl("");
    // Simple check for IG url
    if (!/^https:\/\/(www\.)?instagram\.com\//.test(url)) {
      setError("Please enter a valid Instagram post URL.");
      setStatus("error");
      return;
    }
    try {
      const res = await fetch(`/api/ig-proxy?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
        setStatus("success");
      } else {
        setError(data.error || "Could not find video.");
        setStatus("error");
      }
    } catch {
      setError("Something went wrong.");
      setStatus("error");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text");
    if (pasted.includes("instagram.com")) setUrl(pasted);
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text");
    if (text.includes("instagram.com")) setUrl(text);
  };

  const handleReset = () => {
    setUrl("");
    setVideoUrl("");
    setError("");
    setStatus("idle");
    inputRef.current?.focus();
  };

  return (
    <>
      <Head>
        <title>Instagram Video Downloader – YesViral</title>
        <meta name="description" content="Download Instagram videos fast, free and easy. YesViral – trusted by 100,000+ creators." />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#f5faff] via-[#e8f3ff] to-[#fff] py-16 px-2">
        <div className="max-w-xl mx-auto bg-white/90 border border-[#CFE4FF] rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center mt-8">
          <div className="flex items-center gap-2 mb-3">
            <Instagram size={34} className="text-[#E1306C]" />
            <span className="text-2xl sm:text-3xl font-extrabold text-[#007BFF] tracking-tight">
              Instagram Video Downloader
            </span>
          </div>
          <p className="mb-5 text-[#444] text-center">
            Download Instagram videos instantly. Paste the post URL below – 100% free, no watermarks. Works for public posts/reels.
          </p>
          <form className="w-full" onSubmit={handleDownload}>
            <div
              className={`
                flex items-center gap-2 rounded-xl bg-white border-2 px-4 py-3 transition
                ${status === "error" ? "border-red-400" : "border-[#CFE4FF] focus-within:border-[#007BFF]"}
              `}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
            >
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-base font-medium"
                placeholder="Paste Instagram video/post link..."
                value={url}
                onChange={e => setUrl(e.target.value)}
                onPaste={handlePaste}
                disabled={status === "loading"}
                autoFocus
              />
              {url && (
                <button type="button" className="text-[#007BFF] font-bold text-sm px-2" onClick={handleReset} tabIndex={-1}>
                  ×
                </button>
              )}
            </div>
            <button
              type="submit"
              className={`
                mt-5 w-full py-3 rounded-xl font-bold text-lg flex justify-center items-center gap-2
                bg-gradient-to-br from-[#007BFF] to-[#35c4ff] hover:from-[#005FCC] hover:to-[#28a3e6] text-white shadow-lg transition
                ${status === "loading" ? "opacity-70 cursor-wait" : ""}
              `}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={22} className="animate-spin" /> Fetching video...
                </>
              ) : (
                <>
                  <Download size={22} /> Download Video
                </>
              )}
            </button>
          </form>
          {/* Error */}
          {status === "error" && error && (
            <div className="w-full mt-5 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center gap-2">
              <AlertTriangle size={18} /> {error}
            </div>
          )}
          {/* Success */}
          {status === "success" && videoUrl && (
            <div className="w-full mt-7 flex flex-col items-center">
              <video
                src={videoUrl}
                controls
                autoPlay
                loop
                className="w-full max-w-[360px] rounded-xl shadow mb-4 border border-[#CFE4FF]"
              />
              <a
                href={videoUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#007BFF] text-white font-bold px-7 py-3 rounded-xl shadow hover:bg-[#005FCC] text-base transition"
              >
                <CheckCircle size={20} /> Download Video
              </a>
              <button className="mt-4 text-[#007BFF] text-sm underline" onClick={handleReset}>
                Download another
              </button>
            </div>
          )}
          <div className="text-xs text-[#888] mt-8 text-center">
            * Works only for public Instagram videos/reels. <br />
            Not affiliated with Instagram. No login required. <br />
            <span className="font-semibold">YesViral.com</span>
          </div>
        </div>
      </div>
    </>
  );
}
