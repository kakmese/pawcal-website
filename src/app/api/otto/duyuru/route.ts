import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

function onek(tip: string): string {
  return tip === 'otto+' ? 'otto_plus_duyuru_' : 'otto_duyuru_';
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const tipRaw = (url.searchParams.get('tip') || 'otto').toLowerCase();
    const tip = tipRaw === 'otto+' ? 'otto+' : 'otto';
    const p = onek(tip);
    const anahtarlar = [
      p + 'aktif',
      p + 'baslik',
      p + 'metin',
      p + 'buton',
      p + 'link',
      p + 'no',
    ];
    const sql = getSql();
    const rows = await sql`SELECT anahtar, deger FROM site_ayar WHERE anahtar = ANY(${anahtarlar})`;
    const m = new Map<string, string>();
    for (const r of rows as { anahtar: string; deger: string | null }[]) {
      m.set(r.anahtar, r.deger ?? '');
    }
    const aktif = (m.get(p + 'aktif') || '0') === '1';
    if (!aktif) {
      return NextResponse.json(
        { ok: true, aktif: false, tip },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }
    const no = parseInt(m.get(p + 'no') || '1', 10) || 1;
    return NextResponse.json(
      {
        ok: true,
        aktif: true,
        tip,
        baslik: m.get(p + 'baslik') || '',
        metin: m.get(p + 'metin') || '',
        buton: m.get(p + 'buton') || '',
        link: m.get(p + 'link') || '',
        no,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (e) {
    console.error('OTTO DUYURU ERROR:', e);
    return NextResponse.json({ ok: false, hata: 'sunucu' }, { status: 500 });
  }
}
