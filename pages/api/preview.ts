import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

async function safeFetch(url: string) {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const html = await res.text();
    return html;
  } catch (e) {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { platform, target } = req.query;

    if (!platform || !target)
      return res.status(400).json({ ok: false, error: "Missing platform or target" });

    const decoded = decodeURIComponent(target as string);

    // ---------------------------
    // YOUTUBE THUMBNAIL
    // ---------------------------
    if (platform === "youtube") {
      const id =
        decoded.match(/v=([^&]+)/)?.[1] ||
        decoded.match(/youtu\.be\/([^?]+)/)?.[1];

      if (!id) return res.json({ ok: false });

      return res.json({
        ok: true,
        type: "video",
        image: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      });
    }

    // ---------------------------
    // INSTAGRAM
    // ---------------------------
    if (platform === "instagram") {
      // INSTAGRAM POST
      if (decoded.includes("instagram.com/p/") || decoded.includes("instagram.com/reel/")) {
        const html = await safeFetch(decoded);
        if (!html) return res.json({ ok: false });

        const $ = cheerio.load(html);
        const og = $('meta[property="og:image"]').attr("content");

        return res.json({
          ok: true,
          type: "post",
          image: og || null,
        });
      }

      // INSTAGRAM PROFILE
      const url = `https://www.instagram.com/${decoded}/`;
      const html = await safeFetch(url);
      if (!html) return res.json({ ok: false });

      const $ = cheerio.load(html);

      // Try normal meta
      const ogImg = $('meta[property="og:image"]').attr("content");
      if (ogImg)
        return res.json({
          ok: true,
          type: "profile",
          image: ogImg,
        });

      // Try embedded JSON
      const script = $('script[type="application/ld+json"]').html();
      if (script) {
        try {
          const json = JSON.parse(script);
          return res.json({
            ok: true,
            type: "profile",
            image: json.image || null,
          });
        } catch {}
      }

      return res.json({ ok: false });
    }

    // ---------------------------
    // TIKTOK THUMBNAIL
    // ---------------------------
    if (platform === "tiktok") {
      const html = await safeFetch(decoded);
      if (!html) return res.json({ ok: false });

      const $ = cheerio.load(html);

      const ogImg =
        $('meta[property="og:image"]').attr("content") ||
        $('meta[property="twitter:image"]').attr("content");

      return res.json({
        ok: true,
        type: "video",
        image: ogImg || null,
      });
    }

    return res.json({ ok: false, error: "Unsupported platform" });
  } catch (err) {
    console.log("PREVIEW ERROR:", err);
    return res.json({ ok: false });
  }
}
