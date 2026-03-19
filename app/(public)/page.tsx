import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyUs from "@/components/home/WhyUs";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "House Cleaning Service in Arlington, VA | Capitol Shine",
  description:
    "Arlington's trusted house cleaning service. Residential, Airbnb turnover, commercial, and post-construction cleaning. Transparent pricing, eco-friendly products, licensed & insured.",
  openGraph: {
    title: "House Cleaning Service in Arlington, VA | Capitol Shine",
    description:
      "Arlington's trusted house cleaning service. Transparent pricing, eco-friendly, licensed & insured.",
    url: "https://capitolshinecleaning.co",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ServicesGrid />
      <WhyUs />
      <CTABanner />
    </>
  );
}
