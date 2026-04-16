import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/FeaturesGrid';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import CTASection from '@/components/CTASection';
import TestimonialsSection from '@/components/TestimonialsSection';

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
