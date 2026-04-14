'use client';

import { type Testimonial } from '@/data/testimonials';
import { type Locale } from '@/i18n/config';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  locale: Locale;
}

export default function TestimonialCard({ testimonial, locale }: TestimonialCardProps) {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-4">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic flex-1">
        &ldquo;{testimonial.quote[locale]}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
        <div className="w-10 h-10 rounded-full bg-[#FF8F6B]/20 flex items-center justify-center text-xl">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-sm text-[var(--foreground)]">
            {testimonial.name[locale]}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">
            {testimonial.pet[locale]}
          </div>
        </div>
      </div>
    </div>
  );
}
