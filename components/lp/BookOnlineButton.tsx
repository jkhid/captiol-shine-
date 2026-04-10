"use client";

import Link from "next/link";
import { CalendarCheck } from "lucide-react";

interface Props {
  href: string;
  className?: string;
  iconSize?: number;
  label?: string;
}

export default function BookOnlineButton({
  href,
  className,
  iconSize = 18,
  label = "Book Online",
}: Props) {
  const handleClick = () => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (typeof w.gtag === "function") {
      w.gtag("event", "conversion", {
        send_to: "AW-18020726483/EL0tCM6mqZgcENPt-ZBD",
      });
    }
    if (typeof w.fbq === "function") {
      w.fbq("track", "Lead");
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      <CalendarCheck size={iconSize} />
      {label}
    </Link>
  );
}
