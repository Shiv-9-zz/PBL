import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, X, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";

const allProducts = [
  {
    id: 1,
    title: "Arctis Nova Pro Wireless Noise-Cancelling Headphones",
    seller: "SoundCraft.io",
    priceEth: 0.047,
    priceUsd: 159,
    category: "Electronics",
    rating: 4.8,
    reviews: 1247,
    image: p1,
    verified: true,
    featured: true,
  },
  {
    id: 2,
    title: "Custom RGB Mechanical Keyboard – TKL Layout",
    seller: "KeyMaster_",
    priceEth: 0.062,
    priceUsd: 211,
    category: "Electronics",
    rating: 4.9,
    reviews: 389,
    image: p2,
    verified: true,
  },
  {
    id: 3,
    title: "Limited Edition Street Runner Sneakers – Sz 10",
    seller: "UrbanVault",
    priceEth: 0.094,
    priceUsd: 319,
    category: "Fashion",
    rating: 4.7,
    reviews: 712,
    image: p3,
    verified: true,
    featured: true,
  },
  {
    id: 4,
    title: "Obsidian Series Smartwatch – Matte Black",
    seller: "WristTech",
    priceEth: 0.118,
    priceUsd: 401,
    category: "Electronics",
    rating: 4.6,
    reviews: 528,
    image: p4,
  },
  {
    id: 5,
    title: "Vintage Analog SLR Camera – Full Service Kit",
    seller: "LensLoft",
    priceEth: 0.083,
    priceUsd: 281,
    category: "Photography",
    rating: 4.9,
    reviews: 93,
    image: p5,
    verified: true,
  },
  {
    id: 6,
    title: "Apex Pro Gaming Laptop – RTX 4090 / 64GB RAM",
    seller: "RigBuilders",
    priceEth: 1.24,
    priceUsd: 4213,
    category: "Electronics",
    rating: 4.8,
    reviews: 174,
    image: p6,
    verified: true,
    featured: true,
  },
  {
    id: 7,
    title: "Wireless ANC Studio Headphones – Studio Edition",
    seller: "BeatBox",
    priceEth: 0.038,
    priceUsd: 129,
    category: "Electronics",
    rating: 4.5,
    reviews: 2104,
    image: p1,
  },
  {
    id: 8,
    title: "Carbon Fiber Minimalist Wallet",
    seller: "SlimCraft",
    priceEth: 0.008,
    priceUsd: 27,
    category: "Accessories",
    rating: 4.7,
    reviews: 841,
    image: p5,
    verified: true,
  },
];

const categories = ["All", "Electronics", "Fashion", "Photography", "Accessories", "Art", "Collectibles"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Newest"];
const cryptoOptions = ["ETH", "BTC", "SOL", "USDC", "BNB"];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [selectedCrypto, setSelectedCrypto] = useState("ETH");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = allProducts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.seller.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Price: Low to High") return a.priceEth - b.priceEth;
    if (sort === "Price: High to Low") return b.priceEth - a.priceEth;
    if (sort === "Rating") return b.rating - a.rating;
    if (sort === "Featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-border bg-surface-1">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Marketplace</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {sorted.length} listings · Pay with crypto
                </p>
              </div>

              {/* Crypto selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Pay with</span>
                <div className="flex gap-1.5">
                  {cryptoOptions.map((c) => (
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
            </div>

            {/* Search + Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, sellers..."
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-surface-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary cursor-pointer"
                >
                  {sortOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-surface-2 border border-border rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all active:scale-95"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 active:scale-95 ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-1 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {sorted.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sorted.map((product, i) => (
                <Reveal key={product.id} delay={i * 60}>
                  <ProductCard {...product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-xl bg-surface-1 border border-border flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2">No listings found</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                className="mt-4 px-4 py-2 rounded-md border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
