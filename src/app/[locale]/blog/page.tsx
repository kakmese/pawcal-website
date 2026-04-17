import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getBlogPosts } from '@/data/blog-posts';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  return { title: t('metaTitle') };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  const posts = getBlogPosts(locale);
  const dateLocale = locale === 'en' ? 'en-US' : 'tr-TR';

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center">
            <Badge variant="primary" className="mb-4">{t('badge')}</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              {t('title')}{' '}
              <span className="text-gradient-primary">{t('titleHighlight')}</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="glass rounded-3xl overflow-hidden group hover:border-[#FF8F6B]/30 transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-[#FF8F6B]/20 to-[#FF6B9D]/20 flex items-center justify-center">
                  <span className="text-5xl">🐾</span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#FF8F6B]/10 text-[#FF8F6B] text-xs font-semibold px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="font-display font-semibold text-xl text-white mb-2 group-hover:text-[#FF8F6B] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString(dateLocale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-[#FF8F6B] text-sm font-semibold hover:gap-2 transition-all"
                    >
                      {t('readMore')} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
