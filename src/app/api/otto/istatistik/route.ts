import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

type OzetSatir = {
  toplam: number;
  aktive: number;
  bos: number;
  aktif7: number;
  iptalli: number;
  otto_plus: number;
};

type ListeSatir = {
  kod: string;
  durum: string;
  not_alan: string | null;
  cihaz_id: string | null;
  olusturma_tarihi: string;
  aktivasyon_tarihi: string | null;
  son_gorulme: string | null;
  uygulama_surumu: string | null;
  iptal: boolean;
  tip: string;
};

export async function POST(req: NextRequest) {
  try {
    const { adminKey } = await req.json();
    if (adminKey !== process.env.OTTO_ADMIN_KEY) {
      return NextResponse.json({ ok:false, hata:'yetkisiz' }, { status:401 });
    }
    const sql = getSql();

    // 'tip' kolonu var mı? Yoksa tip-bağımlı alanları defansif olarak atla.
    let tipVar = false;
    try {
      const kol = await sql`
        SELECT 1 FROM information_schema.columns
        WHERE table_name='otto_kodlar' AND column_name='tip' LIMIT 1`;
      tipVar = kol.length > 0;
    } catch {
      tipVar = false;
    }

    // TEMEL özet — tip'ten bağımsız, her koşulda çalışmalı.
    const ozetTemel = await sql`
      SELECT
        COUNT(*)::int AS toplam,
        COUNT(*) FILTER (WHERE durum='kullanildi')::int AS aktive,
        COUNT(*) FILTER (WHERE durum='bos')::int AS bos,
        COUNT(*) FILTER (WHERE son_gorulme > now() - interval '7 days')::int AS aktif7,
        COUNT(*) FILTER (WHERE iptal=true)::int AS iptalli
      FROM otto_kodlar`;

    // Otto+ sayımı — ayrı, patlarsa 0 olsun.
    let ottoPlus = 0;
    if (tipVar) {
      try {
        const r = await sql`SELECT COUNT(*)::int AS n FROM otto_kodlar WHERE tip='otto+'`;
        ottoPlus = r[0]?.n ?? 0;
      } catch (e) {
        console.error('OTTO ISTATISTIK otto_plus sayimi hata:', e);
      }
    }

    const ozet: OzetSatir = {
      toplam: ozetTemel[0]?.toplam ?? 0,
      aktive: ozetTemel[0]?.aktive ?? 0,
      bos: ozetTemel[0]?.bos ?? 0,
      aktif7: ozetTemel[0]?.aktif7 ?? 0,
      iptalli: ozetTemel[0]?.iptalli ?? 0,
      otto_plus: ottoPlus,
    };

    // Liste — tip varsa dahil et, yoksa 'otto' varsayılanıyla enjekte et.
    let liste: ListeSatir[] = [];
    if (tipVar) {
      const rows = await sql`
        SELECT kod, durum, not_alan, cihaz_id, olusturma_tarihi, aktivasyon_tarihi, son_gorulme, uygulama_surumu, iptal, tip
        FROM otto_kodlar ORDER BY olusturma_tarihi DESC LIMIT 200`;
      liste = rows.map((r) => ({
        kod: r.kod,
        durum: r.durum,
        not_alan: r.not_alan,
        cihaz_id: r.cihaz_id,
        olusturma_tarihi: r.olusturma_tarihi,
        aktivasyon_tarihi: r.aktivasyon_tarihi,
        son_gorulme: r.son_gorulme,
        uygulama_surumu: r.uygulama_surumu,
        iptal: r.iptal,
        tip: r.tip || 'otto',
      }));
    } else {
      const rows = await sql`
        SELECT kod, durum, not_alan, cihaz_id, olusturma_tarihi, aktivasyon_tarihi, son_gorulme, uygulama_surumu, iptal
        FROM otto_kodlar ORDER BY olusturma_tarihi DESC LIMIT 200`;
      liste = rows.map((r) => ({
        kod: r.kod,
        durum: r.durum,
        not_alan: r.not_alan,
        cihaz_id: r.cihaz_id,
        olusturma_tarihi: r.olusturma_tarihi,
        aktivasyon_tarihi: r.aktivasyon_tarihi,
        son_gorulme: r.son_gorulme,
        uygulama_surumu: r.uygulama_surumu,
        iptal: r.iptal,
        tip: 'otto',
      }));
    }

    return NextResponse.json({ ok:true, ozet, liste, tip_kolonu: tipVar });
  } catch(error: unknown) {
    const err = error as { message?: string; code?: string };
    console.error("OTTO ISTATISTIK ERROR:", error);
    return NextResponse.json(
      { ok:false, hata:'sunucu', detay: String(err?.message || error), kod: err?.code || null },
      { status:500 },
    );
  }
}
