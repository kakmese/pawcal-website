'use client';

import { useMemo, useState } from 'react';

type Ozet = { toplam: number; aktive: number; bos: number; aktif7: number; iptalli: number; otto_plus: number };
type KodTip = 'otto' | 'otto+';
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
  tip: KodTip;
};
type KullOzet = { toplam_arac: number; otto_kullanan: number; mobil_kuran: number; ikisi: number };
type KullSatir = {
  cihaz_id: string;
  otto_kod: string | null;
  otto_son: string | null;
  mobil_sayisi: number;
  mobil_son: string | null;
  platformlar: string[] | null;
  acilis_toplam: number;
};

const SAYFA_BOYU = 20;

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
  const [yYukleniyor, setYYukleniyor] = useState<KodTip | null>(null);
  const [yeniKodlar, setYeniKodlar] = useState<string[]>([]);
  const [yeniKodlarTip, setYeniKodlarTip] = useState<KodTip>('otto');
  const [yHata, setYHata] = useState<string | null>(null);

  const [iptalIsleniyor, setIptalIsleniyor] = useState<string | null>(null);

  const [kullOzet, setKullOzet] = useState<KullOzet | null>(null);
  const [kullListe, setKullListe] = useState<KullSatir[]>([]);
  const [kullYukleniyor, setKullYukleniyor] = useState(false);
  const [kullHata, setKullHata] = useState<string | null>(null);

  const [sVersionCode, setSVersionCode] = useState('');
  const [sVersionName, setSVersionName] = useState('');
  const [sApkUrl, setSApkUrl] = useState('');
  const [sNotlar, setSNotlar] = useState('');
  const [sZorunlu, setSZorunlu] = useState(false);
  const [sYukleniyor, setSYukleniyor] = useState(false);
  const [sMesaj, setSMesaj] = useState<string | null>(null);
  const [sHata, setSHata] = useState<string | null>(null);
  const [sMevcut, setSMevcut] = useState<{ versionCode: number; versionName: string } | null>(null);

  const [mobilYayinda, setMobilYayinda] = useState(false);
  const [mobilYayindaYukleniyor, setMobilYayindaYukleniyor] = useState(false);

  const [kullAcik, setKullAcik] = useState(false);
  const [kullArama, setKullArama] = useState('');
  const [kullSayfa, setKullSayfa] = useState(1);

  const [mobAcik, setMobAcik] = useState(false);
  const [mobArama, setMobArama] = useState('');
  const [mobSayfa, setMobSayfa] = useState(1);

  const [kodAcik, setKodAcik] = useState(false);
  const [kodArama, setKodArama] = useState('');
  const [kodSayfa, setKodSayfa] = useState(1);
  const [kodTipFiltre, setKodTipFiltre] = useState<'hepsi' | KodTip>('hepsi');

  const [dTip, setDTip] = useState<KodTip>('otto');
  const [dAktif, setDAktif] = useState(false);
  const [dBaslik, setDBaslik] = useState('');
  const [dMetin, setDMetin] = useState('');
  const [dButon, setDButon] = useState('');
  const [dLink, setDLink] = useState('');
  const [dNo, setDNo] = useState<number | null>(null);
  const [dYukleniyor, setDYukleniyor] = useState(false);
  const [dKaydediyor, setDKaydediyor] = useState(false);
  const [dMesaj, setDMesaj] = useState<string | null>(null);
  const [dHata, setDHata] = useState<string | null>(null);

  async function surumYukle() {
    try {
      const r = await fetch('/api/otto/surum');
      const j = await r.json();
      if (j.ok) {
        setSVersionCode(String(j.versionCode ?? ''));
        setSVersionName(j.versionName ?? '');
        setSApkUrl(j.apkUrl ?? '');
        setSNotlar(j.notlar ?? '');
        setSZorunlu(j.zorunlu === true);
        setSMevcut({ versionCode: j.versionCode, versionName: j.versionName });
      }
    } catch {}
  }

  async function mobilDurumYukle() {
    try {
      const r = await fetch('/api/otto/mobil-durum', { cache: 'no-store' });
      const j = await r.json();
      if (j.ok) setMobilYayinda(j.yayinda === true);
    } catch {}
  }

  async function mobilDurumDegistir(yeni: boolean) {
    setMobilYayindaYukleniyor(true);
    const eski = mobilYayinda;
    setMobilYayinda(yeni);
    try {
      const r = await fetch('/api/otto/mobil-durum-set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ adminKey, yayinda: yeni }),
      });
      const j = await r.json();
      if (!j.ok) setMobilYayinda(eski);
    } catch {
      setMobilYayinda(eski);
    } finally {
      setMobilYayindaYukleniyor(false);
    }
  }

  async function surumKaydet() {
    setSYukleniyor(true);
    setSMesaj(null);
    setSHata(null);
    try {
      const r = await fetch('/api/otto/surum-guncelle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminKey,
          versionCode: parseInt(sVersionCode) || 0,
          versionName: sVersionName.trim(),
          apkUrl: sApkUrl.trim() || null,
          notlar: sNotlar.trim() || null,
          zorunlu: sZorunlu,
        }),
      });
      const j = await r.json();
      if (!j.ok) {
        setSHata(j.hata === 'yetkisiz' ? 'Yetki hatası.' : j.hata === 'eksik' ? 'Version code ve name zorunlu.' : 'Bir hata oluştu.');
      } else {
        setSMesaj('Kaydedildi.');
        await surumYukle();
      }
    } catch {
      setSHata('Bağlantı hatası.');
    } finally {
      setSYukleniyor(false);
    }
  }

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

  async function kullaniciYukle(key: string) {
    setKullYukleniyor(true);
    setKullHata(null);
    try {
      const r = await fetch('/api/otto/kullanicilar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
        body: JSON.stringify({ adminKey: key }),
      });
      const j = await r.json();
      if (!j.ok) {
        setKullHata(j.hata === 'yetkisiz' ? 'Yetki hatası.' : 'Bir hata oluştu.');
        return;
      }
      setKullOzet(j.ozet);
      setKullListe(j.liste);
    } catch {
      setKullHata('Bağlantı hatası.');
    } finally {
      setKullYukleniyor(false);
    }
  }

  async function duyuruYukle(tip: KodTip) {
    setDYukleniyor(true);
    setDMesaj(null);
    setDHata(null);
    try {
      const r = await fetch(`/api/otto/duyuru?tip=${encodeURIComponent(tip)}`, { cache: 'no-store' });
      const j = await r.json();
      if (!j.ok) {
        setDHata('Duyuru yüklenemedi.');
        return;
      }
      setDAktif(j.aktif === true);
      setDBaslik(j.baslik ?? '');
      setDMetin(j.metin ?? '');
      setDButon(j.buton ?? '');
      setDLink(j.link ?? '');
      setDNo(typeof j.no === 'number' ? j.no : null);
    } catch {
      setDHata('Bağlantı hatası.');
    } finally {
      setDYukleniyor(false);
    }
  }

  async function duyuruTipDegistir(yeni: KodTip) {
    if (yeni === dTip) return;
    setDTip(yeni);
    await duyuruYukle(yeni);
  }

  async function duyuruKaydet() {
    setDKaydediyor(true);
    setDMesaj(null);
    setDHata(null);
    try {
      const r = await fetch('/api/otto/duyuru-set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({
          adminKey,
          tip: dTip,
          aktif: dAktif,
          baslik: dBaslik.trim(),
          metin: dMetin,
          buton: dButon.trim(),
          link: dLink.trim(),
        }),
      });
      const j = await r.json();
      if (!j.ok) {
        setDHata(j.hata === 'yetkisiz' ? 'Yetki hatası.' : 'Kaydedilemedi.');
        return;
      }
      setDNo(typeof j.yeniNo === 'number' ? j.yeniNo : null);
      setDMesaj(dAktif ? 'Yayınlandı.' : 'Kaydedildi (kapalı).');
    } catch {
      setDHata('Bağlantı hatası.');
    } finally {
      setDKaydediyor(false);
    }
  }

  async function girisYap() {
    if (!adminKey) return;
    const ok = await istatistikYukle(adminKey);
    if (ok) {
      setGiris(true);
      surumYukle();
      kullaniciYukle(adminKey);
      mobilDurumYukle();
      duyuruYukle(dTip);
    }
  }

  async function kodUret(tip: KodTip) {
    setYYukleniyor(tip);
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
          tip,
        }),
      });
      const j = await r.json();
      if (!j.ok) {
        setYHata(j.hata === 'yetkisiz' ? 'Yetki hatası.' : 'Bir hata oluştu.');
      } else {
        setYeniKodlar(j.kodlar);
        setYeniKodlarTip(tip);
        await istatistikYukle(adminKey);
      }
    } catch {
      setYHata('Bağlantı hatası.');
    } finally {
      setYYukleniyor(null);
    }
  }

  const kullFiltre = useMemo(() => {
    const q = kullArama.trim().toLowerCase();
    if (!q) return kullListe;
    return kullListe.filter(
      (s) =>
        (s.otto_kod || '').toLowerCase().includes(q) ||
        s.cihaz_id.toLowerCase().includes(q),
    );
  }, [kullListe, kullArama]);

  const mobListe = useMemo(() => kullListe.filter((s) => s.mobil_sayisi > 0), [kullListe]);
  const mobFiltre = useMemo(() => {
    const q = mobArama.trim().toLowerCase();
    if (!q) return mobListe;
    return mobListe.filter(
      (s) =>
        (s.otto_kod || '').toLowerCase().includes(q) ||
        s.cihaz_id.toLowerCase().includes(q),
    );
  }, [mobListe, mobArama]);

  const kodFiltre = useMemo(() => {
    const q = kodArama.trim().toLowerCase();
    const tipe = kodTipFiltre;
    return liste.filter((s) => {
      if (tipe !== 'hepsi' && (s.tip || 'otto') !== tipe) return false;
      if (!q) return true;
      return (
        s.kod.toLowerCase().includes(q) ||
        (s.cihaz_id || '').toLowerCase().includes(q) ||
        (s.not_alan || '').toLowerCase().includes(q)
      );
    });
  }, [liste, kodArama, kodTipFiltre]);

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
          <div className="flex items-center gap-3">
            <a
              href={`/otto/telemetry?key=${encodeURIComponent(adminKey)}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              📊 Telemetri Paneli
            </a>
            <button
              onClick={() => { setGiris(false); setAdminKey(''); setOzet(null); setListe([]); setYeniKodlar([]); setKullOzet(null); setKullListe([]); }}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Çıkış
            </button>
          </div>
        </div>

        {/* Özet 4 kutu — her zaman görünür */}
        {kullOzet && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <Kutu baslik="Toplam Araç" deger={kullOzet.toplam_arac} renk="slate" />
            <Kutu baslik="Otto Kullanan" deger={kullOzet.otto_kullanan} renk="green" />
            <Kutu baslik="Otto Mobil Kuran" deger={kullOzet.mobil_kuran} renk="blue" />
            <Kutu baslik="İkisini Kullanan" deger={kullOzet.ikisi} renk="purple" />
          </div>
        )}

        {/* Otto Mobil aç/kapa */}
        <section className="bg-white rounded-xl shadow p-4 mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">Otto Mobil indirme</div>
            <div className="text-xs text-slate-500 mt-0.5">
              /otto/indir sayfasında Otto Mobil kartının gösterilip gösterilmeyeceğini kontrol eder.
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className={
                mobilYayinda
                  ? 'text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full'
                  : 'text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full'
              }
            >
              {mobilYayinda ? 'Açık' : 'Kapalı'}
            </span>
            <button
              onClick={() => mobilDurumDegistir(!mobilYayinda)}
              disabled={mobilYayindaYukleniyor}
              className={
                mobilYayinda
                  ? 'relative inline-flex h-7 w-12 items-center rounded-full bg-green-500 transition-colors disabled:opacity-60'
                  : 'relative inline-flex h-7 w-12 items-center rounded-full bg-slate-300 transition-colors disabled:opacity-60'
              }
              aria-pressed={mobilYayinda}
              aria-label="Otto Mobil indirme aç/kapa"
            >
              <span
                className={
                  mobilYayinda
                    ? 'inline-block h-5 w-5 transform rounded-full bg-white shadow translate-x-6 transition-transform'
                    : 'inline-block h-5 w-5 transform rounded-full bg-white shadow translate-x-1 transition-transform'
                }
              />
            </button>
          </div>
        </section>

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
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_auto_auto] gap-3">
            <input
              type="text"
              value={yEtiket}
              onChange={(e) => setYEtiket(e.target.value)}
              placeholder="Etiket / not (opsiyonel)"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              disabled={yYukleniyor !== null}
            />
            <input
              type="number"
              value={yAdet}
              onChange={(e) => setYAdet(e.target.value)}
              min={1}
              max={50}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              disabled={yYukleniyor !== null}
            />
            <button
              onClick={() => kodUret('otto')}
              disabled={yYukleniyor !== null}
              className="bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400 text-white font-medium px-5 py-2 rounded-lg transition-colors"
            >
              {yYukleniyor === 'otto' ? 'Üretiliyor...' : 'Otto Üret'}
            </button>
            <button
              onClick={() => kodUret('otto+')}
              disabled={yYukleniyor !== null}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium px-5 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              {yYukleniyor === 'otto+' ? 'Üretiliyor...' : (<><span>Otto+ Üret</span></>)}
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            <b>Otto</b> = ücretsiz sürüm. <b className="text-blue-700">Otto+</b> = premium/ücretli sürüm.
          </p>
          {yHata && <p className="mt-3 text-sm text-red-600">{yHata}</p>}
          {yeniKodlar.length > 0 && (
            <div className={
              yeniKodlarTip === 'otto+'
                ? 'mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'
                : 'mt-4 p-4 bg-green-50 border border-green-200 rounded-lg'
            }>
              <p className={
                yeniKodlarTip === 'otto+'
                  ? 'text-sm font-medium text-blue-900 mb-2'
                  : 'text-sm font-medium text-green-900 mb-2'
              }>
                {yeniKodlar.length} {yeniKodlarTip === 'otto+' ? 'Otto+' : 'Otto'} kod üretildi:
              </p>
              <div className="font-mono text-sm text-slate-900 space-y-1">
                {yeniKodlar.map((k) => <div key={k}>{k}</div>)}
              </div>
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Sürüm Yönetimi</h2>
            {sMevcut && (
              <span className="text-xs text-slate-500">
                Şu anki: <b className="text-slate-700">v{sMevcut.versionName}</b> (code {sMevcut.versionCode})
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Version Code</label>
              <input
                type="number"
                value={sVersionCode}
                onChange={(e) => setSVersionCode(e.target.value)}
                placeholder="örn. 42"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                disabled={sYukleniyor}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Version Name</label>
              <input
                type="text"
                value={sVersionName}
                onChange={(e) => setSVersionName(e.target.value)}
                placeholder="örn. 1.4.2"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                disabled={sYukleniyor}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">APK URL</label>
              <input
                type="text"
                value={sApkUrl}
                onChange={(e) => setSApkUrl(e.target.value)}
                placeholder="GitHub release linki (opsiyonel)"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                disabled={sYukleniyor}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Notlar</label>
              <textarea
                value={sNotlar}
                onChange={(e) => setSNotlar(e.target.value)}
                rows={3}
                placeholder="Sürüm notları (opsiyonel)"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                disabled={sYukleniyor}
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={sZorunlu}
                  onChange={(e) => setSZorunlu(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  disabled={sYukleniyor}
                />
                Zorunlu güncelleme
              </label>
              <button
                onClick={surumKaydet}
                disabled={sYukleniyor || !sVersionCode || !sVersionName}
                className="ml-auto bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                {sYukleniyor ? 'Kaydediliyor...' : 'Sürümü Kaydet'}
              </button>
            </div>
          </div>
          {sMesaj && <p className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">{sMesaj}</p>}
          {sHata && <p className="mt-3 text-sm text-red-600">{sHata}</p>}
        </section>

        <section className="bg-white rounded-xl shadow p-5 mb-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-lg font-semibold text-slate-900">Duyuru / Pop-up</h2>
            {dNo !== null && (
              <span className="text-xs text-slate-500">Sürüm no: <b className="text-slate-700">{dNo}</b></span>
            )}
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Aktif edilince o uygulamanın kullanıcıları açılışta bu pop-up&apos;ı bir kez görür.
            Metni değiştirip tekrar yayınlarsan aynı kullanıcılar yeni duyuruyu tekrar görür.
          </p>

          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => duyuruTipDegistir('otto')}
              className={
                dTip === 'otto'
                  ? 'px-4 py-2 rounded-lg text-sm font-semibold bg-slate-800 text-white'
                  : 'px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200'
              }
              disabled={dYukleniyor || dKaydediyor}
            >
              Otto
            </button>
            <button
              type="button"
              onClick={() => duyuruTipDegistir('otto+')}
              className={
                dTip === 'otto+'
                  ? 'px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white'
                  : 'px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200'
              }
              disabled={dYukleniyor || dKaydediyor}
            >
              Otto+
            </button>
            <button
              type="button"
              onClick={() => duyuruYukle(dTip)}
              className="ml-auto text-xs text-slate-600 hover:text-slate-900 underline"
              disabled={dYukleniyor || dKaydediyor}
            >
              {dYukleniyor ? 'Yükleniyor…' : 'Yeniden Yükle'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2 flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={dAktif}
                  onChange={(e) => setDAktif(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  disabled={dKaydediyor}
                />
                Aktif (kullanıcılara göster)
              </label>
              <span
                className={
                  dAktif
                    ? 'text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full'
                    : 'text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full'
                }
              >
                {dAktif ? 'Yayında' : 'Kapalı'}
              </span>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Başlık</label>
              <input
                type="text"
                value={dBaslik}
                onChange={(e) => setDBaslik(e.target.value)}
                maxLength={200}
                placeholder="örn. Yeni sürüm çıktı"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                disabled={dKaydediyor}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Metin</label>
              <textarea
                value={dMetin}
                onChange={(e) => setDMetin(e.target.value)}
                maxLength={4000}
                rows={4}
                placeholder="Pop-up gövde metni"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                disabled={dKaydediyor}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Buton yazısı</label>
              <input
                type="text"
                value={dButon}
                onChange={(e) => setDButon(e.target.value)}
                maxLength={60}
                placeholder="örn. Siteden İndir"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                disabled={dKaydediyor}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Buton linki</label>
              <input
                type="text"
                value={dLink}
                onChange={(e) => setDLink(e.target.value)}
                maxLength={500}
                placeholder="https://pawcal.net/otto/indir"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                disabled={dKaydediyor}
              />
            </div>
            <div className="sm:col-span-2 flex items-center justify-end">
              <button
                onClick={duyuruKaydet}
                disabled={dKaydediyor || dYukleniyor}
                className={
                  dTip === 'otto+'
                    ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium px-6 py-2 rounded-lg transition-colors'
                    : 'bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white font-medium px-6 py-2 rounded-lg transition-colors'
                }
              >
                {dKaydediyor ? 'Kaydediliyor…' : dAktif ? 'Kaydet ve Yayınla' : 'Kaydet (kapalı)'}
              </button>
            </div>
          </div>
          {dMesaj && <p className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">{dMesaj}</p>}
          {dHata && <p className="mt-3 text-sm text-red-600">{dHata}</p>}
        </section>

        <KatlanirBaslik
          baslik="Kullanıcılar"
          adet={kullListe.length}
          acik={kullAcik}
          onToggle={() => setKullAcik((v) => !v)}
          yenile={() => kullaniciYukle(adminKey)}
          yenileniyor={kullYukleniyor}
        />
        {kullAcik && (
          <section className="bg-white rounded-xl shadow overflow-hidden mb-4">
            {kullHata && <p className="mx-4 mt-3 text-sm text-red-600">{kullHata}</p>}
            <ListeUst
              arama={kullArama}
              onArama={(v) => { setKullArama(v); setKullSayfa(1); }}
              placeholder="Otto kodunda ara..."
              sayilar={{ toplam: kullListe.length, filtre: kullFiltre.length }}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-600 text-left">
                  <tr>
                    <th className="px-3 py-1.5 font-medium">Otto Kodu</th>
                    <th className="px-3 py-1.5 font-medium">Otto</th>
                    <th className="px-3 py-1.5 font-medium">Otto Mobil</th>
                    <th className="px-3 py-1.5 font-medium">Platform</th>
                    <th className="px-3 py-1.5 font-medium">Son Mobil</th>
                    <th className="px-3 py-1.5 font-medium">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {sayfalanmis(kullFiltre, kullSayfa).map((s) => (
                    <KullSatirRow key={s.cihaz_id} s={s} />
                  ))}
                  {kullFiltre.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-3 py-6 text-center text-slate-500">
                        {kullArama ? 'Aramaya uyan araç yok.' : 'Henüz aktive edilmiş araç yok.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Sayfalayici
              sayfa={kullSayfa}
              toplam={kullFiltre.length}
              onSayfa={setKullSayfa}
            />
          </section>
        )}

        <KatlanirBaslik
          baslik="Otto Mobil"
          adet={mobListe.length}
          acik={mobAcik}
          onToggle={() => setMobAcik((v) => !v)}
        />
        {mobAcik && (
          <section className="bg-white rounded-xl shadow overflow-hidden mb-4">
            <ListeUst
              arama={mobArama}
              onArama={(v) => { setMobArama(v); setMobSayfa(1); }}
              placeholder="Otto kodunda ara..."
              sayilar={{ toplam: mobListe.length, filtre: mobFiltre.length }}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-600 text-left">
                  <tr>
                    <th className="px-3 py-1.5 font-medium">Otto Kodu</th>
                    <th className="px-3 py-1.5 font-medium">Cihaz</th>
                    <th className="px-3 py-1.5 font-medium">Platform</th>
                    <th className="px-3 py-1.5 font-medium">Son Açılış</th>
                    <th className="px-3 py-1.5 font-medium">Toplam Açılış</th>
                  </tr>
                </thead>
                <tbody>
                  {sayfalanmis(mobFiltre, mobSayfa).map((s) => {
                    const platforms = Array.isArray(s.platformlar) ? s.platformlar : [];
                    return (
                      <tr key={s.cihaz_id} className="border-t border-slate-100 text-slate-900">
                        <td className="px-3 py-1.5 text-[11px]"><OttoKodHucre kod={s.otto_kod} cihazId={s.cihaz_id} /></td>
                        <td className="px-3 py-1.5 text-[11px] text-slate-700">{s.mobil_sayisi}</td>
                        <td className="px-3 py-1.5">
                          <div className="flex flex-wrap gap-1">
                            {platforms.length === 0 && <span className="text-[11px] text-slate-400">—</span>}
                            {platforms.map((p) => (
                              <span
                                key={p}
                                className={
                                  p === 'android-apk'
                                    ? 'inline-block px-1.5 py-0.5 text-[10px] rounded bg-emerald-100 text-emerald-800 font-semibold'
                                    : 'inline-block px-1.5 py-0.5 text-[10px] rounded bg-indigo-100 text-indigo-800 font-semibold'
                                }
                              >
                                {p === 'android-apk' ? 'APK' : p === 'web-pwa' ? 'PWA' : p}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-1.5 text-[11px] text-slate-600">{tarih(s.mobil_son)}</td>
                        <td className="px-3 py-1.5 text-[11px] text-slate-600">{s.acilis_toplam}</td>
                      </tr>
                    );
                  })}
                  {mobFiltre.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-center text-slate-500">
                        {mobArama ? 'Aramaya uyan kurulum yok.' : 'Henüz Otto Mobil kurulumu yok.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Sayfalayici sayfa={mobSayfa} toplam={mobFiltre.length} onSayfa={setMobSayfa} />
          </section>
        )}

        <KatlanirBaslik
          baslik="Kodlar"
          adet={liste.length}
          acik={kodAcik}
          onToggle={() => setKodAcik((v) => !v)}
          yenile={() => istatistikYukle(adminKey)}
          yenileniyor={yukleniyor}
          ekBilgi={ozet && ozet.otto_plus > 0 ? `${ozet.otto_plus} Otto+` : null}
        />
        {kodAcik && (
          <section className="bg-white rounded-xl shadow overflow-hidden mb-4">
            <ListeUst
              arama={kodArama}
              onArama={(v) => { setKodArama(v); setKodSayfa(1); }}
              placeholder="Kod / cihaz / etikette ara..."
              sayilar={{ toplam: liste.length, filtre: kodFiltre.length }}
            />
            <div className="px-4 pt-3 pb-1 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500">Tip:</span>
              {(['hepsi','otto','otto+'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setKodTipFiltre(t); setKodSayfa(1); }}
                  className={
                    kodTipFiltre === t
                      ? (t === 'otto+'
                          ? 'text-[11px] px-2.5 py-1 rounded-full bg-blue-600 text-white font-semibold'
                          : t === 'otto'
                            ? 'text-[11px] px-2.5 py-1 rounded-full bg-slate-700 text-white font-semibold'
                            : 'text-[11px] px-2.5 py-1 rounded-full bg-slate-900 text-white font-semibold')
                      : 'text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }
                >
                  {t === 'hepsi' ? 'Tümü' : t === 'otto+' ? 'Otto+' : 'Otto'}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-600 text-left">
                  <tr>
                    <th className="px-3 py-1.5 font-medium">Kod</th>
                    <th className="px-3 py-1.5 font-medium">Tip</th>
                    <th className="px-3 py-1.5 font-medium">Durum</th>
                    <th className="px-3 py-1.5 font-medium">Etiket</th>
                    <th className="px-3 py-1.5 font-medium">Cihaz</th>
                    <th className="px-3 py-1.5 font-medium">Oluşturma</th>
                    <th className="px-3 py-1.5 font-medium">Aktivasyon</th>
                    <th className="px-3 py-1.5 font-medium">Son Görülme</th>
                    <th className="px-3 py-1.5 font-medium">Sürüm</th>
                    <th className="px-3 py-1.5 font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {sayfalanmis(kodFiltre, kodSayfa).map((s) => (
                    <tr key={s.kod} className={
                      s.iptal
                        ? 'border-t border-slate-100 text-slate-900 bg-red-50'
                        : 'border-t border-slate-100 text-slate-900'
                    }>
                      <td className="px-3 py-1.5 font-mono text-[11px]">
                        {s.kod}
                        {s.iptal && (
                          <span className="ml-2 inline-block px-1.5 py-0.5 text-[10px] rounded bg-red-600 text-white font-sans font-semibold">İPTAL</span>
                        )}
                      </td>
                      <td className="px-3 py-1.5">
                        <TipRozet tip={s.tip} />
                      </td>
                      <td className="px-3 py-1.5">
                        <span className={
                          s.durum === 'kullanildi'
                            ? 'inline-block px-2 py-0.5 text-[11px] rounded-full bg-green-100 text-green-800'
                            : 'inline-block px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-700'
                        }>
                          {s.durum}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-[11px] text-slate-600 max-w-[160px] truncate" title={s.not_alan || ''}>{s.not_alan || '—'}</td>
                      <td className="px-3 py-1.5 font-mono text-[11px] text-slate-600" title={s.cihaz_id || ''}>{kisalt(s.cihaz_id, 10)}</td>
                      <td className="px-3 py-1.5 text-[11px] text-slate-600">{tarih(s.olusturma_tarihi)}</td>
                      <td className="px-3 py-1.5 text-[11px] text-slate-600">{tarih(s.aktivasyon_tarihi)}</td>
                      <td className="px-3 py-1.5 text-[11px] text-slate-600">{tarih(s.son_gorulme)}</td>
                      <td className="px-3 py-1.5 text-[11px] text-slate-600">{s.uygulama_surumu || '—'}</td>
                      <td className="px-3 py-1.5">
                        <button
                          onClick={() => kodIptal(s.kod, !s.iptal)}
                          disabled={iptalIsleniyor === s.kod}
                          className={
                            s.iptal
                              ? 'text-[11px] px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:opacity-50'
                              : 'text-[11px] px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-50'
                          }
                        >
                          {iptalIsleniyor === s.kod ? '...' : (s.iptal ? 'Geri Al' : 'İptal Et')}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {kodFiltre.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-3 py-6 text-center text-slate-500">
                        {kodArama || kodTipFiltre !== 'hepsi' ? 'Aramaya uyan kod yok.' : 'Henüz kod yok.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Sayfalayici sayfa={kodSayfa} toplam={kodFiltre.length} onSayfa={setKodSayfa} />
          </section>
        )}
      </div>
    </main>
  );
}

function sayfalanmis<T>(arr: T[], sayfa: number): T[] {
  return arr.slice(0, sayfa * SAYFA_BOYU);
}

function OttoKodHucre({ kod, cihazId }: { kod: string | null; cihazId: string }) {
  if (kod) {
    return (
      <span
        className="font-mono text-[12px] font-semibold text-slate-900"
        title={`Cihaz: ${cihazId}`}
      >
        {kod}
      </span>
    );
  }
  return (
    <span className="text-[11px] italic text-slate-400" title={`Cihaz: ${cihazId}`}>
      kod yok
    </span>
  );
}

function KullSatirRow({ s }: { s: KullSatir }) {
  const ottoAktif = s.otto_son && (Date.now() - new Date(s.otto_son).getTime()) < 7 * 86400 * 1000;
  const mobilVar = s.mobil_sayisi > 0;
  const platforms = Array.isArray(s.platformlar) ? s.platformlar : [];
  return (
    <tr className="border-t border-slate-100 text-slate-900">
      <td className="px-3 py-1.5 text-[11px]"><OttoKodHucre kod={s.otto_kod} cihazId={s.cihaz_id} /></td>
      <td className="px-3 py-1.5">
        {ottoAktif ? (
          <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-green-100 text-green-800">aktif</span>
        ) : s.otto_son ? (
          <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-700" title={tarih(s.otto_son)}>pasif</span>
        ) : (
          <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-500">—</span>
        )}
      </td>
      <td className="px-3 py-1.5 text-[11px] text-slate-700">
        {mobilVar ? `${s.mobil_sayisi} cihaz` : '—'}
      </td>
      <td className="px-3 py-1.5">
        <div className="flex flex-wrap gap-1">
          {platforms.length === 0 && <span className="text-[11px] text-slate-400">—</span>}
          {platforms.map((p) => (
            <span
              key={p}
              className={
                p === 'android-apk'
                  ? 'inline-block px-1.5 py-0.5 text-[10px] rounded bg-emerald-100 text-emerald-800 font-semibold'
                  : 'inline-block px-1.5 py-0.5 text-[10px] rounded bg-indigo-100 text-indigo-800 font-semibold'
              }
            >
              {p === 'android-apk' ? 'APK' : p === 'web-pwa' ? 'PWA' : p}
            </span>
          ))}
        </div>
      </td>
      <td className="px-3 py-1.5 text-[11px] text-slate-600">{tarih(s.mobil_son)}</td>
      <td className="px-3 py-1.5">
        {mobilVar ? (
          <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-purple-100 text-purple-800">Otto + Mobil</span>
        ) : (
          <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-700">Sadece Otto</span>
        )}
      </td>
    </tr>
  );
}

function KatlanirBaslik({
  baslik,
  adet,
  acik,
  onToggle,
  yenile,
  yenileniyor,
  ekBilgi,
}: {
  baslik: string;
  adet: number;
  acik: boolean;
  onToggle: () => void;
  yenile?: () => void;
  yenileniyor?: boolean;
  ekBilgi?: string | null;
}) {
  return (
    <div className="bg-white rounded-xl shadow px-4 py-2.5 mb-2 flex items-center justify-between">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-left flex-1"
      >
        <span
          className="inline-block text-slate-500 transition-transform"
          style={{ transform: acik ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          ▶
        </span>
        <span className="text-base font-semibold text-slate-900">{baslik}</span>
        <span className="text-sm text-slate-500">({adet})</span>
        {ekBilgi && (
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
            {ekBilgi}
          </span>
        )}
      </button>
      {yenile && (
        <button
          onClick={(e) => { e.stopPropagation(); yenile(); }}
          disabled={yenileniyor}
          className="text-xs text-blue-600 hover:underline disabled:text-slate-400"
        >
          {yenileniyor ? 'Yükleniyor...' : 'Yenile'}
        </button>
      )}
    </div>
  );
}

function TipRozet({ tip }: { tip: KodTip | null | undefined }) {
  const t: KodTip = tip === 'otto+' ? 'otto+' : 'otto';
  if (t === 'otto+') {
    return (
      <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-blue-600 text-white font-semibold">
        Otto+
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-slate-200 text-slate-700 font-medium">
      Otto
    </span>
  );
}

function ListeUst({
  arama,
  onArama,
  placeholder,
  sayilar,
}: {
  arama: string;
  onArama: (v: string) => void;
  placeholder: string;
  sayilar: { toplam: number; filtre: number };
}) {
  return (
    <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center gap-2">
      <input
        type="text"
        value={arama}
        onChange={(e) => onArama(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
      />
      <div className="text-xs text-slate-500 whitespace-nowrap">
        {arama ? `${sayilar.filtre} / ${sayilar.toplam}` : `${sayilar.toplam} kayıt`}
      </div>
    </div>
  );
}

function Sayfalayici({
  sayfa,
  toplam,
  onSayfa,
}: {
  sayfa: number;
  toplam: number;
  onSayfa: (n: number) => void;
}) {
  const gosterilen = Math.min(sayfa * SAYFA_BOYU, toplam);
  const maxSayfa = Math.max(1, Math.ceil(toplam / SAYFA_BOYU));
  if (toplam <= SAYFA_BOYU) return null;
  return (
    <div className="px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-slate-50">
      <div className="text-xs text-slate-500">
        {gosterilen} / {toplam} gösteriliyor
      </div>
      <div className="flex items-center gap-2">
        {sayfa < maxSayfa && (
          <button
            onClick={() => onSayfa(sayfa + 1)}
            className="text-xs bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium px-3 py-1.5 rounded-lg"
          >
            Daha fazla göster
          </button>
        )}
        {sayfa > 1 && (
          <button
            onClick={() => onSayfa(1)}
            className="text-xs text-slate-600 hover:underline"
          >
            Başa dön
          </button>
        )}
      </div>
    </div>
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
