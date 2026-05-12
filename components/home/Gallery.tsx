import Image from "next/image";
import Link from "next/link";

const PHOTOS = [
  { src: "/marketing_photos/web/gallery_thumbnails/kitchen_galley_view.jpg",     alt: "Bright galley kitchen after a Capitol Shine clean" },
  { src: "/marketing_photos/web/gallery_thumbnails/bath_upper_full_room.jpg",    alt: "Spotless upper bathroom with polished fixtures" },
  { src: "/marketing_photos/web/gallery_thumbnails/kitchen_sink_counter.jpg",    alt: "Detailed kitchen sink and counter after cleaning" },
  { src: "/marketing_photos/web/gallery_thumbnails/bath_upper_vanity_gold.jpg",  alt: "Bathroom vanity polished to a streak-free shine" },
  { src: "/marketing_photos/web/gallery_thumbnails/bath_lower_shower.jpg",       alt: "Tile shower scrubbed and detailed" },
  { src: "/marketing_photos/web/gallery_thumbnails/bedroom_empty_blue.jpg",      alt: "Fresh bedroom ready for guests" },
];

export default function Gallery() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Our work</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight">
              Recent cleans,<br />
              <em className="italic">unedited.</em>
            </h2>
          </div>
          <p className="text-muted text-base leading-relaxed max-w-sm">
            A small sample from homes across Arlington. The same finish you can expect when our team
            visits yours.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[3/2] overflow-hidden rounded-xl bg-paper"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/book?promo=FIRST30"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
          >
            Book the same finish for your home
            <span aria-hidden>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
