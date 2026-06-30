import { neon } from '@neondatabase/serverless';

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    await sql`CREATE TABLE IF NOT EXISTS otto_telemetry (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT now(),
      device_id TEXT, model TEXT, model_raw TEXT, platform TEXT,
      app_version TEXT, raw JSONB, providers JSONB
    )`;
    await sql`INSERT INTO otto_telemetry (device_id, model, model_raw, platform, app_version, raw, providers)
      VALUES (${String(b.device_id ?? '').slice(0,128)}, ${String(b.model ?? '').slice(0,128)},
        ${String(b.model_raw ?? '').slice(0,512)}, ${String(b.platform ?? '').slice(0,128)},
        ${String(b.app_version ?? '').slice(0,32)}, ${JSON.stringify(b.raw ?? {})}, ${JSON.stringify(b.providers ?? {})})`;
    return Response.json({ ok: true });
  } catch (e: any) {
    return Response.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
