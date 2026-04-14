'use client';

import { useLocale } from 'next-intl';

interface ScreenshotMockupProps {
  title: string;
  children?: React.ReactNode;
  accentColor?: string;
}

export default function ScreenshotMockup({
  title,
  children,
  accentColor = '#FF8F6B',
}: ScreenshotMockupProps) {
  const locale = useLocale();
  const comingSoon = locale === 'tr' ? 'Yakında' : 'Coming Soon';

  return (
    <div className="flex-shrink-0 w-52">
      {/* iPhone mini frame */}
      <div className="relative bg-[#1A1D24] rounded-[2rem] border-[3px] border-[#22262F] shadow-2xl shadow-black/40 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#1A1D24] rounded-b-xl z-10 flex items-center justify-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22262F]" />
          <div className="w-7 h-1.5 rounded-full bg-[#22262F]" />
        </div>

        {/* Screen area */}
        <div className="pt-6 pb-4 min-h-[360px] phone-screen flex flex-col">
          {/* Status bar */}
          <div className="px-4 flex items-center justify-between mb-2">
            <span className="text-[8px] text-[#A0A4AE]">9:41</span>
            <div className="flex gap-0.5 items-center">
              <div className="w-3 h-1.5 rounded-sm bg-[#4ADE80]" />
            </div>
          </div>

          {/* Screen header */}
          <div className="px-3 mb-3">
            <div
              className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full inline-block"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              PawCal
            </div>
            <div className="text-xs font-semibold text-white mt-1">{title}</div>
          </div>

          {/* Content area */}
          <div className="flex-1 px-3 flex flex-col items-center justify-center">
            {children ?? (
              <div className="text-center">
                <div className="text-3xl mb-2">🐾</div>
                <div
                  className="text-[10px] font-semibold px-3 py-1 rounded-full border"
                  style={{
                    color: accentColor,
                    borderColor: `${accentColor}40`,
                    backgroundColor: `${accentColor}10`,
                  }}
                >
                  {comingSoon}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2 bg-[#1A1D24]">
          <div className="w-14 h-0.5 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Label */}
      <div className="text-center mt-3">
        <span className="text-xs font-semibold text-[var(--text-secondary)]">{title}</span>
      </div>
    </div>
  );
}
