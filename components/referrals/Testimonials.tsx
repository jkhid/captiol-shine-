import Card from "@/components/ui/Card";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "I've referred 4 friends already. The $30 credits basically pay for my monthly cleaning!",
    name: "Sarah K.",
    location: "Clarendon",
  },
  {
    quote: "My neighbor recommended Capitol Shine and now our whole building uses them.",
    name: "James T.",
    location: "Ballston",
  },
  {
    quote: "Best referral program I've used. Simple and actually worth it.",
    name: "Maria L.",
    location: "Crystal City",
  },
];

export default function Testimonials() {
  return (
    <SectionWrapper className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy text-center mb-10">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-charcoal/80 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-navy">
                {t.name}, <span className="font-normal text-charcoal/60">{t.location}</span>
              </p>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
