import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const { adminKey } = await req.json();
    if (adminKey !== process.env.OTTO_ADMIN_KEY) {
      return NextResponse.json({ ok:false, hata:'yetkisiz' }, { status:401 });
    }
    const sql = getSql();
    const ozet = await sql`
      SELECT
        COUNT(*)::int AS toplam,
        COUNT(*) FILTER (WHERE durum='kullanildi')::int AS aktive,
        COUNT(*) FILTER (WHERE durum='bos')::int AS bos,
        COUNT(*) FILTER (WHERE son_gorulme > now() - interval '7 days')::int AS aktif7,
        COUNT(*) FILTER (WHERE iptal=true)::int AS iptalli
      FROM otto_kodlar`;
    const liste = await sql`
      SELECT kod, durum, not_alan, cihaz_id, olusturma_tarihi, aktivasyon_tarihi, son_gorulme, uygulama_surumu, iptal
      FROM otto_kodlar ORDER BY olusturma_tarihi DESC LIMIT 200`;
    return NextResponse.json({ ok:true, ozet: ozet[0], liste });
  } catch(error) {
    console.error("OTTO API ERROR:", error);
    return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
