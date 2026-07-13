import { NextRequest } from 'next/server';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

export const maxDuration = 25;

const FETCH_TIMEOUT_MS = 15000;
const ABRP_BASE = 'https://api.iternio.com';
const ABRP_VERSION = '7.1.1';

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: NextRequest) {
  let govde: { chargerIds?: unknown };
  try { govde = await req.json(); }
  catch { return corsJson({ hata: 'gecersiz json' }, { status: 400 }); }

  const ham = govde?.chargerIds;
  if (!Array.isArray(ham) || ham.length < 1 || ham.length > 50) {
    return corsJson({ hata: 'chargerIds 1-50 arasi dizi olmali' }, { status: 400 });
  }
  const chargerIds: number[] = [];
  for (const x of ham) {
    const n = Number(x);
    if (!Number.isFinite(n) || !Number.isInteger(n)) {
      return corsJson({ hata: 'chargerIds sayisal olmali' }, { status: 400 });
    }
    chargerIds.push(n);
  }

  const key = process.env.ITERNIO_KEY || '';
  if (!key) return corsJson({ hata: 'iternio anahtar yok' }, { status: 503 });

  const hedef = ABRP_BASE + '/2/charger/_get/geo-chargers';
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const r = await fetch(hedef, {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'x-abrp-version': ABRP_VERSION,
      },
      body: JSON.stringify({ chargerIds }),
    });
    if (!r.ok) return corsJson({ hata: 'iternio ust servis ' + r.status }, { status: 502 });
    const j = await r.json();
    const res = corsJson(j);
    res.headers.set('Cache-Control', 'public, s-maxage=3600');
    return res;
  } catch (e: unknown) {
    const err = e as { message?: string };
    return corsJson({ hata: 'iternio baglanti', detay: String(err?.message || e) }, { status: 502 });
  } finally {
    clearTimeout(t);
  }
}
