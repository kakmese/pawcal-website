import { NextRequest, NextResponse } from 'next/server';
import { getSql, rastgeleKod } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const sql = getSql();
    const ip =
      req.headers.get('cf-connecting-ip')?.trim() ||
      req.headers.get('x-real-ip')?.trim() ||
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'bilinmeyen';

    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const etiket = typeof body.etiket === 'string' ? body.etiket : '';
    const cihazHam = typeof body.cihaz === 'string' ? body.cihaz : '';
    const cihaz = cihazHam.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 64);

    // 1) Cihaz kimligi esas: ayni cihaz -> ayni kod.
    if (cihaz && cihaz !== 'nostorage') {
      const m = await sql`
        SELECT kod FROM otto_kodlar
        WHERE not_alan LIKE ${'%|cid:' + cihaz + '|%'}
          AND tip='otto'
          AND (iptal IS NULL OR iptal = false)
        ORDER BY olusturma_tarihi DESC
        LIMIT 1
      ` as { kod: string }[];
      if (m.length > 0) return NextResponse.json({ ok: true, kod: m[0].kod, tekrar: true });
    }

    // 2) Cihaz yoksa IP yedegi — 'bilinmeyen' ASLA eslesme anahtari olamaz.
    if (!cihaz && ip !== 'bilinmeyen') {
      const m = await sql`
        SELECT kod FROM otto_kodlar
        WHERE not_alan LIKE ${'%|ip:' + ip}
          AND tip='otto'
          AND (iptal IS NULL OR iptal = false)
        ORDER BY olusturma_tarihi DESC
        LIMIT 1
      ` as { kod: string }[];
      if (m.length > 0) return NextResponse.json({ ok: true, kod: m[0].kod, tekrar: true });
    }

    // 3) Yeni kod uret.
    let kod = rastgeleKod();
    for (let t = 0; t < 5; t++) {
      const v = await sql`SELECT 1 FROM otto_kodlar WHERE kod=${kod}`;
      if (v.length === 0) break;
      kod = rastgeleKod();
    }
    const notVal =
      (etiket ? String(etiket).slice(0, 60) : '') +
      '|cid:' + (cihaz || 'yok') +
      '|ip:' + ip;
    await sql`INSERT INTO otto_kodlar (kod, durum, not_alan) VALUES (${kod}, 'bos', ${notVal})`;
    return NextResponse.json({ ok: true, kod, tekrar: false });
  } catch (e) {
    console.error('OTTO KOD-AL-PUBLIC ERROR:', e);
    return NextResponse.json({ ok: false, hata: 'sunucu' }, { status: 500 });
  }
}
