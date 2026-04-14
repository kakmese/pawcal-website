'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X, PawPrint, Apple, PlayCircle } from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/constants/links';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import Container from './ui/Container';

interface NavbarProps {
  locale: Locale;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/features`, label: t('features') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/help`, label: t('help') },
    { href: `/${locale}/support`, label: t('support') },
    { href: `/${locale}/about`, label: t('about') },
  ];

  const btnBase =
    'flex items-center gap-1.5 bg-gradient-primary text-white text-xs font-semibold px-3 py-2 rounded-full shadow-md shadow-[#FF8F6B]/30 hover:shadow-[#FF8F6B]/50 hover:scale-105 transition-all';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-scrolled' : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-[#FF8F6B]/30 group-hover:scale-110 transition-transform">
              <PawPrint className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-[var(--foreground)]">
              PawCal
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
            {/* SORUN 3: İki ayrı buton desktop */}
            <a href={APP_STORE_URL} className={btnBase} aria-label="App Store">
              <Apple className="w-3.5 h-3.5" />
              {t('appStore')}
            </a>
            <a href={GOOGLE_PLAY_URL} className={btnBase} aria-label="Google Play">
              <PlayCircle className="w-3.5 h-3.5" />
              {t('googlePlay')}
            </a>
          </div>

          {/* Mobile: lang + theme + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FF8F6B]/10 text-[var(--foreground)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden navbar-scrolled border-t border-[var(--border)]">
          <Container>
            <div className="py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] py-2 border-b border-[var(--border)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* SORUN 3: Mobilde tek buton (ayrı ayrı) */}
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={APP_STORE_URL}
                  className="flex items-center justify-center gap-2 bg-gradient-primary text-white text-sm font-semibold px-4 py-3 rounded-full"
                  onClick={() => setMobileOpen(false)}
                >
                  <Apple className="w-4 h-4" />
                  {t('appStore')}
                </a>
                <a
                  href={GOOGLE_PLAY_URL}
                  className="flex items-center justify-center gap-2 bg-gradient-primary text-white text-sm font-semibold px-4 py-3 rounded-full"
                  onClick={() => setMobileOpen(false)}
                >
                  <PlayCircle className="w-4 h-4" />
                  {t('googlePlay')}
                </a>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
