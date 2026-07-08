'use client';

import { useEffect, useState } from 'react';

const OTTO_MOBIL_APK_URL =
  'https://github.com/kakmese/pawcal-website/releases/download/ottomobil-v1/otto-mobil.apk';

const AKSAN = '#B892FF';
const AKSAN_YUMUSAK = '#D6BEFF';
const BUTON = '#7A4BFF';

const GALERI: { src: string; baslik: string; aciklama: string }[] = [
  {
    src: '/otto-plus/1.png',
    baslik: 'Aracınızı 3D Görün',
    aciklama:
      'Batarya, menzil, kalan enerji ve tüm veriler tek ekranda; gerçekçi 3D araç modeliyle.',
  },
  {
    src: '/otto-plus/2.png',
    baslik: 'Dijital Gösterge Paneli',
    aciklama:
      'Menzil ve hız göstergeleri, anlık tüketim, kilometre bilgisi tek bakışta.',
  },
  {
    src: '/otto-plus/3.png',
    baslik: 'Sürüş Modu',
    aciklama:
      'Araç yola çıktığında canlı yol animasyonuyla gerçek sürüş hissi.',
  },
  {
    src: '/otto-plus/4.png',
    baslik: 'Şarj ve Enerji Takibi',
    aciklama:
      'Şarj geçmişi, TL cinsinden maliyet ve tüketim istatistikleri.',
  },
  {
    src: '/otto-plus/5.png',
    baslik: 'Şarj İstasyonları ve Harita',
    aciklama:
      'Yakındaki istasyonlar, fiyatlar, uygulama içi harita ve yol tarifi.',
  },
  {
    src: '/otto-plus/6.png',
    baslik: 'Dilediğiniz Gibi Kişiselleştirin',
    aciklama:
      'Renk, yüzey (parlak/metalik/mat), jant rengi ve plaka — aracınız tamamen size özel.',
  },
  {
    src: '/otto-plus/7.png',
    baslik: 'Canlı Sürüş Deneyimi',
    aciklama:
      'Sürüşe geçince genel ekranda da yol animasyonu ve anlık veriler.',
  },
];

