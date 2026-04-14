'use client';

export default function ScreenshotGallery() {
  const screens = [
    { label: 'Dashboard', emoji: '📊', bg: 'from-[#FF8F6B]/20 to-[#FF6B9D]/20' },
    { label: 'Beslenme', emoji: '🍖', bg: 'from-[#4ADE80]/20 to-[#22C55E]/20' },
    { label: 'Sağlık', emoji: '❤️', bg: 'from-[#FF6B9D]/20 to-[#A78BFA]/20' },
    { label: 'Aktivite', emoji: '🏃', bg: 'from-[#FBBF24]/20 to-[#F59E0B]/20' },
  ];

  return (
    <section className="py-12 overflow-hidden">
      <div className="flex gap-6 overflow-x-auto pb-4 px-4 scrollbar-thin scrollbar-thumb-[#FF8F6B]/30 snap-x snap-mandatory">
        {screens.map((screen) => (
          <div
            key={screen.label}
            className={`flex-shrink-0 snap-center w-52 h-96 rounded-3xl bg-gradient-to-b ${screen.bg} glass flex flex-col items-center justify-center gap-4 border border-white/10`}
          >
            <div className="text-5xl">{screen.emoji}</div>
            <div className="text-sm font-semibold text-white/60">{screen.label}</div>
            <div className="text-xs text-white/30">Ekran görüntüsü yakında</div>
          </div>
        ))}
      </div>
    </section>
  );
}
