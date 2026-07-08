import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function GET(req: NextRequest) {
  try {
    // URLSearchParams `+` karakterini boşluğa çevirir → geri kur, sonra normalize et
    const raw = new URL(req.url).searchParams.get('tip') || '';
    const cleaned = raw.replace(/ /g, '+').trim();
    const tip: 'otto' | 'otto+' = cleaned === 'otto+' ? 'otto+' : 'otto';
    const sql = getSql();
    const rows = await sql`SELECT version_code, version_name, apk_url, notlar, zorunlu FROM otto_surum WHERE tip=${tip} LIMIT 1` as {
      version_code: number | null;
      version_name: string | null;
      apk_url: string | null;
      notlar: string | null;
      zorunlu: boolean | null;
    }[];
    if (rows.length === 0) {
      return NextResponse.json({ ok: false, tip, hata: 'satir_yok' }, { status: 200 });
    }
    const r = rows[0];
    return NextResponse.json({
      ok: true,
      tip,
      versionCode: r.version_code,
      versionName: r.version_name,
      apkUrl: r.apk_url,
      notlar: r.notlar,
      zorunlu: r.zorunlu,
    });
  } catch (e: unknown) {
    const err = e as { message?: string; code?: string };
    console.error('OTTO SURUM GET ERROR:', e);
    return NextResponse.json(
      { ok: false, hata: 'sunucu', detay: String(err?.message || e), kod: err?.code || null },
      { status: 200 },
    );
  }
}
