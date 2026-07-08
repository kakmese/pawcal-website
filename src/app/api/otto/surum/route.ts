import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function GET(req: NextRequest) {
  try {
    const tip = (new URL(req.url).searchParams.get('tip') || '').trim();
    const sql = getSql();

    let rows: {
      version_code: number | null;
      version_name: string | null;
      apk_url: string | null;
      notlar: string | null;
      zorunlu: boolean | null;
    }[] = [];
    if (tip) {
      try {
        rows = await sql`SELECT version_code, version_name, apk_url, notlar, zorunlu FROM otto_surum WHERE tip=${tip} LIMIT 1` as typeof rows;
      } catch {
        rows = [];
      }
    }
    if (rows.length === 0) {
      rows = await sql`SELECT version_code, version_name, apk_url, notlar, zorunlu FROM otto_surum WHERE id=1` as typeof rows;
    }
    if (rows.length === 0) return NextResponse.json({ ok: false }, { status: 404 });
    const r = rows[0];
    return NextResponse.json({
      ok: true,
      versionCode: r.version_code,
      versionName: r.version_name,
      apkUrl: r.apk_url,
      notlar: r.notlar,
      zorunlu: r.zorunlu,
    });
  } catch {
    return NextResponse.json({ ok: false, hata: 'sunucu' }, { status: 500 });
  }
}
