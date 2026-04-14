'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Download, Apple } from 'lucide-react';
import Container from './ui/Container';
import Badge from './ui/Badge';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF8F6B]/10 via-transparent to-[#FF6B9D]/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF8F6B]/20 rounded-full blur-3xl" />

      <Container className="relative">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="primary" className="mb-4">
            🐾 {t('badge')}
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#"
              className="flex items-center gap-3 bg-white text-[#111318] font-semibold px-6 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl shadow-black/20 min-w-[200px] justify-center"
            >
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs text-[#6B7280] leading-none mb-0.5">
                  Download on the
                </div>
                <div className="text-base font-bold leading-none">App Store</div>
              </div>
            </a>
          </div>

          <p className="mt-4 text-xs text-[var(--text-secondary)]">{t('note')}</p>
        </div>
      </Container>
    </section>
  );
}
