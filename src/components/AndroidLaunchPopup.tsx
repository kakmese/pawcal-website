'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.kakmese.pawcal';
const SESSION_KEY = 'pawcal-android-launch-dismissed';

export default function AndroidLaunchPopup() {
  const t = useTranslations('AndroidLaunch');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(SESSION_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-[320px] w-full animate-in slide-in-from-bottom-4 duration-300">
      <div className="glass rounded-2xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="text-2xl leading-none mt-0.5 select-none">🎉</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--foreground)] leading-snug">
              {t('title')}
            </p>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="mt-2 inline-block bg-gradient-primary text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
            >
              {t('cta')}
            </a>
          </div>
          <button
            onClick={dismiss}
            className="text-white/40 hover:text-white transition-colors mt-0.5 shrink-0"
            aria-label={t('close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
