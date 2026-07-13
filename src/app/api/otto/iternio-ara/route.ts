import { NextRequest } from 'next/server';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

export const maxDuration = 25;

const FETCH_TIMEOUT_MS = 15000;
const ABRP_BASE = 'https://api.iternio.com';
const ABRP_VERSION = '7.1.1';

type Nokta = { lat?: unknown; long?: unknown };
type BBox = { coordinates?: unknown };

function bboxDogrula(bboxes: unknown): string | null {
  if (!Array.isArray(bboxes) || bboxes.length === 0 || bboxes.length > 4) {
    return 'boundingBoxes gecersiz';
  }
  for (const b of bboxes as BBox[]) {
    const c = b?.coordinates;
    if (!Array.isArray(c) || c.length !== 2) return 'coordinates 2 nokta olmali';
    for (const n of c as Nokta[]) {
      const la = Number(n?.lat);
      const lo = Number(n?.long);
      if (!isFinite(la) || !isFinite(lo)) return 'lat/long sayisal olmali';
      if (la < -90 || la > 90 || lo < -180 || lo > 180) return 'lat/long aralik disi';
    }
  }
  return null;
}

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: NextRequest) {
  let govde: Record<string, unknown>;
  try { govde = await req.json(); }
  catch { return corsJson({ hata: 'gecersiz json' }, { status: 400 }); }

  const hata = bboxDogrula(govde?.boundingBoxes);
  if (hata) return corsJson({ hata }, { status: 400 });

  const key = process.env.ITERNIO_KEY || '';
  if (!key) return corsJson({ hata: 'iternio anahtar yok' }, { status: 503 });

  const hedef = ABRP_BASE + '/2/charger/_search/bounding-boxes/ids';
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
      body: JSON.stringify(govde),
    });
    if (!r.ok) return corsJson({ hata: 'iternio ust servis ' + r.status }, { status: 502 });
    const j = await r.json();
    const res = corsJson(j);
    res.headers.set('Cache-Control', 'public, s-maxage=300');
    return res;
  } catch (e: unknown) {
    const err = e as { message?: string };
    return corsJson({ hata: 'iternio baglanti', detay: String(err?.message || e) }, { status: 502 });
  } finally {
    clearTimeout(t);
  }
}
