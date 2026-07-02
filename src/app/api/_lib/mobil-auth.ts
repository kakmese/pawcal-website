import { NextRequest } from 'next/server';
import { getSql } from '@/lib/otto-db';

async function sha256hex(s: string): Promise<string> {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}

export async function tokenDenetle(req: NextRequest): Promise<{ cihazId: string } | null> {
  const auth = req.headers.get('authorization') || '';
  const m = auth.match(/^Bearer\s+(otk_[a-f0-9]+)$/i);
  if (!m) return null;
  const hash = await sha256hex(m[1]);
  const sql = getSql();
  const rows = await sql`
    SELECT cihaz_id FROM mobile_tokens WHERE token_hash=${hash} LIMIT 1
  `;
  if (rows.length === 0) return null;
  await sql`UPDATE mobile_tokens SET last_seen=now() WHERE token_hash=${hash}`;
  return { cihazId: rows[0].cihaz_id };
}
