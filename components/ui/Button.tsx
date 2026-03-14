import Link from "next/link";

type Variant = "primary" | "outline" | "gold" | "green";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy/90",
  outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  gold: "bg-gold text-navy font-semibold hover:bg-gold/90",
  green: "bg-cta-green text-white font-semibold hover:bg-cta-green/90",
};

export default function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  disabled,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base} disabled={disabled}>
      {children}
    </button>
  );
}
