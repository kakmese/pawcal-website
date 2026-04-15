'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: 'tr' | 'en') => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center gap-1 bg-[#FF8F6B]/10 rounded-full p-1 border border-[#FF8F6B]/20">
      <button
        onClick={() => switchLocale('tr')}
        disabled={isPending}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
          locale === 'tr'
            ? 'bg-gradient-to-r from-[#FF8F6B] to-[#FF6B9D] text-white shadow-md'
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        TR
      </button>
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
          locale === 'en'
            ? 'bg-gradient-to-r from-[#FF8F6B] to-[#FF6B9D] text-white shadow-md'
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        EN
      </button>
    </div>
  );
}
