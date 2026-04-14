'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X, Download, PawPrint } from 'lucide-react';
import { type Locale } from '@/i18n/config';
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-xl bg-[#111318]/80 border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-[#FF8F6B]/30 group-hover:scale-110 transition-transform">
              <PawPrint className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">
              PawCal
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
            <Link
              href="#"
              className="flex items-center gap-2 bg-gradient-primary text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg shadow-[#FF8F6B]/30 hover:shadow-[#FF8F6B]/50 hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              {t('download')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden backdrop-blur-xl bg-[#111318]/95 border-t border-white/10">
          <Container>
            <div className="py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/80 hover:text-white py-2 border-b border-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <LanguageSwitcher locale={locale} />
                <ThemeToggle />
              </div>
              <Link
                href="#"
                className="flex items-center justify-center gap-2 bg-gradient-primary text-white text-sm font-semibold px-4 py-3 rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                <Download className="w-4 h-4" />
                {t('download')}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
