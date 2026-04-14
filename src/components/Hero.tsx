'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Download, ChevronDown, Apple } from 'lucide-react';
import Badge from './ui/Badge';
import Container from './ui/Container';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[var(--background)]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF8F6B]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B9D]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FF8F6B]/10 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <Badge variant="success" className="mb-6 mx-auto lg:mx-0">
              🐾 {t('badge')}
            </Badge>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              <span className="text-white">{t('title')}</span>
              <br />
              <span className="text-gradient-primary">{t('titleHighlight')}</span>
            </h1>

            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {t('description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#"
                className="flex items-center gap-3 bg-white text-[#111318] font-semibold px-6 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl shadow-black/30 justify-center"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs text-[#6B7280] leading-none mb-0.5">
                    Download on the
                  </div>
                  <div className="text-base font-bold leading-none">App Store</div>
                </div>
              </a>
              <Link
                href={`/${locale}/features`}
                className="flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-6 py-4 rounded-2xl hover:bg-white/10 transition-all"
              >
                {t('learnMore')}
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { value: '10K+', label: t('stats.pets') },
                { value: '500K+', label: t('stats.meals') },
                { value: '50K+', label: t('stats.reminders') },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display font-bold text-2xl md:text-3xl text-gradient-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: iPhone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FF8F6B]/30 to-[#FF6B9D]/30 rounded-[3rem] blur-3xl scale-110" />

              {/* iPhone frame */}
              <div className="relative w-64 md:w-72 bg-[#1A1D24] rounded-[3rem] border-4 border-[#22262F] shadow-2xl shadow-black/50 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#1A1D24] rounded-b-2xl z-10 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#22262F]" />
                  <div className="w-10 h-2 rounded-full bg-[#22262F]" />
                </div>

                {/* Screen content */}
                <div className="pt-10 pb-6 px-4 min-h-[520px] bg-gradient-to-b from-[#111318] to-[#1A1D24]">
                  {/* App header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-[#A0A4AE]">Merhaba 👋</div>
                      <div className="text-sm font-semibold text-white">Buddy</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm">
                      🐕
                    </div>
                  </div>

                  {/* Today card */}
                  <div className="glass rounded-2xl p-3 mb-3">
                    <div className="text-xs text-[#A0A4AE] mb-1">Bugün</div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[#A0A4AE]">Kalori</div>
                        <div className="text-lg font-bold text-white">
                          380
                          <span className="text-xs text-[#A0A4AE]">/450 kcal</span>
                        </div>
                      </div>
                      {/* Mini progress */}
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
                      { label: 'Kilo', value: '8.2 kg', color: '#4ADE80', emoji: '⚖️' },
                      { label: 'Aktivite', value: '45 dk', color: '#FBBF24', emoji: '🏃' },
                      { label: 'Su', value: '200 ml', color: '#60A5FA', emoji: '💧' },
                      { label: 'İlaç', value: '✓', color: '#FF6B9D', emoji: '💊' },
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
                    <div className="text-xs text-[#A0A4AE] mb-2">Son Aktivite</div>
                    {[
                      { emoji: '🍖', label: 'Sabah öğünü', time: '08:00' },
                      { emoji: '🚶', label: 'Sabah yürüyüşü', time: '09:30' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2 py-1">
                        <span className="text-sm">{item.emoji}</span>
                        <span className="text-[10px] text-white/80 flex-1">{item.label}</span>
                        <span className="text-[9px] text-[#A0A4AE]">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center pb-3">
                  <div className="w-24 h-1 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -left-8 top-20 glass rounded-2xl px-3 py-2 shadow-xl">
                <div className="text-xs font-semibold text-white">🎯 Hedef Tamamlandı!</div>
                <div className="text-[10px] text-[#A0A4AE]">Günlük aktivite</div>
              </div>
              <div className="absolute -right-6 bottom-32 glass rounded-2xl px-3 py-2 shadow-xl">
                <div className="text-xs font-semibold text-[#FF8F6B]">💊 İlaç Zamanı</div>
                <div className="text-[10px] text-[#A0A4AE]">15:00</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
