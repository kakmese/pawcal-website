import { NextRequest } from 'next/server';
import { getSql } from '@/lib/otto-db';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';
import { tokenDenetle } from '@/app/api/_lib/mobil-auth';

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET(req: NextRequest) {
  try {
    const oturum = await tokenDenetle(req);
    if (!oturum) {
      return corsJson({ ok:false, hata:'yetkisiz' }, { status:401 });
    }
    const sql = getSql();
    const rows = await sql`
      SELECT durum, updated_at FROM vehicle_state WHERE cihaz_id=${oturum.cihazId} LIMIT 1
    `;
    if (rows.length === 0) {
      return corsJson({ ok:true, guncelleme:null, durum:null });
    }
    const r = rows[0];
    const guncelleme = r.updated_at instanceof Date
      ? r.updated_at.toISOString()
      : new Date(r.updated_at).toISOString();
    return corsJson({ ok:true, guncelleme, durum: r.durum });
  } catch (e) {
    console.error('MOBIL DURUM ERROR:', e);
    return corsJson({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
