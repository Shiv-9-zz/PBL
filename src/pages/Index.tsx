import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Zap, Globe, TrendingUp, ChevronRight, Layers, Activity } from "lucide-react";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import heroImg from "@/assets/hero-bg.jpg";

const cryptoTicker = [
  { symbol: "BTC", price: "67,842.31", change: "+2.4%" },
  { symbol: "ETH", price: "3,547.18", change: "+1.8%" },
  { symbol: "SOL", price: "189.43", change: "+5.2%" },
  { symbol: "USDC", price: "1.00", change: "0.0%" },
  { symbol: "BNB", price: "412.77", change: "+0.9%" },
  { symbol: "AVAX", price: "38.92", change: "+3.1%" },
  { symbol: "MATIC", price: "0.874", change: "+4.7%" },
  { symbol: "DOT", price: "9.13", change: "-0.6%" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Trustless Escrow",
    desc: "Smart contracts hold funds in escrow until delivery is confirmed. Zero counterparty risk.",
    color: "text-primary",
    border: "border-primary/20",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    desc: "Transactions settle on-chain in seconds. No banks, no delays, no reversals.",
    color: "text-secondary",
    border: "border-secondary/20",
  },
  {
    icon: Globe,
    title: "Borderless Trade",
    desc: "Sell to anyone, anywhere in the world. Accept any major cryptocurrency.",
    color: "text-primary",
    border: "border-primary/20",
  },
  {
    icon: TrendingUp,
    title: "Lower Fees",
    desc: "Marketplace fees as low as 0.5%. Keep more of what you earn.",
    color: "text-secondary",
    border: "border-secondary/20",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Connect Your Wallet",
    desc: "Link MetaMask, Coinbase Wallet, or any WalletConnect-compatible wallet to get started.",
    role: "Both",
  },
  {
    step: "02",
    title: "List or Browse",
    desc: "Sellers list products with crypto prices. Buyers browse thousands of verified listings.",
    role: "Both",
  },
  {
    step: "03",
    title: "Trustless Transaction",
    desc: "Smart contracts handle payment escrow. Funds release automatically on confirmed delivery.",
    role: "Both",
  },
  {
    step: "04",
    title: "Rate & Build Rep",
    desc: "On-chain reputation scores build trust. Top sellers get featured placement.",
    role: "Both",
  },
];

const stats = [
  { value: "$1.8B+", label: "Total Volume" },
  { value: "124K+", label: "Active Traders" },
  { value: "0.5%", label: "Average Fee" },
  { value: "2.3s", label: "Avg Settlement" },
];

const l2Tokens = [
  { symbol: "ETH", name: "Ethereum", network: "Layer 1", price: 3547.18, change: 1.8, color: "hsl(220 70% 60%)" },
  { symbol: "MATIC", name: "Polygon", network: "Layer 2", price: 0.874, change: 4.7, color: "hsl(265 80% 60%)" },
  { symbol: "ARB", name: "Arbitrum", network: "Layer 2", price: 1.24, change: 3.2, color: "hsl(210 85% 55%)" },
  { symbol: "OP", name: "Optimism", network: "Layer 2", price: 2.87, change: 5.1, color: "hsl(0 75% 55%)" },
  { symbol: "BASE", name: "Base", network: "Layer 2", price: 0.0, change: 0.0, color: "hsl(220 90% 50%)", noPrice: true },
  { symbol: "ZK", name: "zkSync", network: "Layer 2", price: 0.198, change: 6.3, color: "hsl(260 70% 55%)" },
  { symbol: "STRK", name: "Starknet", network: "Layer 2", price: 0.72, change: 2.9, color: "hsl(230 65% 55%)" },
  { symbol: "IMX", name: "Immutable X", network: "Layer 2", price: 2.14, change: -1.2, color: "hsl(195 90% 50%)" },
  { symbol: "LRC", name: "Loopring", network: "Layer 2", price: 0.318, change: 3.8, color: "hsl(210 80% 55%)" },
  { symbol: "METIS", name: "Metis", network: "Layer 2", price: 62.45, change: 7.1, color: "hsl(170 75% 45%)" },
];

