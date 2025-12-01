 1 | import type { NextApiRequest, NextApiResponse } from "next";
 2 | import axios from "axios";
 3 |
 4 | const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY || "";
 5 | const FOLLOWIZ_API_URL = "https://api.followiz.com/v2";
 6 |
 7 | const NORMALIZE_SERVICE: Record<string, string> = {
 8 |   Likes: "likes",
 9 |   Followers: "followers",
10 |   Views: "views",
11 |   Subscribers: "subscribers",
12 |   Comments: "comments",
13 | };
14 |
15 | const FOLLOWIZ_SERVICE_IDS = {
16 |   youtube: {
17 |     views: 4023,
18 |     likes: 2450,
19 |     subscribers: 1238,
20 |     followers: null,
21 |     comments: null,
22 |   },
23 |   tiktok: {
24 |     views: 1016,
25 |     likes: 1283,
26 |     followers: 6951,
27 |     subscribers: null,
28 |     comments: null,
29 |   },
30 |   instagram: {
31 |     views: 811,
32 |     likes: 483,
33 |     followers: 511,
34 |     comments: null,
35 |     subscribers: null,
36 |   },
37 | };
38 |
39 | // ⭐ THIS FUNCTION FIXES TYPE ERROR PERMANENTLY
40 | function getServiceId(platform: string, service: string): number | null {
41 |   const plat = platform.toLowerCase();
42 |   const normalized = NORMALIZE_SERVICE[service] || service.toLowerCase();
43 |
44 |   // ⭐ THE FIX — REMOVE TYPE RESTRICTIONS ENTIRELY
45 |   const serviceMap = (FOLLOWIZ_SERVICE_IDS as any)[plat];
46 |   if (!serviceMap) return null;
47 |
48 |   const id = serviceMap[normalized];
49 |   return typeof id === "number" && id > 0 ? id : null;
50 | }
51 |
52 | export default async function handler(
53 |   req: NextApiRequest,
54 |   res: NextApiResponse
55 | ) {
56 |   if (req.method !== "POST") return res.status(405).end();
57 |
58 |   try {
59 |     const { platform, service, quantity, target } = req.body;
60 |
61 |     if (!platform || !service || !quantity || !target) {
62 |       return res.status(400).json({ error: "Missing required fields." });
63 |     }
64 |
65 |     const service_id = getServiceId(platform, service);
66 |     if (!service_id) {
67 |       return res.status(400).json({
68 |         error: `Invalid or unsupported service: ${platform} ${service}`,
69 |       });
70 |     }
71 |
72 |     const params = new URLSearchParams({
73 |       key: FOLLOWIZ_API_KEY,
74 |       action: "add",
75 |       service: String(service_id),
76 |       link: String(target),
77 |       quantity: String(quantity),
78 |     });
79 |
80 |     const response = await axios.post(
81 |       FOLLOWIZ_API_URL,
82 |       params.toString(),
83 |       { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
84 |     );
85 |
86 |     const data = response.data;
87 |
88 |     if (data?.order) {
89 |       return res.status(200).json({
90 |         success: true,
91 |         order_id: data.order,
92 |       });
93 |     }
94 |
95 |     return res.status(400).json({
96 |       error: data?.error || "Followiz returned an unknown error.",
97 |     });
98 |   } catch (error: any) {
99 |     console.error("❌ Followiz Error:", error?.response?.data || error);
100|     return res.status(500).json({
101|       error: "Failed to place Followiz order.",
102|       details: error?.response?.data || error.message,
103|     });
104|   }
105| }
