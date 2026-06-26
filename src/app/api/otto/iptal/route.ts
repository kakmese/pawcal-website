import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/otto-db';

export async function POST(req: NextRequest) {
  try {
    const { adminKey, kod, iptal } = await req.json();
    if (adminKey !== process.env.OTTO_ADMIN_KEY) return NextResponse.json({ ok:false, hata:'yetkisiz' }, { status:401 });
    if (!kod) return NextResponse.json({ ok:false, hata:'eksik' }, { status:400 });
    const sql = getSql();
    await sql`UPDATE otto_kodlar SET iptal=${iptal === true} WHERE kod=${kod}`;
    return NextResponse.json({ ok:true });
  } catch(error) {
    console.error("OTTO API ERROR:", error);
    return NextResponse.json({ ok:false, hata:'sunucu' }, { status:500 });
  }
}
