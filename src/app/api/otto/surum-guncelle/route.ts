import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const { adminKey, tip: rawTip, versionCode, versionName, apkUrl, notlar, zorunlu } = await req.json();
    if (adminKey !== process.env.OTTO_ADMIN_KEY) return NextResponse.json({ ok:false, hata:'yetkisiz' }, { status:401 });
    const tip = (typeof rawTip === 'string' && rawTip.trim()) ? rawTip.trim() : 'otto';
    if (tip !== 'otto' && tip !== 'otto+') return NextResponse.json({ ok:false, hata:'gecersiz_tip' }, { status:400 });
    const vc = parseInt(versionCode);
    if (!vc || !versionName) return NextResponse.json({ ok:false, hata:'eksik' }, { status:400 });
    const sql = getSql();
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
  } catch(error) {
    console.error("OTTO API ERROR:", error);
    return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
