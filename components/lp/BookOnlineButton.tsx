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
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-18020726483/EL0tCM6mqZgcENPt-ZBD",
      });
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      <CalendarCheck size={iconSize} />
      {label}
    </Link>
  );
}
