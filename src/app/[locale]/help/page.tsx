import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getFAQCategories } from '@/data/faq';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import {
  Rocket, Utensils, Heart, Activity, Users, CreditCard,
  ChevronRight, type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Rocket, Utensils, Heart, Activity, Users, CreditCard,
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HelpPage' });
  return { title: t('metaTitle') };
}

export default async function HelpPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HelpPage' });
  const categories = getFAQCategories(locale);

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="primary" className="mb-4">{t('badge')}</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              {t('title')}{' '}
              <span className="text-gradient-primary">{t('titleHighlight')}</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">
              {t('description')}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((category) => {
              const Icon = iconMap[category.icon] ?? Rocket;
              return (
                <Link
                  key={category.slug}
                  href={`/help/${category.slug}`}
                  className="glass rounded-3xl p-6 hover:border-[#FF8F6B]/30 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FF8F6B]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#FF8F6B]" />
                  </div>
                  <h2 className="font-display font-semibold text-lg text-white mb-1 group-hover:text-[#FF8F6B] transition-colors">
                    {category.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    {t('questionCount', { count: category.items.length })}
                  </p>
                  <div className="flex items-center gap-1 text-[#FF8F6B] text-sm font-semibold group-hover:gap-2 transition-all">
                    {t('viewAll')} <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
