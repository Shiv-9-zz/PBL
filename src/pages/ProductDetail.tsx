import { useState, useEffect, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  ShoppingCart,
  Star,
  Zap,
  Check,
  Copy,
  ChevronRight,
  Wallet,
  Lock,
  TrendingUp,
  RotateCcw,
  AlertCircle,
  X,
  ExternalLink,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";

// ── Product database (mirrors Marketplace data) ─────────────────────────────
const allProducts = [
  {
    id: 1,
    title: "Arctis Nova Pro Wireless Noise-Cancelling Headphones",
    seller: "SoundCraft.io",
    sellerAddress: "0x4a3b...c7f1",
    sellerScore: 98.4,
    sellerSales: 1247,
    priceEth: 0.047,
    priceUsd: 159,
    priceBtc: 0.00234,
    category: "Electronics",
    rating: 4.8,
    reviews: 1247,
    image: p1,
    images: [p1, p2, p3],
    verified: true,
    featured: true,
    condition: "New",
    stock: 7,
    description:
      "Industry-leading wireless noise cancellation with a retractable microphone. 40-hour battery life, lossless 2.4 GHz audio, and simultaneous dual-connection for PC and console. The Nova Pro Wireless sets a new benchmark for gaming peripherals.",
    specs: [
      { label: "Driver", value: "40mm Neodymium" },
      { label: "Frequency", value: "10–40,000 Hz" },
      { label: "Battery", value: "40 hours" },
      { label: "Connection", value: "2.4 GHz + Bluetooth" },
      { label: "Weight", value: "336g" },
    ],
    tags: ["wireless", "noise-cancelling", "gaming", "headphones"],
  },
  {
    id: 2,
    title: "Custom RGB Mechanical Keyboard – TKL Layout",
    seller: "KeyMaster_",
    sellerAddress: "0x9d2e...a4f8",
    sellerScore: 97.1,
    sellerSales: 389,
    priceEth: 0.062,
    priceUsd: 211,
    priceBtc: 0.00309,
    category: "Electronics",
    rating: 4.9,
    reviews: 389,
    image: p2,
    images: [p2, p1, p4],
    verified: true,
    condition: "New",
    stock: 3,
    description:
      "Hot-swappable TKL keyboard with Gateron Yellow linear switches. Per-key RGB lighting, aluminum top plate, and USB-C braided cable. Ships with both keycap sets included.",
    specs: [
      { label: "Switch", value: "Gateron Yellow (linear)" },
      { label: "Layout", value: "TKL 87-key" },
      { label: "Connection", value: "USB-C" },
      { label: "Polling Rate", value: "1000 Hz" },
      { label: "Frame", value: "6063 Aluminum" },
    ],
    tags: ["mechanical", "rgb", "gaming", "keyboard"],
  },
  {
    id: 3,
    title: "Limited Edition Street Runner Sneakers – Sz 10",
    seller: "UrbanVault",
    sellerAddress: "0x7c1a...b5e3",
    sellerScore: 99.2,
    sellerSales: 712,
    priceEth: 0.094,
    priceUsd: 319,
    priceBtc: 0.00468,
    category: "Fashion",
    rating: 4.7,
    reviews: 712,
    image: p3,
    images: [p3, p5, p1],
    verified: true,
    featured: true,
    condition: "New – Deadstock",
    stock: 1,
    description:
      "Authenticated limited-release colorway. Full deadstock condition with original box, tissue, and tags. Accompanied by a certificate of authenticity verified on-chain by UrbanVault's NFC chip authentication system.",
    specs: [
      { label: "Size", value: "US 10 / EU 43" },
      { label: "Material", value: "Full-grain leather upper" },
      { label: "Condition", value: "DS (Deadstock)" },
      { label: "Release", value: "2025 Limited Run" },
      { label: "Auth", value: "NFC + On-chain cert" },
    ],
    tags: ["sneakers", "limited", "streetwear", "authenticated"],
  },
  {
    id: 4,
    title: "Obsidian Series Smartwatch – Matte Black",
    seller: "WristTech",
    sellerAddress: "0x2f8d...9c6b",
    sellerScore: 95.7,
    sellerSales: 528,
    priceEth: 0.118,
    priceUsd: 401,
    priceBtc: 0.00587,
    category: "Electronics",
    rating: 4.6,
    reviews: 528,
    image: p4,
    images: [p4, p2, p6],
    condition: "New",
    stock: 12,
    description:
      "Obsidian case with sapphire crystal display. Full health suite: ECG, SpO₂, skin temp, and continuous HRV monitoring. Always-on micro-LED display. 5ATM water resistance.",
    specs: [
      { label: "Display", value: "1.9\" micro-LED LTPO" },
      { label: "Processor", value: "Custom S9 dual-core" },
      { label: "Battery", value: "36 hours" },
      { label: "Water", value: "5ATM / 50m" },
      { label: "Case", value: "41mm Obsidian titanium" },
    ],
    tags: ["smartwatch", "health", "wearable", "matte"],
  },
  {
    id: 5,
    title: "Vintage Analog SLR Camera – Full Service Kit",
    seller: "LensLoft",
    sellerAddress: "0x6b3f...d2a0",
    sellerScore: 99.8,
    sellerSales: 93,
    priceEth: 0.083,
    priceUsd: 281,
    priceBtc: 0.00413,
    category: "Photography",
    rating: 4.9,
    reviews: 93,
    image: p5,
    images: [p5, p1, p3],
    verified: true,
    condition: "Excellent – Serviced",
    stock: 1,
    description:
      "Fully CLA'd (clean, lubricate, adjust) Nikon FM2 body. Light seals replaced, shutter speeds verified accurate. Comes with 50mm f/1.4 Nikkor AI-S lens, strap, and 5 rolls of Kodak Portra 400.",
    specs: [
      { label: "Model", value: "Nikon FM2 (1982)" },
      { label: "Shutter", value: "1/4000s mechanical" },
      { label: "Lens", value: "50mm f/1.4 Nikkor AI-S" },
      { label: "Film", value: "35mm" },
      { label: "Service", value: "Full CLA 2025" },
    ],
    tags: ["film", "camera", "analog", "nikon", "photography"],
  },
  {
    id: 6,
    title: "Apex Pro Gaming Laptop – RTX 4090 / 64GB RAM",
    seller: "RigBuilders",
    sellerAddress: "0x1e7c...f3b9",
    sellerScore: 96.3,
    sellerSales: 174,
    priceEth: 1.24,
    priceUsd: 4213,
    priceBtc: 0.06172,
    category: "Electronics",
    rating: 4.8,
    reviews: 174,
    image: p6,
    images: [p6, p4, p2],
    verified: true,
    featured: true,
    condition: "New – Sealed",
    stock: 2,
    description:
      "Flagship mobile workstation. RTX 4090 Mobile 175W full-power GPU, i9-14900HX, DDR5-6400 64GB, 4TB PCIe 5.0 NVMe. 18\" QHD+ 240Hz MiniLED display with Calman-verified color accuracy.",
    specs: [
      { label: "CPU", value: "Intel i9-14900HX" },
      { label: "GPU", value: "NVIDIA RTX 4090 175W" },
      { label: "RAM", value: "64GB DDR5-6400" },
      { label: "Storage", value: "4TB PCIe 5.0 NVMe" },
      { label: "Display", value: "18\" QHD+ 240Hz MiniLED" },
    ],
    tags: ["gaming", "laptop", "rtx4090", "workstation"],
  },
];

// ── Wallet options ────────────────────────────────────────────────────────────
const WALLETS = [
  { id: "metamask", name: "MetaMask", icon: "🦊", color: "hsl(30 95% 55%)" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "🔵", color: "hsl(220 70% 55%)" },
  { id: "walletconnect", name: "WalletConnect", icon: "🔗", color: "hsl(200 80% 50%)" },
  { id: "phantom", name: "Phantom", icon: "👻", color: "hsl(260 80% 65%)" },
];

// ── Crypto conversion rates (simulated) ─────────────────────────────────────
const RATES: Record<string, { symbol: string; rate: (usd: number) => number; decimals: number; color: string }> = {
  ETH: { symbol: "ETH", rate: (usd) => usd / 3401.55, decimals: 4, color: "hsl(220 70% 60%)" },
  BTC: { symbol: "BTC", rate: (usd) => usd / 67842.31, decimals: 6, color: "hsl(30 95% 55%)" },
  SOL: { symbol: "SOL", rate: (usd) => usd / 189.43, decimals: 3, color: "hsl(260 80% 65%)" },
  USDC: { symbol: "USDC", rate: (usd) => usd, decimals: 2, color: "hsl(215 80% 60%)" },
  BNB: { symbol: "BNB", rate: (usd) => usd / 412.77, decimals: 4, color: "hsl(45 95% 55%)" },
};

// ── Review mock data ──────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Marcus T.",
    avatar: "MT",
    rating: 5,
    date: "14 days ago",
    text: "Arrived in perfect condition exactly as described. Wallet confirmation was instant and the escrow released the same day. Best marketplace experience I've had.",
    txHash: "0x3a9f...12e4",
  },
  {
    name: "Priya K.",
    avatar: "PK",
    rating: 5,
    date: "1 month ago",
    text: "Seller communication was fast and the item is genuinely impressive. Paid in ETH, zero hidden fees. Will buy from this seller again.",
    txHash: "0x8c2d...7ab1",
  },
  {
    name: "Jordan W.",
    avatar: "JW",
    rating: 4,
    date: "2 months ago",
    text: "Item is exactly as described. Shipping took 5 days but seller kept me updated throughout. Solid 4/5.",
    txHash: "0x1f6e...b4c9",
  },
];

