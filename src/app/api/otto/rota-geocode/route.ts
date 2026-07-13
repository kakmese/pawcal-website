import { NextRequest } from 'next/server';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

export const maxDuration = 25;

const FETCH_TIMEOUT_MS = 15000;
const LIMIT = 5;

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const q = (sp.get('q') || '').trim();
  const latRaw = sp.get('lat');
  const lonRaw = sp.get('lon');

  if (q.length < 2 || q.length > 64) {
    return corsJson({ hata: 'q 2-64 karakter' }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.set('q', q);
  params.set('limit', String(LIMIT));

  if (latRaw !== null || lonRaw !== null) {
    const lat = Number(latRaw);
    const lon = Number(lonRaw);
    if (!isFinite(lat) || !isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return corsJson({ hata: 'lat/lon gecersiz' }, { status: 400 });
    }
    params.set('lat', String(lat));
    params.set('lon', String(lon));
  }

  const hedef = 'https://photon.komoot.io/api/?' + params.toString();
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const r = await fetch(hedef, { signal: ctrl.signal });
    if (!r.ok) {
      return corsJson({ hata: 'photon ust servis ' + r.status }, { status: 502 });
    }
    const j = await r.json();
    const res = corsJson(j);
    res.headers.set('Cache-Control', 'public, s-maxage=3600');
    return res;
  } catch (e: unknown) {
    const err = e as { message?: string };
    return corsJson({ hata: 'photon baglanti', detay: String(err?.message || e) }, { status: 502 });
  } finally {
    clearTimeout(t);
  }
}
