"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Mail } from "lucide-react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: Send to backend API / email service
    console.log("Waitlist signup:", email);
    setSubmitted(true);
  };

  return (
    <SectionWrapper className="py-16 bg-navy">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-300 mb-8">
          Expanding soon to Fairfax, Tysons, and Reston. Join our waitlist.
        </p>
        {submitted ? (
          <p className="text-gold font-medium">Thanks! We&apos;ll let you know when we arrive in your area.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-lg text-sm bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="Email address for waitlist"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-gold text-navy font-semibold text-sm hover:bg-gold/90 transition-colors"
            >
              Join Waitlist
            </button>
          </form>
        )}
      </div>
    </SectionWrapper>
  );
}
