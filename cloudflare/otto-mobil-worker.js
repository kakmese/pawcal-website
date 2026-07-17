const LIVE_URL = "https://sarjtr.epdk.gov.tr/sarjet/api/stations";
const LIVE_TTL_SECONDS = 90;
const MIN_RECORDS = 10000;

function withCors(response) {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Headers", "authorization, content-type");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  return new Response(response.body, { status: response.status, headers });
}

function json(data, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("content-type", "application/json; charset=utf-8");
  return withCors(new Response(JSON.stringify(data), { ...init, headers }));
}

async function liveSummary() {
  try {
    const observedAt = new Date().toISOString();
    const response = await fetch(LIVE_URL, {
      headers: {
        accept: "application/json",
        "user-agent": "Dart/3.9 (dart:io)",
      },
    });
    if (!response.ok) {
      return json({ ok: false, hata: "epdk_http_" + response.status }, { status: 502 });
    }
    const records = await response.json();
    if (!Array.isArray(records) || records.length < MIN_RECORDS) {
      return json({ ok: false, hata: "epdk_kayit_sayisi" }, { status: 502 });
    }
    const expiresAt = new Date(Date.now() + LIVE_TTL_SECONDS * 1000).toISOString();
    return json(
      { ok: true, observedAt, expiresAt, records },
      { headers: { "cache-control": "public, max-age=90, stale-while-revalidate=30" } },
    );
  } catch (error) {
    return json({ ok: false, hata: "epdk_canli" }, { status: 503 });
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return withCors(new Response(null, { status: 204 }));
    if (url.pathname === "/api/mobil/istasyon-canli") return liveSummary();
    if (url.pathname === "/otto/mobil" || url.pathname === "/otto/mobil/") {
      return Response.redirect(new URL("/otto/mobil/index.html", url), 307);
    }
    return new Response("Not found", { status: 404 });
  },
};
