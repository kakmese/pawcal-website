'use client';

import Image from 'next/image';

interface ScreenshotMockupProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export default function ScreenshotMockup({
  src,
  alt,
  title,
  description,
}: ScreenshotMockupProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* iPhone frame */}
      <div className="relative w-[200px] sm:w-[220px] aspect-[9/19.5]">
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-neutral-700 to-neutral-900 shadow-xl shadow-black/40 p-[8px]">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-20" />

          {/* Screen */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="220px"
            />
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-white/30 rounded-full z-20" />
        </div>
      </div>

      {/* Labels */}
      {title && (
        <div className="text-center">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">{title}</h3>
          {description && (
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-[190px] leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
