import { NextRequest } from 'next/server';
import { getSql } from '@/lib/otto-db';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';
import { tokenDenetle } from '@/app/api/_lib/mobil-auth';

const IZINLI_TIPLER = new Set([
  'yolculuk', 'sarj_basladi', 'sarj_bitti', 'batarya_dusuk', 'uyari',
]);

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET(req: NextRequest) {
  try {
    const oturum = await tokenDenetle(req);
    if (!oturum) {
      return corsJson({ ok:false, hata:'yetkisiz' }, { status:401 });
    }
    const url = new URL(req.url);
    const tip = url.searchParams.get('tip') || '';
    const limitHam = parseInt(url.searchParams.get('limit') || '', 10);
    const limit = Number.isFinite(limitHam)
      ? Math.min(Math.max(limitHam, 1), 100)
      : 30;

    const sql = getSql();
    const rows = tip && IZINLI_TIPLER.has(tip)
      ? await sql`
          SELECT id, olay_id, tip, veri, ts
          FROM vehicle_events
          WHERE cihaz_id=${oturum.cihazId} AND tip=${tip}
          ORDER BY ts DESC
          LIMIT ${limit}
        `
      : await sql`
          SELECT id, olay_id, tip, veri, ts
          FROM vehicle_events
          WHERE cihaz_id=${oturum.cihazId}
          ORDER BY ts DESC
          LIMIT ${limit}
        `;

    const olaylar = (rows as Array<Record<string, unknown>>).map(r => {
      const idHam = r.id as number | bigint | string;
      const tsHam = r.ts as Date | string;
      return {
        id: typeof idHam === 'bigint' ? idHam.toString() : idHam,
        olayId: r.olay_id as string,
        tip: r.tip as string,
        veri: r.veri,
        ts: tsHam instanceof Date ? tsHam.toISOString() : new Date(tsHam).toISOString(),
      };
    });

    return corsJson({ ok:true, olaylar });
  } catch (e) {
    console.error('MOBIL OLAYLAR ERROR:', e);
    return corsJson({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