// ── Checkout modal states ─────────────────────────────────────────────────────
type CheckoutStep = "idle" | "wallet-select" | "connecting" | "confirm" | "signing" | "success";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = allProducts.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const [cartAdded, setCartAdded] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem({
      id: product.id,
      title: product.title,
      seller: product.seller,
      priceEth: product.priceEth,
      priceUsd: product.priceUsd,
      category: product.category,
      image: product.image,
      verified: product.verified,
    });
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 1800);
  }, [product, addItem]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("ETH");
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("idle");
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [livePrices, setLivePrices] = useState<Record<string, number>>({
    ETH: 3401.55,
    BTC: 67842.31,
    SOL: 189.43,
    USDC: 1.0,
    BNB: 412.77,
  });

  // Simulate live price ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrices((prev) => {
        const jitter = (base: number, pct = 0.001) =>
          base * (1 + (Math.random() - 0.5) * pct);
        return {
          ETH: jitter(prev.ETH),
          BTC: jitter(prev.BTC),
          SOL: jitter(prev.SOL, 0.002),
          USDC: 1.0,
          BNB: jitter(prev.BNB),
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Navbar />
        <AlertCircle className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link to="/marketplace" className="text-primary hover:underline">
          ← Back to Marketplace
        </Link>
      </div>
    );
  }

  const rate = RATES[selectedCrypto];
  const cryptoPrice = product.priceUsd / livePrices[selectedCrypto];
  const platformFee = cryptoPrice * 0.005;
  const totalCrypto = cryptoPrice + platformFee;

  const handleCopyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Checkout flow ─────────────────────────────────────────────────────────
  const startCheckout = () => setCheckoutStep("wallet-select");

  const selectWallet = (walletId: string) => {
    setConnectingWallet(walletId);
    setCheckoutStep("connecting");
    const wallet = WALLETS.find((w) => w.id === walletId)!;
    // Simulate wallet connection delay
    setTimeout(() => {
      const addr = `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`;
      setWalletAddress(addr);
      setConnectedWallet(wallet.name);
      setCheckoutStep("confirm");
    }, 1800);
  };

  const confirmPurchase = () => {
    setCheckoutStep("signing");
    // Simulate tx signing & broadcast
    setTimeout(() => {
      const hash = `0x${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")}`;
      setTxHash(hash);
      setCheckoutStep("success");
    }, 2200);
  };

  const closeModal = () => {
    if (checkoutStep !== "connecting" && checkoutStep !== "signing") {
      setCheckoutStep("idle");
      setConnectingWallet(null);
    }
  };

  const resetFlow = () => {
    setCheckoutStep("idle");
    setConnectedWallet(null);
    setWalletAddress("");
    setConnectingWallet(null);
    setTxHash("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-16">
        {/* ── Breadcrumb ── */}
        <div className="border-b border-border bg-surface-1">
          <div className="container mx-auto px-6 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{product.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 xl:gap-16">
            {/* ── LEFT: Images + Details ── */}
            <div>
              {/* Image gallery */}
              <Reveal>
                <div className="rounded-lg overflow-hidden bg-surface-2 border border-border aspect-[4/3] mb-3 relative">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.featured && (
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-secondary text-secondary-foreground text-xs font-bold tracking-wider">
                      FEATURED
                    </div>
                  )}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-surface-1/80 backdrop-blur-sm border border-border text-xs font-medium text-muted-foreground">
                    {product.condition}
                  </div>
                </div>
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-16 rounded-md overflow-hidden border-2 transition-all active:scale-95 ${
                        selectedImage === i
                          ? "border-primary"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </Reveal>

              {/* Description */}
              <Reveal delay={80}>
                <div className="mt-8">
                  <h2 className="text-lg font-bold mb-3">About this listing</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded bg-surface-2 border border-border text-xs text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Specs */}
              <Reveal delay={120}>
                <div className="mt-8">
                  <h2 className="text-lg font-bold mb-3">Specifications</h2>
                  <div className="rounded-lg border border-border overflow-hidden">
                    {product.specs.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={`flex items-center justify-between px-5 py-3 text-sm ${
                          i % 2 === 0 ? "bg-surface-1" : "bg-surface-2"
                        }`}
                      >
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Reviews */}
              <Reveal delay={160}>
                <div className="mt-10">
                  <div className="flex items-baseline gap-3 mb-5">
                    <h2 className="text-lg font-bold">Reviews</h2>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? "text-secondary fill-secondary"
                              : "text-surface-3"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1 tabular">
                        {product.rating} · {product.reviews.toLocaleString()} reviews
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {REVIEWS.map((review, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-lg border border-border bg-surface-1"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-surface-3 border border-border flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                              {review.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5 mt-0.5">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star
                                key={j}
                                className={`w-3 h-3 ${
                                  j < review.rating ? "text-secondary fill-secondary" : "text-surface-3"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                        <div className="flex items-center gap-1.5 mt-3">
                          <ExternalLink className="w-3 h-3 text-primary/60" />
                          <span className="text-xs text-primary/60 tabular font-mono">
                            Tx: {review.txHash}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT: Purchase panel ── */}
            <div className="lg:sticky lg:top-24 self-start">
              <Reveal>
                <div className="rounded-lg border border-border bg-card overflow-hidden">
                  {/* Header */}
                  <div className="p-5 border-b border-border bg-surface-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                      {product.category}
                    </p>
                    <h1 className="text-xl font-bold leading-snug mb-3">{product.title}</h1>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "text-secondary fill-secondary"
                                : "text-surface-3"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1 tabular">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground tabular">{product.reviews.toLocaleString()} reviews</span>
                      {product.stock <= 3 && (
                        <>
                          <span className="text-xs text-muted-foreground">·</span>
                          <span className="text-xs font-bold text-destructive tabular">{product.stock} left</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-5">
                    {/* Crypto currency selector */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                        Pay with
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.keys(RATES).map((c) => (
                          <button
                            key={c}
                            onClick={() => setSelectedCrypto(c)}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-150 active:scale-95 ${
                              selectedCrypto === c
                                ? "bg-primary text-primary-foreground"
                                : "bg-surface-2 text-muted-foreground border border-border hover:text-foreground"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price display */}
                    <div className="p-4 rounded-lg bg-surface-2 border border-border">
                      <div className="flex items-end justify-between mb-1">
                        <div>
                          <p className="text-2xl font-black tabular text-primary">
                            {cryptoPrice.toFixed(rate.decimals)} {selectedCrypto}
                          </p>
                          <p className="text-sm text-muted-foreground tabular">
                            ≈ ${product.priceUsd.toLocaleString()} USD
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-primary/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <span>Live rate</span>
                        </div>
                      </div>

                      {/* Rate breakdown */}
                      <div className="mt-3 pt-3 border-t border-border space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Item price</span>
                          <span className="tabular font-medium">{cryptoPrice.toFixed(rate.decimals)} {selectedCrypto}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Platform fee (0.5%)</span>
                          <span className="tabular font-medium">{platformFee.toFixed(rate.decimals)} {selectedCrypto}</span>
                        </div>
                        <div className="flex justify-between text-xs pt-1.5 border-t border-border">
                          <span className="font-semibold">Total</span>
                          <span className="tabular font-bold text-foreground">{totalCrypto.toFixed(rate.decimals)} {selectedCrypto}</span>
                        </div>
                      </div>
                    </div>

                    {/* Live market prices */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { sym: "ETH", price: livePrices.ETH },
                        { sym: "BTC", price: livePrices.BTC },
                      ].map(({ sym, price }) => (
                        <div key={sym} className="p-2.5 rounded bg-surface-1 border border-border">
                          <p className="text-xs text-muted-foreground">{sym}/USD</p>
                          <p className="text-sm font-bold tabular">
                            ${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Escrow notice */}
                    <div className="flex items-start gap-3 p-3 rounded bg-primary/5 border border-primary/20">
                      <Lock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Funds held in <span className="text-primary font-semibold">trustless escrow</span> until you confirm delivery. Auto-release after 7 days.
                      </p>
                    </div>

                    {/* CTA buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={startCheckout}
                        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-md bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-150 glow-teal"
                      >
                        <Zap className="w-4 h-4" />
                        Buy Now · {cryptoPrice.toFixed(rate.decimals)} {selectedCrypto}
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-md border text-sm font-semibold active:scale-[0.98] transition-all duration-150 ${
                          cartAdded
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                        }`}
                      >
                        {cartAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            Added to Cart!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </>
                        )}
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-border text-muted-foreground text-sm font-medium hover:text-foreground hover:border-primary/40 active:scale-[0.98] transition-all duration-150">
                        <TrendingUp className="w-4 h-4" />
                        Make an Offer
                      </button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex items-center justify-between pt-1">
                      {[
                        { icon: Shield, label: "Verified" },
                        { icon: RotateCcw, label: "Returns" },
                        { icon: Zap, label: "Fast Tx" },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex flex-col items-center gap-1">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seller info */}
                  <div className="p-5 border-t border-border bg-surface-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Seller</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-surface-3 border border-border flex items-center justify-center text-sm font-bold text-muted-foreground">
                          {product.seller[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold">{product.seller}</span>
                            {product.verified && <Shield className="w-3 h-3 text-primary" />}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-primary font-bold tabular">{product.sellerScore}%</span>
                            <span className="text-xs text-muted-foreground tabular">{product.sellerSales.toLocaleString()} sales</span>
                          </div>
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors active:scale-95"
                        onClick={() => handleCopyAddress(product.sellerAddress)}
                      >
                        <span className="font-mono text-[11px] tabular">{product.sellerAddress}</span>
                        {copied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          CHECKOUT MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {checkoutStep !== "idle" && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          style={{ animation: "fade-in-up 0.2s cubic-bezier(0.16, 1, 0.3, 1) both" }}
        >
          <div className="w-full max-w-md rounded-xl border border-border bg-card overflow-hidden shadow-2xl"
            style={{ animation: "fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-1">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="font-bold text-sm">
                  {checkoutStep === "wallet-select" && "Connect Wallet"}
                  {checkoutStep === "connecting" && "Connecting…"}
                  {checkoutStep === "confirm" && "Confirm Purchase"}
                  {checkoutStep === "signing" && "Awaiting Signature…"}
                  {checkoutStep === "success" && "Purchase Complete!"}
                </span>
              </div>
              {checkoutStep !== "connecting" && checkoutStep !== "signing" && (
                <button
                  onClick={closeModal}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-all active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* ── Step: Wallet Select ── */}
            {checkoutStep === "wallet-select" && (
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-5">
                  Choose a wallet to connect and complete your purchase.
                </p>
                <div className="space-y-2">
                  {WALLETS.map((wallet) => (
                    <button
                      key={wallet.id}
                      onClick={() => selectWallet(wallet.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-lg border border-border bg-surface-1 hover:border-primary/40 hover:bg-surface-2 active:scale-[0.98] transition-all duration-150 group"
                    >
                      <span className="text-2xl">{wallet.icon}</span>
                      <span className="font-semibold text-sm">{wallet.name}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By connecting, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                </p>
              </div>
            )}

            {/* ── Step: Connecting ── */}
            {checkoutStep === "connecting" && (
              <div className="p-10 flex flex-col items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center">
                    <span className="text-3xl">
                      {WALLETS.find((w) => w.id === connectingWallet)?.icon}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
                <div className="text-center">
                  <p className="font-bold mb-1">
                    Connecting to {WALLETS.find((w) => w.id === connectingWallet)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Approve the connection request in your wallet…
                  </p>
                </div>
              </div>
            )}

            {/* ── Step: Confirm ── */}
            {checkoutStep === "confirm" && (
              <div className="p-6 space-y-5">
                {/* Connected wallet chip */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <div>
                    <p className="text-xs text-muted-foreground">{connectedWallet}</p>
                    <p className="text-sm font-mono font-bold tabular">{walletAddress}</p>
                  </div>
                  <Check className="w-4 h-4 text-primary ml-auto" />
                </div>

                {/* Order summary */}
                <div className="rounded-lg border border-border bg-surface-1 overflow-hidden">
                  <div className="flex items-center gap-3 p-4 border-b border-border">
                    <img src={product.image} alt="" className="w-12 h-10 rounded object-cover flex-shrink-0" />
                    <p className="text-sm font-semibold line-clamp-2">{product.title}</p>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Item</span>
                      <span className="tabular font-medium">{cryptoPrice.toFixed(rate.decimals)} {selectedCrypto}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Platform fee</span>
                      <span className="tabular font-medium">{platformFee.toFixed(rate.decimals)} {selectedCrypto}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="tabular text-primary">{totalCrypto.toFixed(rate.decimals)} {selectedCrypto}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">USD equivalent</span>
                      <span className="tabular text-muted-foreground">≈ ${(product.priceUsd * 1.005).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Escrow explanation */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-1 border border-border">
                  <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">Smart contract escrow</p>
                    <p>Your {selectedCrypto} will be locked in escrow. It releases to the seller only after you confirm delivery — or automatically after 7 days.</p>
                  </div>
                </div>

                <button
                  onClick={confirmPurchase}
                  className="w-full py-3.5 rounded-md bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-150 glow-teal flex items-center justify-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  Sign & Send {totalCrypto.toFixed(rate.decimals)} {selectedCrypto}
                </button>
              </div>
            )}

            {/* ── Step: Signing ── */}
            {checkoutStep === "signing" && (
              <div className="p-10 flex flex-col items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Wallet className="w-7 h-7 text-primary" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
                <div className="text-center">
                  <p className="font-bold mb-1">Signing transaction…</p>
                  <p className="text-sm text-muted-foreground">
                    Confirm the transaction in your {connectedWallet}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  Broadcasting to network…
                </div>
              </div>
            )}

            {/* ── Step: Success ── */}
            {checkoutStep === "success" && (
              <div className="p-6 flex flex-col items-center gap-5 text-center">
                {/* Success animation */}
                <div
                  className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"
                  style={{ animation: "fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both" }}
                >
                  <Check className="w-8 h-8 text-primary" strokeWidth={2.5} />
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">Transaction Submitted!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your purchase is secured in escrow. The seller has been notified.
                  </p>
                </div>

                {/* Tx hash */}
                <div className="w-full p-3 rounded-lg bg-surface-1 border border-border">
                  <p className="text-xs text-muted-foreground mb-1.5">Transaction hash</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-mono tabular text-primary flex-1 truncate">
                      {txHash.slice(0, 20)}…{txHash.slice(-8)}
                    </p>
                    <button
                      onClick={() => handleCopyAddress(txHash)}
                      className="flex-shrink-0 text-muted-foreground hover:text-foreground active:scale-90 transition-all"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Summary row */}
                <div className="w-full grid grid-cols-3 gap-2">
                  {[
                    { label: "Amount", value: `${totalCrypto.toFixed(rate.decimals)} ${selectedCrypto}` },
                    { label: "Status", value: "In Escrow" },
                    { label: "Est. delivery", value: "3–5 days" },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-2.5 rounded bg-surface-1 border border-border text-center">
                      <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
                      <p className="text-xs font-bold tabular">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 w-full">
                  <button
                    onClick={resetFlow}
                    className="flex-1 py-3 rounded-md border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 active:scale-[0.98] transition-all"
                  >
                    Continue Shopping
                  </button>
                  <button
                    className="flex-1 py-3 rounded-md bg-primary text-primary-foreground text-sm font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View on Explorer
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
