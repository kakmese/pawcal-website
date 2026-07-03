import { NextRequest } from 'next/server';
import { getSql } from '@/lib/otto-db';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

export const maxDuration = 25;

const ABRP_BASE = 'https://api.iternio.com';
const ABRP_VERSION = '7.1.1';
const ABRP_TYPECODE = 'byd:sealion:25:82:rwd';

const FETCH_TIMEOUT_MS = 8000;
const ENDPOINT_BUDGET_MS = 15000;
const THROTTLE_MS = 120;
const MAX_POINTS = 20;
const CARD_TTL_MS = 7 * 24 * 3600 * 1000;
const PRICE_TTL_MS = 6 * 3600 * 1000;

function abrpHeaders(): Record<string, string> {
  const key = process.env.ABRP_API_KEY || '';
  return {
    'content-type': 'application/json',
    'x-api-key': key,
    'x-abrp-version': ABRP_VERSION,
  };
}

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

type Konektor = { power?: number; standard?: string; type?: string };
type EvseGrup = { count?: number; connectors?: Konektor[] };
type GeoCharger = {
  id?: number;
  lat?: number;
  long?: number;
  name?: string;
  network?: { name?: string };
  evseSummary?: EvseGrup[];
  accessibility?: { status?: string };
};

async function abrpIdAra(lat: number, lng: number): Promise<number[] | null> {
  const d = 0.005;
  const govde = {
    sortBy: 'POWER',
    filter: { connectorTypes: ['CCS', 'TYPE2', 'J1772'] },
    boost: { cardIds: [], networkIds: [], reliability: true },
    avoid: { networkIds: [] },
    typecode: ABRP_TYPECODE,
    limit: 10,
    grouping: { type: 'radius', radiusM: 100 },
    boundingBoxes: [{
      coordinates: [
        { lat: lat - d, long: lng - d },
        { lat: lat + d, long: lng + d },
      ],
    }],
  };
  try {
    const r = await fetchWithTimeout(ABRP_BASE + '/2/charger/_search/bounding-boxes/ids', {
      method: 'POST', headers: abrpHeaders(), body: JSON.stringify(govde),
    });
    if (!r.ok) return null;
    const j = await r.json() as { items?: Array<{ chargers?: Array<{ id?: number }> }> };
    const chargers = j?.items?.[0]?.chargers || [];
    if (!Array.isArray(chargers) || chargers.length === 0) return null;
    const ids = chargers.map(c => c.id).filter((x): x is number => typeof x === 'number');
    return ids.length ? ids : null;
  } catch { return null; }
}

async function abrpGeoDetay(ids: number[], hedefLat: number, hedefLng: number): Promise<GeoCharger | null> {
  try {
    const r = await fetchWithTimeout(ABRP_BASE + '/2/charger/_get/geo-chargers', {
      method: 'POST', headers: abrpHeaders(), body: JSON.stringify({ chargerIds: ids }),
    });
    if (!r.ok) return null;
    const j = await r.json() as { items?: GeoCharger[] };
    const items = j?.items || [];
    if (items.length === 0) return null;
    let en: GeoCharger | null = null;
    let enKm = 999;
    for (const it of items) {
      if (typeof it.lat !== 'number' || typeof it.long !== 'number') continue;
      const dy = (it.lat - hedefLat) * 111;
      const dx = (it.long - hedefLng) * 111 * Math.cos(hedefLat * Math.PI / 180);
      const km = Math.sqrt(dy * dy + dx * dx);
      if (km < enKm) { enKm = km; en = it; }
    }
    if (en && enKm < 0.5) return en;
    return null;
  } catch { return null; }
}

function abrpGucCikar(geo: GeoCharger): { guc: number | null; konektor: string | null; operator: string | null; soket: number | null } {
  let guc: number | null = null;
  let toplamSoket = 0;
  const konektorler: Record<string, 1> = {};
  const evse = geo?.evseSummary || [];
  for (const grup of evse) {
    const adet = grup.count || 1;
    toplamSoket += adet;
    const conns = grup.connectors || [];
    for (const c of conns) {
      let p = c.power || 0;
      if (p > 1000) p = p / 1000;
      if (p > (guc || 0)) guc = p;
      const std = c.standard || c.type || '';
      if (std) {
        if (/ccs/i.test(std)) konektorler['CCS'] = 1;
        else if (/type.?2|mennekes/i.test(std)) konektorler['Type 2'] = 1;
        else if (/chademo/i.test(std)) konektorler['CHAdeMO'] = 1;
        else if (/type.?1|j1772/i.test(std)) konektorler['Type 1'] = 1;
        else konektorler[String(std).slice(0, 8)] = 1;
      }
    }
  }
  const kArr = Object.keys(konektorler);
  const konektor = kArr.length ? kArr.join(' · ') : null;
  const operator = (geo?.network && geo.network.name) || null;
  return { guc, konektor, operator, soket: toplamSoket || null };
}

