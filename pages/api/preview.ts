// pages/api/preview.ts
import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { platform, target } = req.query;

    if (!platform || !target)
      return res.status(400).json({ error: "Missing platform or target" });

    const decoded = decodeURIComponent(target as string);

    // ---------------------------
    // YOUTUBE (thumbnail easy)
    // ---------------------------
    if (platform === "youtube") {
      const id = decoded.match(/v=([^&]+)/)?.[1];
      if (!id) return res.status(400).json({ error: "Invalid YouTube link" });

      return res.json({
        ok: true,
        type: "video",
        image: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      });
    }

    // ---------------------------
    // INSTAGRAM SCRAPER
    // ---------------------------
    if (platform === "instagram") {
      if (decoded.includes("instagram.com/p/")) {
        // POST THUMBNAIL
        const html = await fetch(decoded).then((r) => r.text());
        const $ = cheerio.load(html);
        const json = $('script[type="application/ld+json"]').first().html();
        if (!json) return res.json({ ok: false });

        const data = JSON.parse(json);
        return res.json({
          ok: true,
          type: "post",
          image: data.thumbnailUrl || data.image || null,
        });
      } else {
        // PROFILE IMAGE
        const profileUrl = `https://www.instagram.com/${decoded}/`;
        const html = await fetch(profileUrl).then((r) => r.text());
        const $ = cheerio.load(html);

        const scripts: string[] = [];
        $("script").each((_, el) => {
          const content = $(el).html();
          if (content?.includes("profile_pic_url_hd")) scripts.push(content);
        });

        if (!scripts.length) return res.json({ ok: false });

        const jsonStr = scripts[0].match(/{.*}/s)?.[0];
        if (!jsonStr) return res.json({ ok: false });

        const data = JSON.parse(jsonStr);
        const image = data?.entry_data?.ProfilePage?.[0]?.graphql?.user?.profile_pic_url_hd;

        return res.json({
          ok: true,
          type: "profile",
          image: image || null,
        });
      }
    }

    // ---------------------------
    // TIKTOK SCRAPER (videos only)
    // ---------------------------
    if (platform === "tiktok") {
      const html = await fetch(decoded).then((r) => r.text());
      const $ = cheerio.load(html);

      const ogImg = $('meta[property="og:image"]').attr("content");
      return res.json({
        ok: true,
        type: "video",
        image: ogImg || null,
      });
    }

    return res.status(400).json({ error: "Invalid platform" });
  } catch (err) {
    console.log("SCRAPER ERROR:", err);
    return res.status(500).json({ ok: false, error: "Failed to scrape" });
  }
}
