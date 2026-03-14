import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="Capitol Shine home">
      <Image
        src="/capitol_shine_logo.png"
        alt="Capitol Shine"
        width={140}
        height={52}
        className="h-11 w-auto"
        priority
      />
    </Link>
  );
}
