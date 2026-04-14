'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { PawPrint } from 'lucide-react';
import { type Locale } from '@/i18n/config';
import Container from './ui/Container';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const l = locale;

  const columns = [
    {
      title: t('product'),
      links: [
        { href: `/${l}/features`, label: t('features') },
        { href: `/${l}/blog`, label: t('blog') },
      ],
    },
    {
      title: t('company'),
      links: [
        { href: `/${l}/about`, label: t('about') },
        { href: `/${l}/contact`, label: t('contact') },
      ],
    },
    {
      title: t('support'),
      links: [
        { href: `/${l}/help`, label: t('help') },
        { href: `/${l}/support`, label: t('supportPage') },
      ],
    },
    {
      title: t('legal'),
      links: [
        { href: `/${l}/privacy`, label: t('privacy') },
        { href: `/${l}/terms`, label: t('terms') },
        { href: `/${l}/cookies`, label: t('cookies') },
      ],
    },
  ];

  const socials = [
    { label: 'IG', name: 'Instagram' },
    { label: 'X', name: 'X / Twitter' },
    { label: 'TK', name: 'TikTok' },
  ];

  return (
    <footer className="border-t border-white/10 bg-[var(--bg-secondary)]">
      <Container>
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${l}`} className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl">PawCal</span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {t('tagline')}
            </p>
            {/* Social media */}
            <div className="flex items-center gap-2">
              {socials.map(({ label, name }) => (
                <button
                  key={name}
                  disabled
                  aria-label={`${name} — ${t('socialSoon')}`}
                  title={t('socialSoon')}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/30 cursor-not-allowed text-[10px] font-bold"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
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
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-secondary)]">{t('copyright')}</p>
          <p className="text-xs text-[var(--text-secondary)]">
            Made with 🐾 in Turkey
          </p>
        </div>
      </Container>
    </footer>
  );
}
