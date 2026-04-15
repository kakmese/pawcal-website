'use client';

import { useTranslations } from 'next-intl';
import { features } from '@/data/features';
import FeatureCard from './FeatureCard';
import Container from './ui/Container';
import Badge from './ui/Badge';

interface FeaturesGridProps {
  detailed?: boolean;
}

export default function FeaturesGrid({ detailed = false }: FeaturesGridProps) {
  const t = useTranslations('features');

  const translatedFeatures = features.map((f, i) => ({
    ...f,
    title: t(`feature${i + 1}Title` as Parameters<typeof t>[0]),
    shortDesc: t(`feature${i + 1}Desc` as Parameters<typeof t>[0]),
  }));

  return (
    <section className="py-12 sm:py-20">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="primary" className="mb-4">
            ✨ {t('badge')}
          </Badge>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[var(--foreground)] mb-4">
            {t('title')}{' '}
            <span className="text-gradient-primary">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {translatedFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} detailed={detailed} />
          ))}
        </div>
      </Container>
    </section>
  );
}
