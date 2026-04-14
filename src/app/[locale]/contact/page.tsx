import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/config';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { Mail, MapPin } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'tr' ? 'İletişim' : 'Contact',
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="primary" className="mb-4">📬 {t('badge')}</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              {t('title')}{' '}
              <span className="text-gradient-primary">{t('titleHighlight')}</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">{t('description')}</p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="glass rounded-3xl p-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#FF8F6B]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#FF8F6B]" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-lg text-white mb-2">
                    {t('email')}
                  </h2>
                  <a
                    href="mailto:info@pawcal.net"
                    className="text-[#FF8F6B] hover:underline text-lg"
                  >
                    info@pawcal.net
                  </a>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#FF8F6B]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#FF8F6B]" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-lg text-white mb-2">
                    {t('location')}
                  </h2>
                  <p className="text-[var(--text-secondary)]">{t('locationValue')}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h2 className="font-display font-semibold text-lg text-white mb-2">
                {t('social')}
              </h2>
              <p className="text-[var(--text-secondary)] text-sm mb-4">{t('socialSoon')}</p>
              <div className="flex gap-3">
                {[
                  { label: 'IG', name: 'Instagram' },
                  { label: 'X', name: 'X / Twitter' },
                  { label: 'TK', name: 'TikTok' },
                ].map(({ label, name }) => (
                  <button
                    key={name}
                    disabled
                    aria-label={name}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 cursor-not-allowed text-xs font-bold"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
