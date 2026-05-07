import type { Metadata } from "next";
import Link from "next/link";

const URL = "https://capitolshinecleaners.com/service-agreement";

export const metadata: Metadata = {
  title: "Residential Cleaning Service Agreement | Capitol Shine",
  description:
    "The full service agreement for residential cleaning bookings with Capitol Shine. Cancellation policy, satisfaction guarantee, liability, and access terms in plain language.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Residential Cleaning Service Agreement | Capitol Shine",
    description:
      "The terms governing residential cleaning bookings with Capitol Shine — what we cover, what we don't, and how cancellations, access, and damage are handled.",
    url: URL,
  },
};

const sections = [
  {
    title: "1. Parties and Acceptance",
    content: `This Residential Cleaning Service Agreement (the "Agreement") is between Capitol Home Services LLC, doing business as Capitol Shine ("Company," "we," "us"), and the residential client identified during booking ("Client," "you").

By booking a residential cleaning service through our website, by phone, or in person, you confirm that you have read this Agreement and agree to be bound by its terms. This Agreement applies to all residential bookings, including standard, deep, and move-in or move-out cleaning. Commercial, Airbnb turnover, and post-construction services are governed by separate written agreements.

This Agreement is entered into in addition to, and incorporates by reference, our Terms of Service and Privacy Policy as posted at capitolshinecleaners.com.`,
  },
  {
    title: "2. Services Provided",
    content: `We provide professional residential cleaning services in Arlington, Virginia and surrounding Northern Virginia communities. The specific scope of work for each visit is defined by the service type you selected at booking (standard, deep, or move-in/move-out), the published checklist for that service, and any additional add-ons or special instructions captured during intake.

We provide all standard cleaning supplies, equipment, and EPA Safer Choice certified products required to perform the service. If you have product preferences, allergies, or sensitivities, you must communicate these before the visit. If you ask us to use client-supplied products or equipment, we will make reasonable efforts to accommodate, but we are not responsible for results or damage caused by non-standard products.

Services we do not provide as part of a residential booking include: biohazard cleanup, pest or rodent remediation, exterior windows above the first floor, heavy-item moving, mold remediation, pet waste cleanup outside designated areas, and any task that requires equipment we do not carry. If your home has conditions outside our standard scope, we will notify you on arrival and either adjust the visit or reschedule.`,
  },
  {
    title: "3. Service Schedule and Recurring Plans",
    content: `One-time cleaning visits are scheduled at the date and time selected at booking, subject to availability and confirmation. Arrival times are estimated windows; we will notify you as soon as practicable if a significant delay occurs.

Recurring service plans (weekly, biweekly, or monthly) follow the cadence and starting date established at enrollment. The Company will hold your recurring slot on the calendar and will not charge you until each visit is confirmed.

You may pause, reschedule, or cancel a recurring plan at any time with at least 7 days' written notice before the next scheduled visit. Plan cancellation does not waive fees for visits already completed or for late cancellations already incurred. We will provide at least 30 days' written notice before any change to recurring plan pricing or terms.`,
  },
  {
    title: "4. Pricing and Payment",
    content: `Pricing is provided as a flat-rate quote at the time of booking based on the information you provide (home size, bathroom count, service type, frequency, add-ons, and any disclosed condition factors). The quoted price is the price you pay, unless the actual scope of the home differs materially from what was described at booking.

If the visit requires significantly more time, labor, or scope than the booking implies, we will pause the service and contact you with a revised estimate before continuing. You may approve the revision or end the visit at no charge for unworked time.

Payment is collected on the day of service after the visit is complete, unless otherwise specified for prepaid packages or recurring plans on auto-billing. We accept all major credit cards. Recurring plan visits are billed on the schedule established at enrollment.

Invoices not paid within 30 days may be subject to a late fee of 1.5% per month or the maximum permitted by Virginia law, whichever is less. We may suspend future bookings on accounts with outstanding balances.`,
  },
  {
    title: "5. Cancellation, Rescheduling, and Lockouts",
    content: `You may cancel or reschedule any booking free of charge with more than 24 hours' notice before the scheduled service time.

Cancellations or reschedule requests received less than 24 hours before the scheduled service time will be charged a late cancellation fee equal to 50% of the quoted service price. This fee compensates the Company for reserved labor, supply prep, and the loss of a slot that could have been offered to another client.

If our team arrives at the property at the scheduled time and is unable to access the premises (locked out, code changed without notice, no answer at the door), the visit will be treated as a same-day cancellation and charged at 50% of the quoted service price. After 30 minutes of waiting on site without access, the team will leave and the visit will be considered missed.

The Company may cancel or reschedule a visit due to severe weather, staff illness or emergency, or other circumstances beyond our reasonable control. In such cases, no fee will be charged to the Client and we will offer the next available slot.`,
  },
  {
    title: "6. Property Access",
    content: `You are responsible for arranging access to the property at the scheduled time. Acceptable access methods include: being present at the home, providing a key, sharing a smart-lock or keypad code, or coordinating with a doorman or property manager. The access method must be confirmed before the visit.

If you provide a key, code, or other access method, you authorize the Company's team to enter the property for the sole purpose of performing the scheduled cleaning, even if you are not present. Keys and codes are stored securely and used only for confirmed appointments.

You agree to secure or remove cash, jewelry, sensitive documents, firearms, controlled substances, irreplaceable items, and anything you do not want our team to handle. The Company is not responsible for items left unsecured in the cleaning area.`,
  },
  {
    title: "7. Client Responsibilities",
    content: `You agree to provide a safe environment for our cleaning team. This includes: securing pets that are anxious, aggressive, or known to be unpredictable around strangers; disclosing any known hazards (pest infestations, mold, structural issues, biohazards, recent illness in the home); and ensuring the property is free from conditions that put our staff at risk.

You agree to treat our team with respect. The Company has a zero-tolerance policy for harassment, discrimination, abusive language, or threatening behavior directed at our employees. We may end the visit immediately and terminate the service relationship in response to any violation, with no refund of work already performed.

Pre-visit decluttering of personal items, laundry, dishes, and surface clutter is appreciated and helps us deliver the best result in the time scheduled. We will not pack, organize, or dispose of personal belongings unless that work was specifically scoped and quoted.

You are responsible for the accuracy of all information you provide at booking, including property details, access instructions, and contact information. Inaccurate information that affects scope or access may result in pricing adjustments or a treated-as-cancelled visit.`,
  },
  {
    title: "8. Provider Responsibilities",
    content: `The Company will perform all services in a professional, timely, and workmanlike manner. We will:

(a) staff visits with team members who have completed background checks and in-house training;
(b) carry general liability insurance and provide a certificate of insurance on written request;
(c) bring all standard supplies, equipment, and products needed for the booked service;
(d) follow the published checklist for the booked service type and any reasonable special instructions captured at intake;
(e) respect the privacy, security, and personal property of every client we serve.

If we cannot meet a scheduled visit, we will notify you as soon as practicable and offer the next available slot.`,
  },
  {
    title: "9. Satisfaction Guarantee and Damage Reporting",
    content: `If any aspect of a completed cleaning falls short of expectations, contact us within 24 hours of service completion. We will return at no additional charge to re-clean any specific area covered by the booked checklist that was missed or insufficiently completed. The 24-hour re-clean guarantee does not extend to areas outside the booked service scope.

If you discover accidental damage to your property that you believe was caused by our team, you must notify us in writing within 48 hours of service completion, with photographs and a description of the damage. Damage claims received after 48 hours may still be reviewed but are not guaranteed resolution.

We will investigate every reported damage claim in good faith. Valid claims will be processed through our general liability insurance carrier. Our liability for property damage is capped at the limits of our active general liability insurance policy. We will provide policy limit information on written request.

The Company is not liable for: (a) damage to items that are fragile, unsecured, or in pre-existing poor condition; (b) damage caused by pre-existing conditions of the premises; (c) normal wear and tear; (d) loss or damage to cash, jewelry, or other valuables left unsecured; (e) damage caused by client-supplied products or equipment; or (f) any indirect, incidental, consequential, or punitive damages.`,
  },
  {
    title: "10. Non-Solicitation of Cleaning Staff",
    content: `Our team members are trained, vetted, and supported by the Company at significant ongoing cost. During the term of our service relationship and for 12 months after the last service date, you agree not to directly or indirectly hire, employ, or engage any current or former member of our cleaning team for residential cleaning, household work, or similar services on a private basis, whether as an employee, independent contractor, or any other arrangement.

If you wish to hire one of our team members directly, you may do so by paying the Company a one-time placement fee of two thousand five hundred dollars ($2,500) per team member. This fee compensates the Company for recruiting, training, and onboarding investment.

This clause does not prevent you from referring our company to neighbors, friends, or family. It applies only to direct hiring of our staff outside the Capitol Shine service relationship.`,
  },
  {
    title: "11. Right to Refuse or End Service",
    content: `The Company reserves the right to refuse, pause, or end a service visit at our sole discretion if we encounter: unsafe conditions; pest infestations; biohazards (blood, bodily fluids, animal waste in unsanitary volumes); evidence of recent unmitigated infectious disease in the home; harassment or threatening behavior toward our team; intoxicated occupants; or any condition our team reasonably believes poses a risk to their safety or wellbeing.

If we end a visit early due to conditions beyond our standard scope, we will charge for time and resources already used and refund or credit the difference. If we end a service relationship for cause, we will return any keys, access cards, or other client property in our possession.`,
  },
  {
    title: "12. Photography and Marketing",
    content: `We do not photograph, video record, or otherwise capture media at your property unless you have given explicit written or electronic consent in advance. Such consent must be given specifically for the property and visit in question and may be granted, declined, or revoked at any time by contacting us in writing.

If you have given consent, we may use the captured media in our marketing, social media, website, and promotional materials. We will not include identifying information about you, your address, or any visible personal items in published media without separate consent.

Granting or declining consent will not affect the quality, pricing, or availability of services to you.`,
  },
  {
    title: "13. Confidentiality",
    content: `Information about your home, schedule, family routines, and the contents of your property is treated as confidential. Our team is trained not to share, photograph, or discuss client property or personal details outside the necessary internal coordination required to deliver the service.

Personal information you provide at booking is handled in accordance with our Privacy Policy.`,
  },
  {
    title: "14. Force Majeure",
    content: `Neither party will be liable for failure or delay in performance caused by events beyond reasonable control, including severe weather, natural disaster, public health emergency, government action, utility failure, or staff emergency. The affected party will notify the other as soon as practicable and the parties will reschedule any affected visit at no penalty.`,
  },
  {
    title: "15. Termination",
    content: `Either party may end the service relationship at any time. For one-time bookings, this Agreement governs only the booked visit and any reschedules of it. For recurring plans, you may cancel with at least 7 days' written notice before the next scheduled visit. The Company may end a recurring plan with at least 7 days' written notice, except in cases of cause (Section 11), in which case termination may be immediate.

Termination does not waive any fees already incurred for completed visits or late cancellations, and does not waive obligations under the Non-Solicitation clause (Section 10).`,
  },
  {
    title: "16. Governing Law and Dispute Resolution",
    content: `This Agreement is governed by the laws of the Commonwealth of Virginia, without regard to conflict of law principles.

In the event of a dispute, the parties agree to first attempt to resolve the matter through good-faith direct discussion. If the matter cannot be resolved within 30 days of written notice of the dispute, either party may pursue resolution through mediation or by filing in the Arlington County General District Court or Arlington County Circuit Court, as appropriate to the amount and nature of the claim.`,
  },
  {
    title: "17. Severability and Entire Agreement",
    content: `If any provision of this Agreement is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions will continue in full force and effect.

This Agreement, together with our published Terms of Service, Privacy Policy, the booking confirmation we send by email, and any written quote or service plan we provide to you, constitutes the entire agreement between the parties regarding the residential cleaning services described and supersedes any prior or contemporaneous agreements, representations, or understandings.

The Company may update this Agreement from time to time. The current version is always posted at capitolshinecleaners.com/service-agreement with an effective date. Material changes affecting recurring plan clients will be communicated by email at least 30 days before taking effect.`,
  },
  {
    title: "18. Acknowledgment",
    content: `By booking a residential cleaning visit with Capitol Shine, you acknowledge that you have read this Agreement, understand it, and agree to be bound by it. The booking confirmation email you receive from us references this Agreement and serves as the written record of your acceptance.

If you have questions about any provision before booking, contact us at the number or email below and we will be glad to walk through it with you.`,
  },
  {
    title: "19. Contact",
    content: `Capitol Home Services LLC (Capitol Shine)
Arlington, VA service area
(703) 375-9132
hello@capitolshinecleaners.com`,
  },
];

