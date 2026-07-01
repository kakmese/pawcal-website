import { neon } from '@neondatabase/serverless';
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  if (key !== process.env.OTTO_ADMIN_KEY) {
    return <div style={{ padding: 24, fontFamily: 'system-ui' }}>Yetkisiz. ?key=… gerekli.</div>;
  }
  const sql = neon(process.env.DATABASE_URL!);
  let rows: any[] = [];
  let hata = '';
  try {
    await sql`CREATE TABLE IF NOT EXISTS otto_telemetry (
      id BIGSERIAL PRIMARY KEY, created_at TIMESTAMPTZ DEFAULT now(),
      device_id TEXT, model TEXT, model_raw TEXT, platform TEXT,
      app_version TEXT, raw JSONB, providers JSONB)`;
    rows = (await sql`SELECT created_at, model, model_raw, platform, app_version, raw, providers
      FROM otto_telemetry ORDER BY created_at DESC LIMIT 300`) as any[];
  } catch (e: any) { hata = String(e?.message ?? e); }
  if (hata) return <div style={{ padding: 24, fontFamily: 'system-ui' }}><h1>Telemetri</h1><p style={{color:'crimson'}}>DB hatası: {hata}</p></div>;

  const byModel: Record<string, { count: number; probes: Record<string, {ok:number,total:number}>; providers: any; platform: string; model_raw: string; app_version: string }> = {};
  for (const r of rows) {
    const m = r.model || r.model_raw || 'bilinmiyor';
    byModel[m] ??= { count: 0, probes: {}, providers: r.providers, platform: r.platform, model_raw: r.model_raw, app_version: r.app_version };
    byModel[m].count++;
    const raw = typeof r.raw === 'string' ? JSON.parse(r.raw) : (r.raw || {});
    const methods = raw.methods || {};
    for (const k of Object.keys(methods)) {
      const e = methods[k] || {};
      (byModel[m].probes[k] ??= { ok: 0, total: 0 }).total++;
      if (e.ok === true) byModel[m].probes[k].ok++;
    }
  }

  const box: any = { border: '1px solid #ddd', borderRadius: 8, padding: 14, marginBottom: 22 };
  const chip = (ok: boolean): any => ({ display:'inline-block', margin:'2px 4px', padding:'2px 8px', borderRadius:6, fontSize:12,
    background: ok ? '#e6f6e6' : '#fbe6e6', color: ok ? '#176a17' : '#a11', border:`1px solid ${ok?'#bde5bd':'#eebcbc'}` });

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 1100, margin: '0 auto' }}>
      <h1>Otto Telemetri</h1>
      <p>{rows.length} rapor · {Object.keys(byModel).length} model</p>
      {Object.entries(byModel).map(([model, d]) => {
        const probes = Object.entries(d.probes).sort((a,b) => (b[1].ok>0?1:0)-(a[1].ok>0?1:0) || a[0].localeCompare(b[0]));
        const okCount = probes.filter(([,s]) => s.ok>0).length;
        return (
          <div key={model} style={box}>
            <h2 style={{ margin:'0 0 4px' }}>{model} <small style={{ color:'#888', fontWeight:400 }}>· {d.count} rapor · platform: {d.platform || '?'}</small></h2>
            <p style={{ margin:'2px 0 6px', fontSize:12, color:'#555' }}>app: {d.app_version || '?'} · platform: {d.platform || '(boş)'}</p>
            <details style={{ marginBottom:8 }}>
              <summary style={{ cursor:'pointer', fontSize:13 }}>Ham getprop (model_raw)</summary>
              <pre style={{ fontSize:11, whiteSpace:'pre-wrap', wordBreak:'break-all' }}>{d.model_raw || '(boş)'}</pre>
            </details>
            <p style={{ margin:'4px 0 8px', fontSize:13 }}><b>{okCount}</b> / {probes.length} getter veri döndürdü</p>
            <div>{probes.map(([k,s]) => <span key={k} style={chip(s.ok>0)}>{k} {s.ok}/{s.total}</span>)}</div>
            <details style={{ marginTop:10 }}>
              <summary style={{ cursor:'pointer', fontSize:13 }}>Content provider</summary>
              <pre style={{ fontSize:11, whiteSpace:'pre-wrap' }}>{JSON.stringify(d.providers ?? {}, null, 1)}</pre>
            </details>
          </div>
        );
      })}
    </div>
  );
}
