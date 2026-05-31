import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const sql = getSql();
    const { kod, cihazId, surum } = await req.json();
    if (!kod || !cihazId) return NextResponse.json({ ok:false, hata:'eksik' }, { status:400 });
    const rows = await sql`SELECT kod, durum, cihaz_id, iptal FROM otto_kodlar WHERE kod=${kod}`;
    if (rows.length === 0) return NextResponse.json({ ok:false, hata:'gecersiz' });
    const k = rows[0];
    if (k.iptal === true) return NextResponse.json({ ok:false, hata:'iptal' });
    // Aynı cihaz daha önce aktive ettiyse tekrar izin ver (yeniden kurulum vb.)
    if (k.durum === 'kullanildi' && k.cihaz_id === cihazId) {
      await sql`UPDATE otto_kodlar SET son_gorulme=now(), uygulama_surumu=${surum||null} WHERE kod=${kod}`;
      return NextResponse.json({ ok:true });
    }
    if (k.durum !== 'bos') return NextResponse.json({ ok:false, hata:'kullanilmis' });
    await sql`UPDATE otto_kodlar SET durum='kullanildi', cihaz_id=${cihazId}, aktivasyon_tarihi=now(), son_gorulme=now(), uygulama_surumu=${surum||null} WHERE kod=${kod} AND durum='bos'`;
    return NextResponse.json({ ok:true });
  } catch(e) {
    return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
