import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Capitol Shine | Professional Cleaning Services in Arlington, VA",
    template: "%s | Capitol Shine",
  },
  description:
    "Arlington's trusted cleaning service — transparent pricing, eco-friendly products, and a team that treats your home like their own.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Capitol Shine",
    images: [
      {
        url: "/updated_logo.png",
        width: 800,
        height: 400,
        alt: "Capitol Shine — Professional Cleaning Services",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
