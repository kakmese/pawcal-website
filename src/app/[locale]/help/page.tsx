import type { Metadata } from 'next';
import Link from 'next/link';
import { faqCategories } from '@/data/faq';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import {
  Rocket, Utensils, Heart, Activity, Users, CreditCard,
  ChevronRight, type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Rocket, Utensils, Heart, Activity, Users, CreditCard,
};

export const metadata: Metadata = {
  title: 'Yardım Merkezi',
  description: 'Sık sorulan sorular ve rehberler ile PawCal\'ı en verimli şekilde kullanın.',
};

export default function HelpPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="primary" className="mb-4">❓ Yardım Merkezi</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Size Nasıl{' '}
              <span className="text-gradient-primary">Yardımcı Olabiliriz?</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">
              Sık sorulan sorular ve rehberler ile PawCal&apos;ı en verimli şekilde kullanın.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {faqCategories.map((category) => {
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
                    {category.items.length} soru
                  </p>
                  <div className="flex items-center gap-1 text-[#FF8F6B] text-sm font-semibold group-hover:gap-2 transition-all">
                    Tüm Kategoriler <ChevronRight className="w-4 h-4" />
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