function CryptoRatesSection() {
  const [prices, setPrices] = useState(l2Tokens);

  useEffect(() => {
    const id = setInterval(() => {
      setPrices((prev) =>
        prev.map((t) => ({
          ...t,
          price: t.noPrice ? 0 : t.price * (1 + (Math.random() - 0.5) * 0.002),
          change: t.noPrice ? 0 : t.change + (Math.random() - 0.5) * 0.3,
        }))
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="rates" className="py-20 bg-surface-1 border-y border-border">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <Layers className="w-4 h-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Layer 2 Networks
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Live Crypto Rates.
          </h2>
          <p className="text-muted-foreground max-w-xl mb-12 leading-relaxed">
            NEXUSX is built on Layer 2 rollup technology — faster transactions, lower gas fees, and the same Ethereum-grade security. Trade with these supported networks.
          </p>
        </Reveal>

        {/* Rates grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {prices.map((token, i) => (
            <Reveal key={token.symbol} delay={i * 50}>
              <div className="group relative p-4 rounded-lg border border-border bg-background hover:border-primary/40 transition-all duration-300 card-lift">
                {/* L2 badge */}
                {token.network === "Layer 2" && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/20">
                    L2
                  </span>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center text-xs font-black text-foreground"
                    style={{ backgroundColor: `${token.color}20`, border: `1px solid ${token.color}40` }}
                  >
                    {token.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{token.symbol}</p>
                    <p className="text-xs text-muted-foreground">{token.name}</p>
                  </div>
                </div>

                {token.noPrice ? (
                  <div>
                    <p className="text-lg font-bold text-muted-foreground">Native L2</p>
                    <p className="text-xs text-muted-foreground">No token — uses ETH</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-bold tabular">
                      ${token.price < 1 ? token.price.toFixed(4) : token.price < 100 ? token.price.toFixed(2) : token.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-muted-foreground" />
                      <span className={`text-xs font-bold tabular ${token.change >= 0 ? "text-primary" : "text-destructive"}`}>
                        {token.change >= 0 ? "+" : ""}{token.change.toFixed(1)}%
                      </span>
                      <span className="text-[10px] text-muted-foreground">24h</span>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* L2 info bar */}
        <Reveal delay={200}>
          <div className="mt-8 p-4 rounded-lg border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm font-semibold text-primary">Why Layer 2?</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Layer 2 rollups batch transactions off-chain and settle on Ethereum — giving you <span className="text-foreground font-semibold">10-100x lower gas fees</span>, <span className="text-foreground font-semibold">near-instant finality</span>, and full Ethereum security. Every NEXUSX transaction runs on L2.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Index() {
  const doubled = [...cryptoTicker, ...cryptoTicker];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={heroImg} alt="hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-grid-teal bg-grid-48 grid-overlay" />
        </div>

        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-primary/30 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-8"
              style={{ animation: "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              The Future of Commerce is On-Chain
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[0.95]"
              style={{ animation: "fade-in-up 0.7s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both" }}
            >
              Buy & Sell
              <br />
              <span className="text-primary">Anything</span> with
              <br />
              <span className="text-secondary">Crypto.</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
              style={{ animation: "fade-in-up 0.7s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both" }}
            >
              NEXUSX is the decentralized peer-to-peer marketplace where every
              transaction is powered by crypto. No banks. No borders. No bullshit.
            </p>

            {/* CTA split */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{ animation: "fade-in-up 0.7s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}
            >
              <Link
                to="/login?role=buyer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-primary text-primary-foreground font-bold text-base hover:brightness-110 active:scale-95 transition-all duration-200 glow-teal"
              >
                Enter as Buyer
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login?role=seller"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md border-2 border-secondary text-secondary font-bold text-base hover:bg-secondary hover:text-secondary-foreground active:scale-95 transition-all duration-200"
              >
                Start Selling
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-muted-foreground" />
        </div>
      </section>

      {/* ── CRYPTO TICKER ── */}
      <section className="border-y border-border bg-surface-1 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="ticker-track flex gap-12 px-6">
            {doubled.map((coin, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-sm font-medium tabular">
                <span className="text-muted-foreground">{coin.symbol}</span>
                <span className="text-foreground">${coin.price}</span>
                <span className={`text-xs font-bold ${coin.change.startsWith("+") ? "text-primary" : coin.change.startsWith("-") ? "text-destructive" : "text-muted-foreground"}`}>
                  {coin.change}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 container mx-auto px-6">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-surface-1 p-8 text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary tabular mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 container mx-auto px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Why NEXUSX</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 max-w-lg">Built different.<br />Built for crypto.</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className={`card-lift h-full p-6 rounded-lg border ${f.border} bg-card`}>
                <div className={`w-10 h-10 rounded-md bg-surface-2 flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 bg-surface-1 border-y border-border">
        <div className="container mx-auto px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Process</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-16">How it works.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <Reveal key={step.step} delay={i * 100}>
                <div className="relative">
                  {i < howItWorks.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute -right-3 top-6 w-5 h-5 text-border z-10" />
                  )}
                  <div className="p-6 rounded-lg border border-border bg-background h-full">
                    <p className="text-4xl font-black text-surface-3 tabular mb-4">{step.step}</p>
                    <h3 className="font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAYER 2 CRYPTO RATES ── */}
      <CryptoRatesSection />

      {/* ── DUAL CTA ── */}
      <section className="py-24 container mx-auto px-6">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Buyer card */}
            <Link
              to="/login?role=buyer"
              className="group relative p-10 rounded-lg border border-primary/30 bg-card overflow-hidden hover:border-primary transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-primary/3 group-hover:bg-primary/6 transition-colors duration-300" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">For Buyers</p>
                <h3 className="text-3xl font-bold mb-3">Shop the World.<br />Pay with Crypto.</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Access 50,000+ products from verified sellers. Pay with BTC, ETH, SOL and more.
                  Protected by trustless escrow.
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Enter Marketplace <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Seller card */}
            <Link
              to="/login?role=seller"
              className="group relative p-10 rounded-lg border border-secondary/30 bg-card overflow-hidden hover:border-secondary transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-secondary/3 group-hover:bg-secondary/6 transition-colors duration-300" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">For Sellers</p>
                <h3 className="text-3xl font-bold mb-3">Sell Global.<br />Earn in Crypto.</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Set up your storefront in minutes. Price in any crypto, receive instant settlements,
                  and build your on-chain reputation.
                </p>
                <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">
                  Open Your Store <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-surface-1 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-bold">NEXUS<span className="text-primary">X</span></span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 NEXUSX. Decentralized. Borderless. Unstoppable.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
