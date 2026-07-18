'use client';

import { useEffect, useState } from 'react';
import OttoTelegramPopup, { TelegramSerit } from '../../../components/OttoTelegram';

const OTTO_PLUS_APK_URL =
  'https://github.com/kakmese/pawcal-website/releases/download/ottoplus-v1.3/otto-plus-v1.3.apk';
const OTTO_MOBIL_APK_URL =
  'https://github.com/kakmese/pawcal-website/releases/download/ottomobil-v1.0.5/otto-mobil-v1.0.5.apk';
const OTTO_MOBIL_IPHONE_URL = 'https://pawcal.net/otto/mobil/';

const AKSAN = '#B892FF';
const AKSAN_YUMUSAK = '#D6BEFF';
const ALTIN = '#E7C86A';
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

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/otto/surum?tip=otto%2B');
        const j = await r.json();
        if (j.ok && j.versionName) setVersionName(j.versionName);
      } catch {}
    })();
  }, []);

  function indirOttoPlus() {
    setIndiriliyor(true);
    window.location.href = OTTO_PLUS_APK_URL;
    setTimeout(() => setIndiriliyor(false), 4000);
  }

  function indirAndroid() {
    setMobilIndiriliyor(true);
    window.location.href = OTTO_MOBIL_APK_URL;
    setTimeout(() => setMobilIndiriliyor(false), 4000);
  }

  function acIphoneSayfasi() {
    window.location.href = OTTO_MOBIL_IPHONE_URL;
  }

  return (
    <main
      className="relative min-h-screen w-full"
      style={{
        backgroundColor: '#0E1419',
        backgroundImage:
          'radial-gradient(1100px 520px at 50% -160px, rgba(122,75,255,0.22), transparent 62%)',
      }}
    >
      {/* HERO — kompakt */}
      <section className="relative z-10 px-4 pt-6 sm:pt-8 pb-3">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
          <div
            className="flex items-center justify-center overflow-hidden"
            style={{
              width: 68,
              height: 68,
              borderRadius: 18,
              backgroundColor: '#f1ede3',
              boxShadow: '0 10px 24px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.28)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/otto-logo.svg"
              alt="Otto+"
              width={68}
              height={68}
              style={{ display: 'block' }}
            />
          </div>

          <h1
            className="mt-3 text-white font-bold lowercase tracking-tight"
            style={{ fontSize: 30, lineHeight: 1.1 }}
          >
            otto+
          </h1>

          <p className="mt-1 text-slate-300 text-sm">
            BYD elektrikli araçlar için premium yol bilgisayarı
          </p>

          {versionName && (
            <p className="mt-0.5 text-slate-400 text-xs">
              Sürüm {versionName}
            </p>
          )}
        </div>
      </section>

      {/* İKİ İNDİRME KUTUSU — YAN YANA */}
      <section className="relative z-10 px-4 pt-3 pb-6">
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* KUTU A — Otto+ (Araç Ekranı) */}
            <div
              className="rounded-2xl p-5 sm:p-6 flex flex-col"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(184,146,255,0.35)',
                boxShadow:
                  '0 18px 40px rgba(122,75,255,0.20), 0 2px 6px rgba(0,0,0,0.35)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    backgroundColor: 'rgba(184,146,255,0.16)',
                    border: '1px solid rgba(184,146,255,0.40)',
                    fontSize: 22,
                  }}
                  aria-hidden
                >
                  🚗
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">
                    Otto+
                  </div>
                  <div
                    className="text-xs font-semibold tracking-wide uppercase"
                    style={{ color: ALTIN }}
                  >
                    Araç Ekranı
                  </div>
                </div>
              </div>

              <p className="mt-3 text-slate-300 text-sm leading-relaxed flex-1">
                Araç head-unit ekranına kurulur. Batarya, menzil, 3D araç
                görünümü ve canlı sürüş verileri doğrudan aracınızda.
              </p>

              <button
                onClick={indirOttoPlus}
                disabled={indiriliyor}
                className="mt-5 w-full py-3.5 rounded-xl text-white font-semibold text-base transition-transform active:scale-[0.98] disabled:opacity-70"
                style={{
                  backgroundColor: BUTON,
                  boxShadow:
                    '0 12px 28px rgba(122,75,255,0.42), 0 2px 6px rgba(122,75,255,0.28)',
                }}
              >
                {indiriliyor ? 'İndiriliyor...' : 'Otto+ İndir'}
              </button>

              <div className="mt-2 text-slate-500 text-xs text-center">
                APK · Android · BYD araçlar
              </div>
            </div>

            {/* KUTU B — Otto Mobil (Telefon) */}
            <div
              className="rounded-2xl p-5 sm:p-6 flex flex-col"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(231,200,106,0.35)',
                boxShadow:
                  '0 18px 40px rgba(231,200,106,0.14), 0 2px 6px rgba(0,0,0,0.35)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    backgroundColor: 'rgba(231,200,106,0.16)',
                    border: '1px solid rgba(231,200,106,0.40)',
                    fontSize: 22,
                  }}
                  aria-hidden
                >
                  📱
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">
                    Otto Mobil
                  </div>
                  <div
                    className="text-xs font-semibold tracking-wide uppercase"
                    style={{ color: AKSAN }}
                  >
                    Telefon
                  </div>
                </div>
              </div>

              <p className="mt-3 text-slate-300 text-sm leading-relaxed flex-1">
                Telefonunuzdan araç verilerine ulaşın. Otto+ ile aynı kodla
                birlikte çalışır.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <button
                  onClick={indirAndroid}
                  disabled={mobilIndiriliyor}
                  className="py-3.5 rounded-xl text-white font-semibold text-sm transition-transform active:scale-[0.98] disabled:opacity-70"
                  style={{
                    backgroundColor: '#1189FF',
                    boxShadow:
                      '0 10px 24px rgba(17,137,255,0.40), 0 2px 6px rgba(17,137,255,0.28)',
                  }}
                >
                  {mobilIndiriliyor ? 'İndiriliyor...' : 'Android'}
                </button>
                <button
                  onClick={acIphoneSayfasi}
                  className="py-3.5 rounded-xl font-semibold text-sm transition-transform active:scale-[0.98]"
                  style={{
                    backgroundColor: '#F4F4F6',
                    color: '#0E1419',
                    boxShadow:
                      '0 10px 24px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.24)',
                  }}
                >
                  iPhone
                </button>
              </div>

              <div className="mt-2 text-slate-500 text-xs text-center leading-relaxed">
                iPhone: açılan sayfada Paylaş → Ana Ekrana Ekle
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEK KOD, İKİ CİHAZ — akış */}
      <section className="relative z-10 px-4 pt-4 pb-10">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-5 sm:mb-6">
            <div
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: ALTIN }}
            >
              Tek kod, iki cihaz
            </div>
            <h2
              className="text-white font-bold"
              style={{ fontSize: 24, lineHeight: 1.2 }}
            >
              Aynı kod hem aracınızda hem telefonunuzda
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                n: '1',
                t: 'İndirin',
                d: 'Otto+ ve Otto Mobil uygulamalarını indirin.',
              },
              {
                n: '2',
                t: 'İletişime geçin',
                d: (
                  <>
                    <div>Kod satın almak için bizimle iletişime geçin:</div>
                    <div className="mt-2 flex flex-col gap-1.5">
                      <a
                        href="mailto:info@pawcal.net"
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold transition-colors hover:brightness-110"
                        style={{
                          backgroundColor: 'rgba(184,146,255,0.14)',
                          border: '1px solid rgba(184,146,255,0.40)',
                          color: AKSAN,
                        }}
                      >
                        <span aria-hidden>✉️</span>
                        info@pawcal.net
                      </a>
                      <a
                        href="https://t.me/AKINCl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold transition-colors hover:brightness-110"
                        style={{
                          backgroundColor: 'rgba(231,200,106,0.14)',
                          border: '1px solid rgba(231,200,106,0.40)',
                          color: ALTIN,
                        }}
                      >
                        <span aria-hidden>💬</span>
                        t.me/AKINCl
                      </a>
                    </div>
                  </>
                ),
              },
              {
                n: '3',
                t: 'Kodu girin',
                d: 'Aldığınız kodu hem araca hem telefona girin — entegre çalışır.',
              },
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
            className="mt-4 rounded-xl p-4 text-xs sm:text-sm leading-relaxed text-center"
            style={{
              backgroundColor: 'rgba(231,200,106,0.10)',
              border: '1px solid rgba(231,200,106,0.32)',
              color: '#F1E2A8',
            }}
          >
            <span className="font-semibold text-white">TEK kod</span> her iki
            cihazda geçerli — ayrı hesap veya ayrı ödeme yok.
          </div>
        </div>
      </section>

      {/* GALERİ — en altta */}
      <section className="relative z-10 px-4 pt-2 pb-16 sm:pb-20">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: AKSAN }}
            >
              Neler sunuyor
            </div>
            <h2
              className="text-white font-bold"
              style={{ fontSize: 26, lineHeight: 1.15 }}
            >
              Otto+ ile aracının içinde
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
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

          <div className="mt-12 sm:mt-14 text-center">
            <a
              href="/otto/kurulum"
              className="text-xs hover:underline"
              style={{ color: AKSAN_YUMUSAK }}
            >
              İndirdikten sonra → Araç verisi kurulumu
            </a>
          </div>
        </div>
      </section>
      <TelegramSerit />
      <OttoTelegramPopup />
    </main>
  );
}
