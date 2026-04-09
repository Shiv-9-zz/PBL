import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Wallet, Eye, EyeOff, Zap, ShoppingBag, Store, Shield, CheckCircle2 } from "lucide-react";

const BUYER_PERKS = [
  "Access 50K+ verified listings",
  "Smart contract escrow protection",
  "Pay with any major crypto",
  "On-chain purchase history",
];

const SELLER_PERKS = [
  "Instant crypto settlements",
  "0.5% platform fee — lowest in market",
  "On-chain reputation system",
  "Global borderless customer base",
];

export default function Register() {
  const [params] = useSearchParams();
  const [role, setRole] = useState<"buyer" | "seller">(
    (params.get("role") as "buyer" | "seller") || "buyer"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isBuyer = role === "buyer";
  const perks = isBuyer ? BUYER_PERKS : SELLER_PERKS;
  const passwordsMatch = password === confirmPw && confirmPw.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch || !agreed) return;
    setLoading(true);
    setTimeout(() => {
      navigate(isBuyer ? "/marketplace" : "/dashboard");
    }, 1400);
  };

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

        {/* Accent glow */}
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
              ? <ShoppingBag className="w-8 h-8 text-primary" />
              : <Store className="w-8 h-8 text-secondary" />
            }
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            {isBuyer ? "Join the\ncrypto marketplace." : "Launch your\ncrypto store."}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xs mb-8">
            {isBuyer
              ? "Create your account and start shopping with crypto. Every purchase is protected by Layer 2 smart contract escrow."
              : "Set up your decentralized storefront in minutes. Accept crypto payments with instant Layer 2 settlement."
            }
          </p>

          {/* Perks list */}
          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isBuyer ? "text-primary" : "text-secondary"}`} />
                <span className="text-sm text-muted-foreground">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3.5 h-3.5" />
          Secured by Layer 2 rollup technology
        </div>
      </div>

      {/* Right: Registration form */}
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

          <h1 className="text-2xl font-bold mb-1">Create your account</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Join as a {role} and start {isBuyer ? "shopping" : "selling"} with crypto
          </p>

          {/* Connect wallet */}
          <button
            className={`w-full flex items-center justify-center gap-3 py-3 rounded-md border-2 font-semibold text-sm mb-5 transition-all duration-200 active:scale-95 ${
              isBuyer
                ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                : "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            }`}
          >
            <Wallet className="w-4 h-4" />
            Register with Wallet
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or register with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                {isBuyer ? "Display Name" : "Store Name"}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isBuyer ? "CryptoShopper42" : "My Crypto Store"}
                required
                className="w-full px-4 py-2.5 rounded-md bg-surface-1 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@nexusx.io"
                required
                className="w-full px-4 py-2.5 rounded-md bg-surface-1 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                  placeholder="Min 8 characters"
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 pr-12 rounded-md bg-surface-1 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                Confirm Password
              </label>
              <input
                type={showPw ? "text" : "password"}
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                placeholder="Re-enter password"
                required
                minLength={8}
                className={`w-full px-4 py-2.5 rounded-md bg-surface-1 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  confirmPw.length > 0
                    ? passwordsMatch
                      ? "border-primary"
                      : "border-destructive"
                    : "border-border"
                }`}
              />
              {confirmPw.length > 0 && !passwordsMatch && (
                <p className="text-xs text-destructive mt-1">Passwords don't match</p>
              )}
            </div>

            <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="accent-primary mt-0.5"
              />
              <span>
                I agree to the{" "}
                <a href="#" className={`font-semibold ${isBuyer ? "text-primary" : "text-secondary"} hover:underline`}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" className={`font-semibold ${isBuyer ? "text-primary" : "text-secondary"} hover:underline`}>Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreed || !passwordsMatch}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-bold text-sm transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                isBuyer
                  ? "bg-primary text-primary-foreground hover:brightness-110"
                  : "bg-secondary text-secondary-foreground hover:brightness-110"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-5">
            Already have an account?{" "}
            <Link
              to={`/login?role=${role}`}
              className={`font-semibold ${isBuyer ? "text-primary" : "text-secondary"} hover:underline`}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
