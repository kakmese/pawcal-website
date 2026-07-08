import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get('x-admin-key') !== process.env.OTTO_ADMIN_KEY) {
      return NextResponse.json({ ok:false, hata:'yetkisiz' }, { status:401 });
    }
    const sql = getSql();

    await sql`CREATE TABLE IF NOT EXISTS vehicle_state (
      cihaz_id text PRIMARY KEY,
      durum jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now())`;

    await sql`CREATE TABLE IF NOT EXISTS vehicle_events (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      cihaz_id text NOT NULL,
      olay_id text NOT NULL,
      tip text NOT NULL,
      veri jsonb NOT NULL,
      ts timestamptz NOT NULL DEFAULT now())`;

    await sql`CREATE UNIQUE INDEX IF NOT EXISTS vehicle_events_dedup ON vehicle_events (cihaz_id, olay_id)`;
    await sql`CREATE INDEX IF NOT EXISTS vehicle_events_cihaz_ts ON vehicle_events (cihaz_id, ts DESC)`;

    await sql`CREATE TABLE IF NOT EXISTS mobile_tokens (
      token_hash text PRIMARY KEY,
      cihaz_id text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      last_seen timestamptz)`;

    await sql`CREATE INDEX IF NOT EXISTS mobile_tokens_cihaz ON mobile_tokens (cihaz_id)`;

    // otto_kodlar.cihaz_id kolonu keşifte mevcut; yine de defansif garanti:
    await sql`ALTER TABLE otto_kodlar ADD COLUMN IF NOT EXISTS cihaz_id text`;

    // otto_kodlar gerçekten mevcut mu ve şeması ne? Öncesinde diagnostiği topla.
    const tablo_bilgisi = await sql`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_name = 'otto_kodlar'`;

    // Kod tipi: 'otto' (ücretsiz) veya 'otto+' (premium). Kendi try/catch'i — patlarsa 500 döner.
    let tip_alter_ok = false;
    let tip_alter_detay: string | null = null;
    try {
      await sql`ALTER TABLE otto_kodlar ADD COLUMN IF NOT EXISTS tip text NOT NULL DEFAULT 'otto'`;
      tip_alter_ok = true;
    } catch (e: unknown) {
      const err = e as { message?: string; code?: string };
      tip_alter_detay = String(err?.message || e);
      console.error('OTTO MIGRATE tip ALTER hata:', e);
      return NextResponse.json(
        {
          ok: false,
          hata: 'tip_alter_basarisiz',
          detay: tip_alter_detay,
          kod: err?.code || null,
          tablo_bilgisi,
        },
        { status: 500 },
      );
    }

    // Yedek/eski satırlar için tip NULL kalmışsa 'otto' yap (idempotent).
    try {
      await sql`UPDATE otto_kodlar SET tip='otto' WHERE tip IS NULL`;
    } catch (e) {
      console.error('OTTO MIGRATE tip backfill hata (yoksayıldı):', e);
    }

    // DOĞRULAMA: tip kolonu gerçekten var mı?
    const tip_kolon_satirlari = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name='otto_kodlar' AND column_name='tip'`;
    const tip_kolonu_var = tip_kolon_satirlari.length > 0;

    // ABRP fiyat/detay cache
    await sql`CREATE TABLE IF NOT EXISTS abrp_cache (
      coord_key text PRIMARY KEY,
      card_id   bigint,
      guc       real,
      konektor  text,
      operator  text,
      soket     int,
      price     real,
      vat       real,
      card_ts   timestamptz,
      price_ts  timestamptz)`;

    // Otto Mobil kurulum/kullanım takibi
    await sql`CREATE TABLE IF NOT EXISTS mobil_kurulum (
      cihaz_kimlik text PRIMARY KEY,
      cihaz_id text,
      platform text,
      surum text,
      ilk_kurulum timestamptz DEFAULT now(),
      son_acilis timestamptz DEFAULT now(),
      acilis_sayisi int DEFAULT 1)`;
    await sql`CREATE INDEX IF NOT EXISTS mobil_kurulum_arac ON mobil_kurulum (cihaz_id)`;

    // Site geneli ayarlar
    await sql`CREATE TABLE IF NOT EXISTS site_ayar (
      anahtar text PRIMARY KEY,
      deger text,
      guncelleme timestamptz DEFAULT now())`;
    await sql`INSERT INTO site_ayar (anahtar, deger)
      VALUES ('otto_mobil_yayinda', 'false')
      ON CONFLICT (anahtar) DO NOTHING`;

    // Duyuru/pop-up anahtarları — her tip için ayrı (idempotent).
    const duyuruAnahtarlari: [string, string][] = [
      ['otto_duyuru_aktif', '0'],
      ['otto_duyuru_baslik', ''],
      ['otto_duyuru_metin', ''],
      ['otto_duyuru_buton', ''],
      ['otto_duyuru_link', ''],
      ['otto_duyuru_no', '1'],
      ['otto_plus_duyuru_aktif', '0'],
      ['otto_plus_duyuru_baslik', ''],
      ['otto_plus_duyuru_metin', ''],
      ['otto_plus_duyuru_buton', ''],
      ['otto_plus_duyuru_link', ''],
      ['otto_plus_duyuru_no', '1'],
    ];
    for (const [k, v] of duyuruAnahtarlari) {
      await sql`INSERT INTO site_ayar (anahtar, deger)
        VALUES (${k}, ${v})
        ON CONFLICT (anahtar) DO NOTHING`;
    }

    return NextResponse.json({
      ok: true,
      tablolar: ['vehicle_state','vehicle_events','mobile_tokens','abrp_cache','mobil_kurulum','site_ayar'],
      tip_alter_ok,
      tip_kolonu_var,
      tip_kolon_detay: tip_kolon_satirlari[0] || null,
      tablo_bilgisi,
    });
  } catch (e: unknown) {
    const err = e as { message?: string; code?: string };
    console.error('OTTO MIGRATE ERROR:', e);
    return NextResponse.json(
      { ok:false, hata:'sunucu', detay: String(err?.message || e), kod: err?.code || null },
      { status:500 },
    );
  }
}
