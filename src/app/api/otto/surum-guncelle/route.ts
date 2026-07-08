import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const { adminKey, tip: rawTip, versionCode, versionName, apkUrl, notlar, zorunlu } = await req.json();
    if (adminKey !== process.env.OTTO_ADMIN_KEY) return NextResponse.json({ ok:false, hata:'yetkisiz' }, { status:401 });
    // JSON body'de `+` sorunu yok ama yine de sağlam normalize et.
    const rawStr = typeof rawTip === 'string' ? rawTip : '';
    const cleaned = rawStr.replace(/ /g, '+').trim();
    const tip: 'otto' | 'otto+' = cleaned === 'otto+' ? 'otto+' : 'otto';
    const vc = parseInt(versionCode);
    if (!vc || !versionName) return NextResponse.json({ ok:false, hata:'eksik' }, { status:400 });
    const sql = getSql();
    try {
      await sql`INSERT INTO otto_surum (tip, version_code, version_name, apk_url, notlar, zorunlu, guncelleme_tarihi)
        VALUES (${tip}, ${vc}, ${versionName}, ${apkUrl||null}, ${notlar||null}, ${zorunlu===true}, now())
        ON CONFLICT (tip) DO UPDATE SET
          version_code=EXCLUDED.version_code,
          version_name=EXCLUDED.version_name,
          apk_url=EXCLUDED.apk_url,
          notlar=EXCLUDED.notlar,
          zorunlu=EXCLUDED.zorunlu,
          guncelleme_tarihi=now()`;
      return NextResponse.json({ ok:true, tip });
    } catch (e: unknown) {
      const err = e as { message?: string; code?: string };
      console.error('OTTO SURUM-GUNCELLE upsert hata:', e);
      return NextResponse.json(
        { ok:false, hata:'upsert_basarisiz', detay: String(err?.message || e), kod: err?.code || null, tip },
        { status: 200 },
      );
    }
  } catch (e: unknown) {
    const err = e as { message?: string; code?: string };
    console.error('OTTO SURUM-GUNCELLE ERROR:', e);
    return NextResponse.json(
      { ok:false, hata:'sunucu', detay: String(err?.message || e), kod: err?.code || null },
      { status: 200 },
    );
  }
}
