interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success';
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  className = '',
}: BadgeProps) {
  const variants = {
    primary:
      'bg-[#FF8F6B]/10 text-[#FF8F6B] border border-[#FF8F6B]/30',
    secondary:
      'bg-white/10 text-white/80 border border-white/20',
    success:
      'bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
