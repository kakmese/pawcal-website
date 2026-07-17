import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

const LIVE_URL = 'https://sarjtr.epdk.gov.tr/sarjet/api/stations';
const FETCH_TIMEOUT_MS = 10000;
const LIVE_TTL_SECONDS = 90;
const MIN_RECORDS = 10000;

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET() {
  try {
    const observedAt = new Date().toISOString();
    const r = await fetchWithTimeout(LIVE_URL, {
      headers: {
        accept: 'application/json',
        'user-agent': 'Dart/3.9 (dart:io)',
      },
      cache: 'no-store',
    });
    if (!r.ok) {
      return corsJson({ ok: false, hata: 'epdk_http_' + r.status }, { status: 502 });
    }
    const records = await r.json();
    if (!Array.isArray(records) || records.length < MIN_RECORDS) {
      return corsJson({ ok: false, hata: 'epdk_kayit_sayisi' }, { status: 502 });
    }
    const expiresAt = new Date(Date.now() + LIVE_TTL_SECONDS * 1000).toISOString();
    const res = corsJson({ ok: true, observedAt, expiresAt, records });
    res.headers.set('Cache-Control', 'public, s-maxage=90, stale-while-revalidate=30');
    return res;
  } catch (e) {
    console.error('ISTASYON CANLI ERROR:', e);
    return corsJson({ ok: false, hata: 'epdk_canli' }, { status: 503 });
  }
}
