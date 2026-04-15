import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/FeaturesGrid';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import CTASection from '@/components/CTASection';
import TestimonialsSection from '@/components/TestimonialsSection';

export const metadata: Metadata = {
  title: 'PawCal — Evcil Hayvan Sağlık Takibi',
  description:
    'Evcil dostunuzun beslenme, sağlık ve aktivitesini takip edin. İçgüdülerinize değil, verilerinize güvenin.',
  alternates: {
    canonical: 'https://pawcal.net',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <ScreenshotGallery />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
