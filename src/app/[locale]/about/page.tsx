import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import CTASection from '@/components/CTASection';
import { Database, Microscope, Shield, MapPin, Mail } from 'lucide-react';

const valueIcons = [
  { icon: Database, color: '#FF8F6B' },
  { icon: Microscope, color: '#4ADE80' },
  { icon: Shield, color: '#A78BFA' },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'tr' ? 'Hakkında | PawCal' : 'About | PawCal',
  };
}

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--bg-secondary)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">{t('badge')}</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-8">
              {t('title')}
            </h1>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12 mb-12">
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
                {t('story1')}
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
                {t('story2')}
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                {t('story3')}
              </p>
            </div>

            <div className="bg-gradient-primary rounded-3xl p-8 mb-12 text-center">
              <h2 className="font-display font-bold text-2xl text-white mb-3">
                {t('missionTitle')}
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                {t('missionText')}
              </p>
            </div>

            <h2 className="font-display font-bold text-2xl text-white mb-6 text-center">
              {t('valuesTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {valueIcons.map((item, i) => (
                <div key={i} className="glass rounded-3xl p-6 text-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {t(`value${i + 1}Title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {t(`value${i + 1}Desc` as Parameters<typeof t>[0])}
                  </p>
                </div>
              ))}
            </div>

            <div className="glass rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center justify-center">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#FF8F6B]" />
                <span className="text-[var(--text-secondary)]">{t('location')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FF8F6B]" />
                <a href="mailto:info@pawcal.net" className="text-[#FF8F6B] hover:underline">
                  info@pawcal.net
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
