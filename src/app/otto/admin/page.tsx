'use client';

import { useState } from 'react';

type Ozet = { toplam: number; aktive: number; bos: number; aktif7: number; iptalli: number };
type Satir = {
  kod: string;
  durum: string;
  not_alan: string | null;
  cihaz_id: string | null;
  olusturma_tarihi: string;
  aktivasyon_tarihi: string | null;
  son_gorulme: string | null;
  uygulama_surumu: string | null;
  iptal: boolean;
};

function kisalt(s: string | null, n = 8): string {
  if (!s) return '—';
  return s.length > n ? s.slice(0, n) + '…' : s;
}

function tarih(s: string | null): string {
  if (!s) return '—';
  const d = new Date(s);
  return d.toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' });
}

export default function OttoAdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [giris, setGiris] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [ozet, setOzet] = useState<Ozet | null>(null);
  const [liste, setListe] = useState<Satir[]>([]);

  const [yEtiket, setYEtiket] = useState('');
  const [yAdet, setYAdet] = useState('1');
  const [yYukleniyor, setYYukleniyor] = useState(false);
  const [yeniKodlar, setYeniKodlar] = useState<string[]>([]);
  const [yHata, setYHata] = useState<string | null>(null);

  const [iptalIsleniyor, setIptalIsleniyor] = useState<string | null>(null);

  async function kodIptal(kod: string, yeniDurum: boolean) {
    setIptalIsleniyor(kod);
    try {
      const r = await fetch('/api/otto/iptal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminKey, kod, iptal: yeniDurum }),
      });
      const j = await r.json();
      if (j.ok) await istatistikYukle(adminKey);
    } catch {} finally {
      setIptalIsleniyor(null);
    }
  }

  async function istatistikYukle(key: string) {
    setYukleniyor(true);
    setHata(null);
    try {
      const r = await fetch('/api/otto/istatistik', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminKey: key }),
      });
      const j = await r.json();
      if (!j.ok) {
        setHata(j.hata === 'yetkisiz' ? 'Yanlış şifre.' : 'Bir hata oluştu.');
        return false;
      }
      setOzet(j.ozet);
      setListe(j.liste);
      return true;
    } catch {
      setHata('Bağlantı hatası.');
      return false;
    } finally {
      setYukleniyor(false);
    }
  }

  async function girisYap() {
    if (!adminKey) return;
    const ok = await istatistikYukle(adminKey);
    if (ok) setGiris(true);
  }

  async function kodUret() {
    setYYukleniyor(true);
    setYHata(null);
    setYeniKodlar([]);
    try {
      const r = await fetch('/api/otto/kod-al', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminKey,
          etiket: yEtiket.trim() || null,
          adet: parseInt(yAdet) || 1,
        }),
      });
      const j = await r.json();
      if (!j.ok) {
        setYHata(j.hata === 'yetkisiz' ? 'Yetki hatası.' : 'Bir hata oluştu.');
      } else {
        setYeniKodlar(j.kodlar);
        await istatistikYukle(adminKey);
      }
    } catch {
      setYHata('Bağlantı hatası.');
    } finally {
      setYYukleniyor(false);
    }
  }

  if (!giris) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-800 rounded-2xl shadow-2xl p-8">
          <h1 className="text-xl font-bold text-white mb-6">Otto Admin</h1>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && girisYap()}
            placeholder="Admin şifresi"
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={yukleniyor}
          />
          <button
            onClick={girisYap}
            disabled={yukleniyor || !adminKey}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş'}
          </button>
          {hata && (
            <p className="mt-4 text-sm text-red-300 bg-red-900/30 border border-red-800 rounded-lg p-3">{hata}</p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Otto Admin</h1>
          <button
            onClick={() => { setGiris(false); setAdminKey(''); setOzet(null); setListe([]); setYeniKodlar([]); }}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Çıkış
          </button>
        </div>

        {ozet && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <Kutu baslik="Toplam Kod" deger={ozet.toplam} renk="slate" />
            <Kutu baslik="Aktive" deger={ozet.aktive} renk="green" />
            <Kutu baslik="Boş" deger={ozet.bos} renk="blue" />
            <Kutu baslik="Son 7 Günde Aktif" deger={ozet.aktif7} renk="purple" />
            <Kutu baslik="İptalli" deger={ozet.iptalli} renk="red" />
          </div>
        )}

        <section className="bg-white rounded-xl shadow p-5 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Yeni Kod Üret</h2>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_auto] gap-3">
            <input
              type="text"
              value={yEtiket}
              onChange={(e) => setYEtiket(e.target.value)}
              placeholder="Etiket / not (opsiyonel)"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              disabled={yYukleniyor}
            />
            <input
              type="number"
              value={yAdet}
              onChange={(e) => setYAdet(e.target.value)}
              min={1}
              max={50}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              disabled={yYukleniyor}
            />
            <button
              onClick={kodUret}
              disabled={yYukleniyor}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              {yYukleniyor ? 'Üretiliyor...' : 'Üret'}
            </button>
          </div>
          {yHata && <p className="mt-3 text-sm text-red-600">{yHata}</p>}
          {yeniKodlar.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-900 mb-2">{yeniKodlar.length} kod üretildi:</p>
              <div className="font-mono text-sm text-slate-900 space-y-1">
                {yeniKodlar.map((k) => <div key={k}>{k}</div>)}
              </div>
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Kodlar ({liste.length})</h2>
            <button
              onClick={() => istatistikYukle(adminKey)}
              disabled={yukleniyor}
              className="text-sm text-blue-600 hover:underline disabled:text-slate-400"
            >
              {yukleniyor ? 'Yükleniyor...' : 'Yenile'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 text-left">
                <tr>
                  <th className="px-3 py-2 font-medium">Kod</th>
                  <th className="px-3 py-2 font-medium">Durum</th>
                  <th className="px-3 py-2 font-medium">Etiket</th>
                  <th className="px-3 py-2 font-medium">Cihaz</th>
                  <th className="px-3 py-2 font-medium">Oluşturma</th>
                  <th className="px-3 py-2 font-medium">Aktivasyon</th>
                  <th className="px-3 py-2 font-medium">Son Görülme</th>
                  <th className="px-3 py-2 font-medium">Sürüm</th>
                  <th className="px-3 py-2 font-medium">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {liste.map((s) => (
                  <tr key={s.kod} className={
                    s.iptal
                      ? 'border-t border-slate-100 text-slate-900 bg-red-50'
                      : 'border-t border-slate-100 text-slate-900'
                  }>
                    <td className="px-3 py-2 font-mono text-xs">
                      {s.kod}
                      {s.iptal && (
                        <span className="ml-2 inline-block px-1.5 py-0.5 text-[10px] rounded bg-red-600 text-white font-sans font-semibold">İPTAL</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <span className={
                        s.durum === 'kullanildi'
                          ? 'inline-block px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800'
                          : 'inline-block px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700'
                      }>
                        {s.durum}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-600 max-w-[160px] truncate" title={s.not_alan || ''}>{s.not_alan || '—'}</td>
                    <td className="px-3 py-2 font-mono text-xs text-slate-600" title={s.cihaz_id || ''}>{kisalt(s.cihaz_id, 10)}</td>
                    <td className="px-3 py-2 text-xs text-slate-600">{tarih(s.olusturma_tarihi)}</td>
                    <td className="px-3 py-2 text-xs text-slate-600">{tarih(s.aktivasyon_tarihi)}</td>
                    <td className="px-3 py-2 text-xs text-slate-600">{tarih(s.son_gorulme)}</td>
                    <td className="px-3 py-2 text-xs text-slate-600">{s.uygulama_surumu || '—'}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => kodIptal(s.kod, !s.iptal)}
                        disabled={iptalIsleniyor === s.kod}
                        className={
                          s.iptal
                            ? 'text-xs px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:opacity-50'
                            : 'text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-50'
                        }
                      >
                        {iptalIsleniyor === s.kod ? '...' : (s.iptal ? 'Geri Al' : 'İptal Et')}
                      </button>
                    </td>
                  </tr>
                ))}
                {liste.length === 0 && (
                  <tr><td colSpan={9} className="px-3 py-8 text-center text-slate-500">Henüz kod yok.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function Kutu({ baslik, deger, renk }: { baslik: string; deger: number; renk: 'slate' | 'green' | 'blue' | 'purple' | 'red' }) {
  const renkler: Record<string, string> = {
    slate: 'text-slate-900',
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
  };
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="text-xs text-slate-500 mb-1">{baslik}</div>
      <div className={`text-2xl font-bold ${renkler[renk]}`}>{deger}</div>
    </div>
  );
}
