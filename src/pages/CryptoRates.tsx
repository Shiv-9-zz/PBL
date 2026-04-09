import { useState, useEffect, useMemo } from "react";
import { Layers, Activity, TrendingUp, TrendingDown, Fuel, Clock, Shield, Zap, ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";

// ── L2 Network Data ──────────────────────────────────────────────────────────

interface L2Network {
  symbol: string;
  name: string;
  type: "Optimistic Rollup" | "ZK Rollup" | "Validium" | "Sidechain" | "Layer 1";
  price: number;
  change24h: number;
  change7d: number;
  marketCap: string;
  volume24h: string;
  tps: number;
  avgGasFee: string;
  finality: string;
  tvl: string;
  color: string;
  supported: boolean;
}

const L2_NETWORKS: L2Network[] = [
  { symbol: "ETH", name: "Ethereum", type: "Layer 1", price: 3547.18, change24h: 1.8, change7d: 5.2, marketCap: "$426B", volume24h: "$18.4B", tps: 15, avgGasFee: "$4.20", finality: "12 min", tvl: "$62.3B", color: "hsl(220 70% 60%)", supported: true },
  { symbol: "MATIC", name: "Polygon", type: "Sidechain", price: 0.874, change24h: 4.7, change7d: 12.3, marketCap: "$8.1B", volume24h: "$524M", tps: 7000, avgGasFee: "$0.001", finality: "2 sec", tvl: "$1.1B", color: "hsl(265 80% 60%)", supported: true },
  { symbol: "ARB", name: "Arbitrum", type: "Optimistic Rollup", price: 1.24, change24h: 3.2, change7d: 8.7, marketCap: "$4.8B", volume24h: "$412M", tps: 4500, avgGasFee: "$0.10", finality: "~7 days*", tvl: "$3.2B", color: "hsl(210 85% 55%)", supported: true },
  { symbol: "OP", name: "Optimism", type: "Optimistic Rollup", price: 2.87, change24h: 5.1, change7d: 14.6, marketCap: "$3.9B", volume24h: "$318M", tps: 4000, avgGasFee: "$0.08", finality: "~7 days*", tvl: "$2.8B", color: "hsl(0 75% 55%)", supported: true },
  { symbol: "ZK", name: "zkSync Era", type: "ZK Rollup", price: 0.198, change24h: 6.3, change7d: 18.1, marketCap: "$690M", volume24h: "$89M", tps: 10000, avgGasFee: "$0.05", finality: "1 hour", tvl: "$840M", color: "hsl(260 70% 55%)", supported: true },
  { symbol: "STRK", name: "Starknet", type: "ZK Rollup", price: 0.72, change24h: 2.9, change7d: 9.4, marketCap: "$1.4B", volume24h: "$142M", tps: 12000, avgGasFee: "$0.03", finality: "2 hours", tvl: "$620M", color: "hsl(230 65% 55%)", supported: true },
  { symbol: "IMX", name: "Immutable X", type: "Validium", price: 2.14, change24h: -1.2, change7d: 3.8, marketCap: "$3.1B", volume24h: "$98M", tps: 9000, avgGasFee: "$0.00", finality: "4 hours", tvl: "$410M", color: "hsl(195 90% 50%)", supported: true },
  { symbol: "LRC", name: "Loopring", type: "ZK Rollup", price: 0.318, change24h: 3.8, change7d: 7.2, marketCap: "$420M", volume24h: "$62M", tps: 2025, avgGasFee: "$0.02", finality: "30 min", tvl: "$180M", color: "hsl(210 80% 55%)", supported: true },
  { symbol: "METIS", name: "Metis", type: "Optimistic Rollup", price: 62.45, change24h: 7.1, change7d: 22.4, marketCap: "$340M", volume24h: "$28M", tps: 4600, avgGasFee: "$0.02", finality: "~4 hours", tvl: "$290M", color: "hsl(170 75% 45%)", supported: true },
  { symbol: "MANTA", name: "Manta Pacific", type: "ZK Rollup", price: 1.42, change24h: -0.8, change7d: 6.1, marketCap: "$520M", volume24h: "$44M", tps: 8000, avgGasFee: "$0.01", finality: "1 hour", tvl: "$350M", color: "hsl(200 85% 50%)", supported: true },
];

// ── Simulated Historical Data Generator ──────────────────────────────────────

function generateHistorical(basePrice: number, days: number) {
  const data = [];
  let price = basePrice * 0.85;
  for (let i = 0; i < days; i++) {
    price += (Math.random() - 0.45) * basePrice * 0.03;
    price = Math.max(price, basePrice * 0.6);
    data.push({
      day: `${days - i}d ago`,
      price: parseFloat(price.toFixed(price < 1 ? 4 : 2)),
      volume: Math.floor(Math.random() * 500 + 100),
    });
  }
  return data;
}

function generateGasData() {
  return ["Ethereum", "Arbitrum", "Optimism", "zkSync", "Polygon", "Starknet", "Loopring", "Immutable X"].map((name) => {
    const fees: Record<string, number> = {
      Ethereum: 4.2, Arbitrum: 0.1, Optimism: 0.08, "zkSync": 0.05,
      Polygon: 0.001, Starknet: 0.03, Loopring: 0.02, "Immutable X": 0,
    };
    return { name: name.length > 8 ? name.slice(0, 8) + "…" : name, fullName: name, fee: fees[name] ?? 0.05 };
  });
}

function generateTPSData() {
  return [
    { name: "ETH L1", tps: 15 },
    { name: "Loopring", tps: 2025 },
    { name: "Arbitrum", tps: 4500 },
    { name: "Optimism", tps: 4000 },
    { name: "Metis", tps: 4600 },
    { name: "Polygon", tps: 7000 },
    { name: "Manta", tps: 8000 },
    { name: "IMX", tps: 9000 },
    { name: "zkSync", tps: 10000 },
    { name: "Starknet", tps: 12000 },
  ];
}

// ── Sort options ─────────────────────────────────────────────────────────────

type SortKey = "price" | "change24h" | "change7d" | "tps";

const TABS = ["All Networks", "ZK Rollups", "Optimistic Rollups", "Others"] as const;
type TabType = (typeof TABS)[number];

// ── Component ────────────────────────────────────────────────────────────────

export default function CryptoRates() {
  const [prices, setPrices] = useState(L2_NETWORKS);
  const [activeTab, setActiveTab] = useState<TabType>("All Networks");
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string>("ETH");
  const [chartRange, setChartRange] = useState<30 | 60 | 90>(30);

  // Live price jitter
  useEffect(() => {
    const id = setInterval(() => {
      setPrices((prev) =>
        prev.map((t) => ({
          ...t,
          price: t.price * (1 + (Math.random() - 0.5) * 0.002),
          change24h: t.change24h + (Math.random() - 0.5) * 0.15,
        }))
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    let list = [...prices];
    if (activeTab === "ZK Rollups") list = list.filter((t) => t.type === "ZK Rollup");
    else if (activeTab === "Optimistic Rollups") list = list.filter((t) => t.type === "Optimistic Rollup");
    else if (activeTab === "Others") list = list.filter((t) => t.type !== "ZK Rollup" && t.type !== "Optimistic Rollup");
    list.sort((a, b) => {
      const va = a[sortKey] as number;
      const vb = b[sortKey] as number;
      return sortAsc ? va - vb : vb - va;
    });
    return list;
  }, [prices, activeTab, sortKey, sortAsc]);

  const selectedNetwork = prices.find((t) => t.symbol === selectedToken) || prices[0];
  const historicalData = useMemo(() => generateHistorical(selectedNetwork.price, chartRange), [selectedToken, chartRange]);
  const gasData = useMemo(() => generateGasData(), []);
  const tpsData = useMemo(() => generateTPSData(), []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />) : null;

  const formatPrice = (p: number) =>
    p < 0.01 ? `$${p.toFixed(4)}` : p < 1 ? `$${p.toFixed(3)}` : p < 100 ? `$${p.toFixed(2)}` : `$${p.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 border-b border-border">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <Layers className="w-5 h-5 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Layer 2 Networks</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Live Crypto Rates
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Real-time prices, gas fee comparisons, and performance metrics across all Layer 2 networks supported on NEXUSX. Every transaction on our platform settles via L2 rollup technology.
            </p>
          </Reveal>

          {/* Summary cards */}
          <Reveal delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {[
                { label: "Networks Supported", value: "10", icon: Layers, accent: "text-primary" },
                { label: "Avg L2 Gas Fee", value: "$0.04", icon: Fuel, accent: "text-primary" },
                { label: "Fastest Finality", value: "2 sec", icon: Clock, accent: "text-secondary" },
                { label: "Max TPS (L2)", value: "12,000", icon: Zap, accent: "text-secondary" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon className={`w-4 h-4 ${s.accent}`} />
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                  <p className="text-2xl font-bold tabular">{s.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICE TABLE ── */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold">Network Prices</h2>
              <div className="flex rounded-md border border-border bg-surface-1 p-1">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all ${
                      activeTab === tab
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border text-left">
                  <th className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Network</th>
                  <th className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                  <th className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none" onClick={() => handleSort("price")}>
                    <span className="inline-flex items-center gap-1">Price <SortIcon col="price" /></span>
                  </th>
                  <th className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none" onClick={() => handleSort("change24h")}>
                    <span className="inline-flex items-center gap-1">24h <SortIcon col="change24h" /></span>
                  </th>
                  <th className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none hidden md:table-cell" onClick={() => handleSort("change7d")}>
                    <span className="inline-flex items-center gap-1">7d <SortIcon col="change7d" /></span>
                  </th>
                  <th className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Market Cap</th>
                  <th className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Volume 24h</th>
                  <th className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none hidden md:table-cell" onClick={() => handleSort("tps")}>
                    <span className="inline-flex items-center gap-1">TPS <SortIcon col="tps" /></span>
                  </th>
                  <th className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Gas Fee</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr
                    key={t.symbol}
                    onClick={() => setSelectedToken(t.symbol)}
                    className={`border-b border-border cursor-pointer transition-colors hover:bg-surface-1 ${
                      selectedToken === t.symbol ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-black"
                          style={{ backgroundColor: `${t.color}20`, border: `1px solid ${t.color}40`, color: t.color }}
                        >
                          {t.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold">{t.symbol}</p>
                          <p className="text-xs text-muted-foreground">{t.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm border ${
                        t.type === "ZK Rollup"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : t.type === "Optimistic Rollup"
                          ? "bg-secondary/10 text-secondary border-secondary/20"
                          : "bg-muted text-muted-foreground border-border"
                      }`}>
                        {t.type === "Layer 1" ? "L1" : t.type.split(" ")[0]}
                      </span>
                    </td>
                    <td className="p-3 font-bold tabular">{formatPrice(t.price)}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold tabular ${t.change24h >= 0 ? "text-primary" : "text-destructive"}`}>
                        {t.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(t.change24h).toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <span className={`text-xs font-bold tabular ${t.change7d >= 0 ? "text-primary" : "text-destructive"}`}>
                        {t.change7d >= 0 ? "+" : ""}{t.change7d.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground tabular hidden lg:table-cell">{t.marketCap}</td>
                    <td className="p-3 text-muted-foreground tabular hidden lg:table-cell">{t.volume24h}</td>
                    <td className="p-3 tabular hidden md:table-cell">{t.tps.toLocaleString()}</td>
                    <td className="p-3 text-muted-foreground tabular hidden sm:table-cell">{t.avgGasFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── HISTORICAL PRICE CHART ── */}
      <section className="py-12 bg-surface-1 border-y border-border">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-1">Historical Price — {selectedNetwork.symbol}</h2>
                <p className="text-sm text-muted-foreground">{selectedNetwork.name} price over the last {chartRange} days</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Token quick-switch */}
                <div className="flex rounded-md border border-border bg-background p-1 gap-0.5 overflow-x-auto">
                  {prices.slice(0, 6).map((t) => (
                    <button
                      key={t.symbol}
                      onClick={() => setSelectedToken(t.symbol)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-sm transition-all whitespace-nowrap ${
                        selectedToken === t.symbol
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.symbol}
                    </button>
                  ))}
                </div>
                {/* Range toggle */}
                <div className="flex rounded-md border border-border bg-background p-1">
                  {([30, 60, 90] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setChartRange(r)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-sm transition-all ${
                        chartRange === r
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {r}D
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Price chart */}
            <div className="lg:col-span-2 p-6 rounded-lg border border-border bg-background">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(162 100% 47%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(162 100% 47%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 25% 18%)" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} tickLine={false} axisLine={false} interval={Math.floor(chartRange / 6)} />
                  <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} tickLine={false} axisLine={false} domain={["auto", "auto"]}
                    tickFormatter={(v: number) => (v < 1 ? v.toFixed(3) : v < 100 ? v.toFixed(1) : v.toLocaleString())}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(222 30% 11%)", border: "1px solid hsl(222 25% 18%)", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "hsl(215 20% 55%)" }}
                    formatter={(value: number) => [formatPrice(value), "Price"]}
                  />
                  <Area type="monotone" dataKey="price" stroke="hsl(162 100% 47%)" strokeWidth={2} fill="url(#priceGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Token stats sidebar */}
            <div className="p-6 rounded-lg border border-border bg-background space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-black"
                  style={{ backgroundColor: `${selectedNetwork.color}20`, border: `1px solid ${selectedNetwork.color}40`, color: selectedNetwork.color }}
                >
                  {selectedNetwork.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="text-lg font-bold">{selectedNetwork.name}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm border ${
                    selectedNetwork.type === "ZK Rollup"
                      ? "bg-primary/10 text-primary border-primary/20"
                      : selectedNetwork.type === "Optimistic Rollup"
                      ? "bg-secondary/10 text-secondary border-secondary/20"
                      : "bg-muted text-muted-foreground border-border"
                  }`}>
                    {selectedNetwork.type}
                  </span>
                </div>
              </div>

              {[
                { label: "Current Price", value: formatPrice(selectedNetwork.price) },
                { label: "24h Change", value: `${selectedNetwork.change24h >= 0 ? "+" : ""}${selectedNetwork.change24h.toFixed(1)}%`, color: selectedNetwork.change24h >= 0 },
                { label: "7d Change", value: `${selectedNetwork.change7d >= 0 ? "+" : ""}${selectedNetwork.change7d.toFixed(1)}%`, color: selectedNetwork.change7d >= 0 },
                { label: "Market Cap", value: selectedNetwork.marketCap },
                { label: "24h Volume", value: selectedNetwork.volume24h },
                { label: "TPS", value: selectedNetwork.tps.toLocaleString() },
                { label: "Avg Gas Fee", value: selectedNetwork.avgGasFee },
                { label: "Finality", value: selectedNetwork.finality },
                { label: "TVL", value: selectedNetwork.tvl },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{row.label}</span>
                  <span className={`text-sm font-bold tabular ${"color" in row ? (row.color ? "text-primary" : "text-destructive") : ""}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GAS FEE COMPARISON ── */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-2">
              <Fuel className="w-4 h-4 text-secondary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Gas Fees</p>
            </div>
            <h2 className="text-2xl font-bold mb-2">Gas Fee Comparison</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-xl">
              Average transaction cost across networks. Layer 2 rollups reduce gas fees by 10–100x compared to Ethereum L1.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-6">
            <Reveal>
              <div className="p-6 rounded-lg border border-border bg-card">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Avg Fee per Transaction (USD)</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={gasData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 25% 18%)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} tickLine={false} axisLine={false}
                      tickFormatter={(v: number) => `$${v}`}
                    />
                    <YAxis type="category" dataKey="name" tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} tickLine={false} axisLine={false} width={80} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(222 30% 11%)", border: "1px solid hsl(222 25% 18%)", borderRadius: 8, fontSize: 12 }}
                      formatter={(value: number) => [`$${value.toFixed(3)}`, "Gas Fee"]}
                    />
                    <Bar dataKey="fee" fill="hsl(162 100% 47%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="p-6 rounded-lg border border-border bg-card">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Transactions Per Second (TPS)</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={tpsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 25% 18%)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} tickLine={false} axisLine={false}
                      tickFormatter={(v: number) => v.toLocaleString()}
                    />
                    <YAxis type="category" dataKey="name" tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} tickLine={false} axisLine={false} width={72} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(222 30% 11%)", border: "1px solid hsl(222 25% 18%)", borderRadius: 8, fontSize: 12 }}
                      formatter={(value: number) => [value.toLocaleString(), "TPS"]}
                    />
                    <Bar dataKey="tps" fill="hsl(45 95% 55%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── L2 EXPLAINER ── */}
      <section className="py-12 bg-surface-1 border-y border-border">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Technology</p>
            </div>
            <h2 className="text-2xl font-bold mb-8">Layer 2 Network Comparison</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "ZK Rollups",
                desc: "Use zero-knowledge proofs to validate transactions off-chain. Fastest finality and highest security guarantees after Ethereum L1.",
                networks: "zkSync, Starknet, Loopring, Manta",
                pros: ["Cryptographic validity proofs", "Faster withdrawal to L1", "Higher theoretical TPS"],
                color: "primary",
              },
              {
                title: "Optimistic Rollups",
                desc: "Assume transactions are valid by default and use fraud proofs for disputes. Mature ecosystem with broad EVM compatibility.",
                networks: "Arbitrum, Optimism, Metis",
                pros: ["Full EVM compatibility", "Lower compute overhead", "Large existing ecosystem"],
                color: "secondary",
              },
              {
                title: "Validiums & Sidechains",
                desc: "Store data off-chain for maximum throughput. Trade some decentralization for speed and cost efficiency.",
                networks: "Polygon, Immutable X",
                pros: ["Near-zero gas fees", "Highest throughput", "Great for gaming/NFTs"],
                color: "primary",
              },
            ].map((cat) => (
              <Reveal key={cat.title} delay={100}>
                <div className="p-6 rounded-lg border border-border bg-background h-full">
                  <h3 className={`text-lg font-bold mb-2 text-${cat.color}`}>{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{cat.desc}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    <span className="font-semibold text-foreground">Networks:</span> {cat.networks}
                  </p>
                  <ul className="space-y-1.5">
                    {cat.pros.map((pro) => (
                      <li key={pro} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${cat.color}`} />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER NOTE ── */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
            * Optimistic Rollup finality refers to the challenge period for L1 settlement. Transactions are confirmed on L2 within seconds.
            All prices are simulated for demonstration purposes. NEXUSX settles all marketplace transactions via Layer 2 rollup technology for maximum speed and minimum cost.
          </p>
        </div>
      </section>
    </div>
  );
}
