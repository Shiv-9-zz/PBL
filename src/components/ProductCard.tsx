import { ShoppingCart, Star, Shield, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: number;
  title: string;
  seller: string;
  priceEth: number;
  priceUsd: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  verified?: boolean;
  featured?: boolean;
}

export default function ProductCard({
  id,
  title,
  seller,
  priceEth,
  priceUsd,
  category,
  rating,
  reviews,
  image,
  verified,
  featured,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, title, seller, priceEth, priceUsd, category, image, verified });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="card-lift rounded-lg overflow-hidden border border-border bg-card relative">
        {featured && (
          <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-xs font-bold bg-secondary text-secondary-foreground tabular">
            FEATURED
          </div>
        )}
        {/* Product image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-surface-2">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Quick buy overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-background/80 to-transparent">
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold active:scale-95 transition-all ${
                added
                  ? "bg-primary/20 text-primary border border-primary"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Added!
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">{category}</p>

          {/* Title */}
          <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 line-clamp-2">{title}</h3>

          {/* Seller */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-5 h-5 rounded-full bg-surface-3 border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground">
              {seller[0]}
            </div>
            <span className="text-xs text-muted-foreground">{seller}</span>
            {verified && <Shield className="w-3 h-3 text-primary ml-auto" />}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(rating) ? "text-secondary fill-secondary" : "text-surface-3"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-bold text-secondary tabular">{priceEth} ETH</p>
              <p className="text-xs text-muted-foreground tabular">${priceUsd.toLocaleString()}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-8 h-8 rounded-md border flex items-center justify-center transition-all active:scale-95 ${
                added
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:text-primary hover:border-primary"
              }`}
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
