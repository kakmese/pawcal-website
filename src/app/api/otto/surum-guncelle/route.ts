import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const { adminKey, versionCode, versionName, apkUrl, notlar, zorunlu } = await req.json();
    if (adminKey !== process.env.OTTO_ADMIN_KEY) return NextResponse.json({ ok:false, hata:'yetkisiz' }, { status:401 });
    const vc = parseInt(versionCode);
    if (!vc || !versionName) return NextResponse.json({ ok:false, hata:'eksik' }, { status:400 });
    const sql = getSql();
    await sql`UPDATE otto_surum SET version_code=${vc}, version_name=${versionName}, apk_url=${apkUrl||null}, notlar=${notlar||null}, zorunlu=${zorunlu===true}, guncelleme_tarihi=now() WHERE id=1`;
    return NextResponse.json({ ok:true });
  } catch(e) { return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 }); }
}
