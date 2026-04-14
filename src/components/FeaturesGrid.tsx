'use client';

import { useTranslations } from 'next-intl';
import { features } from '@/data/features';
import { type Locale } from '@/i18n/config';
import FeatureCard from './FeatureCard';
import Container from './ui/Container';
import Badge from './ui/Badge';

interface FeaturesGridProps {
  locale: Locale;
  detailed?: boolean;
}

export default function FeaturesGrid({ locale, detailed = false }: FeaturesGridProps) {
  const t = useTranslations('features');

  return (
    <section className="py-20">
      <Container>
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">
            ✨ {t('badge')}
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            {t('title')}{' '}
            <span className="text-gradient-primary">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              locale={locale}
              detailed={detailed}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
