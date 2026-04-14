import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/config';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/FeaturesGrid';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import CTASection from '@/components/CTASection';
import TestimonialsSection from '@/components/TestimonialsSection';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: 'PawCal — ' + (locale === 'tr' ? 'Evcil Hayvan Sağlık Takibi' : 'Pet Health Tracking'),
    description: t('tagline'),
    alternates: {
      canonical: `https://pawcal.net/${locale}`,
      languages: {
        tr: 'https://pawcal.net/tr',
        en: 'https://pawcal.net/en',
      },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <Hero />
      <FeaturesGrid locale={locale} />
      <ScreenshotGallery />
      <TestimonialsSection locale={locale} />
      <CTASection />
    </>
  );
}
