import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { fetchFeatured } from '../services/api';

interface FeaturedSectionProps {
  onSelectProduct: (p: Product) => void;
  onExploreCatalog: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  onSelectProduct,
  onExploreCatalog,
}) => {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const items = await fetchFeatured();
        setFeatured(items);
      } catch (err) {
        console.error('Failed to load featured products:', err);
      }
    }
    load();
  }, []);

  if (featured.length === 0) return null;

  return (
    <section id="featured-deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-neutral-600" />
            <span>Limited-Time Spotlights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Featured Deals & High-Rating Picks
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Hand-selected top tier performers with exceptional verified feedback and direct price savings.
          </p>
        </div>

        <button
          onClick={onExploreCatalog}
          className="text-xs font-bold text-neutral-900 hover:text-black flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
        >
          <span>View All 300 Products</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
};
