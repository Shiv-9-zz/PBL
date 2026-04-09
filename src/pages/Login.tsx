import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Wallet, Eye, EyeOff, Zap, ShoppingBag, Store } from "lucide-react";

export default function Login() {
  const [params] = useSearchParams();
  const [role, setRole] = useState<"buyer" | "seller">(
    (params.get("role") as "buyer" | "seller") || "buyer"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isBuyer = role === "buyer";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate(isBuyer ? "/marketplace" : "/dashboard");
    }, 1200);
  };

  const accentColor = isBuyer ? "primary" : "secondary";
  const accentHover = isBuyer ? "hover:bg-primary hover:text-primary-foreground" : "hover:bg-secondary hover:text-secondary-foreground";

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Left: Visual panel */}
      <div
        className={`hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden transition-colors duration-500 ${
          isBuyer ? "bg-surface-1 border-r border-primary/20" : "bg-surface-1 border-r border-secondary/20"
        }`}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isBuyer
              ? "linear-gradient(hsl(162 100% 47% / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(162 100% 47% / 0.05) 1px, transparent 1px)"
              : "linear-gradient(hsl(45 95% 55% / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(45 95% 55% / 0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Accent glow orb — subtle, not a blob */}
        <div
          className={`absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-15 transition-colors duration-500 ${
            isBuyer ? "bg-primary" : "bg-secondary"
          }`}
        />

        {/* Logo */}
        <Link to="/" className="relative flex items-center gap-2 z-10">
          <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold">NEXUS<span className="text-primary">X</span></span>
        </Link>

        {/* Center content */}
        <div className="relative z-10">
          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 border ${
              isBuyer ? "bg-primary/10 border-primary/30" : "bg-secondary/10 border-secondary/30"
            }`}
          >
            {isBuyer
              ? <ShoppingBag className={`w-8 h-8 ${isBuyer ? "text-primary" : "text-secondary"}`} />
              : <Store className={`w-8 h-8 ${isBuyer ? "text-primary" : "text-secondary"}`} />
            }
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            {isBuyer ? "Shop anything.\nPay crypto." : "Sell global.\nEarn crypto."}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xs">
            {isBuyer
              ? "Access thousands of verified listings. Every purchase protected by smart contract escrow."
              : "Build your decentralized storefront. Accept any crypto, settle instantly, ship worldwide."
            }
          </p>

          {/* Mini stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {(isBuyer
              ? [
                  { v: "50K+", l: "Products" },
                  { v: "124K", l: "Buyers" },
                  { v: "0.5%", l: "Fees" },
                ]
              : [
                  { v: "$1.8B", l: "Volume" },
                  { v: "2.3s", l: "Settlement" },
                  { v: "14", l: "Cryptos" },
                ]
            ).map((s) => (
              <div key={s.l} className={`p-3 rounded-md border ${isBuyer ? "border-primary/20 bg-primary/5" : "border-secondary/20 bg-secondary/5"}`}>
                <p className={`text-xl font-bold tabular ${isBuyer ? "text-primary" : "text-secondary"}`}>{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-muted-foreground">
          Protected by trustless smart contract escrow
        </p>
      </div>

      {/* Right: Auth panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative">
        {/* Mobile logo */}
        <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-bold">NEXUS<span className="text-primary">X</span></span>
        </Link>

        <div className="w-full max-w-sm">
          {/* Role toggle */}
          <div className="flex rounded-md border border-border bg-surface-1 p-1 mb-8">
            <button
              onClick={() => setRole("buyer")}
              className={`flex-1 py-2 text-sm font-semibold rounded-sm transition-all duration-200 active:scale-95 ${
                isBuyer
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              I'm a Buyer
            </button>
            <button
              onClick={() => setRole("seller")}
              className={`flex-1 py-2 text-sm font-semibold rounded-sm transition-all duration-200 active:scale-95 ${
                !isBuyer
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              I'm a Seller
            </button>
          </div>

          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Sign in as a {role} to continue
          </p>

          {/* Connect wallet button */}
          <button
            className={`w-full flex items-center justify-center gap-3 py-3 rounded-md border-2 font-semibold text-sm mb-6 transition-all duration-200 active:scale-95 ${
              isBuyer
                ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                : "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            }`}
          >
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="satoshi@nexusx.io"
                required
                className="w-full px-4 py-3 rounded-md bg-surface-1 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-md bg-surface-1 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                <input type="checkbox" className="accent-primary" />
                Remember me
              </label>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-bold text-sm transition-all duration-200 active:scale-95 disabled:opacity-70 ${
                isBuyer
                  ? "bg-primary text-primary-foreground hover:brightness-110"
                  : "bg-secondary text-secondary-foreground hover:brightness-110"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to={`/register?role=${role}`}
              className={`font-semibold ${isBuyer ? "text-primary" : "text-secondary"} hover:underline`}
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
