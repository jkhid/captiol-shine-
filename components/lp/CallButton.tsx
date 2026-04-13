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
    if (typeof w.gtag === "function") {
      w.gtag("event", "conversion", {
        send_to: "AW-18020726483/VgoVCJ_Cx5scENPt-ZBD",
      });
    }
  };

  return (
    <a href={`tel:${phone}`} onClick={handleClick} className={className}>
      {showIcon && <Phone size={iconSize} />}
      {label}
    </a>
  );
}
