import { MetadataRoute } from "next";

const BASE = "https://capitolshine.co";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/pricing`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/areas`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/book`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/referrals`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/terms`,         lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ];
}
