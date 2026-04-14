import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type Locale } from '@/i18n/config';
import { faqCategories } from '@/data/faq';
import Container from '@/components/ui/Container';
import FAQAccordion from '@/components/FAQAccordion';
import { ArrowLeft, Mail } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: Locale; category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = faqCategories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: cat.title[locale],
    description: `${cat.title[locale]} — PawCal Help Center`,
  };
}

export async function generateStaticParams() {
  return faqCategories.flatMap((cat) =>
    (['tr', 'en'] as Locale[]).map((locale) => ({
      locale,
      category: cat.slug,
    }))
  );
}

export default async function HelpCategoryPage({ params }: PageProps) {
  const { locale, category } = await params;
  const t = await getTranslations({ locale, namespace: 'help' });
  const cat = faqCategories.find((c) => c.slug === category);

  if (!cat) notFound();

  return (
    <>
      <section className="pt-32 pb-8 bg-[var(--bg-secondary)]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href={`/${locale}/help`}
              className="inline-flex items-center gap-2 text-[#FF8F6B] text-sm font-semibold mb-6 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToHelp')}
            </Link>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
              {cat.title[locale]}
            </h1>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={cat.items} locale={locale} />

            <div className="mt-12 glass rounded-3xl p-8 text-center">
              <h2 className="font-display font-semibold text-xl text-white mb-2">
                {t('stillNeedHelp')}
              </h2>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                info@pawcal.net
              </p>
              <a
                href="mailto:info@pawcal.net"
                className="inline-flex items-center gap-2 bg-gradient-primary text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                {t('contactSupport')}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
