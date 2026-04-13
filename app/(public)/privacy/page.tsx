import type { Metadata } from "next";

const URL = "https://capitolshinecleaners.com/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy | Capitol Shine",
  description:
    "How Capitol Shine collects, uses, and protects your personal information. Covers website usage, booking data, advertising, and your rights under Virginia law.",
  alternates: { canonical: URL },
};

const sections = [
  {
    title: "1. Who We Are",
    content: `Capitol Home Services LLC ("Capitol Shine," "we," "us," "our") operates the website capitolshinecleaners.com and provides residential and commercial cleaning services in Northern Virginia.

Capitol Home Services LLC
1805 Key Blvd, Arlington, VA 22201
(703) 375-9132
capitolhomeservices1@gmail.com`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect the following categories of information:

Contact information: name, email address, phone number, and mailing or service address, provided when you book a cleaning, submit a contact form, or call us.

Service details: home size, service type, access instructions, scheduling preferences, and special requests you share during intake or booking.

Payment information: credit card or payment details processed through our third-party payment processor. We do not store full card numbers on our servers.

Website usage data: IP address, browser type, device type, pages visited, and referring URL, collected automatically through cookies and similar technologies.

Advertising data: information collected by Google Ads, Google Analytics, and Meta (Facebook) tracking pixels when you interact with our ads or website. This may include ad click data, conversion events, and audience segments.

Communications: messages you send us via email, text, phone, or online forms.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information we collect to:

Provide, schedule, and deliver cleaning services you request.

Communicate with you about appointments, confirmations, reminders, and follow-ups.

Process payments and send invoices.

Respond to questions, complaints, and support requests.

Improve our website, services, and customer experience.

Run and measure advertising campaigns on Google Ads and Meta (Facebook/Instagram).

Send occasional marketing communications, such as promotions or service updates, if you have opted in. You may unsubscribe at any time.

Comply with legal obligations and protect our rights.`,
  },
  {
    title: "4. Cookies and Tracking Technologies",
    content: `Our website uses cookies and similar technologies to:

Enable basic website functionality (session cookies).

Analyze traffic and usage through Google Analytics.

Track ad conversions and optimize advertising through Google Ads and Meta Pixel.

You can control cookies through your browser settings. Disabling cookies may affect website functionality. We honor Do Not Track signals where technically feasible.`,
  },
  {
    title: "5. Third-Party Services",
    content: `We use the following third-party services that may receive or process your data:

Google Analytics — website traffic analysis
Google Ads — advertising and conversion tracking
Meta (Facebook/Instagram) Pixel — advertising and conversion tracking
Stripe or similar — payment processing
Email and SMS platforms — appointment confirmations and marketing

Each third-party service operates under its own privacy policy. We do not control and are not responsible for their data practices.`,
  },
  {
    title: "6. How We Share Your Information",
    content: `We do not sell your personal information to third parties.

We may share your information with:

Service providers: third-party vendors who help us operate our business (payment processors, scheduling tools, email/SMS platforms), only as needed to perform their functions.

Advertising partners: Google and Meta receive anonymized or pseudonymized data for ad targeting and conversion measurement.

Legal requirements: we may disclose information if required by law, subpoena, court order, or to protect our rights, safety, or property.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information for as long as necessary to provide services, maintain our business records, comply with legal obligations, and resolve disputes. Typically this means:

Active client data: retained while you are an active client and for 3 years after your last service.

Payment records: retained as required by tax and accounting regulations.

Website analytics: aggregated data is retained indefinitely; individual session data is governed by the respective platform's retention policies.

You may request deletion of your data at any time (see Section 9).`,
  },
  {
    title: "8. Data Security",
    content: `We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These include encrypted connections (HTTPS), secure payment processing, and access controls on client data.

No method of transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.`,
  },
  {
    title: "9. Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal information:

Access: request a copy of the personal information we hold about you.

Correction: request that we correct inaccurate or incomplete information.

Deletion: request that we delete your personal information, subject to legal retention requirements.

Opt-out of marketing: unsubscribe from promotional emails or texts at any time using the unsubscribe link or by contacting us.

Opt-out of tracking: manage cookie preferences through your browser settings.

To exercise any of these rights, contact us at capitolhomeservices1@gmail.com or (703) 375-9132. We will respond within 30 days.`,
  },
  {
    title: "10. Children's Privacy",
    content: `Our services and website are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a minor, please contact us and we will promptly delete it.`,
  },
  {
    title: "11. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our website or services after changes are posted constitutes acceptance of the revised policy.

For active clients, material changes will be communicated via email at least 30 days before taking effect.`,
  },
  {
    title: "12. Contact Us",
    content: `If you have questions about this Privacy Policy or how we handle your data, contact us at:

Capitol Home Services LLC
1805 Key Blvd, Arlington, VA 22201
(703) 375-9132
capitolhomeservices1@gmail.com`,
  },
];

export default function PrivacyPage() {
  return (
    <section className="bg-off-white py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mb-2">
          Privacy Policy
        </h1>
        <p className="text-charcoal/50 text-sm mb-2">Capitol Home Services LLC — Residential &amp; Commercial Cleaning Services</p>
        <p className="text-charcoal/50 text-sm mb-10">Effective Date: April 2026</p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-base font-bold text-navy mb-2">{section.title}</h2>
              <div className="space-y-3">
                {section.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm text-charcoal/75 leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
