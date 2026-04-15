import type { Metadata } from 'next';
import FeaturesGrid from '@/components/FeaturesGrid';
import CTASection from '@/components/CTASection';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Özellikler',
  description:
    'PawCal, evcil hayvanınızın sağlığını veriyle takip etmeniz için ihtiyaç duyduğunuz tüm araçları bir araya getirir.',
};

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-32 pb-8 bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center">
            <Badge variant="primary" className="mb-4">✨ ÖZELLİKLER</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              İhtiyacınız Olan Her Şey{' '}
              <span className="text-gradient-primary">Tek Uygulamada</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              PawCal, evcil hayvanınızın sağlığını veriyle takip etmeniz için ihtiyaç duyduğunuz tüm araçları bir araya getirir.
            </p>
          </div>
        </Container>
      </section>

      <FeaturesGrid detailed />
      <CTASection />
    </>
  );
}
