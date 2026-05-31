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
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-slate-500 tracking-widest lowercase">otto</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1 text-center">otto&apos;yu İndir</h1>
          <p className="text-sm text-slate-500 text-center mb-6">
            {versionName ? `Sürüm ${versionName}` : 'Sürüm bilgisi yükleniyor...'}
          </p>

          <button
            onClick={indir}
            disabled={indiriliyor}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
          >
            {indiriliyor ? 'İndiriliyor...' : 'İndir'}
          </button>

          <div className="mt-8">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">Kurulum</h2>
            <ol className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center">1</span>
                <span><strong className="text-slate-800">İndir</strong> — APK dosyası inecek.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center">2</span>
                <span><strong className="text-slate-800">Kur</strong> — &ldquo;Bilinmeyen kaynaklara izin ver&rdquo; uyarısı çıkarsa onayla.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center">3</span>
                <span>
                  <strong className="text-slate-800">Aç ve kodunu gir</strong> — kodun yoksa{' '}
                  <a href="/otto" className="text-blue-600 hover:underline">pawcal.net/otto</a> adresinden al.
                </span>
              </li>
            </ol>
          </div>

          <p className="mt-8 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-3 leading-relaxed">
            Otto, BYD Sealion 7 ve uyumlu BYD araçların ekranı için tasarlanmıştır.
          </p>
        </div>
      </div>
    </main>
  );
}
