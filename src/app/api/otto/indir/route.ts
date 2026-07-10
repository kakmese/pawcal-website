import { NextRequest, NextResponse } from 'next/server';

const OTTO_URL = 'https://github.com/kakmese/pawcal-website/releases/download/otto-v10/app-debug.apk';
const OTTO_PLUS_URL = 'https://github.com/kakmese/pawcal-website/releases/download/ottoplus-v1.1/otto-plus-v1.1.apk';

export async function GET(req: NextRequest) {
  const raw = new URL(req.url).searchParams.get('tip') || '';
  const cleaned = raw.replace(/ /g, '+').trim().toLowerCase();
  const hedef = cleaned === 'otto+' ? OTTO_PLUS_URL : OTTO_URL;
  return NextResponse.redirect(hedef, 302);
}
