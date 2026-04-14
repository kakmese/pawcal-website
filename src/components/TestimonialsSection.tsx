'use client';

import { useTranslations } from 'next-intl';
import { testimonials } from '@/data/testimonials';
import { type Locale } from '@/i18n/config';
import TestimonialCard from './TestimonialCard';
import Container from './ui/Container';
import Badge from './ui/Badge';

interface TestimonialsSectionProps {
  locale: Locale;
}

export default function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const t = useTranslations('testimonials');

  return (
    <section className="py-20 bg-[var(--bg-secondary)]">
      <Container>
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">
            ⭐ {t('badge')}
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
            {t('title')}{' '}
            <span className="text-gradient-primary">{t('titleHighlight')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
