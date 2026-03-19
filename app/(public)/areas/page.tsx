import type { Metadata } from "next";
import dynamic from "next/dynamic";
import NeighborhoodGrid from "@/components/areas/NeighborhoodGrid";
import WaitlistForm from "@/components/areas/WaitlistForm";

const ServiceMap = dynamic(() => import("@/components/areas/ServiceMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] rounded-xl bg-gray-200 flex items-center justify-center text-charcoal/50">
      Loading map...
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Service Areas — Arlington, McLean, Alexandria & Northern Virginia",
  description:
    "Capitol Shine provides professional cleaning in Arlington, McLean, Alexandria, Falls Church, Rosslyn, Clarendon, Ballston, Crystal City, and surrounding Northern Virginia neighborhoods.",
  openGraph: {
    title: "Service Areas — Arlington, McLean, Alexandria & Northern Virginia | Capitol Shine",
    description:
      "Professional cleaning in Arlington, McLean, Alexandria, Falls Church, and surrounding Northern Virginia communities.",
    url: "https://capitolshinecleaners.com/areas",
  },
};

export default function AreasPage() {
  return (
    <>
      <section className="bg-off-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
              Proudly serving Arlington and Northern Virginia.
            </h1>
            <p className="mt-4 text-lg text-charcoal/70">
              We clean homes across Arlington County and surrounding communities.
            </p>
          </div>
          <ServiceMap />
        </div>
      </section>
      <NeighborhoodGrid />
      <WaitlistForm />
    </>
  );
}
