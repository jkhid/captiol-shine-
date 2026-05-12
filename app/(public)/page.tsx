import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import Reviews from "@/components/home/Reviews";
import WhyUs from "@/components/home/WhyUs";
import Gallery from "@/components/home/Gallery";
import CTABanner from "@/components/home/CTABanner";

const URL = "https://capitolshinecleaners.com";

export const metadata: Metadata = {
  title: "House Cleaning Service in Arlington, VA | Capitol Shine",
  description:
    "Arlington's trusted house cleaning service. Residential, Airbnb turnover, commercial, and post-construction cleaning. Transparent pricing, eco-friendly products, licensed & insured.",
  openGraph: {
    title: "House Cleaning Service in Arlington, VA | Capitol Shine",
    description:
      "Arlington's trusted house cleaning service. Transparent pricing, eco-friendly, licensed & insured.",
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <HowItWorks />
      <Gallery />
      <Reviews />
      <WhyUs />
      <CTABanner />
    </>
  );
}
