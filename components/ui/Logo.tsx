import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="Capitol Shine home">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Tail — three fading streaks */}
        <line x1="2" y1="34" x2="16" y2="20" stroke="#D4A94B" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
        <line x1="5" y1="34" x2="17" y2="22" stroke="#D4A94B" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <line x1="8" y1="34" x2="18" y2="24" stroke="#D4A94B" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
        {/* 5-pointed star */}
        <path
          d="M22 4 L23.8 9.8 L30 9.8 L25 13.2 L26.9 19 L22 15.6 L17.1 19 L19 13.2 L14 9.8 L20.2 9.8 Z"
          fill="#D4A94B"
        />
      </svg>
      <span className="font-display text-xl font-bold text-navy">
        Capitol <span className="text-gold">Shine</span>
      </span>
    </Link>
  );
}
