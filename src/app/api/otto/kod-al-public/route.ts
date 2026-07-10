import { NextRequest, NextResponse } from 'next/server';
import { getSql, rastgeleKod } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const sql = getSql();
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'bilinmeyen';
    const { etiket } = await req.json();

    // Aynı IP daha önce kod aldıysa — yeni üretme, mevcut kodu ver.
    // not_alan formatı '<etiket>|ip:<ip>' olduğundan LIKE '%|ip:<ip>' sonu ip ile
    // bitişi garanti eder; ayraç '|ip:' önündeki karakterler farklı olsa da eşleşme
    // güvenli kalır.
    const mevcut = await sql`
      SELECT kod FROM otto_kodlar
      WHERE not_alan LIKE ${'%|ip:'+ip}
        AND tip='otto'
        AND (iptal IS NULL OR iptal = false)
      ORDER BY olusturma_tarihi DESC
      LIMIT 1
    ` as { kod: string }[];
    if (mevcut.length > 0) {
      return NextResponse.json({ ok: true, kod: mevcut[0].kod, tekrar: true });
    }

    // İlk defa geliyor — yeni kod üret ve kaydet.
    let kod = rastgeleKod();
    for (let t = 0; t < 5; t++) {
      const v = await sql`SELECT 1 FROM otto_kodlar WHERE kod=${kod}`;
      if (v.length === 0) break;
      kod = rastgeleKod();
    }
    const notVal = (etiket ? String(etiket).slice(0, 60) : '') + '|ip:' + ip;
    await sql`INSERT INTO otto_kodlar (kod, durum, not_alan) VALUES (${kod}, 'bos', ${notVal})`;
    return NextResponse.json({ ok: true, kod, tekrar: false });
  } catch (e) {
    console.error('OTTO KOD-AL-PUBLIC ERROR:', e);
    return NextResponse.json({ ok: false, hata: 'sunucu' }, { status: 500 });
  }
}
