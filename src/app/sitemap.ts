import { type MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-posts';

const BASE_URL = 'https://pawcal.net';

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
  const staticEntries = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date('2026-04-14'),
    changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
    priority: path === '' ? 1.0 : 0.8,
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
