'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Badge from './ui/Badge';
import Container from './ui/Container';
import StoreButtons from './StoreButtons';
import HeroPhoneMockup from './HeroPhoneMockup';

export default function Hero() {
  const t = useTranslations('hero');

  const stats = [
    { value: t('statsPets'), label: t('statsPetsLabel') },
    { value: t('statsMeals'), label: t('statsMealsLabel') },
    { value: t('statsReminders'), label: t('statsRemindersLabel') },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background)]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF8F6B]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B9D]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FF8F6B]/10 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-8 sm:py-20">

          {/* Left: Content */}
          <div className="text-center lg:text-left">

            {/* Dual store launch badge */}
            <a
              href="#store-buttons"
              className="inline-flex items-center gap-2 bg-[#FF8F6B]/10 border border-[#FF8F6B]/30 text-[#FF8F6B] px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 hover:bg-[#FF8F6B]/20 transition-colors"
            >
              {t('betaBadge')}
            </a>

            {/* Platform badge */}
            <div className="flex justify-center lg:justify-start mb-4 sm:mb-6">
              <Badge variant="success">
                {t('platformBadge')}
              </Badge>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 sm:mb-6">
              <span className="text-[var(--foreground)]">{t('titleLine1')} {t('titleLine2')}</span>
              <br />
              <span className="text-gradient-primary">{t('titleHighlight')}</span>
            </h1>

            <p className="text-[var(--text-secondary)] text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              {t('description')}
            </p>

            {/* Store buttons */}
            <div id="store-buttons" className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-4">
              <StoreButtons size="lg" direction="row" />
            </div>

            {/* Explore features link */}
            <div className="flex justify-center lg:justify-start">
              <Link
                href="/features"
                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[#FF8F6B] font-medium text-sm transition-colors"
              >
                {t('exploreLink')}
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-gradient-primary">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[var(--text-secondary)] mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="relative justify-center lg:justify-end hidden sm:flex">
            <HeroPhoneMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
