import { NextRequest } from 'next/server';
import { getSql } from '@/lib/otto-db';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

async function sha256hex(s: string): Promise<string> {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}

function tokenUret(): string {
  const bayt = new Uint8Array(32);
  crypto.getRandomValues(bayt);
  const hex = [...bayt].map(x => x.toString(16).padStart(2, '0')).join('');
  return `otk_${hex}`;
}

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: NextRequest) {
  try {
    const { kod } = await req.json();
    if (typeof kod !== 'string' || !kod.trim()) {
      return corsJson({ ok:false, hata:'kod eksik' }, { status:400 });
    }
    const normKod = kod.trim().toUpperCase();

    const sql = getSql();
    const rows = await sql`
      SELECT durum, cihaz_id, iptal FROM otto_kodlar WHERE kod=${normKod} LIMIT 1
    `;
    if (rows.length === 0 || rows[0].iptal === true || rows[0].durum !== 'kullanildi') {
      return corsJson({ ok:false, hata:'kod bulunamadı' }, { status:404 });
    }
    const cihazId = rows[0].cihaz_id;
    if (!cihazId) {
      return corsJson({ ok:false, hata:'araç henüz aktive edilmemiş' }, { status:409 });
    }

    const token = tokenUret();
    const tokenHash = await sha256hex(token);

    await sql`
      INSERT INTO mobile_tokens (token_hash, cihaz_id)
      VALUES (${tokenHash}, ${cihazId})
    `;

    const st = await sql`SELECT 1 FROM vehicle_state WHERE cihaz_id=${cihazId} LIMIT 1`;
    const veriVar = st.length > 0;

    return corsJson({ ok:true, token, veriVar });
  } catch (e) {
    console.error('MOBIL ESLE ERROR:', e);
    return corsJson({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
