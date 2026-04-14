import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/config';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import CTASection from '@/components/CTASection';
import { Database, Microscope, Shield, MapPin, Mail } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'tr' ? 'Hakkında' : 'About',
    description: locale === 'tr'
      ? 'PawCal Studio hakkında bilgi edinin. Türkiye\'den dünyaya evcil hayvan sağlık takibi.'
      : 'Learn about PawCal Studio. Pet health tracking from Turkey to the world.',
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    {
      icon: Database,
      title: t('values.data.title'),
      desc: t('values.data.desc'),
      color: '#FF8F6B',
    },
    {
      icon: Microscope,
      title: t('values.science.title'),
      desc: t('values.science.desc'),
      color: '#4ADE80',
    },
    {
      icon: Shield,
      title: t('values.privacy.title'),
      desc: t('values.privacy.desc'),
      color: '#A78BFA',
    },
  ];

  const storyParagraphs = t('story').split('\n\n');

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--bg-secondary)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">🐾 {t('badge')}</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-8">
              {t('title')}
            </h1>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12 mb-12">
              {storyParagraphs.map((para, i) => (
                <p key={i} className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>

            {/* Mission */}
            <div className="bg-gradient-primary rounded-3xl p-8 mb-12 text-center">
              <h2 className="font-display font-bold text-2xl text-white mb-3">
                {t('mission')}
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                {t('missionText')}
              </p>
            </div>

            {/* Values */}
            <h2 className="font-display font-bold text-2xl text-white mb-6 text-center">
              {t('values.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {values.map((value) => (
                <div key={value.title} className="glass rounded-3xl p-6 text-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${value.color}20` }}
                  >
                    <value.icon className="w-6 h-6" style={{ color: value.color }} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{value.desc}</p>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="glass rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center justify-center">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#FF8F6B]" />
                <span className="text-[var(--text-secondary)]">{t('location')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FF8F6B]" />
                <a
                  href="mailto:info@pawcal.net"
                  className="text-[#FF8F6B] hover:underline"
                >
                  {t('contact')}
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
