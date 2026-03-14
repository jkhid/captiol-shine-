interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 p-6 ${
        hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" : "shadow-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}
