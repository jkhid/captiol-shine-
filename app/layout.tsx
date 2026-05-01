import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "optional",
  style: ["normal", "italic"],
  weight: ["300", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://capitolshinecleaners.com"),
  title: {
    default: "Capitol Shine | Professional Cleaning Services in Arlington, VA",
    template: "%s",
  },
  description:
    "Arlington's trusted cleaning service — transparent pricing, eco-friendly products, and a team that treats your home like their own.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Capitol Shine",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capitol Shine — House Cleaning in Northern Virginia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@capitolshine",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased bg-paper">
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18020726483"
          strategy="lazyOnload"
        />
        <Script id="google-ads" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18020726483');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            (function() {
              var loaded = false;
              var events = ['scroll','touchstart','click','keydown','mousemove'];
              function loadPixel() {
                if (loaded) return;
                loaded = true;
                events.forEach(function(e) { window.removeEventListener(e, loadPixel); });
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '2193863041416882');
                fbq('track', 'PageView');
              }
              events.forEach(function(e) {
                window.addEventListener(e, loadPixel, { once: true, passive: true });
              });
              setTimeout(loadPixel, 5000);
            })();
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2193863041416882&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
