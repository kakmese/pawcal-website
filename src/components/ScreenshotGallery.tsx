'use client';

import { useLocale } from 'next-intl';
import Container from './ui/Container';
import ScreenshotMockup from './ScreenshotMockup';

export default function ScreenshotGallery() {
  const locale = useLocale();

  const screens = [
    {
      titleTR: 'Dashboard',
      titleEN: 'Dashboard',
      accentColor: '#FF8F6B',
    },
    {
      titleTR: 'Beslenme',
      titleEN: 'Nutrition',
      accentColor: '#4ADE80',
    },
    {
      titleTR: 'Sağlık',
      titleEN: 'Health',
      accentColor: '#FF6B9D',
    },
    {
      titleTR: 'Aktivite',
      titleEN: 'Activity',
      accentColor: '#FBBF24',
    },
  ];

  return (
    <section className="py-12 bg-[var(--bg-secondary)]">
      <Container>
        {/* SORUN 2: Grid layout, ortalanmış */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto justify-items-center">
          {screens.map((screen) => {
            const title = locale === 'tr' ? screen.titleTR : screen.titleEN;
            return (
              <ScreenshotMockup
                key={title}
                title={title}
                accentColor={screen.accentColor}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
