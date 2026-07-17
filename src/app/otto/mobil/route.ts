import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  return NextResponse.redirect(new URL('/otto/mobil/index.html', req.url), 307);
}
