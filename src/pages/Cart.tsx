import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Wallet,
  Shield,
  Zap,
  CheckCircle2,
  X,
  ChevronRight,
  Package,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import { useCart } from "@/context/CartContext";

const CRYPTO_OPTIONS = ["ETH", "BTC", "SOL", "USDC", "BNB"] as const;
type Crypto = (typeof CRYPTO_OPTIONS)[number];

const BASE_RATES: Record<Crypto, number> = {
  ETH: 3401.55,
  BTC: 67842.31,
  SOL: 189.43,
  USDC: 1.0,
  BNB: 412.77,
};

const CRYPTO_COLOR: Record<Crypto, string> = {
  ETH: "text-blue-400",
  BTC: "text-secondary",
  SOL: "text-purple-400",
  USDC: "text-primary",
  BNB: "text-yellow-400",
};

const WALLETS = [
  { id: "metamask", name: "MetaMask", icon: "🦊", sub: "Browser extension" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "🔵", sub: "Mobile & extension" },
  { id: "walletconnect", name: "WalletConnect", icon: "🔗", sub: "Any compatible wallet" },
  { id: "phantom", name: "Phantom", icon: "👻", sub: "Solana & multichain" },
];

type ModalStep = "closed" | "wallet-select" | "connecting" | "review" | "signing" | "success";

