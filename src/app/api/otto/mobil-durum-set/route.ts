import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    let body: { adminKey?: string; yayinda?: boolean } | null = null;
    try { body = await req.json(); } catch { body = null; }
    const key = req.headers.get('x-admin-key') || (body && body.adminKey) || '';
    if (key !== process.env.OTTO_ADMIN_KEY) {
      return NextResponse.json({ ok: false, hata: 'yetkisiz' }, { status: 401 });
    }
    const yayinda = body?.yayinda === true;
    const sql = getSql();
    await sql`
      INSERT INTO site_ayar (anahtar, deger, guncelleme)
      VALUES ('otto_mobil_yayinda', ${yayinda ? 'true' : 'false'}, now())
      ON CONFLICT (anahtar) DO UPDATE SET deger = EXCLUDED.deger, guncelleme = now()
    `;
    return NextResponse.json({ ok: true, yayinda });
  } catch (e) {
    console.error('OTTO MOBIL-DURUM-SET ERROR:', e);
    return NextResponse.json({ ok: false, hata: 'sunucu' }, { status: 500 });
  }
}
