"use client";

import { Phone } from "lucide-react";

interface Props {
  phone: string;
  className?: string;
  iconSize?: number;
  label?: string;
  showIcon?: boolean;
}

export default function CallButton({
  phone,
  className,
  iconSize = 18,
  label,
  showIcon = true,
}: Props) {
  const handleClick = () => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (typeof w.fbq === "function") {
      w.fbq("track", "Contact");
    }
  };

  return (
    <a href={`tel:${phone}`} onClick={handleClick} className={className}>
      {showIcon && <Phone size={iconSize} />}
      {label}
    </a>
  );
}