export default function OttoPlusIndirPage() {
  const [versionName, setVersionName] = useState<string | null>(null);
  const [indiriliyor, setIndiriliyor] = useState(false);
  const [mobilIndiriliyor, setMobilIndiriliyor] = useState(false);
  const [mobilYayinda, setMobilYayinda] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/otto/surum?tip=otto%2B');
        const j = await r.json();
        if (j.ok && j.versionName) setVersionName(j.versionName);
      } catch {}
    })();
    (async () => {
      try {
        const r = await fetch('/api/otto/mobil-durum', { cache: 'no-store' });
        const j = await r.json();
        if (j.ok && j.yayinda === true) setMobilYayinda(true);
      } catch {}
    })();
  }, []);

  function indir() {
    setIndiriliyor(true);
    window.location.href = '/api/otto/indir?tip=otto%2B';
    setTimeout(() => setIndiriliyor(false), 4000);
  }

  function indirMobil() {
    setMobilIndiriliyor(true);
    window.location.href = OTTO_MOBIL_APK_URL;
    setTimeout(() => setMobilIndiriliyor(false), 4000);
  }

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#0E1419' }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/otto-genel.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,20,25,0.55) 0%, rgba(14,20,25,0.9) 100%)',
        }}
      />

      <div className="relative z-10 min-h-screen flex items-start sm:items-center justify-center px-4 pt-12 pb-8">
        <div className="w-full max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{
                width: 96,
                height: 96,
                borderRadius: 22,
                backgroundColor: '#f1ede3',
                boxShadow: '0 12px 32px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/otto-logo.svg"
                alt="Otto+"
                width={96}
                height={96}
                style={{ display: 'block' }}
              />
            </div>

            <h1
              className="mt-6 text-white font-bold lowercase tracking-tight"
              style={{ fontSize: 40, lineHeight: 1.1 }}
            >
              otto+
            </h1>

            <p className="mt-2 text-slate-300 text-sm sm:text-base">
              BYD elektrikli araçlar için premium yol bilgisayarı
            </p>

            {versionName && (
              <p className="mt-1 text-slate-400 text-xs sm:text-sm">
                Sürüm {versionName}
              </p>
            )}

            <button
              onClick={indir}
              disabled={indiriliyor}
              className="mt-8 w-full sm:w-auto sm:px-12 py-3.5 rounded-xl text-white font-semibold text-base transition-transform active:scale-[0.98] disabled:opacity-70"
              style={{
                backgroundColor: BUTON,
                boxShadow:
                  '0 14px 32px rgba(122,75,255,0.45), 0 2px 6px rgba(122,75,255,0.3)',
                minWidth: 220,
              }}
            >
              {indiriliyor ? 'İndiriliyor...' : 'İndir'}
            </button>

            <a
              href="/otto/kurulum"
              className="mt-3 text-xs hover:underline"
              style={{ color: AKSAN }}
            >
              İndirdikten sonra → Araç verisi kurulumu
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { n: '1', t: 'İndir', d: 'APK dosyası inecek' },
              { n: '2', t: 'Kur', d: '"Bilinmeyen kaynak" çıkarsa onayla' },
              { n: '3', t: 'Aç ve kodunu gir', d: 'Kodun yoksa pawcal.net/otto/kod' },
            ].map((a) => (
              <div
                key={a.n}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div
                  className="font-bold text-2xl mb-1"
                  style={{ color: AKSAN }}
                >
                  {a.n}
                </div>
                <div className="text-white font-semibold text-sm mb-1">
                  {a.t}
                </div>
                <div className="text-slate-400 text-xs leading-relaxed">
                  {a.d}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-4 rounded-xl p-4 text-xs sm:text-sm leading-relaxed"
            style={{
              backgroundColor: 'rgba(184,146,255,0.08)',
              border: '1px solid rgba(184,146,255,0.28)',
              color: AKSAN_YUMUSAK,
            }}
          >
            <span className="font-semibold text-white">Not:</span>{' '}
            Kurulumdan sonra araçta <span className="font-semibold">Ayarlar</span>{' '}
            üzerinden BYD araç verisi izinlerini vermen gerekiyor. Bu izinler
            olmadan araç verileri (batarya, hız, menzil vb.) görünmez.
          </div>

          {mobilYayinda && (
            <div
              className="mt-10 rounded-2xl p-6 sm:p-7"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    boxShadow: '0 8px 24px rgba(17,137,255,0.25)',
                    overflow: 'hidden',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/otto/mobil/otto_icon.png"
                    alt="Otto Mobil"
                    width={72}
                    height={72}
                    style={{ display: 'block', width: '100%', height: '100%' }}
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="text-white font-bold text-lg">Otto Mobil</div>
                  <div className="mt-1 text-slate-300 text-sm">
                    Telefonunda aracını takip et (Android)
                  </div>
                </div>

                <button
                  onClick={indirMobil}
                  disabled={mobilIndiriliyor}
                  className="w-full sm:w-auto sm:px-8 py-3 rounded-xl text-white font-semibold text-sm transition-transform active:scale-[0.98] disabled:opacity-70"
                  style={{
                    backgroundColor: '#1189FF',
                    boxShadow:
                      '0 10px 24px rgba(17,137,255,0.40), 0 2px 6px rgba(17,137,255,0.28)',
                    minWidth: 180,
                  }}
                >
                  {mobilIndiriliyor ? 'İndiriliyor...' : 'Android için indir'}
                </button>
              </div>

              <div
                className="mt-5 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="text-slate-400 text-xs sm:text-sm leading-relaxed text-center sm:text-left">
                  <span className="text-slate-200 font-semibold">iPhone:</span>{' '}
                  Safari&apos;de aç → Paylaş → Ana Ekrana Ekle
                </div>
                <a
                  href="/otto/mobil"
                  className="text-xs sm:text-sm font-semibold hover:underline whitespace-nowrap"
                  style={{ color: AKSAN }}
                >
                  pawcal.net/otto/mobil →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="relative z-10 px-4 pb-20 sm:pb-24">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: AKSAN }}
            >
              Neler sunuyor
            </div>
            <h2
              className="text-white font-bold"
              style={{ fontSize: 30, lineHeight: 1.15 }}
            >
              Otto+ ile aracının içinde
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Batarya ve menzilden şarj haritasına, 3D araç görünümünden canlı
              sürüşe kadar — hepsi tek uygulamada.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:gap-14">
            {GALERI.map((g, i) => (
              <article key={g.src} className="flex flex-col">
                <div
                  className="w-full overflow-hidden"
                  style={{
                    borderRadius: 18,
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow:
                      '0 22px 60px rgba(0,0,0,0.55), 0 4px 14px rgba(122,75,255,0.18)',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.src}
                    alt={g.baslik}
                    loading="lazy"
                    decoding="async"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
                <div className="mt-4 sm:mt-5 px-1">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 8,
                        backgroundColor: 'rgba(184,146,255,0.14)',
                        color: AKSAN,
                        border: '1px solid rgba(184,146,255,0.35)',
                      }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="text-white font-bold text-lg sm:text-xl">
                      {g.baslik}
                    </h3>
                  </div>
                  <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
                    {g.aciklama}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 sm:mt-16 text-center">
            <button
              onClick={indir}
              disabled={indiriliyor}
              className="w-full sm:w-auto sm:px-12 py-3.5 rounded-xl text-white font-semibold text-base transition-transform active:scale-[0.98] disabled:opacity-70"
              style={{
                backgroundColor: BUTON,
                boxShadow:
                  '0 14px 32px rgba(122,75,255,0.45), 0 2px 6px rgba(122,75,255,0.3)',
                minWidth: 220,
              }}
            >
              {indiriliyor ? 'İndiriliyor...' : 'Otto+ indir'}
            </button>
            <div className="mt-3 text-slate-500 text-xs">
              APK · Android · BYD elektrikli araçlar
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
