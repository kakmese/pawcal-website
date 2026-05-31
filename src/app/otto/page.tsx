'use client';

import { useState } from 'react';

export default function OttoKodAlPage() {
  const [etiket, setEtiket] = useState('');
  const [kod, setKod] = useState<string | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [kopyalandi, setKopyalandi] = useState(false);

  async function kodAl() {
    setYukleniyor(true);
    setHata(null);
    setKopyalandi(false);
    try {
      const r = await fetch('/api/otto/kod-al-public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ etiket: etiket.trim() }),
      });
      const j = await r.json();
      if (!j.ok) {
        setHata(j.hata === 'limit' ? 'Çok fazla istek. Lütfen 1 saat sonra tekrar deneyin.' : 'Bir hata oluştu.');
      } else {
        setKod(j.kod);
      }
    } catch {
      setHata('Bağlantı hatası.');
    } finally {
      setYukleniyor(false);
    }
  }

  async function kopyala() {
    if (!kod) return;
    try {
      await navigator.clipboard.writeText(kod);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2000);
    } catch {}
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Otto — Erişim Kodu Al</h1>
        <p className="text-sm text-slate-600 mb-6">
          Otto uygulamasını kullanmak için bir erişim kodu alın. Bu kodu uygulamayı ilk açtığınızda girmeniz gerekir.
        </p>

        {!kod && (
          <>
            <label className="block text-sm font-medium text-slate-700 mb-2">İsim / Not (opsiyonel)</label>
            <input
              type="text"
              value={etiket}
              onChange={(e) => setEtiket(e.target.value)}
              placeholder="Adınız veya not"
              maxLength={60}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
              disabled={yukleniyor}
            />
            <button
              onClick={kodAl}
              disabled={yukleniyor}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {yukleniyor ? 'Üretiliyor...' : 'Kod Al'}
            </button>
            {hata && (
              <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{hata}</p>
            )}
          </>
        )}

        {kod && (
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-3">Erişim kodunuz hazır:</p>
            <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl py-6 px-4 mb-4">
              <code className="text-2xl sm:text-3xl font-mono font-bold tracking-wider text-slate-900 break-all">
                {kod}
              </code>
            </div>
            <button
              onClick={kopyala}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg transition-colors"
            >
              {kopyalandi ? '✓ Kopyalandı' : 'Kopyala'}
            </button>
            <p className="mt-4 text-sm text-slate-600">
              Bu kodu <strong>Otto</strong> uygulamasını ilk açtığında gir. Kod tek bir cihaza bağlanacak.
            </p>
            <button
              onClick={() => { setKod(null); setEtiket(''); }}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              Başka bir kod al
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
