'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
  locale: Locale;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-1 bg-[#FF8F6B]/10 rounded-full p-1">
      {(['tr', 'en'] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all ${
            locale === l
              ? 'bg-[#FF8F6B] text-white'
              : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
