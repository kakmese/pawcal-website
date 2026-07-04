import { NextRequest } from 'next/server';
import { getSql } from '@/lib/otto-db';
import { corsJson, corsPreflight } from '@/app/api/_lib/cors';

async function sha256hex(s: string): Promise<string> {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const cihazKimlik = body && typeof body.cihazKimlik === 'string' ? body.cihazKimlik.trim() : '';
    if (!cihazKimlik) {
      return corsJson({ ok:false, hata:'cihaz kimlik eksik' }, { status:400 });
    }
    const platform = body && typeof body.platform === 'string' ? body.platform.trim().slice(0,32) : null;
    const surum = body && typeof body.surum === 'string' ? body.surum.trim().slice(0,32) : null;

    let cihazId: string | null = null;
    const token = body && typeof body.token === 'string' ? body.token.trim() : '';
    if (token && /^otk_[a-f0-9]+$/i.test(token)) {
      const sql0 = getSql();
      const hash = await sha256hex(token);
      const rows = await sql0`SELECT cihaz_id FROM mobile_tokens WHERE token_hash=${hash} LIMIT 1`;
      if (rows.length > 0) cihazId = rows[0].cihaz_id as string;
    }

    const sql = getSql();
    await sql`
      INSERT INTO mobil_kurulum (cihaz_kimlik, cihaz_id, platform, surum, ilk_kurulum, son_acilis, acilis_sayisi)
      VALUES (${cihazKimlik}, ${cihazId}, ${platform}, ${surum}, now(), now(), 1)
      ON CONFLICT (cihaz_kimlik) DO UPDATE SET
        son_acilis = now(),
        acilis_sayisi = mobil_kurulum.acilis_sayisi + 1,
        cihaz_id  = COALESCE(EXCLUDED.cihaz_id,  mobil_kurulum.cihaz_id),
        platform  = COALESCE(EXCLUDED.platform,  mobil_kurulum.platform),
        surum     = COALESCE(EXCLUDED.surum,     mobil_kurulum.surum)
    `;

    return corsJson({ ok:true });
  } catch (e) {
    console.error('MOBIL KURULUM-PING ERROR:', e);
    return corsJson({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
