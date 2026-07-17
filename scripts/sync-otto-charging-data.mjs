import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);

const websiteRoot = process.cwd();
const defaultOttoPlusRoot = "C:\\Users\\kakme\\AndroidStudioProjects\\OttoPlus";
const ottoPlusRoot = process.env.OTTOPLUS_ROOT || defaultOttoPlusRoot;
const publicDir = path.join(websiteRoot, "public", "otto", "mobil");

const stationsPath = path.join(ottoPlusRoot, "app", "src", "main", "assets", "charging-data", "stations.v1.json");
const tariffsPath = path.join(ottoPlusRoot, "app", "src", "main", "assets", "charging-data", "operator-tariffs.v1.json");
const pricingPath = path.join(ottoPlusRoot, "app", "src", "main", "assets", "charging-pricing.js");

const stationsRaw = JSON.parse(await readFile(stationsPath, "utf8"));
const registry = JSON.parse(await readFile(tariffsPath, "utf8"));
const pricing = require(pricingPath);
pricing.setRegistry(registry);

function numberOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function stationCurrentType(station) {
  return numberOrNull(station.dc) ? "DC" : "AC";
}

function stationPowerKw(station) {
  return numberOrNull(station.dc) || numberOrNull(station.ac) || null;
}

function slimPrice(result) {
  if (!result) return null;
  const out = {
    s: result.status,
    o: result.operatorId || null,
    n: result.operatorName || null,
    k: result.amountKind || null,
    p: Number.isFinite(result.price) ? result.price : null,
    mn: Number.isFinite(result.priceMin) ? result.priceMin : null,
    mx: Number.isFinite(result.priceMax) ? result.priceMax : null,
    v: result.vatTreatment || null,
    l: !!result.locationSpecific,
    r: Array.isArray(result.reasonCodes) ? result.reasonCodes.slice(0, 4) : [],
  };
  if (result.sourceSelection) out.sel = true;
  if (result.sourceFreshness) out.f = result.sourceFreshness;
  return out;
}

const allStations = Array.isArray(stationsRaw.stations) ? stationsRaw.stations : [];
const publicStations = allStations
  .filter((station) => station && station.h === "HALKA_ACIK")
  .map((station) => {
    const currentType = stationCurrentType(station);
    const powerKw = stationPowerKw(station);
    const request = {
      brand: station.b,
      currentType,
      powerKw,
      stationCanonicalId: station.c || null,
    };
    const price = pricing.resolveSync(request, registry.generatedAt);
    return {
      i: station.i,
      c: station.c,
      la: station.la,
      ln: station.ln,
      b: station.b,
      t: station.t,
      n: station.n,
      a: station.a,
      d: station.d,
      ac: station.ac,
      dc: station.dc,
      k: station.k,
      y: currentType,
      kw: powerKw,
      p: slimPrice(price),
    };
  });

const out = {
  schemaVersion: "otto-mobil-charging/1.0.0",
  generatedAt: new Date().toISOString(),
  sourceGeneratedAt: stationsRaw.generatedAt,
  registryRevision: registry.registryRevision,
  stationCount: publicStations.length,
  stations: publicStations,
};

await mkdir(publicDir, { recursive: true });
await writeFile(
  path.join(publicDir, "charging_stations.v1.json"),
  JSON.stringify(out),
  "utf8",
);

const stats = publicStations.reduce((acc, station) => {
  const status = station.p && station.p.s ? station.p.s : "unknown";
  acc[status] = (acc[status] || 0) + 1;
  if (station.p && (Number.isFinite(station.p.p) || Number.isFinite(station.p.mn))) acc.withPrice += 1;
  return acc;
}, { withPrice: 0 });

console.log(JSON.stringify({
  ok: true,
  output: "public/otto/mobil/charging_stations.v1.json",
  stationCount: publicStations.length,
  registryRevision: registry.registryRevision,
  stats,
}, null, 2));
