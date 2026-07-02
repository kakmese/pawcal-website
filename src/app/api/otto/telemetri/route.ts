import { NextRequest } from 'next/server';
import { getSql } from '@/lib/otto-db';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

const IZINLI_TIPLER = new Set([
  'yolculuk', 'sarj_basladi', 'sarj_bitti', 'batarya_dusuk', 'uyari',
]);

type GelenOlay = {
  olayId?: unknown;
  tip?: unknown;
  veri?: unknown;
  ts?: unknown;
};

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: NextRequest) {
  try {
    const uzunluk = Number(req.headers.get('content-length') || 0);
    if (uzunluk > 64 * 1024) {
      return corsJson({ ok:false, hata:'govde buyuk' }, { status:413 });
    }
    const ham = await req.text();
    if (ham.length > 64 * 1024) {
      return corsJson({ ok:false, hata:'govde buyuk' }, { status:413 });
    }

    let gövde: { cihazId?: unknown; durum?: unknown; olaylar?: unknown };
    try { gövde = JSON.parse(ham); } catch {
      return corsJson({ ok:false, hata:'gecersiz json' }, { status:400 });
    }

    const cihazId = typeof gövde.cihazId === 'string' ? gövde.cihazId.trim() : '';
    if (!cihazId) {
      return corsJson({ ok:false, hata:'cihazId eksik' }, { status:400 });
    }

    const sql = getSql();

    const kayit = await sql`
      SELECT 1 FROM otto_kodlar
      WHERE cihaz_id=${cihazId} AND durum='kullanildi' AND (iptal IS NOT TRUE)
      LIMIT 1
    `;
    if (kayit.length === 0) {
      return corsJson({ ok:false, hata:'cihaz tanınmadı' }, { status:403 });
    }

    if (gövde.durum && typeof gövde.durum === 'object') {
      const durumJson = JSON.stringify(gövde.durum);
      await sql`
        INSERT INTO vehicle_state (cihaz_id, durum, updated_at)
        VALUES (${cihazId}, ${durumJson}::jsonb, now())
        ON CONFLICT (cihaz_id) DO UPDATE
        SET durum = EXCLUDED.durum, updated_at = now()
      `;
    }

    let olayYazildi = 0;
    if (Array.isArray(gövde.olaylar) && gövde.olaylar.length > 0) {
      const olaylar = (gövde.olaylar as GelenOlay[]).slice(0, 50);
      for (const o of olaylar) {
        const olayId = typeof o.olayId === 'string' ? o.olayId.trim() : '';
        const tip = typeof o.tip === 'string' ? o.tip : '';
        if (!olayId || !IZINLI_TIPLER.has(tip)) continue;
        const veri = (o.veri && typeof o.veri === 'object') ? o.veri : {};
        const veriJson = JSON.stringify(veri);
        const tsStr = typeof o.ts === 'string' ? o.ts : null;
        try {
          const sonuc = tsStr
            ? await sql`
                INSERT INTO vehicle_events (cihaz_id, olay_id, tip, veri, ts)
                VALUES (${cihazId}, ${olayId}, ${tip}, ${veriJson}::jsonb, ${tsStr}::timestamptz)
                ON CONFLICT (cihaz_id, olay_id) DO NOTHING
                RETURNING id
              `
            : await sql`
                INSERT INTO vehicle_events (cihaz_id, olay_id, tip, veri)
                VALUES (${cihazId}, ${olayId}, ${tip}, ${veriJson}::jsonb)
                ON CONFLICT (cihaz_id, olay_id) DO NOTHING
                RETURNING id
              `;
          if (sonuc.length > 0) olayYazildi += 1;
        } catch (err) {
          console.error('OTTO TELEMETRI olay hatasi:', err);
        }
      }
    }

    return corsJson({
      ok:true,
      sunucuZamani: new Date().toISOString(),
      olayYazildi,
    });
  } catch (e) {
    console.error('OTTO TELEMETRI ERROR:', e);
    return corsJson({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
