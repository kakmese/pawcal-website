import { NextResponse } from 'next/server';

export const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

export function corsJson(data: unknown, init?: ResponseInit) {
  const res = NextResponse.json(data as Record<string, unknown>, init);
  for (const [k, v] of Object.entries(CORS_HEADERS)) res.headers.set(k, v);
  return res;
}

export function corsPreflight() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
