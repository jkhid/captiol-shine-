import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://capitolshinecleaning.co",
  "name": "Capitol Shine",
  "legalName": "Capitol Home Services LLC",
  "description": "Professional cleaning services in Arlington, VA — residential, Airbnb turnover, commercial, and post-construction cleaning.",
  "url": "https://capitolshinecleaning.co",
  "telephone": "+17033759132",
  "email": "hello@capitolshinecleaning.co",
  "image": "https://capitolshinecleaning.co/updated_logo.png",
  "priceRange": "$$",
  "openingHours": "Mo-Su 00:00-23:59",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1805 Key Blvd",
    "addressLocality": "Arlington",
    "addressRegion": "VA",
    "postalCode": "22201",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.8948,
    "longitude": -77.0845,
  },
  "areaServed": [
    { "@type": "City", "name": "Arlington", "sameAs": "https://en.wikipedia.org/wiki/Arlington,_Virginia" },
    { "@type": "City", "name": "McLean",    "sameAs": "https://en.wikipedia.org/wiki/McLean,_Virginia" },
    { "@type": "City", "name": "Alexandria","sameAs": "https://en.wikipedia.org/wiki/Alexandria,_Virginia" },
    { "@type": "City", "name": "Falls Church","sameAs": "https://en.wikipedia.org/wiki/Falls_Church,_Virginia" },
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cleaning Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Standard House Cleaning",   "description": "Recurring residential cleaning — weekly or biweekly." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Deep House Cleaning",       "description": "Top-to-bottom reset including appliances, baseboards, and fixtures." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Move-In / Move-Out Cleaning","description": "Thorough cleaning of every cabinet, drawer, appliance, and surface." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Airbnb Turnover Cleaning",  "description": "Fast, reliable cleaning between guests — same-day availability." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Office Cleaning", "description": "Recurring cleaning for offices and retail spaces in Northern Virginia." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Post-Construction Cleaning", "description": "Debris removal, dust, and residue cleanup after construction or renovation." } },
    ],
  },
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
