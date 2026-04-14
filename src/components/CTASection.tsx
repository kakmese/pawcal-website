'use client';

import { useTranslations } from 'next-intl';
import Container from './ui/Container';
import Badge from './ui/Badge';
import StoreButtons from './StoreButtons';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF8F6B]/10 via-transparent to-[#FF6B9D]/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF8F6B]/20 rounded-full blur-3xl" />

      <Container className="relative">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="primary" className="mb-4">
            🐾 {t('badge')}
          </Badge>

          {/* SORUN 1: text-white → text-foreground */}
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--foreground)] mb-4">
            {t('title')}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8">
            {t('description')}
          </p>

          {/* SORUN 3: İki buton */}
          <div className="flex justify-center">
            <StoreButtons size="lg" direction="row" />
          </div>

          <p className="mt-4 text-xs text-[var(--text-secondary)]">{t('note')}</p>
        </div>
      </Container>
    </section>
  );
}
