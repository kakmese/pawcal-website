import { NextRequest, NextResponse } from 'next/server';
import { getSql, rastgeleKod } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const { adminKey, etiket, adet } = await req.json();
    if (adminKey !== process.env.OTTO_ADMIN_KEY) {
      return NextResponse.json({ ok:false, hata:'yetkisiz' }, { status:401 });
    }
    const sql = getSql();
    const n = Math.min(Math.max(parseInt(adet)||1, 1), 50);
    const uretilen: string[] = [];
    for (let i=0; i<n; i++) {
      let kod = rastgeleKod();
      // çakışma olmayana kadar dene (çok nadir)
      for (let t=0; t<5; t++) {
        const v = await sql`SELECT 1 FROM otto_kodlar WHERE kod=${kod}`;
        if (v.length === 0) break;
        kod = rastgeleKod();
      }
      await sql`INSERT INTO otto_kodlar (kod, durum, not_alan) VALUES (${kod}, 'bos', ${etiket||null})`;
      uretilen.push(kod);
    }
    return NextResponse.json({ ok:true, kodlar: uretilen });
  } catch(error) {
    console.error("OTTO API ERROR:", error);
    return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
