import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const sql = getSql();
    const { cihazId, surum } = await req.json();
    if (!cihazId) return NextResponse.json({ ok:false }, { status:400 });
    await sql`UPDATE otto_kodlar SET son_gorulme=now(), uygulama_surumu=${surum||null} WHERE cihaz_id=${cihazId}`;
    return NextResponse.json({ ok:true });
  } catch(e) {
    return NextResponse.json({ ok:false }, { status:500 });
  }
}
