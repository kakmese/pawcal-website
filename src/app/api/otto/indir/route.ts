import { NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function GET() {
  try {
    const sql = getSql();
    const rows = await sql`SELECT apk_url, version_name FROM otto_surum WHERE id=1`;
    if (rows.length === 0 || !rows[0].apk_url) {
      return NextResponse.json({ ok: false, hata: 'apk yok' }, { status: 404 });
    }
    const apkUrl = rows[0].apk_url as string;
    const vName = (rows[0].version_name as string) || '1.0';
    const upstream = await fetch(apkUrl, { redirect: 'follow' });
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ ok: false, hata: 'indirilemedi' }, { status: 502 });
    }
    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': `attachment; filename="otto-${vName}.apk"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ ok: false, hata: 'sunucu' }, { status: 500 });
  }
}
