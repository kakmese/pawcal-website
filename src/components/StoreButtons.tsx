'use client';

import { Apple, PlayCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/constants/links';

interface StoreButtonsProps {
  size?: 'sm' | 'md' | 'lg';
  direction?: 'row' | 'col';
  className?: string;
}

export default function StoreButtons({
  size = 'md',
  direction = 'row',
  className = '',
}: StoreButtonsProps) {
  const t = useTranslations('storeButtons');
  const padding = {
    sm: 'px-4 py-2.5',
    md: 'px-5 py-3',
    lg: 'px-6 py-4',
  }[size];

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  const labelSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size];

  const subSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  }[size];

  const baseBtn =
    'inline-flex items-center gap-2.5 bg-gradient-primary text-white font-semibold rounded-2xl shadow-lg shadow-[#FF8F6B]/30 hover:shadow-[#FF8F6B]/50 hover:scale-105 active:scale-95 transition-all duration-200';

  const flexDir = direction === 'col' ? 'flex-col' : 'flex-row flex-wrap';

  return (
    <div className={`flex ${flexDir} gap-3 ${className}`}>
      <a href={APP_STORE_URL} className={`${baseBtn} ${padding}`} aria-label="App Store">
        <Apple className={iconSize} />
        <div className="text-left">
          <div className={`${subSize} opacity-80 leading-none mb-0.5`}>{t('downloadOn')}</div>
          <div className={`${labelSize} font-bold leading-none`}>{t('appStore')}</div>
        </div>
      </a>

      <a href={GOOGLE_PLAY_URL} className={`${baseBtn} ${padding}`} aria-label="Google Play">
        <PlayCircle className={iconSize} />
        <div className="text-left">
          <div className={`${subSize} opacity-80 leading-none mb-0.5`}>{t('getItOn')}</div>
          <div className={`${labelSize} font-bold leading-none`}>{t('googlePlay')}</div>
        </div>
      </a>
    </div>
  );
}
