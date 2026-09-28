import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Heart, 
  Scale, 
  ShoppingCart, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    t, 
    language, 
    toggleFavorite, 
    isFavorite, 
    toggleCompare, 
    isComparing, 
    addToCart, 
    navigateToProduct 
  } = useApp();

  const fav = isFavorite(product.id);
  const comp = isComparing(product.id);

  return (
    <div className="group relative flex flex-col bg-neutral-900/90 dark:bg-neutral-900/90 light:bg-white border border-neutral-800 hover:border-amber-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5">
      {/* Top Media & Floating Badges */}
      <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden cursor-pointer" onClick={() => navigateToProduct(product.id)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Brand Kicker */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="px-2.5 py-1 text-xs font-black uppercase tracking-wider bg-neutral-950/90 border border-neutral-800 text-amber-400 rounded-md backdrop-blur-sm">
            {product.brand}
          </span>
          {product.discountPercent && (
            <span className="px-2 py-0.5 text-[11px] font-bold bg-rose-600 text-white rounded-md w-fit shadow-md">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Favorite & Compare Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className={`p-2 rounded-lg backdrop-blur-md transition-all shadow-md active:scale-90 ${
              fav 
                ? 'bg-rose-500 text-white shadow-rose-500/30' 
                : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 hover:text-rose-400'
            }`}
            title={t.common.favorite}
            aria-label="Add to favorite"
          >
            <Heart className={`w-4 h-4 ${fav ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`p-2 rounded-lg backdrop-blur-md transition-all shadow-md active:scale-90 ${
              comp 
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-amber-500/30' 
                : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 hover:text-amber-400'
            }`}
            title={t.common.compare}
            aria-label="Add to comparison"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Stock status indicator */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-xs">
          {product.inStock ? (
            <span className="flex items-center gap-1 text-emerald-400 bg-neutral-950/80 px-2 py-0.5 rounded backdrop-blur-sm font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t.common.inStock} ({product.stockCount} ta)
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-400 bg-neutral-950/80 px-2 py-0.5 rounded backdrop-blur-sm font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {t.common.outOfStock}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-1.5 text-xs text-neutral-400">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-neutral-600">·</span>
            <span>{product.reviewsCount} {t.common.reviews.toLowerCase()}</span>
            <span className="text-neutral-600">·</span>
            <span className="capitalize text-neutral-400">{product.grade}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => navigateToProduct(product.id)}
            className="font-bold text-sm sm:text-base text-neutral-100 hover:text-amber-400 line-clamp-2 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Technical Specifications Grid (Clean text, no pill clutter) */}
          <div className="mt-3 py-2 px-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-400 truncate">
              <Zap className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate">{product.power}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400 truncate">
              <span className="font-mono text-amber-500 shrink-0 font-bold">V</span>
              <span className="truncate">{product.voltage}</span>
            </div>
            {product.current && (
              <div className="flex items-center gap-1.5 text-neutral-400 truncate">
                <span className="font-mono text-cyan-400 shrink-0 font-bold">A</span>
                <span className="truncate">{product.current}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-neutral-400 truncate">
              <Shield className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="truncate">{product.warrantyMonths} oy kafolat</span>
            </div>
          </div>

          {/* Tool Lifetime / Working Time snippet */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-neutral-400 bg-neutral-900/60 p-1.5 rounded">
            <Clock className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">
              Uzluksiz: <strong className="text-neutral-300 font-medium">{product.workingSpecs.continuousTime}</strong>
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-neutral-500 line-through">
                {product.oldPrice.toLocaleString()} {t.common.currency}
              </span>
            )}
            <div className="text-base sm:text-lg font-black text-amber-400 font-mono tracking-tight leading-none">
              {product.price.toLocaleString()} <span className="text-xs font-normal text-neutral-400">{t.common.currency}</span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden xs:inline">{t.common.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
