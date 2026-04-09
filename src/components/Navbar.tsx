import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { Menu, X, Zap, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const links = [
    { label: "Marketplace", href: "/marketplace" },
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Crypto Rates", href: "/rates" },
  ];

  const handleHashLink = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.includes("#")) return;
      e.preventDefault();
      const hash = href.split("#")[1];

      const scrollToEl = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(scrollToEl, 300);
      } else {
        scrollToEl();
      }
    },
    [location.pathname, navigate]
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center group-hover:glow-teal transition-all duration-300">
            <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight">
            NEXUS<span className="text-primary">X</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleHashLink(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart icon */}
          <Link
            to="/cart"
            className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center tabular">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <Link
            to="/login?role=buyer"
            className="px-4 py-2 text-sm font-semibold rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-95"
          >
            Buy
          </Link>
          <Link
            to="/login?role=seller"
            className="px-4 py-2 text-sm font-semibold rounded-md bg-secondary text-secondary-foreground hover:brightness-110 transition-all duration-200 active:scale-95"
          >
            Sell
          </Link>
        </div>

        {/* Mobile: cart + menu */}
        <div className="flex items-center gap-1 md:hidden">
          <Link
            to="/cart"
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center tabular">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <button
            className="p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => {
                handleHashLink(e, link.href);
                setOpen(false);
              }}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/login?role=buyer" className="flex-1 text-center py-2 text-sm font-semibold rounded-md border border-primary text-primary">
              Buy
            </Link>
            <Link to="/login?role=seller" className="flex-1 text-center py-2 text-sm font-semibold rounded-md bg-secondary text-secondary-foreground">
              Sell
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
