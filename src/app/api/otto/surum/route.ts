import { NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function GET() {
  try {
    const sql = getSql();
    const rows = await sql`SELECT version_code, version_name, apk_url, notlar, zorunlu FROM otto_surum WHERE id=1`;
    if (rows.length === 0) return NextResponse.json({ ok:false }, { status:404 });
    const r = rows[0];
    return NextResponse.json({ ok:true, versionCode: r.version_code, versionName: r.version_name, apkUrl: r.apk_url, notlar: r.notlar, zorunlu: r.zorunlu });
  } catch(e) { return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 }); }
}
