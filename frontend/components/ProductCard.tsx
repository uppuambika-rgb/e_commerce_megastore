import React, { useState } from 'react';
import { Plus, Star, Check, Lock } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    setIsAdding(true);
    const success = await addToCart(product.id, 1, product.colors?.[0], product.sizes?.[0]);
    setIsAdding(false);
    if (success) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 1600);
    }
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* Product Image Stage (Real photograph of object) */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <ProductImage
          imageUrl={product.imageUrl}
          name={product.name}
          category={product.category}
          subcategory={product.subcategory}
          visualGradient={product.visualGradient}
          iconType={product.iconType}
          className="w-full h-full"
          imgClassName="group-hover:scale-105"
        />

        {/* Subtle highlight tag */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-900/90 text-white rounded-md backdrop-blur-xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick Add Floating Button */}
        <div className="absolute bottom-2.5 right-2.5 z-20 transition-opacity">
          <button
            onClick={handleQuickAdd}
            disabled={isAdding || !product.inStock}
            className={`p-2.5 rounded-lg shadow-md font-medium text-xs flex items-center justify-center transition-all ${
              addedSuccess
                ? 'bg-emerald-600 text-white'
                : !isAuthenticated
                ? 'bg-white/95 text-neutral-800 hover:bg-black hover:text-white backdrop-blur-xs border border-neutral-200'
                : 'bg-white/95 text-neutral-900 hover:bg-black hover:text-white backdrop-blur-xs border border-neutral-200'
            } active:scale-90 disabled:opacity-50 cursor-pointer`}
            title={!isAuthenticated ? 'Sign in to add to bag' : product.inStock ? 'Add to bag' : 'Out of stock'}
            aria-label="Add product to bag"
          >
            {addedSuccess ? (
              <Check className="w-4 h-4" />
            ) : !isAuthenticated ? (
              <Lock className="w-4 h-4 text-slate-600 group-hover:text-white" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Card Body & Clean Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed clean metadata line with typographic separator */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-slate-600">
              {product.brand}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.subcategory}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 group-hover:text-black transition-colors leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Price & Rating Row */}
        <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-neutral-900 font-mono tabular-nums">
              ₹{product.price.toFixed(2)}
            </span>
            {product.discountPercent > 0 && (
              <span className="text-xs text-neutral-500 line-through font-mono tabular-nums">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-slate-700 font-mono tabular-nums">
              {product.rating}
            </span>
            <span className="text-slate-600">({product.reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
