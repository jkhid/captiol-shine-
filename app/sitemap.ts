import { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";

const BASE = "https://capitolshinecleaners.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                               lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/pricing`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/areas`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/book`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/faq`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/deep-cleaning`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/move-out-cleaning`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/airbnb-cleaning`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/commercial-cleaning`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/post-construction-cleaning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/checklists`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/checklists/standard-cleaning`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/checklists/deep-cleaning`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/checklists/move-out-cleaning`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,                     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/referrals`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/terms`,                    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