export default function Cart() {
  const { items, removeItem, updateQty, clearCart, totalUsd } = useCart();
  const navigate = useNavigate();

  const [crypto, setCrypto] = useState<Crypto>("ETH");
  const [rates, setRates] = useState(BASE_RATES);
  const [modalStep, setModalStep] = useState<ModalStep>("closed");
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [walletAddr, setWalletAddr] = useState("");
  const [txHash, setTxHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Simulated live price ticks
  useEffect(() => {
    const id = setInterval(() => {
      setRates((prev) => {
        const jitter = (v: number, pct = 0.0008) => v * (1 + (Math.random() - 0.5) * pct);
        return {
          ETH: jitter(prev.ETH),
          BTC: jitter(prev.BTC),
          SOL: jitter(prev.SOL, 0.0015),
          USDC: 1.0,
          BNB: jitter(prev.BNB),
        };
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const cryptoTotal = totalUsd / rates[crypto];
  const platformFee = cryptoTotal * 0.005;
  const grandTotal = cryptoTotal + platformFee;
  const grandTotalUsd = totalUsd * 1.005;

  const itemCryptoPrice = (priceUsd: number) => priceUsd / rates[crypto];

  const formatCrypto = (val: number) => {
    const decimals = crypto === "USDC" ? 2 : crypto === "BTC" ? 6 : 4;
    return val.toFixed(decimals);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ── Checkout flow ─────────────────────────────────────────────────────────
  const handleCheckout = () => setModalStep("wallet-select");

  const connectWallet = (walletId: string) => {
    setSelectedWallet(walletId);
    setModalStep("connecting");
    setTimeout(() => {
      const addr = `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`;
      setWalletAddr(addr);
      setModalStep("review");
    }, 1800);
  };

  const signAndPay = () => {
    setModalStep("signing");
    setTimeout(() => {
      const hash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;
      setTxHash(hash);
      clearCart();
      setModalStep("success");
    }, 2400);
  };

  const closeModal = () => {
    if (modalStep === "connecting" || modalStep === "signing") return;
    setModalStep("closed");
    setSelectedWallet(null);
  };

  const copyTx = () => {
    navigator.clipboard.writeText(txHash).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Empty state ─────────────────────────────────────────────────────────
  if (items.length === 0 && modalStep !== "success") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-16 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          <Reveal>
            <div className="w-20 h-20 rounded-2xl bg-surface-1 border border-border flex items-center justify-center mb-6 mx-auto">
              <ShoppingCart className="w-9 h-9 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-xs">
              Add items from the marketplace and they'll appear here, ready to checkout with a single wallet signature.
            </p>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-95 transition-all"
            >
              Browse Marketplace
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-lg bg-surface-2 border border-border text-sm font-medium shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          {toast}
        </div>
      )}

      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-border bg-surface-1">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <Link to="/marketplace" className="p-2 rounded-md hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-colors active:scale-95">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Your Cart
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""} · Single wallet signature to checkout
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

            {/* ── LEFT: Cart Items ── */}
            <div className="space-y-3">
              {/* Crypto selector */}
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs text-muted-foreground font-medium">Pay with</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {CRYPTO_OPTIONS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCrypto(c)}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-150 active:scale-95 ${
                          crypto === c
                            ? "bg-primary text-primary-foreground"
                            : "bg-surface-2 text-muted-foreground border border-border hover:text-foreground"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              {items.map((item, idx) => (
                <Reveal key={item.id} delay={idx * 50}>
                  <div className="flex gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors group">
                    {/* Thumbnail */}
                    <Link to={`/product/${item.id}`} className="shrink-0">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-surface-2 border border-border">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">{item.category}</p>
                          <Link to={`/product/${item.id}`}>
                            <h3 className="text-sm font-semibold leading-snug line-clamp-2 hover:text-primary transition-colors">{item.title}</h3>
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1">{item.seller}</p>
                        </div>
                        <button
                          onClick={() => { removeItem(item.id); showToast("Item removed from cart"); }}
                          className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors active:scale-95"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Qty controls */}
                        <div className="flex items-center gap-1 border border-border rounded-md overflow-hidden">
                          <button
                            onClick={() => item.quantity > 1 ? updateQty(item.id, item.quantity - 1) : removeItem(item.id)}
                            className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors active:scale-95"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold tabular">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors active:scale-95"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className={`text-sm font-bold tabular ${CRYPTO_COLOR[crypto]}`}>
                            {formatCrypto(itemCryptoPrice(item.priceUsd) * item.quantity)} {crypto}
                          </p>
                          <p className="text-xs text-muted-foreground tabular">
                            ${(item.priceUsd * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Trust badges */}
              <Reveal delay={200}>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { icon: Shield, label: "Trustless Escrow", sub: "Funds held by smart contract" },
                    { icon: Zap, label: "Instant Settlement", sub: "Confirms in ~12 seconds" },
                    { icon: Package, label: "Delivery Protection", sub: "Release on confirmation" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex flex-col items-center text-center p-3 rounded-lg bg-surface-1 border border-border gap-2">
                      <Icon className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-[11px] font-semibold">{label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <Reveal delay={100}>
              <div className="sticky top-24 rounded-lg border border-border bg-card overflow-hidden">
                <div className="px-6 py-5 border-b border-border bg-surface-1">
                  <h2 className="font-bold text-base">Order Summary</h2>
                </div>
                <div className="p-6 space-y-3">
                  {/* Line items */}
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[160px]">
                        {item.title.split(" ").slice(0, 4).join(" ")}…
                        {item.quantity > 1 && <span className="ml-1 text-xs text-primary">×{item.quantity}</span>}
                      </span>
                      <span className="tabular font-medium shrink-0 ml-2">{formatCrypto(itemCryptoPrice(item.priceUsd) * item.quantity)} {crypto}</span>
                    </div>
                  ))}

                  <div className="border-t border-border pt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="tabular">{formatCrypto(cryptoTotal)} {crypto}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Platform fee (0.5%)</span>
                      <span className="tabular">{formatCrypto(platformFee)} {crypto}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Network gas est.</span>
                      <span className="tabular text-primary">~Free</span>
                    </div>
                  </div>

                  {/* Grand total */}
                  <div className="border-t border-primary/20 pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
                        <p className={`text-2xl font-black tabular ${CRYPTO_COLOR[crypto]}`}>
                          {formatCrypto(grandTotal)} <span className="text-lg">{crypto}</span>
                        </p>
                        <p className="text-xs text-muted-foreground tabular mt-0.5">≈ ${grandTotalUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground">Single signature</p>
                        <p className="text-[10px] text-primary font-medium">All items at once</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200 mt-2 glow-teal"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet & Pay
                  </button>

                  <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                    By proceeding you agree to NEXUSX's escrow terms. Funds release to sellers only on confirmed delivery.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════
          CHECKOUT MODAL
      ══════════════════════════════════════════════════════ */}
      {modalStep !== "closed" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Close btn */}
            {modalStep !== "connecting" && modalStep !== "signing" && modalStep !== "success" && (
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* ── Step: Wallet Select ── */}
            {modalStep === "wallet-select" && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Connect Wallet</h3>
                    <p className="text-xs text-muted-foreground">Choose your wallet to sign all {items.length} item{items.length !== 1 ? "s" : ""} at once</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {WALLETS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => connectWallet(w.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-lg border border-border bg-surface-1 hover:border-primary/40 hover:bg-surface-2 transition-all active:scale-[0.98] group"
                    >
                      <span className="text-2xl">{w.icon}</span>
                      <div className="text-left">
                        <p className="font-semibold text-sm">{w.name}</p>
                        <p className="text-xs text-muted-foreground">{w.sub}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-5 px-3 py-2 rounded-md bg-surface-2 border border-border">
                  <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                  <p className="text-[11px] text-muted-foreground">NEXUSX never has custody of your funds. All transactions go through audited smart contracts.</p>
                </div>
              </div>
            )}

            {/* ── Step: Connecting ── */}
            {modalStep === "connecting" && (
              <div className="p-8 flex flex-col items-center text-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
                  <div className="w-16 h-16 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">
                    {WALLETS.find((w) => w.id === selectedWallet)?.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base">Connecting to {WALLETS.find((w) => w.id === selectedWallet)?.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Requesting wallet approval…</p>
                </div>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: `pulse 1s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}

            {/* ── Step: Review & Confirm ── */}
            {modalStep === "review" && (
              <div className="p-6">
                {/* Wallet info */}
                <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-base">
                    {WALLETS.find((w) => w.id === selectedWallet)?.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{WALLETS.find((w) => w.id === selectedWallet)?.name}</p>
                    <p className="font-mono text-sm font-semibold text-primary">{walletAddr}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>

                <h3 className="font-bold text-base mb-4">Confirm Order</h3>

                {/* Items */}
                <div className="space-y-2 max-h-40 overflow-y-auto mb-4 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                      <img src={item.image} alt="" className="w-10 h-10 rounded-md object-cover shrink-0 border border-border" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium line-clamp-1">{item.title}</p>
                        <p className="text-[11px] text-muted-foreground">×{item.quantity}</p>
                      </div>
                      <p className={`text-xs font-bold tabular shrink-0 ${CRYPTO_COLOR[crypto]}`}>
                        {formatCrypto(itemCryptoPrice(item.priceUsd) * item.quantity)} {crypto}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="rounded-lg bg-surface-2 border border-border p-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="tabular">{formatCrypto(cryptoTotal)} {crypto}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Platform fee</span>
                    <span className="tabular">{formatCrypto(platformFee)} {crypto}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-border pt-2">
                    <span>Total</span>
                    <span className={`tabular text-base ${CRYPTO_COLOR[crypto]}`}>{formatCrypto(grandTotal)} {crypto}</span>
                  </div>
                </div>

                {/* Sign CTA */}
                <button
                  onClick={signAndPay}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all glow-teal"
                >
                  <Zap className="w-4 h-4" />
                  Sign & Broadcast Transaction
                </button>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  One signature · {items.length} item{items.length !== 1 ? "s" : ""} · Escrow protected
                </p>
              </div>
            )}

            {/* ── Step: Signing ── */}
            {modalStep === "signing" && (
              <div className="p-8 flex flex-col items-center text-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base">Broadcasting Transaction</h3>
                  <p className="text-sm text-muted-foreground mt-1">Signing with {WALLETS.find((w) => w.id === selectedWallet)?.name}…</p>
                </div>
                <div className="w-full bg-surface-2 rounded-lg border border-border p-4 text-left space-y-2">
                  {["Encoding calldata…", "Estimating gas…", "Signing payload…", "Broadcasting to network…"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div
                        className="w-3 h-3 rounded-full border border-current"
                        style={{ animation: `pulse 0.8s ${i * 0.5}s infinite` }}
                      />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step: Success ── */}
            {modalStep === "success" && (
              <div className="p-6">
                {/* Success header */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 relative">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                    <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" />
                  </div>
                  <h3 className="text-xl font-bold">Order Placed!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Transaction confirmed · Funds held in escrow
                  </p>
                </div>

                {/* TX hash */}
                <div className="rounded-lg bg-surface-2 border border-border p-4 mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Transaction Hash</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-primary flex-1 truncate">{txHash}</p>
                    <button onClick={copyTx} className="shrink-0 p-1.5 rounded text-muted-foreground hover:text-primary transition-colors active:scale-95">
                      {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a href="#" className="shrink-0 p-1.5 rounded text-muted-foreground hover:text-primary transition-colors active:scale-95">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2 mb-6">
                  {[
                    { label: "Payment", value: `${formatCrypto(grandTotal)} ${crypto}`, status: "Escrowed" },
                    { label: "Sellers notified", value: `${items.length} seller${items.length !== 1 ? "s" : ""}`, status: "Confirmed" },
                    { label: "Escrow release", value: "On delivery confirmation", status: "Pending" },
                  ].map(({ label, value, status }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <p className="text-xs font-medium">{label}</p>
                        <p className="text-[11px] text-muted-foreground">{value}</p>
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        status === "Escrowed" || status === "Confirmed"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary/10 text-secondary"
                      }`}>{status}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => { setModalStep("closed"); navigate("/marketplace"); }}
                    className="flex-1 px-4 py-2.5 rounded-md border border-border text-sm font-semibold hover:bg-surface-2 transition-colors active:scale-95"
                  >
                    Keep Shopping
                  </button>
                  <button
                    onClick={() => { setModalStep("closed"); navigate("/dashboard"); }}
                    className="flex-1 px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 active:scale-95 transition-all"
                  >
                    View Orders
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
