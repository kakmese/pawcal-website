'use client';

import { useTranslations } from 'next-intl';
import { testimonials } from '@/data/testimonials';
import TestimonialCard from './TestimonialCard';
import Container from './ui/Container';
import Badge from './ui/Badge';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');

  const translatedTestimonials = testimonials.map((item, i) => ({
    ...item,
    name: t(`t${i + 1}Name` as Parameters<typeof t>[0]),
    pet: t(`t${i + 1}Pet` as Parameters<typeof t>[0]),
    quote: t(`t${i + 1}Quote` as Parameters<typeof t>[0]),
  }));

  return (
    <section className="py-12 sm:py-20 bg-[var(--bg-secondary)]">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="primary" className="mb-4">
            ⭐ {t('badge')}
          </Badge>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[var(--foreground)]">
            {t('title')}{' '}
            <span className="text-gradient-primary">{t('titleHighlight')}</span>
          </h2>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 pb-4">
          {translatedTestimonials.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[80%] snap-center">
              <TestimonialCard testimonial={item} />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {translatedTestimonials.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