async function abrpFiyatCek(cardId: number): Promise<{ price: number; vat: number } | null> {
  const url = ABRP_BASE + '/2/charger/' + cardId + '/prices?currency=TRY&typecode=' + encodeURIComponent(ABRP_TYPECODE);
  try {
    const r = await fetchWithTimeout(url, { method: 'GET', headers: abrpHeaders() });
    if (!r.ok) return null;
    const j = await r.json() as { items?: Array<{ currentPrice?: Array<{ type?: string; price?: number; vat?: number }> }> };
    const arr = j?.items?.[0]?.currentPrice || [];
    if (!Array.isArray(arr) || arr.length === 0) return null;
    const energy = arr.find(p => p?.type === 'ENERGY');
    if (!energy || typeof energy.price !== 'number') return null;
    return { price: Number(energy.price), vat: Number(energy.vat) || 0 };
  } catch { return null; }
}

function coordKey(la: number, ln: number): string {
  return la.toFixed(4) + '_' + ln.toFixed(4);
}

type CacheRow = {
  coord_key: string;
  card_id: number | null;
  guc: number | null;
  konektor: string | null;
  operator: string | null;
  soket: number | null;
  price: number | null;
  vat: number | null;
  card_ts: string | Date | null;
  price_ts: string | Date | null;
};

