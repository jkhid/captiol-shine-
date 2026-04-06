import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { getPost, getPublishedPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `https://capitolshinecleaners.com/blog/${post.slug}`;
  return {
    title: `${post.title} — Capitol Shine`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post || !post.published) notFound();

  const html = marked(post.content) as string;

  return (
    <>
      {/* Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            publisher: {
              "@type": "Organization",
              name: "Capitol Shine",
              url: "https://capitolshinecleaners.com",
            },
          }),
        }}
      />

      <article className="bg-off-white min-h-screen">
        {/* Header */}
        <div className="bg-navy py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={14} /> All posts
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 mb-5">
              <span className="bg-white/10 text-white/70 font-medium px-2.5 py-1 rounded-full">
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
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-snug">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-navy prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-charcoal/75 prose-p:leading-relaxed prose-p:mb-5
              prose-li:text-charcoal/75
              prose-strong:text-navy prose-strong:font-semibold
              prose-ul:my-4 prose-li:my-1
              prose-a:text-navy prose-a:underline hover:prose-a:text-navy/70"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* CTA */}
          <div className="mt-16 bg-navy rounded-2xl p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Ready for a cleaner home?
            </h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Book online in 60 seconds. No contracts, no hidden fees, and $30 off your first cleaning with code FIRST30.
            </p>
            <Button href="/book?promo=FIRST30" variant="gold">
              Book a Cleaning
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
