import { NextRequest } from 'next/server';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

export const maxDuration = 25;

const FETCH_TIMEOUT_MS = 15000;
const ABRP_BASE = 'https://api.iternio.com';
const ABRP_VERSION = '7.1.1';
const CURRENCY_RE = /^[A-Z]{3}$/;
const TYPECODE_RE = /^[a-zA-Z0-9:_-]{1,64}$/;

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const cardIdRaw = (sp.get('cardId') || '').trim();
  const currency = (sp.get('currency') || 'TRY').trim().toUpperCase();
  const typecode = (sp.get('typecode') || 'byd:sealion:25:82:rwd').trim();

  const cardId = Number(cardIdRaw);
  if (!cardIdRaw || !Number.isFinite(cardId) || !Number.isInteger(cardId) || cardId <= 0) {
    return corsJson({ hata: 'cardId sayisal olmali' }, { status: 400 });
  }
  if (!CURRENCY_RE.test(currency)) {
    return corsJson({ hata: 'currency gecersiz' }, { status: 400 });
  }
  if (!TYPECODE_RE.test(typecode)) {
    return corsJson({ hata: 'typecode gecersiz' }, { status: 400 });
  }

  const key = process.env.ITERNIO_KEY || '';
  if (!key) return corsJson({ hata: 'iternio anahtar yok' }, { status: 503 });

  const hedef = ABRP_BASE + '/2/charger/' + cardId + '/prices?currency=' + encodeURIComponent(currency) + '&typecode=' + encodeURIComponent(typecode);
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const r = await fetch(hedef, {
      method: 'GET',
      signal: ctrl.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'x-abrp-version': ABRP_VERSION,
      },
    });
    if (!r.ok) return corsJson({ hata: 'iternio ust servis ' + r.status }, { status: 502 });
    const j = await r.json();
    const res = corsJson(j);
    res.headers.set('Cache-Control', 'public, s-maxage=600');
    return res;
  } catch (e: unknown) {
    const err = e as { message?: string };
    return corsJson({ hata: 'iternio baglanti', detay: String(err?.message || e) }, { status: 502 });
  } finally {
    clearTimeout(t);
  }
}
