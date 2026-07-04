import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    let body: { adminKey?: string } | null = null;
    try { body = await req.json(); } catch { body = null; }
    const key = req.headers.get('x-admin-key') || (body && body.adminKey) || '';
    if (key !== process.env.OTTO_ADMIN_KEY) {
      return NextResponse.json({ ok:false, hata:'yetkisiz' }, { status:401 });
    }
    const sql = getSql();

    const satirlar = await sql`
      WITH araclar AS (
        SELECT DISTINCT ON (cihaz_id) cihaz_id, kod
        FROM otto_kodlar
        WHERE cihaz_id IS NOT NULL AND durum='kullanildi' AND iptal=false
        ORDER BY cihaz_id, aktivasyon_tarihi DESC NULLS LAST
      ),
      mk AS (
        SELECT cihaz_id,
          COUNT(*)::int AS mobil_sayisi,
          MAX(son_acilis) AS mobil_son,
          array_agg(DISTINCT platform) FILTER (WHERE platform IS NOT NULL) AS platformlar,
          SUM(acilis_sayisi)::int AS acilis_toplam
        FROM mobil_kurulum
        WHERE cihaz_id IS NOT NULL
        GROUP BY cihaz_id
      )
      SELECT
        a.cihaz_id,
        a.kod           AS otto_kod,
        vs.updated_at   AS otto_son,
        COALESCE(mk.mobil_sayisi, 0) AS mobil_sayisi,
        mk.mobil_son,
        mk.platformlar,
        COALESCE(mk.acilis_toplam, 0) AS acilis_toplam
      FROM araclar a
      LEFT JOIN vehicle_state vs ON vs.cihaz_id = a.cihaz_id
      LEFT JOIN mk ON mk.cihaz_id = a.cihaz_id
      ORDER BY vs.updated_at DESC NULLS LAST
      LIMIT 500
    `;

    const ozet = await sql`
      WITH araclar AS (
        SELECT DISTINCT cihaz_id FROM otto_kodlar
        WHERE cihaz_id IS NOT NULL AND durum='kullanildi' AND iptal=false
      ),
      mk AS (
        SELECT DISTINCT cihaz_id FROM mobil_kurulum WHERE cihaz_id IS NOT NULL
      ),
      otto_aktif AS (
        SELECT cihaz_id FROM vehicle_state WHERE updated_at > now() - interval '7 days'
      )
      SELECT
        (SELECT COUNT(*) FROM araclar)::int AS toplam_arac,
        (SELECT COUNT(*) FROM araclar a WHERE a.cihaz_id IN (SELECT cihaz_id FROM otto_aktif))::int AS otto_kullanan,
        (SELECT COUNT(*) FROM araclar a WHERE a.cihaz_id IN (SELECT cihaz_id FROM mk))::int AS mobil_kuran,
        (SELECT COUNT(*) FROM araclar a
          WHERE a.cihaz_id IN (SELECT cihaz_id FROM otto_aktif)
            AND a.cihaz_id IN (SELECT cihaz_id FROM mk))::int AS ikisi
    `;

    return NextResponse.json({ ok:true, ozet: ozet[0], liste: satirlar });
  } catch (e) {
    console.error('OTTO KULLANICILAR ERROR:', e);
    return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
