import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

type JsonObject = Record<string, unknown>;
type TelemetryRow = {
  id: string;
  created_at: string;
  device_id: string | null;
  model: string | null;
  model_raw: string | null;
  platform: string | null;
  app_version: string | null;
  raw: unknown;
  providers: unknown;
  source: string | null;
  field_event: string | null;
  session_id: string | null;
  event_ts: string | number | null;
  payload: unknown;
};

type ProbeStat = { ok: number; total: number };
type DeviceSummary = {
  id: string;
  count: number;
  model: string;
  platform: string;
  modelRaw: string;
  appVersion: string;
  firstSeen: Date;
  lastSeen: Date;
  probes: Record<string, ProbeStat>;
  providers: unknown;
  sessions: Set<string>;
  eventCounts: Record<string, number>;
  events: TelemetryRow[];
};

function objectOf(value: unknown): JsonObject {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value as JsonObject;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch { return {}; }
  }
  return {};
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function eventDate(row: TelemetryRow): Date {
  const millis = Number(row.event_ts);
  if (Number.isFinite(millis) && millis > 0) return new Date(millis);
  return new Date(row.created_at);
}

function displayDate(value: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'short', timeStyle: 'medium', timeZone: 'Europe/Istanbul',
  }).format(value);
}

function shortId(value: string): string {
  if (!value) return 'kimlik yok';
  return value.length > 16 ? `${value.slice(0, 8)}…${value.slice(-6)}` : value;
}

function eventLabel(event: string): string {
  const labels: Record<string, string> = {
    collector_started: 'Toplayıcı başladı', device_profile: 'Cihaz profili', vehicle_identity: 'Araç kimliği',
    content_providers: 'Content provider', permissions: 'İzinler', raw_probe: 'Ham getter taraması',
    interpreted_snapshot: 'İlk araç verisi', vehicle_values_changed: 'Araç değeri değişti',
    byd_full_inventory: 'BYD sabit envanter', byd_dynamic_inventory: 'BYD dinamik envanter',
    android_car_properties: 'Android Car property', byd_diagnostics: 'BYD teşhis',
    initial_scan_completed: 'İlk tarama tamamlandı', app_log_batch: 'Uygulama logları',
    uncaught_crash: 'Uygulama çökmesi', heartbeat: 'Canlı bağlantı',
  };
  if (event.startsWith('activity_')) return `Ekran ${event.slice(9)}`;
  return labels[event] || event.replaceAll('_', ' ');
}

function eventColor(event: string): { bg: string; fg: string; border: string } {
  if (/crash|failed|error|unavailable/.test(event)) return { bg:'#3b1117', fg:'#ff9ba7', border:'#7b2834' };
  if (/inventory|diagnostics|properties/.test(event)) return { bg:'#102b45', fg:'#9fd2ff', border:'#24567d' };
  if (/changed|raw_probe|snapshot/.test(event)) return { bg:'#14351f', fg:'#9ee6b1', border:'#2d6940' };
  return { bg:'#252932', fg:'#cbd2dc', border:'#414754' };
}

function payloadPreview(row: TelemetryRow): unknown {
  const payload = objectOf(row.payload);
  if (typeof payload.text === 'string') return payload.text;
  return payload;
}

