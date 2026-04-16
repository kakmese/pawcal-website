import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111318]">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🐾</div>
        <h1 className="font-display font-bold text-4xl text-white mb-4">404</h1>
        <p className="text-[#A0A4AE] text-lg mb-2">{t('title')}</p>
        <p className="text-[#A0A4AE] text-sm mb-8">{t('description')}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF8F6B] to-[#FF6B9D] text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          {t('homeLink')}
        </Link>
      </div>
    </div>
  );
}
