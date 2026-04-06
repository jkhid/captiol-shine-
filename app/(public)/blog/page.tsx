import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Cleaning Tips & Guides — Capitol Shine",
  description:
    "Practical cleaning advice for homeowners, renters, and businesses in Arlington and Northern Virginia. Checklists, how-to guides, and tips from the Capitol Shine team.",
  openGraph: {
    title: "Cleaning Tips & Guides | Capitol Shine",
    description:
      "Practical cleaning advice for homeowners, renters, and businesses in Arlington and Northern Virginia.",
    url: "https://capitolshinecleaners.com/blog",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <>
      <section className="bg-off-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
              Cleaning tips and guides.
            </h1>
            <p className="mt-4 text-lg text-charcoal/70">
              Practical advice for homeowners, renters, and businesses in Arlington and Northern Virginia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-charcoal/50">No posts yet — check back soon.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {posts.map((post) => (
                <article key={post.slug} className="py-10 group">
                  <div className="flex items-center gap-4 text-xs text-charcoal/40 mb-3">
                    <span className="bg-navy/5 text-navy font-medium px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-navy mb-2 group-hover:text-navy/70 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-charcoal/60 mb-4 leading-relaxed">{post.description}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-navy/70 transition-colors"
                  >
                    Read more <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
