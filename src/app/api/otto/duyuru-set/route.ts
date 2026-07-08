import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

type NeonSql = ReturnType<typeof getSql>;

function onek(tip: string): string {
  return tip === 'otto+' ? 'otto_plus_duyuru_' : 'otto_duyuru_';
}

async function ayarOku(sql: NeonSql, anahtar: string): Promise<string> {
  const r = await sql`SELECT deger FROM site_ayar WHERE anahtar=${anahtar} LIMIT 1`;
  const row = (r as { deger: string | null }[])[0];
  return row ? row.deger ?? '' : '';
}

async function ayarYaz(sql: NeonSql, anahtar: string, deger: string): Promise<void> {
  await sql`
    INSERT INTO site_ayar (anahtar, deger, guncelleme)
    VALUES (${anahtar}, ${deger}, now())
    ON CONFLICT (anahtar) DO UPDATE SET deger = EXCLUDED.deger, guncelleme = now()
  `;
}

export async function POST(req: NextRequest) {
  try {
    let body: {
      adminKey?: string;
      tip?: string;
      aktif?: boolean;
      baslik?: string;
      metin?: string;
      buton?: string;
      link?: string;
    } | null = null;
    try { body = await req.json(); } catch { body = null; }
    const key = req.headers.get('x-admin-key') || (body && body.adminKey) || '';
    if (key !== process.env.OTTO_ADMIN_KEY) {
      return NextResponse.json({ ok: false, hata: 'yetkisiz' }, { status: 401 });
    }
    const tip = body?.tip === 'otto+' ? 'otto+' : 'otto';
    const p = onek(tip);
    const aktifYeni = body?.aktif === true ? '1' : '0';
    const baslikYeni = (body?.baslik ?? '').toString().slice(0, 200);
    const metinYeni = (body?.metin ?? '').toString().slice(0, 4000);
    const butonYeni = (body?.buton ?? '').toString().slice(0, 60);
    const linkYeni = (body?.link ?? '').toString().slice(0, 500);

    const sql = getSql();

    const aktifEski = await ayarOku(sql, p + 'aktif');
    const baslikEski = await ayarOku(sql, p + 'baslik');
    const metinEski = await ayarOku(sql, p + 'metin');
    const butonEski = await ayarOku(sql, p + 'buton');
    const linkEski = await ayarOku(sql, p + 'link');
    const noEskiRaw = await ayarOku(sql, p + 'no');
    const noEski = parseInt(noEskiRaw || '1', 10) || 1;

    await ayarYaz(sql, p + 'aktif', aktifYeni);
    await ayarYaz(sql, p + 'baslik', baslikYeni);
    await ayarYaz(sql, p + 'metin', metinYeni);
    await ayarYaz(sql, p + 'buton', butonYeni);
    await ayarYaz(sql, p + 'link', linkYeni);

    // Yeni bir duyuru sayılacaksa (kapalıdan açılıyor VEYA metin/başlık değişti) no'yu artır.
    const yenidenAcildi = aktifEski !== '1' && aktifYeni === '1';
    const metinDegisti =
      baslikYeni !== baslikEski ||
      metinYeni !== metinEski ||
      butonYeni !== butonEski ||
      linkYeni !== linkEski;
    let yeniNo = noEski;
    if (aktifYeni === '1' && (yenidenAcildi || metinDegisti)) {
      yeniNo = noEski + 1;
      await ayarYaz(sql, p + 'no', String(yeniNo));
    }

    return NextResponse.json({ ok: true, tip, yeniNo });
  } catch (e) {
    console.error('OTTO DUYURU-SET ERROR:', e);
    return NextResponse.json({ ok: false, hata: 'sunucu' }, { status: 500 });
  }
}
