'use client';

import { useLocale } from 'next-intl';

interface HeroPhoneMockupProps {
  imageSrc?: string;
}

export default function HeroPhoneMockup({ imageSrc }: HeroPhoneMockupProps) {
  const locale = useLocale();
  const isTR = locale === 'tr';

  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF8F6B]/30 to-[#FF6B9D]/30 rounded-[3rem] blur-3xl scale-110" />

      {/* iPhone frame */}
      <div className="relative w-64 md:w-72 bg-[#1A1D24] rounded-[3rem] border-4 border-[#22262F] shadow-2xl shadow-black/50 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#1A1D24] rounded-b-2xl z-10 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#22262F]" />
          <div className="w-10 h-2 rounded-full bg-[#22262F]" />
        </div>

        {/* Screen */}
        {imageSrc ? (
          <div className="pt-8 min-h-[520px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt="PawCal Screenshot" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="pt-10 pb-6 px-4 min-h-[520px] phone-screen">
            {/* App header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-[#A0A4AE]">
                  {isTR ? 'Merhaba 👋' : 'Hello 👋'}
                </div>
                <div className="text-sm font-semibold text-white">Buddy</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm">
                🐕
              </div>
            </div>

            {/* Today card */}
            <div className="glass rounded-2xl p-3 mb-3">
              <div className="text-xs text-[#A0A4AE] mb-1">
                {isTR ? 'Bugün' : 'Today'}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#A0A4AE]">
                    {isTR ? 'Kalori' : 'Calories'}
                  </div>
                  <div className="text-lg font-bold text-white">
                    380
                    <span className="text-xs text-[#A0A4AE]">/450 kcal</span>
                  </div>
                </div>
                {/* Circle progress */}
                <div className="w-12 h-12 relative">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#22262F" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="14" fill="none"
                      stroke="#FF8F6B" strokeWidth="3"
                      strokeDasharray={`${(380 / 450) * 88} 88`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-[#FF8F6B]">
                    84%
                  </div>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { label: isTR ? 'Kilo' : 'Weight', value: '8.2 kg', color: '#4ADE80', emoji: '⚖️' },
                { label: isTR ? 'Aktivite' : 'Activity', value: '45 dk', color: '#FBBF24', emoji: '🏃' },
                { label: isTR ? 'Su' : 'Water', value: '200 ml', color: '#60A5FA', emoji: '💧' },
                { label: isTR ? 'İlaç' : 'Meds', value: '✓', color: '#FF6B9D', emoji: '💊' },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-2.5">
                  <div className="text-base mb-1">{item.emoji}</div>
                  <div className="text-[10px] text-[#A0A4AE]">{item.label}</div>
                  <div className="text-xs font-bold" style={{ color: item.color }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="glass rounded-2xl p-3">
              <div className="text-xs text-[#A0A4AE] mb-2">
                {isTR ? 'Son Aktivite' : 'Recent Activity'}
              </div>
              {[
                { emoji: '🍖', label: isTR ? 'Sabah öğünü' : 'Morning meal', time: '08:00' },
                { emoji: '🚶', label: isTR ? 'Sabah yürüyüşü' : 'Morning walk', time: '09:30' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 py-1">
                  <span className="text-sm">{item.emoji}</span>
                  <span className="text-[10px] text-white/80 flex-1">{item.label}</span>
                  <span className="text-[9px] text-[#A0A4AE]">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Home indicator */}
        <div className="flex justify-center pb-3 bg-[#1A1D24]">
          <div className="w-24 h-1 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -left-8 top-20 glass rounded-2xl px-3 py-2 shadow-xl">
        <div className="text-xs font-semibold text-white">
          🎯 {isTR ? 'Hedef Tamamlandı!' : 'Goal Reached!'}
        </div>
        <div className="text-[10px] text-[#A0A4AE]">
          {isTR ? 'Günlük aktivite' : 'Daily activity'}
        </div>
      </div>
      <div className="absolute -right-6 bottom-32 glass rounded-2xl px-3 py-2 shadow-xl">
        <div className="text-xs font-semibold text-[#FF8F6B]">
          💊 {isTR ? 'İlaç Zamanı' : 'Med Time'}
        </div>
        <div className="text-[10px] text-[#A0A4AE]">15:00</div>
      </div>
    </div>
  );
}
