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

    // otto_kodlar.cihaz_id kolonu keşifte mevcut (dogrula route'u yazıyor); yine de defansif garanti:
    await sql`ALTER TABLE otto_kodlar ADD COLUMN IF NOT EXISTS cihaz_id text`;

    // Kod tipi: 'otto' (ücretsiz/eski) veya 'otto+' (premium/ücretli). Mevcut tüm kodlar 'otto' kalır.
    await sql`ALTER TABLE otto_kodlar ADD COLUMN IF NOT EXISTS tip text NOT NULL DEFAULT 'otto'`;

    // ABRP fiyat/detay cache (istasyon-fiyat proxy için)
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

    // Otto Mobil kurulum/kullanım takibi (her cihaz = bir telefon; cihaz_id ARAÇ'a bağlı)
    await sql`CREATE TABLE IF NOT EXISTS mobil_kurulum (
      cihaz_kimlik text PRIMARY KEY,
      cihaz_id text,
      platform text,
      surum text,
      ilk_kurulum timestamptz DEFAULT now(),
      son_acilis timestamptz DEFAULT now(),
      acilis_sayisi int DEFAULT 1)`;
    await sql`CREATE INDEX IF NOT EXISTS mobil_kurulum_arac ON mobil_kurulum (cihaz_id)`;

    // Site geneli ayarlar (anahtar/deger). Otto Mobil aç/kapa gibi bayraklar.
    await sql`CREATE TABLE IF NOT EXISTS site_ayar (
      anahtar text PRIMARY KEY,
      deger text,
      guncelleme timestamptz DEFAULT now())`;
    await sql`INSERT INTO site_ayar (anahtar, deger)
      VALUES ('otto_mobil_yayinda', 'false')
      ON CONFLICT (anahtar) DO NOTHING`;

    return NextResponse.json({
      ok:true,
      tablolar:['vehicle_state','vehicle_events','mobile_tokens','abrp_cache','mobil_kurulum','site_ayar'],
    });
  } catch (e) {
    console.error('OTTO MIGRATE ERROR:', e);
    return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