type Nokta = { la: number; ln: number };
type Cikti = {
  la: number;
  ln: number;
  price: number | null;
  guc: number | null;
  konektor: string | null;
  operator: string | null;
  soket: number | null;
  kaynak: 'abrp' | 'cache' | 'yok';
};

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: NextRequest) {
  const basladi = Date.now();
  try {
    if (!process.env.ABRP_API_KEY) {
      return corsJson({ ok: false, hata: 'abrp anahtar yok' }, { status: 503 });
    }
    let govde: { noktalar?: unknown };
    try { govde = await req.json(); } catch {
      return corsJson({ ok: false, hata: 'gecersiz json' }, { status: 400 });
    }
    const ham = Array.isArray(govde?.noktalar) ? (govde.noktalar as unknown[]) : [];
    const noktalar: Nokta[] = ham.slice(0, MAX_POINTS)
      .map(p => {
        const o = p as { la?: unknown; ln?: unknown };
        return { la: Number(o?.la), ln: Number(o?.ln) };
      })
      .filter(n => isFinite(n.la) && isFinite(n.ln) && n.la >= -90 && n.la <= 90 && n.ln >= -180 && n.ln <= 180);
    if (noktalar.length === 0) {
      return corsJson({ ok: false, hata: 'noktalar bos' }, { status: 400 });
    }

    const sql = getSql();
    const anahtar = noktalar.map(n => coordKey(n.la, n.ln));
    const rows = await sql`
      SELECT coord_key, card_id, guc, konektor, operator, soket, price, vat, card_ts, price_ts
      FROM abrp_cache WHERE coord_key = ANY(${anahtar}::text[])
    ` as CacheRow[];
    const cache = new Map<string, CacheRow>();
    for (const r of rows) cache.set(r.coord_key, r);

    const fiyatlar: Cikti[] = [];
    const simdi = Date.now();
    let sonAbrpAt = 0;

    async function throttle() {
      const gecen = Date.now() - sonAbrpAt;
      if (sonAbrpAt > 0 && gecen < THROTTLE_MS) await sleep(THROTTLE_MS - gecen);
      sonAbrpAt = Date.now();
    }

    for (const n of noktalar) {
      if (Date.now() - basladi > ENDPOINT_BUDGET_MS) break;
      const key = coordKey(n.la, n.ln);
      const c = cache.get(key);
      const cardTs = c?.card_ts ? new Date(c.card_ts).getTime() : 0;
      const priceTs = c?.price_ts ? new Date(c.price_ts).getTime() : 0;
      const cardFresh = cardTs > 0 && (simdi - cardTs) < CARD_TTL_MS;
      const priceFresh = priceTs > 0 && (simdi - priceTs) < PRICE_TTL_MS;

      // NONE cache: card fresh + card_id null → hiç bakma
      if (cardFresh && c!.card_id === null) {
        fiyatlar.push({ la: n.la, ln: n.ln, price: null, guc: null, konektor: null, operator: null, soket: null, kaynak: 'cache' });
        continue;
      }
      // Tam cache
      if (cardFresh && priceFresh && c!.card_id !== null) {
        fiyatlar.push({
          la: n.la, ln: n.ln,
          price: c!.price, guc: c!.guc, konektor: c!.konektor,
          operator: c!.operator, soket: c!.soket, kaynak: 'cache',
        });
        continue;
      }

      // Yenile — throttle
      await throttle();

      // Kart bilgisi
      let cardId: number | null = cardFresh ? c!.card_id : null;
      let guc: number | null = cardFresh ? c!.guc : null;
      let konektor: string | null = cardFresh ? c!.konektor : null;
      let operator: string | null = cardFresh ? c!.operator : null;
      let soket: number | null = cardFresh ? c!.soket : null;

      if (!cardFresh) {
        const ids = await abrpIdAra(n.la, n.ln);
        if (Date.now() - basladi > ENDPOINT_BUDGET_MS) break;
        let geo: GeoCharger | null = null;
        if (ids) {
          await throttle();
          geo = await abrpGeoDetay(ids, n.la, n.ln);
        }
        if (!geo || typeof geo.id !== 'number') {
          // NONE yaz
          try {
            const nowIso = new Date().toISOString();
            await sql`
              INSERT INTO abrp_cache (coord_key, card_id, card_ts)
              VALUES (${key}, NULL, ${nowIso}::timestamptz)
              ON CONFLICT (coord_key) DO UPDATE SET
                card_id = NULL, guc = NULL, konektor = NULL, operator = NULL, soket = NULL,
                price = NULL, vat = NULL,
                card_ts = EXCLUDED.card_ts, price_ts = NULL
            `;
          } catch (e) { console.error('ABRP CACHE NONE upsert:', e); }
          fiyatlar.push({ la: n.la, ln: n.ln, price: null, guc: null, konektor: null, operator: null, soket: null, kaynak: 'yok' });
          continue;
        }
        cardId = geo.id;
        const gk = abrpGucCikar(geo);
        guc = gk.guc; konektor = gk.konektor; operator = gk.operator; soket = gk.soket;
      }

      // Fiyat çek
      let yeniPrice: number | null = null;
      let yeniVat: number | null = null;
      if (cardId !== null) {
        if (Date.now() - basladi > ENDPOINT_BUDGET_MS) {
          // Bütçe biterse fiyatı bir sonrakine ertele
          fiyatlar.push({
            la: n.la, ln: n.ln,
            price: c?.price ?? null, guc, konektor, operator, soket, kaynak: 'abrp',
          });
          break;
        }
        await throttle();
        const fy = await abrpFiyatCek(cardId);
        if (fy) { yeniPrice = fy.price; yeniVat = fy.vat; }
      }

      const nowIso = new Date().toISOString();
      const priceTsIso = yeniPrice !== null ? nowIso : null;
      try {
        await sql`
          INSERT INTO abrp_cache (coord_key, card_id, guc, konektor, operator, soket, price, vat, card_ts, price_ts)
          VALUES (${key}, ${cardId}, ${guc}, ${konektor}, ${operator}, ${soket}, ${yeniPrice}, ${yeniVat}, ${nowIso}::timestamptz, ${priceTsIso}::timestamptz)
          ON CONFLICT (coord_key) DO UPDATE SET
            card_id = EXCLUDED.card_id,
            guc = EXCLUDED.guc,
            konektor = EXCLUDED.konektor,
            operator = EXCLUDED.operator,
            soket = EXCLUDED.soket,
            card_ts = EXCLUDED.card_ts,
            price = CASE WHEN EXCLUDED.price_ts IS NOT NULL THEN EXCLUDED.price ELSE abrp_cache.price END,
            vat = CASE WHEN EXCLUDED.price_ts IS NOT NULL THEN EXCLUDED.vat ELSE abrp_cache.vat END,
            price_ts = COALESCE(EXCLUDED.price_ts, abrp_cache.price_ts)
        `;
      } catch (e) { console.error('ABRP CACHE upsert:', e); }

      const effectivePrice = yeniPrice !== null ? yeniPrice : (c?.price ?? null);
      fiyatlar.push({
        la: n.la, ln: n.ln,
        price: effectivePrice,
        guc, konektor, operator, soket,
        kaynak: 'abrp',
      });
    }

    return corsJson({ ok: true, fiyatlar });
  } catch (e) {
    console.error('ISTASYON FIYAT ERROR:', e);
    return corsJson({ ok: false, hata: 'sunucu' }, { status: 500 });
  }
}