export default function ServiceAgreementPage() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-muted font-medium">
            <li><Link href="/" className="hover:text-navy transition-colors">Home</Link></li>
            <li className="text-navy/30">/</li>
            <li className="text-charcoal">Service Agreement</li>
          </ol>
        </nav>

        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Residential Bookings</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-none mb-4">
          Service agreement<br />
          <em className="italic">for residential clients.</em>
        </h1>
        <p className="text-muted text-sm mb-1">Capitol Home Services LLC, doing business as Capitol Shine.</p>
        <p className="text-muted text-sm mb-10">Effective Date: May 2026</p>

        <div className="bg-white border border-navy/8 rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="font-display text-base font-semibold text-navy mb-3">The short version</h2>
          <ul className="text-sm text-charcoal/75 leading-relaxed space-y-2">
            <li>• Flat-rate pricing. Quote at booking is the price you pay unless scope changes materially.</li>
            <li>• Free cancellation more than 24 hours out. Within 24 hours, the fee is 50% of the visit price.</li>
            <li>• If we can't get in (lockout, no answer), the visit is charged at 50%.</li>
            <li>• Re-clean guarantee on covered areas if you tell us within 24 hours.</li>
            <li>• Damage claims must be reported within 48 hours with photos. Liability is capped at our insurance limits.</li>
            <li>• Don't directly hire our cleaners. The placement fee for converting a Capitol Shine team member to a private hire is $2,500.</li>
            <li>• Recurring plans cancel with 7 days' notice. No long-term commitment.</li>
          </ul>
          <p className="text-xs text-muted mt-4">
            The summary is for convenience. The full terms below govern.
          </p>
        </div>

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

        <div className="mt-14 pt-8 border-t border-navy/8">
          <p className="text-xs text-muted">
            See also our{" "}
            <Link href="/terms" className="text-navy underline hover:no-underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-navy underline hover:no-underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
