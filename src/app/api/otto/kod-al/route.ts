import { NextRequest, NextResponse } from 'next/server';
import { getSql, rastgeleKod } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const { adminKey, etiket, adet, tip } = await req.json();
    if (adminKey !== process.env.OTTO_ADMIN_KEY) {
      return NextResponse.json({ ok:false, hata:'yetkisiz' }, { status:401 });
    }
    const sql = getSql();
    const n = Math.min(Math.max(parseInt(adet)||1, 1), 50);
    const kodTipi = tip === 'otto+' ? 'otto+' : 'otto';
    const uretilen: string[] = [];
    for (let i=0; i<n; i++) {
      let kod = rastgeleKod();
      // çakışma olmayana kadar dene (çok nadir)
      for (let t=0; t<5; t++) {
        const v = await sql`SELECT 1 FROM otto_kodlar WHERE kod=${kod}`;
        if (v.length === 0) break;
        kod = rastgeleKod();
      }
      await sql`INSERT INTO otto_kodlar (kod, durum, not_alan, tip) VALUES (${kod}, 'bos', ${etiket||null}, ${kodTipi})`;
      uretilen.push(kod);
    }
    return NextResponse.json({ ok:true, kodlar: uretilen, tip: kodTipi });
  } catch(error) {
    console.error("OTTO API ERROR:", error);
    return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
