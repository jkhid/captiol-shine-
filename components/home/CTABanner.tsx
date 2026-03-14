import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
          Ready for a cleaner home?
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Book your first cleaning today and get <span className="text-gold font-semibold">$30 off</span>.
        </p>
        <div className="mt-8">
          <Button href="/book" variant="gold" className="text-base px-8 py-4">
            Claim Your Discount
          </Button>
        </div>
      </div>
    </section>
  );
}
