"use client";

import { useState } from "react";
import AgreementBody from "@/components/contractor-agreements/AgreementBody";
import { COMPANY, formatSignedDate, type ContractorAgreement } from "@/lib/contractor-agreements";

interface Props {
  agreement: ContractorAgreement;
  signatureFontClass: string;
}

export default function SignClient({ agreement: initial, signatureFontClass }: Props) {
  const [agreement, setAgreement] = useState(initial);
  const [typedName, setTypedName] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSigned = agreement.status === "signed";
  const isVoided = agreement.status === "voided";

  const canSubmit =
    !submitting && consent && typedName.trim().length >= 2 && !isSigned && !isVoided;

  async function handleSign() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/contractor-agreements/${agreement.token}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ typed_name: typedName.trim(), consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not record signature");
      setAgreement(data.agreement);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not record signature");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-paper py-12 md:py-16 px-4 print:py-0 print:px-0">
      <div className="max-w-3xl mx-auto">
        {/* Status banner */}
        {isSigned && (
          <div className="bg-green/8 border border-green/30 rounded-xl p-5 mb-6 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-green mb-1">Signed and recorded</p>
                <p className="text-sm text-charcoal/75">
                  You signed this agreement on {formatSignedDate(agreement.signed_at)}. A copy is on file with Capitol Shine. You can return to this page anytime to download it again.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy text-white rounded-lg text-sm font-semibold hover:bg-ink transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </button>
            </div>
            <p className="mt-3 text-[11.5px] text-charcoal/55">
              Tip: in the print dialog, choose <strong>Save as PDF</strong> as the destination.
            </p>
          </div>
        )}

        {isVoided && (
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-5 mb-6 print:hidden">
            <p className="text-sm font-semibold text-charcoal mb-1">This link has been voided.</p>
            <p className="text-sm text-charcoal/75">
              Please contact Capitol Shine at{" "}
              <a href="mailto:hello@capitolshinecleaners.com" className="text-navy underline">hello@capitolshinecleaners.com</a>{" "}
              for a new agreement link.
            </p>
          </div>
        )}

        {/* Agreement card */}
        <article className="bg-white border border-navy/10 rounded-2xl p-8 md:p-12 shadow-sm print:border-0 print:shadow-none print:p-0">
          <AgreementBody
            contractorName={agreement.contractor_name}
            contractorEmail={agreement.contractor_email}
            effectiveDate={agreement.effective_date}
            signedAt={agreement.signed_at}
            signedTypedName={agreement.signed_typed_name}
            signatureFontClass={signatureFontClass}
          />
        </article>

        {/* Sign panel — only when not yet signed */}
        {!isSigned && !isVoided && (
          <div className="mt-8 bg-white border border-navy/10 rounded-2xl p-6 md:p-8 shadow-sm print:hidden">
            <h2 className="font-display text-lg font-bold text-navy mb-1">Sign this agreement</h2>
            <p className="text-sm text-charcoal/65 mb-5">
              Type your full legal name to sign. Your typed name has the same legal effect as a handwritten signature under the federal E-SIGN Act and Virginia&apos;s Uniform Electronic Transactions Act.
            </p>

            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/55 mb-2">
              Your full legal name
            </label>
            <input
              type="text"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              placeholder="First Middle Last"
              className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-paper text-base focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40 transition-colors mb-4"
              autoComplete="off"
              spellCheck={false}
            />

            {/* Live preview */}
            <div className="bg-paper rounded-xl border border-navy/10 px-5 py-4 mb-5">
              <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-widest mb-2">Preview</p>
              <div className={`text-4xl text-navy min-h-[56px] ${signatureFontClass}`}>
                {typedName.trim() || <span className="text-charcoal/25 text-base font-sans italic">Type your name to preview</span>}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mb-5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-gold w-4 h-4 flex-shrink-0"
              />
              <span className="text-sm text-charcoal/80 leading-relaxed">
                By checking this box and clicking <strong>Sign Agreement</strong>, I confirm I am{" "}
                <strong className="text-navy">{agreement.contractor_name}</strong>, I have read this Agreement in full, and I agree to be bound by its terms. I consent to do business electronically with {COMPANY.legalName} and agree that my typed name constitutes my legal signature.
              </span>
            </label>

            {error && (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            )}

            <button
              onClick={handleSign}
              disabled={!canSubmit}
              className="w-full py-4 bg-navy text-white rounded-xl text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ink transition-colors"
            >
              {submitting ? "Recording your signature…" : "Sign Agreement"}
            </button>

            <p className="mt-4 text-[11.5px] text-charcoal/55 text-center">
              Your IP address, timestamp, and browser will be recorded as part of the signature audit trail.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