export default async function Page({ searchParams }: { searchParams: Promise<{ key?: string; olay?: string; q?: string }> }) {
  const params = await searchParams;
  if (params.key !== process.env.OTTO_ADMIN_KEY) {
    return <div style={{ padding:24, fontFamily:'system-ui' }}>Yetkisiz. Yönetici anahtarı gerekli.</div>;
  }

  const sql = neon(process.env.DATABASE_URL!);
  let rows: TelemetryRow[] = [];
  let error = '';
  try {
    await sql`CREATE TABLE IF NOT EXISTS otto_telemetry (
      id BIGSERIAL PRIMARY KEY, created_at TIMESTAMPTZ DEFAULT now(),
      device_id TEXT, model TEXT, model_raw TEXT, platform TEXT,
      app_version TEXT, raw JSONB, providers JSONB)`;
    await sql`ALTER TABLE otto_telemetry ADD COLUMN IF NOT EXISTS source TEXT`;
    await sql`ALTER TABLE otto_telemetry ADD COLUMN IF NOT EXISTS field_event TEXT`;
    await sql`ALTER TABLE otto_telemetry ADD COLUMN IF NOT EXISTS session_id TEXT`;
    await sql`ALTER TABLE otto_telemetry ADD COLUMN IF NOT EXISTS event_ts BIGINT`;
    await sql`ALTER TABLE otto_telemetry ADD COLUMN IF NOT EXISTS payload JSONB`;
    rows = (await sql`SELECT id, created_at, device_id, model, model_raw, platform, app_version,
        raw, providers, source, field_event, session_id, event_ts, payload
      FROM otto_telemetry ORDER BY created_at DESC LIMIT 3000`) as TelemetryRow[];
  } catch (caught) { error = caught instanceof Error ? caught.message : String(caught); }

  if (error) return <div style={{ padding:24, fontFamily:'system-ui' }}><h1>Telemetri</h1><p style={{ color:'crimson' }}>DB hatası: {error}</p></div>;

  const devices = new Map<string, DeviceSummary>();
  for (const row of rows) {
    const id = row.device_id || `legacy:${row.model || row.model_raw || 'bilinmiyor'}`;
    if (id.startsWith('codex-validation-')) continue;
    const date = eventDate(row);
    const payload = objectOf(row.payload);
    const event = text(row.field_event);
    const payloadModel = event === 'vehicle_identity' || event === 'device_profile' ? text(payload.model) : '';
    const payloadPlatform = event === 'vehicle_identity' ? (text(payload.platform) || text(payload.dilink)) : '';
    let device = devices.get(id);
    if (!device) {
      device = {
        id, count:0, model:'', platform:'', modelRaw:'', appVersion:'', firstSeen:date, lastSeen:date,
        probes:{}, providers:null, sessions:new Set(), eventCounts:{}, events:[],
      };
      devices.set(id, device);
    }
    device.count += 1;
    if (date < device.firstSeen) device.firstSeen = date;
    if (date > device.lastSeen) device.lastSeen = date;
    device.model ||= text(row.model) || payloadModel;
    device.platform ||= text(row.platform) || payloadPlatform;
    device.modelRaw ||= text(row.model_raw);
    device.appVersion ||= text(row.app_version);
    if (row.session_id) device.sessions.add(row.session_id);
    if (event) {
      device.eventCounts[event] = (device.eventCounts[event] || 0) + 1;
      device.events.push(row);
    }
    const providers = objectOf(row.providers);
    if (!device.providers && Object.keys(providers).length) device.providers = providers;
    const methods = objectOf(objectOf(row.raw).methods);
    for (const [key, value] of Object.entries(methods)) {
      const result = objectOf(value);
      const stat = (device.probes[key] ??= { ok:0, total:0 });
      stat.total += 1;
      if (result.ok === true) stat.ok += 1;
    }
  }

  const allEvents = Array.from(new Set(rows.map(row => text(row.field_event)).filter(Boolean))).sort();
  const query = text(params.q).toLocaleLowerCase('tr-TR');
  const eventFilter = text(params.olay);
  const visibleDevices = Array.from(devices.values()).filter(device => {
    if (eventFilter && !device.eventCounts[eventFilter]) return false;
    if (!query) return true;
    return `${device.model} ${device.platform} ${device.id} ${device.appVersion}`.toLocaleLowerCase('tr-TR').includes(query);
  }).sort((a,b) => b.lastSeen.getTime() - a.lastSeen.getTime());

  const page: React.CSSProperties = { minHeight:'100vh', background:'#0f1217', color:'#edf1f7', padding:'28px 22px', fontFamily:'system-ui' };
  const card: React.CSSProperties = { border:'1px solid #3c4450', background:'#15191f', borderRadius:14, padding:18, marginBottom:20 };
  const muted: React.CSSProperties = { color:'#8d98a8', fontSize:12 };
  const input: React.CSSProperties = { background:'#0d1015', color:'#eef2f7', border:'1px solid #3c4450', borderRadius:8, padding:'9px 11px' };

  return (
    <main style={page}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <h1 style={{ margin:'0 0 4px' }}>Otto Telemetri</h1>
        <p style={{ ...muted, marginTop:0 }}>{rows.length} kayıt · {devices.size} cihaz · son 3000 kayıt</p>
        <form method="get" style={{ display:'flex', gap:10, flexWrap:'wrap', margin:'18px 0 24px' }}>
          <input type="hidden" name="key" value={params.key || ''} />
          <input name="q" defaultValue={params.q || ''} placeholder="Model, platform veya cihaz ara" style={{ ...input, minWidth:270 }} />
          <select name="olay" defaultValue={eventFilter} style={input}>
            <option value="">Tüm olaylar</option>
            {allEvents.map(item => <option key={item} value={item}>{eventLabel(item)}</option>)}
          </select>
          <button type="submit" style={{ ...input, cursor:'pointer', background:'#1c67d7', borderColor:'#2c79e8' }}>Filtrele</button>
        </form>

        {visibleDevices.map(device => {
          const probes = Object.entries(device.probes).sort((a,b) => (b[1].ok > 0 ? 1 : 0) - (a[1].ok > 0 ? 1 : 0) || a[0].localeCompare(b[0]));
          const okCount = probes.filter(([,stat]) => stat.ok > 0).length;
          const recentEvents = device.events.filter(row => !eventFilter || row.field_event === eventFilter).slice(0,120);
          return (
            <section key={device.id} style={card}>
              <div style={{ display:'flex', justifyContent:'space-between', gap:18, flexWrap:'wrap' }}>
                <div>
                  <h2 style={{ margin:'0 0 5px' }}>{device.model || 'Model belirleniyor'}</h2>
                  <div style={muted}>platform: {device.platform || '?'} · app: {device.appVersion || '?'} · cihaz: {shortId(device.id)}</div>
                </div>
                <div style={{ ...muted, textAlign:'right' }}>
                  <b style={{ color:'#dce4ef' }}>{device.count}</b> kayıt · {device.sessions.size || 1} oturum<br />
                  son görülme: {displayDate(device.lastSeen)}
                </div>
              </div>

              <div style={{ display:'flex', flexWrap:'wrap', gap:6, margin:'15px 0' }}>
                {Object.entries(device.eventCounts).sort((a,b) => b[1]-a[1]).map(([name,count]) => {
                  const colors = eventColor(name);
                  return <span key={name} style={{ padding:'4px 8px', borderRadius:7, fontSize:11, background:colors.bg, color:colors.fg, border:`1px solid ${colors.border}` }}>{eventLabel(name)} {count}</span>;
                })}
              </div>

              {probes.length > 0 && <details style={{ marginTop:10 }}>
                <summary style={{ cursor:'pointer', fontSize:13 }}><b>{okCount}</b> / {probes.length} eski getter veri döndürdü</summary>
                <div style={{ marginTop:8 }}>{probes.map(([key,stat]) => <span key={key} style={{ display:'inline-block', margin:'2px', padding:'3px 7px', borderRadius:6, fontSize:11, background:stat.ok ? '#14351f' : '#3b1117', color:stat.ok ? '#9ee6b1' : '#ff9ba7', border:`1px solid ${stat.ok ? '#2d6940' : '#7b2834'}` }}>{key} {stat.ok}/{stat.total}</span>)}</div>
              </details>}

              {device.modelRaw && <details style={{ marginTop:10 }}><summary style={{ cursor:'pointer', fontSize:13 }}>Ham getprop</summary><pre style={{ fontSize:11, whiteSpace:'pre-wrap', wordBreak:'break-all' }}>{device.modelRaw}</pre></details>}
              {device.providers != null && <details style={{ marginTop:10 }}><summary style={{ cursor:'pointer', fontSize:13 }}>Content provider</summary><pre style={{ fontSize:11, whiteSpace:'pre-wrap', overflowX:'auto' }}>{JSON.stringify(device.providers, null, 2)}</pre></details>}

              {recentEvents.length > 0 && <details open style={{ marginTop:14 }}>
                <summary style={{ cursor:'pointer', fontSize:13, fontWeight:650 }}>Saha olayları ({recentEvents.length}{device.events.length > recentEvents.length ? ` / ${device.events.length}` : ''})</summary>
                <div style={{ marginTop:10, display:'grid', gap:8 }}>
                  {recentEvents.map(row => {
                    const name = text(row.field_event);
                    const colors = eventColor(name);
                    const payload = payloadPreview(row);
                    const isLargeText = typeof payload === 'string';
                    return <details key={row.id} style={{ background:'#0e1116', border:'1px solid #303741', borderRadius:9, padding:'8px 10px' }}>
                      <summary style={{ cursor:'pointer', fontSize:12 }}>
                        <span style={{ display:'inline-block', width:9, height:9, borderRadius:9, background:colors.fg, marginRight:8 }} />
                        {eventLabel(name)} <span style={{ color:'#7f8a99', marginLeft:8 }}>{displayDate(eventDate(row))}</span>
                        {objectOf(row.payload).chunk ? <span style={{ color:'#7f8a99' }}> · parça {String(objectOf(row.payload).chunk)}/{String(objectOf(row.payload).total_chunks || '?')}</span> : null}
                      </summary>
                      <pre style={{ margin:'10px 0 0', maxHeight:isLargeText ? 520 : 360, overflow:'auto', whiteSpace:'pre-wrap', wordBreak:'break-word', fontSize:11, color:'#c9d2df' }}>{isLargeText ? payload : JSON.stringify(payload, null, 2)}</pre>
                    </details>;
                  })}
                </div>
              </details>}
            </section>
          );
        })}
        {visibleDevices.length === 0 && <div style={card}>Filtreye uyan araç bulunamadı.</div>}
      </div>
    </main>
  );
}
