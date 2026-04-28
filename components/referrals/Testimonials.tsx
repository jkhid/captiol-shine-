import { SectionIntro } from "@/components/public/WavePage";
import { CUSTOMER_REVIEWS } from "@/lib/reviews";

const testimonials = [CUSTOMER_REVIEWS[3], CUSTOMER_REVIEWS[2], CUSTOMER_REVIEWS[1]];

export default function Testimonials() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Client Reviews"
          title={
            <>
              Real clients.
              <br />
              <em className="italic">Real reactions.</em>
            </>
          }
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex h-full flex-col rounded-[22px] border border-navy/10 bg-white p-7 shadow-[0_24px_60px_-40px_rgba(23,36,63,0.4)]"
            >
              <p className="text-sm tracking-[0.35em] text-gold">★★★★★</p>
              <p className="mt-5 font-display text-2xl font-light leading-[1.3] tracking-tight text-ink">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="mt-auto border-t border-navy/8 pt-5">
                <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                <p className="mt-1 text-sm text-muted">{testimonial.serviceLabel} · {testimonial.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
