import { useState } from "react";
import {
  Package, TrendingUp, DollarSign, Star, Plus, Eye, Edit, Trash2,
  BarChart3, Wallet, Bell, Settings, Zap, ArrowUp, ArrowDown, Store
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";

const recentOrders = [
  { id: "#ORD-7741", product: "Arctis Nova Pro Headphones", buyer: "0x4f2a...3e1b", amount: "0.047 ETH", status: "In Escrow", date: "2026-03-21" },
  { id: "#ORD-7738", product: "RGB Mechanical Keyboard", buyer: "0x8c3d...9f4e", amount: "0.062 ETH", status: "Delivered", date: "2026-03-20" },
  { id: "#ORD-7735", product: "Street Runner Sneakers", buyer: "0x1a7f...5d2c", amount: "0.094 ETH", status: "Delivered", date: "2026-03-19" },
  { id: "#ORD-7729", product: "Arctis Nova Pro Headphones", buyer: "0x9b4e...7a8f", amount: "0.047 ETH", status: "Pending", date: "2026-03-19" },
];

const myListings = [
  { id: 1, title: "Arctis Nova Pro Wireless", price: "0.047 ETH", views: 1247, orders: 34, image: p1 },
  { id: 2, title: "RGB Mechanical Keyboard", price: "0.062 ETH", views: 892, orders: 18, image: p2 },
  { id: 3, title: "Street Runner Sneakers", price: "0.094 ETH", views: 2103, orders: 51, image: p3 },
];

const statsData = [
  { label: "Total Revenue", value: "14.73 ETH", usd: "$49,999", change: "+12.4%", up: true, icon: DollarSign },
  { label: "Active Listings", value: "7", sub: "3 featured", change: "+2 this week", up: true, icon: Package },
  { label: "Avg Rating", value: "4.82", sub: "from 389 reviews", change: "+0.03", up: true, icon: Star },
  { label: "Total Orders", value: "103", sub: "this month", change: "+18%", up: true, icon: TrendingUp },
];

type Tab = "overview" | "listings" | "orders" | "earnings";

export default function SellerDashboard() {
  const [tab, setTab] = useState<Tab>("overview");

  const statusColor = (s: string) =>
    s === "Delivered" ? "text-primary bg-primary/10 border-primary/20"
    : s === "In Escrow" ? "text-secondary bg-secondary/10 border-secondary/20"
    : "text-muted-foreground bg-surface-2 border-border";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-16">
        {/* Header bar */}
        <div className="border-b border-border bg-surface-1">
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center">
                <Store className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h1 className="text-base font-bold">Seller Dashboard</h1>
                <p className="text-xs text-muted-foreground">NexusVault · Verified Seller</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-md border border-border bg-surface-2 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              </button>
              <button className="w-9 h-9 rounded-md border border-border bg-surface-2 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
                <Settings className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm font-semibold hover:brightness-110 active:scale-95 transition-all">
                <Plus className="w-4 h-4" />
                New Listing
              </button>
            </div>
          </div>
        </div>

        {/* Wallet strip */}
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-6 py-3 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Wallet className="w-4 h-4 text-secondary" />
              <span className="text-muted-foreground">Wallet:</span>
              <span className="font-mono font-medium">0x9b4e...7a8f</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Available:</span>
              <span className="font-bold text-secondary tabular">14.73 ETH</span>
              <span className="text-muted-foreground tabular">≈ $49,999</span>
            </div>
            <button className="text-xs font-semibold text-secondary border border-secondary/30 bg-secondary/10 px-3 py-1 rounded-sm hover:bg-secondary/20 transition-colors active:scale-95">
              Withdraw Funds
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-8">
          {/* Tab nav */}
          <div className="flex gap-1 border-b border-border mb-8">
            {(["overview", "listings", "orders", "earnings"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 text-sm font-medium capitalize border-b-2 transition-all -mb-px ${
                  tab === t
                    ? "border-secondary text-secondary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statsData.map((s, i) => (
                  <Reveal key={s.label} delay={i * 60}>
                    <div className="card-lift p-5 rounded-lg border border-border bg-card">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-md bg-secondary/10 flex items-center justify-center">
                          <s.icon className="w-4 h-4 text-secondary" />
                        </div>
                        <span className={`flex items-center gap-0.5 text-xs font-bold ${s.up ? "text-primary" : "text-destructive"}`}>
                          {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          {s.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold tabular">{s.value}</p>
                      {s.usd && <p className="text-xs text-muted-foreground tabular">{s.usd}</p>}
                      {s.sub && <p className="text-xs text-muted-foreground">{s.sub}</p>}
                      <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Recent orders */}
              <Reveal>
                <div className="rounded-lg border border-border bg-card overflow-hidden mb-6">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <h2 className="font-bold text-sm">Recent Orders</h2>
                    <button
                      onClick={() => setTab("orders")}
                      className="text-xs text-primary hover:underline"
                    >
                      View all
                    </button>
                  </div>
                  <div className="divide-y divide-border">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex flex-wrap items-center gap-4 px-6 py-3 hover:bg-surface-2 transition-colors">
                        <span className="font-mono text-xs text-muted-foreground w-20">{order.id}</span>
                        <span className="text-sm flex-1 min-w-0 truncate">{order.product}</span>
                        <span className="font-mono text-xs text-muted-foreground hidden md:block">{order.buyer}</span>
                        <span className="text-sm font-bold text-secondary tabular">{order.amount}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm border ${statusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </>
          )}

          {tab === "listings" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myListings.map((listing, i) => (
                <Reveal key={listing.id} delay={i * 80}>
                  <div className="card-lift rounded-lg border border-border bg-card overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-sm mb-1 truncate">{listing.title}</p>
                      <p className="text-secondary font-bold text-base tabular mb-3">{listing.price}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {listing.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          {listing.orders} orders
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all active:scale-95">
                          <Edit className="w-3 h-3" /> Edit
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-border text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all active:scale-95">
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Add listing card */}
              <Reveal delay={myListings.length * 80}>
                <button className="card-lift rounded-lg border-2 border-dashed border-border bg-surface-1 aspect-auto min-h-[280px] flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-secondary/50 hover:text-secondary transition-all group">
                  <div className="w-12 h-12 rounded-xl border-2 border-dashed border-current flex items-center justify-center group-hover:border-secondary">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium">Add New Listing</span>
                </button>
              </Reveal>
            </div>
          )}

          {tab === "orders" && (
            <Reveal>
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-bold">All Orders</h2>
                </div>
                <div className="divide-y divide-border">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex flex-wrap items-center gap-4 px-6 py-4 hover:bg-surface-2 transition-colors">
                      <span className="font-mono text-xs text-muted-foreground w-24">{order.id}</span>
                      <span className="text-sm flex-1 min-w-[120px]">{order.product}</span>
                      <span className="font-mono text-xs text-muted-foreground">{order.buyer}</span>
                      <span className="text-sm font-bold text-secondary tabular">{order.amount}</span>
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm border ${statusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {tab === "earnings" && (
            <Reveal>
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center mb-4">
                  <BarChart3 className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Earnings Analytics</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Detailed earnings charts, withdrawal history, and tax reports coming soon.
                </p>
                <div className="mt-4 px-4 py-2 rounded-md bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold">
                  Total Lifetime: 14.73 ETH
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </main>
    </div>
  );
}
