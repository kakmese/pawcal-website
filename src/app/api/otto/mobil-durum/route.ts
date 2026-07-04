import { NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function GET() {
  try {
    const sql = getSql();
    const rows = await sql`SELECT deger FROM site_ayar WHERE anahtar='otto_mobil_yayinda' LIMIT 1`;
    const yayinda = rows.length > 0 && String(rows[0].deger).toLowerCase() === 'true';
    return NextResponse.json({ ok: true, yayinda }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    console.error('OTTO MOBIL-DURUM ERROR:', e);
    return NextResponse.json({ ok: false, yayinda: false }, { status: 500 });
  }
}
