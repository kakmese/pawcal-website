'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Badge from './ui/Badge';
import Container from './ui/Container';
import StoreButtons from './StoreButtons';
import HeroPhoneMockup from './HeroPhoneMockup';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background)]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF8F6B]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B9D]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FF8F6B]/10 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16">

          {/* Left: Content */}
          <div className="text-center lg:text-left">

            {/* SORUN 4: Beta badge */}
            <div className="inline-flex items-center gap-2 bg-[#FF8F6B]/10 border border-[#FF8F6B]/30 text-[#FF8F6B] px-4 py-2 rounded-full text-sm font-medium mb-4">
              {t('betaBadge')}
            </div>

            {/* Platform badge */}
            <div className="flex justify-center lg:justify-start mb-6">
              <Badge variant="success">
                🐾 {t('badge')}
              </Badge>
            </div>

            {/* SORUN 1: text-white → text-[var(--foreground)] */}
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              <span className="text-[var(--foreground)]">{t('title')}</span>
              <br />
              <span className="text-gradient-primary">{t('titleHighlight')}</span>
            </h1>

            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {t('description')}
            </p>

            {/* SORUN 3: İki store butonu */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-4">
              <StoreButtons size="lg" direction="row" />
            </div>

            {/* Özellikler linki */}
            <div className="flex justify-center lg:justify-start">
              <Link
                href={`/${locale}/features`}
                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[#FF8F6B] font-medium text-sm transition-colors"
              >
                {t('learnMore')}
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { value: '10K+', label: t('stats.pets') },
                { value: '500K+', label: t('stats.meals') },
                { value: '50K+', label: t('stats.reminders') },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display font-bold text-2xl md:text-3xl text-gradient-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: SORUN 6 — HeroPhoneMockup component */}
          <div className="relative flex justify-center lg:justify-end">
            <HeroPhoneMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
