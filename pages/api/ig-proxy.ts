// pages/api/ig-proxy.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing Instagram post URL." });
  }
  if (!/^https:\/\/(www\.)?instagram\.com\//.test(url)) {
    return res.status(400).json({ error: "Invalid Instagram URL." });
  }

  try {
    // Fetch the IG page HTML (public posts only)
    const igRes = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!igRes.ok) throw new Error("Failed to fetch Instagram post.");

    const html = await igRes.text();
    // Look for video_url in the sharedData JSON
    const sharedDataMatch = html.match(/<script type="application\/ld\+json">(.+?)<\/script>/);
    if (sharedDataMatch) {
      const data = JSON.parse(sharedDataMatch[1]);
      if (data && data.video && data.video.contentUrl) {
        return res.status(200).json({ videoUrl: data.video.contentUrl });
      }
    }

    // fallback: try another way (meta property="og:video")
    const metaMatch = html.match(/<meta property="og:video" content="([^"]+)"\/?>/);
    if (metaMatch && metaMatch[1]) {
      return res.status(200).json({ videoUrl: metaMatch[1] });
    }

    // fallback: look for "video_url":"https...
    const vidUrlMatch = html.match(/"video_url":"([^"]+)"/);
    if (vidUrlMatch && vidUrlMatch[1]) {
      // unescape url
      const videoUrl = vidUrlMatch[1].replace(/\\u0026/g, "&").replace(/\\/g, "");
      return res.status(200).json({ videoUrl });
    }

    return res.status(404).json({ error: "Could not extract video. Make sure it's a public Instagram video post." });
  } catch (err) {
    return res.status(500).json({ error: "Instagram download failed." });
  }
}
