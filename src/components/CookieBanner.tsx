'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const t = useTranslations('CookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('pawcal-cookies');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('pawcal-cookies', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('pawcal-cookies', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="glass rounded-2xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-sm text-[var(--foreground)]">
              {t('message')}{' '}
              <Link href="/cookies" className="text-[#FF8F6B] hover:underline">
                {t('policyLink')}
              </Link>
              {t('messageSuffix')}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={accept}
                className="flex-1 bg-gradient-primary text-white text-xs font-semibold py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                {t('accept')}
              </button>
              <button
                onClick={decline}
                className="flex-1 bg-white/10 text-white/70 text-xs font-semibold py-2 rounded-full hover:bg-white/20 transition-colors"
              >
                {t('reject')}
              </button>
            </div>
          </div>
          <button
            onClick={decline}
            className="text-white/40 hover:text-white transition-colors mt-0.5"
            aria-label={t('close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
