import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getFAQCategories, faqCategoriesByLocale } from '@/data/faq';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import FAQAccordion from '@/components/FAQAccordion';
import { ArrowLeft, Mail } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category } = await params;
  const categories = getFAQCategories(locale);
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.title} | PawCal`,
    description: `${cat.title} — PawCal Help Center`,
  };
}

export function generateStaticParams() {
  // Slugs are identical in both locales — use TR array as source of truth
  return faqCategoriesByLocale.tr.map((cat) => ({ category: cat.slug }));
}

export default async function HelpCategoryPage({ params }: PageProps) {
  const { locale, category } = await params;
  const t = await getTranslations({ locale, namespace: 'HelpCategoryPage' });
  const categories = getFAQCategories(locale);
  const cat = categories.find((c) => c.slug === category);

  if (!cat) notFound();

  return (
    <>
      <section className="pt-32 pb-8 bg-[var(--bg-secondary)]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/help"
              className="inline-flex items-center gap-2 text-[#FF8F6B] text-sm font-semibold mb-6 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToHelp')}
            </Link>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
              {cat.title}
            </h1>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={cat.items} />

            <div className="mt-12 glass rounded-3xl p-8 text-center">
              <h2 className="font-display font-semibold text-xl text-white mb-2">
                {t('stillNeedHelpTitle')}
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
