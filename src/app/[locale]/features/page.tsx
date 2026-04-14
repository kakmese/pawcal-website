import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/config';
import FeaturesGrid from '@/components/FeaturesGrid';
import CTASection from '@/components/CTASection';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'features' });
  return {
    title: locale === 'tr' ? 'Özellikler' : 'Features',
    description: t('description'),
  };
}

export default async function FeaturesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'features' });

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-8 bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center">
            <Badge variant="primary" className="mb-4">✨ {t('badge')}</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              {t('title')}{' '}
              <span className="text-gradient-primary">{t('titleHighlight')}</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>
        </Container>
      </section>

      <FeaturesGrid locale={locale} detailed />
      <CTASection />
    </>
  );
}
