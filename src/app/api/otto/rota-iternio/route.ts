import { NextRequest } from 'next/server';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

export const maxDuration = 25;

const IDS_RE = /^[0-9a-zA-Z_,-]+$/;
const FETCH_TIMEOUT_MS = 15000;
const ABRP_BASE = 'https://api.iternio.com';
const ABRP_VERSION = '7.1.1';

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET(req: NextRequest) {
  const ids = (new URL(req.url).searchParams.get('ids') || '').trim();
  if (!ids || !IDS_RE.test(ids)) {
    return corsJson({ hata: 'ids gecersiz' }, { status: 400 });
  }
  const parcalar = ids.split(',').filter(Boolean);
  if (parcalar.length < 1 || parcalar.length > 50) {
    return corsJson({ hata: 'ids 1-50 arasi' }, { status: 400 });
  }
  const chargerIds: number[] = [];
  for (const p of parcalar) {
    const n = Number(p);
    if (!Number.isFinite(n) || !Number.isInteger(n)) {
      return corsJson({ hata: 'ids sayisal olmali' }, { status: 400 });
    }
    chargerIds.push(n);
  }
  const key = process.env.ITERNIO_KEY || '';
  if (!key) {
    return corsJson({ hata: 'iternio anahtar yok' }, { status: 503 });
  }

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
    if (!r.ok) {
      return corsJson({ hata: 'iternio ust servis ' + r.status }, { status: 502 });
    }
    const j = await r.json();
    const res = corsJson(j);
    res.headers.set('Cache-Control', 'public, s-maxage=60');
    return res;
  } catch (e: unknown) {
    const err = e as { message?: string };
    return corsJson({ hata: 'iternio baglanti', detay: String(err?.message || e) }, { status: 502 });
  } finally {
    clearTimeout(t);
  }
}
