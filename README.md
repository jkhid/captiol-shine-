# Capitol Shine

Premium residential cleaning service website built with Next.js 14, TypeScript, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/app
  /layout.tsx          - Shared nav + footer, fonts, metadata
  /page.tsx            - Home page
  /pricing/page.tsx    - Services & pricing with interactive calculator
  /areas/page.tsx      - Service areas with Leaflet map
  /referrals/page.tsx  - Referral program
  /book/page.tsx       - Multi-step booking wizard
/components
  /ui                  - Reusable primitives (Button, Card, SectionWrapper, Logo)
  /nav                 - Navbar and Footer
  /home                - Hero, HowItWorks, ServicesGrid, WhyUs, CTABanner
  /pricing             - PricingCalculator, PricingCard, AddOns, AirbnbPricing, FAQ
  /areas               - ServiceMap (Leaflet), NeighborhoodGrid, WaitlistForm
  /referrals           - ReferralForm, HowItWorksReferral, Testimonials
  /book                - BookingWizard, StepIndicator, ServiceSelect, HomeDetails, Schedule, ContactConfirm
/lib
  /pricing-data.ts     - All pricing as typed constants (single source of truth)
  /neighborhoods.ts    - Neighborhood names, coordinates, descriptions
  /constants.ts        - Company info, contact details, service descriptions
```

## Backend Integration Points

Search for `TODO` comments in the codebase for integration points:

- **Booking form submission** (`components/book/BookingWizard.tsx`) - Send to API, trigger confirmation email
- **Referral form** (`components/referrals/ReferralForm.tsx`) - Generate real referral links, store in database
- **Waitlist form** (`components/areas/WaitlistForm.tsx`) - Store email for expansion notifications

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- react-leaflet (OpenStreetMap)
- lucide-react (icons)
- Google Fonts (Inter + Playfair Display)
