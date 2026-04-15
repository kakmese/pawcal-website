'use client';

import { useTranslations } from 'next-intl';
import Container from './ui/Container';
import ScreenshotMockup from './ScreenshotMockup';

const screenshotSrcs = [
  '/screenshots/home-light.png',
  '/screenshots/health-light.png',
  '/screenshots/weight-light.png',
  '/screenshots/nearby-light.png',
  '/screenshots/community-dark.png',
  '/screenshots/home-dark.png',
];

export default function ScreenshotGallery() {
  const t = useTranslations('screenshots');

  const screenshots = screenshotSrcs.map((src, i) => ({
    src,
    title: t(`shot${i + 1}Title` as Parameters<typeof t>[0]),
    description: t(`shot${i + 1}Desc` as Parameters<typeof t>[0]),
  }));

  return (
    <section className="py-12 sm:py-16 bg-[var(--bg-secondary)]">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#FF8F6B] mb-2">
            {t('badge')}
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[var(--foreground)]">
            {t('title')}
          </h2>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 pb-4">
          {screenshots.map((s, i) => (
            <div key={i} className="flex-shrink-0 w-[80%] snap-center">
              <ScreenshotMockup
                src={s.src}
                alt={s.title}
                title={s.title}
                description={s.description}
              />
            </div>
          ))}
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {screenshots.map((s, i) => (
            <ScreenshotMockup
              key={i}
              src={s.src}
              alt={s.title}
              title={s.title}
              description={s.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
