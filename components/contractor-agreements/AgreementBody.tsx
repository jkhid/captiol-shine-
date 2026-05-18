import { COMPANY, formatEffectiveDate, formatSignedDate } from "@/lib/contractor-agreements";

interface Props {
  contractorName: string;
  contractorEmail: string | null;
  effectiveDate: string;
  signedAt: string | null;
  signedTypedName: string | null;
  signatureFontClass: string; // e.g. classNames for the cursive font
}

export default function AgreementBody({
  contractorName,
  contractorEmail,
  effectiveDate,
  signedAt,
  signedTypedName,
  signatureFontClass,
}: Props) {
  return (
    <article className="space-y-6 text-charcoal/85 text-[15px] leading-relaxed">
      <header className="text-center mb-2">
        <h1 className="text-2xl font-bold text-navy tracking-tight uppercase">
          Independent Contractor Agreement
        </h1>
        <p className="text-charcoal/70 mt-1">
          {COMPANY.legalName} d/b/a {COMPANY.dba}
        </p>
      </header>

      <p>
        This Independent Contractor Agreement (&ldquo;Agreement&rdquo;) is entered into as of{" "}
        <strong className="text-navy">{formatEffectiveDate(effectiveDate)}</strong>{" "}
        (&ldquo;Effective Date&rdquo;), by and between:
      </p>

      <p>
        <strong className="text-navy">Company:</strong> {COMPANY.legalName}, d/b/a {COMPANY.dba}, a Virginia limited liability company, with its principal place of business at {COMPANY.address} (&ldquo;Company&rdquo;).
      </p>

      <p>
        <strong className="text-navy">Contractor:</strong>{" "}
        <strong className="text-navy">{contractorName}</strong>
        {contractorEmail ? <> ({contractorEmail})</> : null}{" "}
        (&ldquo;Contractor&rdquo;), an independent contractor.
      </p>

      <p>
        Company and Contractor are collectively referred to as the &ldquo;Parties&rdquo; and individually as a &ldquo;Party.&rdquo;
      </p>

      <p>The Parties agree as follows:</p>

      <Section title="1. Scope of Services">
        Contractor agrees to perform residential and/or commercial cleaning services as assigned by Company on a per-job basis. The specific scope, location, and requirements for each job will be communicated by Company prior to the scheduled service date. Contractor is not guaranteed any minimum number of jobs.
      </Section>

      <Section title="2. Independent Contractor Relationship">
        <p>
          Contractor is an independent contractor and is not an employee, agent, partner, or joint venturer of Company. Contractor shall not be entitled to any employee benefits, including but not limited to health insurance, retirement benefits, workers&apos; compensation, or unemployment insurance. Contractor is responsible for all federal, state, and local taxes arising from compensation received under this Agreement, including self-employment taxes.
        </p>
        <p className="mt-3">Contractor acknowledges and agrees that:</p>
        <ol className="list-[lower-alpha] pl-6 mt-2 space-y-1.5">
          <li>Contractor controls the manner and means by which services are performed, subject to the specifications and standards set forth by Company for quality assurance purposes;</li>
          <li>Contractor is free to accept or decline any job offered by Company;</li>
          <li>Contractor may perform services for other clients or companies, subject to the non-compete and non-solicitation provisions in Section 8;</li>
          <li>Company will issue an IRS Form 1099-NEC, and Contractor is solely responsible for tax filings and payments.</li>
        </ol>
      </Section>

      <Section title="3. Compensation">
        Contractor will be compensated on a per-job basis at rates agreed upon by the Parties prior to each assignment. Payment will be made within 7 days of job completion. Contractor will not be reimbursed for expenses unless expressly agreed in writing in advance.
      </Section>

      <Section title="4. Supplies and Equipment">
        Company may, at Contractor&apos;s request, provide cleaning supplies and equipment for use on Company jobs. Supplies and equipment provided by Company remain Company property and must be returned upon termination of this Agreement. Contractor may alternatively use Contractor&apos;s own supplies and equipment, provided they meet Company&apos;s quality and safety standards. Use of Company-provided supplies is optional and offered as a convenience at Contractor&apos;s request, not as a condition of engagement.
      </Section>

      <Section title="5. Quality Standards and Client Satisfaction">
        Contractor agrees to perform all services in a professional, thorough manner consistent with Company&apos;s published checklists and quality expectations. Company may conduct quality inspections of completed work. If a client reports dissatisfaction within 24 hours, Contractor may be required to perform a re-clean at no additional compensation.
      </Section>

      <Section title="6. Insurance and Liability">
        Company maintains general liability insurance for jobs performed under Company&apos;s name. Contractor is encouraged to carry their own general liability and/or professional liability insurance. Contractor agrees to immediately notify Company of any property damage, injury, client complaint, or incident that occurs during the performance of services. Contractor shall be responsible for damage caused by Contractor&apos;s negligence or willful misconduct.
      </Section>

      <Section title="7. Confidentiality">
        Contractor agrees to keep confidential all non-public information related to Company&apos;s business, including but not limited to client lists, client addresses and access information, pricing and business strategies, operational procedures, and any other proprietary information. This obligation survives termination of this Agreement for a period of two (2) years.
      </Section>

      <Section title="8. Non-Compete and Non-Solicitation">
        <p>
          <strong className="text-navy">Non-Compete:</strong> During the term of this Agreement and for a period of twelve (12) months following termination, Contractor shall not directly or indirectly provide cleaning services to any client of Company within Arlington County, Virginia, or any area where Company actively operates, except through Company.
        </p>
        <p className="mt-3">
          <strong className="text-navy">Non-Solicitation:</strong> During the term of this Agreement and for a period of twelve (12) months following termination, Contractor shall not directly or indirectly solicit, contact, or attempt to divert any client of Company for the purpose of providing cleaning or related services outside of this Agreement. Contractor shall also not recruit or solicit any other contractor or employee of Company.
        </p>
        <p className="mt-3 text-sm italic text-charcoal/60">
          Note: Enforceability of non-compete clauses varies by jurisdiction. Virginia law governs this provision.
        </p>
      </Section>

      <Section title="9. Termination">
        Either Party may terminate this Agreement at any time, for any reason, with or without cause, and without advance notice. Upon termination, Contractor shall return all Company-provided supplies, equipment, keys, access devices, and confidential materials within five (5) business days. Contractor will be compensated for all jobs completed prior to the date of termination.
      </Section>

      <Section title="10. Key and Access Management">
        If Contractor is provided keys, access codes, or lockbox combinations for client properties, Contractor agrees to safeguard such access information, use it solely for the purpose of performing assigned services, and never duplicate keys or share access information with any third party. All keys and access devices must be returned upon termination of this Agreement or upon Company&apos;s request.
      </Section>

      <Section title="11. Background Check">
        Contractor consents to a background check as a condition of engagement. Company reserves the right to decline or terminate engagement based on background check results, in accordance with applicable law.
      </Section>

      <Section title="12. Indemnification">
        Contractor agrees to indemnify, defend, and hold harmless Company and its members, managers, officers, and agents from and against any claims, liabilities, damages, losses, or expenses (including reasonable attorney&apos;s fees) arising out of or related to Contractor&apos;s performance of services, breach of this Agreement, or Contractor&apos;s negligence or willful misconduct.
      </Section>

      <Section title="13. Dispute Resolution">
        Any dispute arising out of or relating to this Agreement shall be governed by and construed in accordance with the laws of the Commonwealth of Virginia. The Parties agree to first attempt to resolve any dispute through good faith negotiation. If unresolved, disputes shall be submitted to the Arlington County General District Court or the Circuit Court of Arlington County, Virginia.
      </Section>

      <Section title="14. Photography and Video for Marketing Purposes">
        Contractor grants Company a non-exclusive, royalty-free, perpetual license to use photographs and video recordings of Contractor&apos;s work, including before-and-after images of cleaned spaces, work-in-progress photos, and job site recordings, for marketing, promotional, and business development purposes, including but not limited to use on Company&apos;s website, social media channels, advertising materials, and client-facing presentations. Company will not capture or publish images or video depicting Contractor&apos;s face or identifying personal information without Contractor&apos;s separate written consent. All content captured by Company remains the sole property of Company. Contractor may not photograph or record client properties for personal use or publication without the prior written consent of both Company and the applicable client.
      </Section>

      <Section title="15. Miscellaneous">
        <p>
          <strong className="text-navy">Entire Agreement:</strong> This Agreement constitutes the entire agreement between the Parties and supersedes all prior discussions, representations, and agreements, whether oral or written.
        </p>
        <p className="mt-2">
          <strong className="text-navy">Amendments:</strong> This Agreement may only be modified in writing, signed by both Parties.
        </p>
        <p className="mt-2">
          <strong className="text-navy">Severability:</strong> If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
        </p>
        <p className="mt-2">
          <strong className="text-navy">Assignment:</strong> Contractor may not assign or transfer this Agreement or any rights hereunder without the prior written consent of Company.
        </p>
        <p className="mt-2">
          <strong className="text-navy">No Waiver:</strong> Failure by either Party to enforce any provision of this Agreement shall not constitute a waiver of that provision or the right to enforce it at a later time.
        </p>
      </Section>

      <p className="font-semibold text-navy uppercase tracking-wide mt-8">
        In witness whereof, the Parties have executed this Agreement as of the Effective Date.
      </p>

      {/* Signature blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-navy/15">
        {/* Company block — pre-signed */}
        <div>
          <p className="text-xs font-bold text-navy uppercase tracking-widest mb-3">Company</p>
          <p className="text-sm text-charcoal/80 mb-3">
            {COMPANY.legalName} d/b/a {COMPANY.dba}
          </p>
          <div className={`text-3xl text-navy ${signatureFontClass}`}>
            {COMPANY.signer}
          </div>
          <div className="border-b border-navy/30 mt-1 mb-2" />
          <p className="text-xs text-charcoal/60">
            <strong className="text-navy">Printed Name:</strong> {COMPANY.signer}
          </p>
          <p className="text-xs text-charcoal/60">
            <strong className="text-navy">Title:</strong> {COMPANY.signerTitle}
          </p>
          <p className="text-xs text-charcoal/60">
            <strong className="text-navy">Date:</strong> {formatEffectiveDate(effectiveDate)}
          </p>
        </div>

        {/* Contractor block — fills in on sign */}
        <div>
          <p className="text-xs font-bold text-navy uppercase tracking-widest mb-3">Contractor</p>
          <p className="text-sm text-charcoal/80 mb-3">{contractorName}</p>
          <div className={`text-3xl text-navy min-h-[44px] ${signatureFontClass}`}>
            {signedTypedName ?? <span className="text-charcoal/30 text-base font-sans italic">Awaiting signature</span>}
          </div>
          <div className="border-b border-navy/30 mt-1 mb-2" />
          <p className="text-xs text-charcoal/60">
            <strong className="text-navy">Printed Name:</strong> {signedTypedName ?? "—"}
          </p>
          <p className="text-xs text-charcoal/60">
            <strong className="text-navy">Date:</strong> {signedAt ? formatSignedDate(signedAt) : "—"}
          </p>
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-bold text-navy uppercase tracking-wide mb-2">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
