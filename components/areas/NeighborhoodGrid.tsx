import { NEIGHBORHOODS } from "@/lib/neighborhoods";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { MapPin } from "lucide-react";

export default function NeighborhoodGrid() {
  return (
    <SectionWrapper className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEIGHBORHOODS.map((n) => (
            <Card key={n.name} hover>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-navy">{n.name}</h3>
                  <p className="text-sm text-charcoal/70 mt-1">{n.description}</p>
                  <Button
                    href="/book"
                    variant="outline"
                    className="mt-3 text-xs px-4 py-2"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-10 text-center text-charcoal/60 text-sm">
          Don&apos;t see your area? Contact us — we may still be able to help.
        </p>
      </div>
    </SectionWrapper>
  );
}
