import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Capitol Shine home">
      <Image
        src="/updated_logo.png"
        alt=""
        width={56}
        height={56}
        className="h-14 w-14 object-contain flex-shrink-0"
        priority
      />
      <span className="font-display text-xl font-bold text-navy leading-tight">
        Capitol <span className="text-gold">Shine</span>
      </span>
    </Link>
  );
}
