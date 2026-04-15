import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { faqCategories } from '@/data/faq';
import Container from '@/components/ui/Container';
import FAQAccordion from '@/components/FAQAccordion';
import { ArrowLeft, Mail } from 'lucide-react';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = faqCategories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: cat.title,
    description: `${cat.title} — PawCal Yardım Merkezi`,
  };
}

export function generateStaticParams() {
  return faqCategories.map((cat) => ({ category: cat.slug }));
}

export default async function HelpCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = faqCategories.find((c) => c.slug === category);

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
              Yardım Merkezine Dön
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
                Hâlâ Yardıma mı İhtiyacınız Var?
              </h2>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                info@pawcal.net
              </p>
              <a
                href="mailto:info@pawcal.net"
                className="inline-flex items-center gap-2 bg-gradient-primary text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                Destek Ekibiyle İletişime Geçin
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
