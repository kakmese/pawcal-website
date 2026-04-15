'use client';

import Link from 'next/link';
import { PawPrint, Apple, PlayCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/constants/links';
import Container from './ui/Container';

const socials = [
  { label: 'IG', name: 'Instagram' },
  { label: 'X', name: 'X / Twitter' },
  { label: 'TK', name: 'TikTok' },
];

export default function Footer() {
  const t = useTranslations('footer');

  const columns = [
    {
      title: t('product'),
      links: [
        { href: '/features', label: t('features') },
        { href: '/blog', label: t('blog') },
      ],
    },
    {
      title: t('company'),
      links: [
        { href: '/about', label: t('about') },
        { href: '/contact', label: t('contact') },
      ],
    },
    {
      title: t('support'),
      links: [
        { href: '/help', label: t('helpCenter') },
        { href: '/support', label: t('supportLink') },
      ],
    },
    {
      title: t('legal'),
      links: [
        { href: '/privacy', label: t('privacy') },
        { href: '/terms', label: t('terms') },
        { href: '/cookies', label: t('cookies') },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <Container>
        <div className="py-12 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-[var(--foreground)]">PawCal</span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {t('tagline')}
            </p>

            <div className="flex flex-col gap-2 mb-4">
              <a
                href={APP_STORE_URL}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[#FF8F6B] transition-colors"
              >
                <Apple className="w-3.5 h-3.5" />
                App Store
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[#FF8F6B] transition-colors"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                Google Play
              </a>
            </div>

            {/* Social media */}
            <div className="flex items-center gap-2">
              {socials.map(({ label, name }) => (
                <button
                  key={name}
                  disabled
                  aria-label={`${name} — Yakında`}
                  title="Yakında"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FF8F6B]/10 text-[var(--text-secondary)] cursor-not-allowed text-[10px] font-bold opacity-50"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[#FF8F6B] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-secondary)]">
            {t('copyright')}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">{t('madeWith')}</p>
        </div>
      </Container>
    </footer>
  );
}
