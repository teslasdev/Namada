import { useEffect, useMemo, useState } from "react";

type ParticipationPoint = { index: number; id: number; count: number };
type RawPoint = Record<string, unknown>;

function numericValue(row: RawPoint, keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    const number = typeof value === "string" ? Number(value.replace(/,/g, "")) : Number(value);
    if (Number.isFinite(number)) return number;
  }
  const match = Object.entries(row).find(([key, value]) => /address|voter|particip|count|total/i.test(key) && (typeof value === "number" || typeof value === "string"));
  const number = match ? Number(String(match[1]).replace(/,/g, "")) : Number.NaN;
  return Number.isFinite(number) ? number : 0;
}

export default function ProposalParticipationChart() {
  const [points, setPoints] = useState<ParticipationPoint[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { fetch("https://namada.zechub.wiki/data/proposals/propAddressesCounts.json").then((response) => response.ok ? response.json() : Promise.reject()).then((payload: RawPoint[] | { data?: RawPoint[] }) => { const rows = Array.isArray(payload) ? payload : payload.data || []; setPoints(rows.map((row, index) => ({ index: index + 1, id: Number(row.proposalId ?? row.id ?? row.proposalIndex ?? index + 1), count: numericValue(row, ["addresses", "addressCount", "addressesCount", "address_count", "numberOfAddresses", "voters", "voterCount", "participation", "count"]) })).filter((row) => Number.isFinite(row.id) && Number.isFinite(row.count))); }).catch(() => setPoints([])).finally(() => setLoaded(true)); }, []);
  const max = Math.max(...points.map((point) => point.count), 1); const average = points.length ? Math.round(points.reduce((total, point) => total + point.count, 0) / points.length) : 0; const highest = points.reduce<ParticipationPoint | null>((best, point) => !best || point.count > best.count ? point : best, null); const ticks = useMemo(() => [max, Math.round(max * .75), Math.round(max * .5), Math.round(max * .25), 0], [max]);
  return <section className="participation-chart"><div className="participation-heading"><div><span className="metric-label">Governance proposals</span><h3>Proposal voting participation</h3></div><span className="directory-note">{loaded ? `${points.length} proposals` : "Loading data…"}</span></div>{points.length ? <><div className="axis-chart"><div className="y-axis">{ticks.map((tick) => <span key={tick}>{tick.toLocaleString()}</span>)}</div><div className="plot-area"><div className="grid-lines">{ticks.map((tick) => <i key={tick} />)}</div><div className="participation-bars">{points.map((point) => <div className="participation-bar-column" key={point.index}><div className="participation-bar" style={{ height: `${Math.max(2, point.count / max * 100)}%` }} title={`Index ${point.index} · Proposal ${point.id}: ${point.count.toLocaleString()} addresses`} /><small>#{point.index}</small></div>)}</div></div></div><div className="axis-labels"><span>Proposal index</span><span>Number of addresses</span></div><div className="participation-stats"><div><span>Total proposals</span><b>{points.length}</b></div><div><span>Average participation</span><b>{average.toLocaleString()} addresses</b></div><div><span>Highest participation</span><b>{highest?.count.toLocaleString() || "—"}</b><small>{highest ? `Index ${highest.index} · Proposal ${highest.id}` : ""}</small></div></div></> : <div className="participation-empty">{loaded ? "No participation data found at /data/proposals/propAddressesCounts.json." : "Loading proposal participation…"}</div>}</section>;
}
