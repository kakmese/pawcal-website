import { type MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-posts';

const BASE_URL = 'https://pawcal.net';
const locales = ['tr', 'en'];

const staticPaths = [
  '',
  '/features',
  '/about',
  '/blog',
  '/help',
  '/help/getting-started',
  '/help/nutrition',
  '/help/health',
  '/help/activity',
  '/help/community',
  '/help/account-subscription',
  '/support',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1.0 : 0.8,
    }))
  );

  const blogEntries = blogPosts.flatMap((post) =>
    locales.map((locale) => {
      const l = locale as 'tr' | 'en';
      return {
        url: `${BASE_URL}/${locale}/blog/${post.slug[l]}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    })
  );

  return [...staticEntries, ...blogEntries];
}
