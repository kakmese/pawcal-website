import { neon } from '@neondatabase/serverless';
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  if (key !== process.env.OTTO_ADMIN_KEY) {
    return <div style={{ padding: 24, fontFamily: 'system-ui' }}>Yetkisiz. ?key=… gerekli.</div>;
  }
  const sql = neon(process.env.DATABASE_URL!);
  const rows = (await sql`SELECT created_at, model, model_raw, platform, app_version, raw, providers
    FROM otto_telemetry ORDER BY created_at DESC LIMIT 300`) as any[];

  const byModel: Record<string, { count: number; signals: Record<string, number>; providers: any }> = {};
  for (const r of rows) {
    const m = r.model || r.model_raw || 'bilinmiyor';
    byModel[m] ??= { count: 0, signals: {}, providers: r.providers };
    byModel[m].count++;
    const raw = typeof r.raw === 'string' ? JSON.parse(r.raw) : (r.raw || {});
    for (const k of Object.keys(raw)) {
      const v = raw[k];
      if (v !== null && v !== undefined && v !== '' && v !== '-') byModel[m].signals[k] = (byModel[m].signals[k] || 0) + 1;
    }
  }
  const td: any = { border: '1px solid #ddd', padding: '6px 10px', fontSize: 13, textAlign: 'left' };
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 1100, margin: '0 auto' }}>
      <h1>Otto Telemetri</h1>
      <p>{rows.length} rapor · {Object.keys(byModel).length} model</p>
      {Object.entries(byModel).map(([model, d]) => {
        const sigs = Object.entries(d.signals).sort((a, b) => b[1] - a[1]);
        return (
          <div key={model} style={{ marginBottom: 28 }}>
            <h2 style={{ marginBottom: 6 }}>{model} <small style={{ color: '#888', fontWeight: 400 }}>({d.count} rapor)</small></h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}><tbody>
              <tr><td style={{ ...td, fontWeight: 700, width: 160 }}>Gelen sinyaller ({sigs.length})</td>
                <td style={td}>{sigs.length ? sigs.map(([k, n]) => `${k} (${n}/${d.count})`).join(' · ') : '— veri yok —'}</td></tr>
              <tr><td style={{ ...td, fontWeight: 700 }}>Content provider</td>
                <td style={td}><pre style={{ margin: 0, fontSize: 11, whiteSpace: 'pre-wrap' }}>{JSON.stringify(d.providers ?? {}, null, 1)}</pre></td></tr>
            </tbody></table>
          </div>
        );
      })}
    </div>
  );
}
