'use client';

import Image from 'next/image';

interface HeroPhoneMockupProps {
  imageSrc?: string;
}

export default function HeroPhoneMockup({
  imageSrc = '/screenshots/home-light.png',
}: HeroPhoneMockupProps) {
  return (
    <div className="relative mx-auto w-[200px] sm:w-[280px]">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF8F6B]/30 to-[#FF6B9D]/30 rounded-[3rem] blur-3xl scale-110 pointer-events-none" />

      {/* iPhone frame */}
      <div className="relative aspect-[9/19.5] rounded-[3rem] bg-gradient-to-b from-neutral-700 to-neutral-900 shadow-2xl shadow-black/60 p-[10px]">
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-neutral-600 rounded-l-sm" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-neutral-600 rounded-l-sm" />
        <div className="absolute -left-[3px] top-52 w-[3px] h-12 bg-neutral-600 rounded-l-sm" />
        <div className="absolute -right-[3px] top-36 w-[3px] h-16 bg-neutral-600 rounded-r-sm" />

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20" />

        {/* Screen */}
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black">
          <Image
            src={imageSrc}
            alt="PawCal ana ekran"
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 640px) 200px, 280px"
          />
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full z-20" />
      </div>

      {/* Floating badges */}
      <div className="absolute -left-10 top-24 glass rounded-2xl px-3 py-2 shadow-xl hidden sm:block">
        <div className="text-xs font-semibold text-white">🎯 Goal Reached!</div>
        <div className="text-[10px] text-[#A0A4AE]">Daily activity</div>
      </div>

      <div className="absolute -right-8 bottom-36 glass rounded-2xl px-3 py-2 shadow-xl hidden sm:block">
        <div className="text-xs font-semibold text-[#FF8F6B]">💊 Med Time</div>
        <div className="text-[10px] text-[#A0A4AE]">15:00</div>
      </div>
    </div>
  );
}
