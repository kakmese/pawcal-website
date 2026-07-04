import { NextRequest, NextResponse } from 'next/server';
import { getSql, rastgeleKod } from '@/lib/otto-db';

type NeonSql = ReturnType<typeof getSql>;

async function tipKolonuGaranti(sql: NeonSql) {
  await sql`ALTER TABLE otto_kodlar ADD COLUMN IF NOT EXISTS tip text NOT NULL DEFAULT 'otto'`;
}

async function kodEkle(sql: NeonSql, kod: string, etiket: string | null, kodTipi: string) {
  await sql`INSERT INTO otto_kodlar (kod, durum, not_alan, tip) VALUES (${kod}, 'bos', ${etiket}, ${kodTipi})`;
}

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
    const etiketAlan = (etiket || null) as string | null;

    for (let i=0; i<n; i++) {
      let kod = rastgeleKod();
      for (let t=0; t<5; t++) {
        const v = await sql`SELECT 1 FROM otto_kodlar WHERE kod=${kod}`;
        if (v.length === 0) break;
        kod = rastgeleKod();
      }
      try {
        await kodEkle(sql, kod, etiketAlan, kodTipi);
      } catch (e: unknown) {
        const err = e as { message?: string; code?: string };
        // 42703 = undefined_column. tip kolonu yoksa şimdi ekle ve tek sefer tekrar dene.
        if (err?.code === '42703') {
          console.warn('OTTO KOD-AL tip kolonu yok, ALTER + retry:', err.message);
          await tipKolonuGaranti(sql);
          await kodEkle(sql, kod, etiketAlan, kodTipi);
        } else {
          throw e;
        }
      }
      uretilen.push(kod);
    }
    return NextResponse.json({ ok:true, kodlar: uretilen, tip: kodTipi });
  } catch(error: unknown) {
    const err = error as { message?: string; code?: string };
    console.error("OTTO KOD-AL ERROR:", error);
    return NextResponse.json(
      { ok:false, hata:'sunucu', detay: String(err?.message || error), kod: err?.code || null },
      { status:500 },
    );
  }
}
