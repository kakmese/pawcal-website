'use client';

import { useEffect, useState } from 'react';

export default function OttoIndirPage() {
  const [versionName, setVersionName] = useState<string | null>(null);
  const [indiriliyor, setIndiriliyor] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/otto/surum');
        const j = await r.json();
        if (j.ok && j.versionName) setVersionName(j.versionName);
      } catch {}
    })();
  }, []);

  function indir() {
    setIndiriliyor(true);
    window.location.href = '/api/otto/indir';
    setTimeout(() => setIndiriliyor(false), 4000);
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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
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
                alt="Otto"
                width={96}
                height={96}
                style={{ display: 'block' }}
              />
            </div>

            <h1
              className="mt-6 text-white font-bold lowercase tracking-tight"
              style={{ fontSize: 40, lineHeight: 1.1 }}
            >
              otto
            </h1>

            <p className="mt-2 text-slate-300 text-sm sm:text-base">
              BYD Sealion 7 için akıllı yol bilgisayarı
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
                backgroundColor: '#2B6FFF',
                boxShadow:
                  '0 14px 32px rgba(43,111,255,0.45), 0 2px 6px rgba(43,111,255,0.3)',
                minWidth: 220,
              }}
            >
              {indiriliyor ? 'İndiriliyor...' : 'İndir'}
            </button>

            <a
              href="/otto/kurulum"
              className="mt-3 text-xs hover:underline"
              style={{ color: '#5AA9FF' }}
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
                  style={{ color: '#5AA9FF' }}
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
        </div>
      </div>
    </main>
  );
}
