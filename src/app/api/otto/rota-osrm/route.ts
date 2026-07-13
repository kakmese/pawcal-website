import { NextRequest } from 'next/server';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

export const maxDuration = 25;

// v4-P2a: 2-4 nokta destegi (baslangic + ara duraklar + hedef, en fazla 4).
const COORD_RE = /^-?\d{1,3}(?:\.\d+)?,-?\d{1,3}(?:\.\d+)?(?:;-?\d{1,3}(?:\.\d+)?,-?\d{1,3}(?:\.\d+)?){1,3}$/;
const FETCH_TIMEOUT_MS = 15000;

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET(req: NextRequest) {
  const coords = new URL(req.url).searchParams.get('coords') || '';
  if (!COORD_RE.test(coords)) {
    return corsJson({ hata: 'gecersiz coords' }, { status: 400 });
  }
  const noktalar = coords.split(';');
  if (noktalar.length < 2 || noktalar.length > 4) {
    return corsJson({ hata: 'coords 2-4 nokta olmali' }, { status: 400 });
  }
  for (const nk of noktalar) {
    const [lonS, latS] = nk.split(',');
    const lon = Number(lonS), lat = Number(latS);
    if (!isFinite(lon) || !isFinite(lat) || lon < -180 || lon > 180 || lat < -90 || lat > 90) {
      return corsJson({ hata: 'coords aralik disi' }, { status: 400 });
    }
  }

  // v4-P3b: opsiyonel steps=true (yalniz 'true' kabul; yoksa davranis birebir eski).
  const stepsParam = new URL(req.url).searchParams.get('steps');
  const stepsQS = stepsParam === 'true' ? '&steps=true' : '';
  const hedef = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson${stepsQS}`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const r = await fetch(hedef, { signal: ctrl.signal });
    if (!r.ok) {
      return corsJson({ hata: 'osrm ust servis ' + r.status }, { status: 502 });
    }
    const j = await r.json();
    const res = corsJson(j);
    res.headers.set('Cache-Control', 'public, s-maxage=300');
    return res;
  } catch (e: unknown) {
    const err = e as { message?: string };
    return corsJson({ hata: 'osrm baglanti', detay: String(err?.message || e) }, { status: 502 });
  } finally {
    clearTimeout(t);
  }
}
