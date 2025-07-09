// /pages/api/ig-proxy.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url || typeof url !== "string") return res.status(400).json({ error: "Missing IG URL" });

  try {
    // Instagram video pages require a user agent
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
      },
    });

    // Use cheerio to parse and extract video URL from meta property
    const $ = cheerio.load(data);
    const videoUrl =
      $('meta[property="og:video"]').attr("content") ||
      $('meta[property="og:video:secure_url"]').attr("content");

    if (!videoUrl) {
      return res.status(404).json({ error: "No video found at this URL (maybe private, story, or IGTV not supported)" });
    }

    // Get cover image for preview
    const cover = $('meta[property="og:image"]').attr("content") || "";

    return res.status(200).json({ videoUrl, cover });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch or parse Instagram video." });
  }
}
