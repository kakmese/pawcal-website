import { NextRequest, NextResponse } from 'next/server';
import { getSql, rastgeleKod } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const sql = getSql();
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'bilinmeyen';
    const { etiket } = await req.json();
    // basit fren: aynı IP son 1 saatte 5'ten fazla kod aldıysa reddet
    const say = await sql`SELECT COUNT(*)::int AS c FROM otto_kodlar WHERE not_alan LIKE ${'%|ip:'+ip} AND olusturma_tarihi > now() - interval '1 hour'`;
    if (say[0].c >= 5) return NextResponse.json({ ok:false, hata:'limit' }, { status:429 });
    let kod = rastgeleKod();
    for (let t=0; t<5; t++) { const v = await sql`SELECT 1 FROM otto_kodlar WHERE kod=${kod}`; if (v.length===0) break; kod = rastgeleKod(); }
    const notVal = (etiket ? String(etiket).slice(0,60) : '') + '|ip:' + ip;
    await sql`INSERT INTO otto_kodlar (kod, durum, not_alan) VALUES (${kod}, 'bos', ${notVal})`;
    return NextResponse.json({ ok:true, kod });
  } catch(e) { return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 }); }
}
