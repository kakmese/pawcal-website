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
    await sql`ALTER TABLE otto_telemetry ADD COLUMN IF NOT EXISTS source TEXT`;
    await sql`ALTER TABLE otto_telemetry ADD COLUMN IF NOT EXISTS field_event TEXT`;
    await sql`ALTER TABLE otto_telemetry ADD COLUMN IF NOT EXISTS session_id TEXT`;
    await sql`ALTER TABLE otto_telemetry ADD COLUMN IF NOT EXISTS event_ts BIGINT`;
    await sql`ALTER TABLE otto_telemetry ADD COLUMN IF NOT EXISTS payload JSONB`;

    const payload = b.payload && typeof b.payload === 'object' ? b.payload : {};
    const payloadModel = String(payload.model ?? '').slice(0, 128);
    const payloadPlatform = String(payload.platform ?? payload.dilink ?? '').slice(0, 128);
    await sql`INSERT INTO otto_telemetry (
        device_id, model, model_raw, platform, app_version, raw, providers,
        source, field_event, session_id, event_ts, payload
      )
      VALUES (${String(b.device_id ?? '').slice(0,128)}, ${String(b.model ?? '').slice(0,128)},
        ${String(b.model_raw ?? '').slice(0,512)}, ${String(b.platform ?? '').slice(0,128)},
        ${String(b.app_version ?? '').slice(0,32)}, ${JSON.stringify(b.raw ?? {})}, ${JSON.stringify(b.providers ?? {})},
        ${String(b.source ?? '').slice(0,64)}, ${String(b.field_event ?? '').slice(0,96)},
        ${String(b.session_id ?? '').slice(0,128)},
        ${Number.isFinite(Number(b.timestamp)) ? Math.trunc(Number(b.timestamp)) : null},
        ${JSON.stringify(payload)})`;

    // The panel groups by device_id. Promote identity fields onto this row as well
    // so new and old readers can both show a useful vehicle title.
    if ((!b.model && payloadModel) || (!b.platform && payloadPlatform)) {
      await sql`UPDATE otto_telemetry
        SET model=CASE WHEN model IS NULL OR model='' THEN ${payloadModel} ELSE model END,
            platform=CASE WHEN platform IS NULL OR platform='' THEN ${payloadPlatform} ELSE platform END
        WHERE id=(SELECT max(id) FROM otto_telemetry WHERE device_id=${String(b.device_id ?? '').slice(0,128)})`;
    }
    return Response.json({ ok: true });
  } catch (e: any) {
    return Response.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
