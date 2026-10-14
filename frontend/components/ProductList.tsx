import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Product, CategorySummary } from '../types';
import { ProductCard } from './ProductCard';
import { fetchProducts } from '../services/api';

interface ProductListProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  selectedCategory,
  onCategoryChange,
  onSelectProduct,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [totalCount, setTotalCount] = useState<number>(300);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(13);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const pageSize = 24;

  const loadData = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const res = await fetchProducts({
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        search: searchQuery.trim() || undefined,
        sortBy: sortBy === 'default' ? undefined : sortBy,
        inStock: inStockOnly || undefined,
        page,
        limit: pageSize,
      });

      setProducts(res.products);
      setTotalCount(res.total);
      setCurrentPage(res.page);
      setTotalPages(res.totalPages);
      if (res.allCategories?.length) {
        setCategories(res.allCategories);
      }
    } catch (err) {
      console.error('Failed to load products list:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    loadData(1);
  }, [selectedCategory, sortBy, inStockOnly]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      loadData(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    loadData(newPage);
    // Smooth scroll back to top of product list
    const el = document.getElementById('catalog-top');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('default');
    setInStockOnly(false);
    onCategoryChange('All');
  };

  return (
    <section id="catalog-top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header bar: Title + Total Counter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {selectedCategory === 'All' ? 'Store Catalog' : selectedCategory}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Displaying <span className="font-semibold text-slate-800 font-mono tabular-nums">{totalCount}</span> crafted products
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ' across 8 curated departments'}.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[240px] flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 300 products..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold py-2 px-3 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-black shadow-xs text-neutral-800 cursor-pointer"
          >
            <option value="default">Sort: Default Catalog</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Customer Rating</option>
            <option value="popular">Most Reviewed</option>
            <option value="discount">Biggest Discount</option>
          </select>

          {/* In-stock toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-neutral-700 cursor-pointer select-none py-2 px-3 bg-white border border-neutral-300 rounded-lg shadow-xs hover:bg-neutral-50">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded text-black focus:ring-black h-3.5 w-3.5"
            />
            <span>In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Interactive Category Filter Bar (Segmented Controls) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-neutral-200">
        <button
          onClick={() => onCategoryChange('All')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200'
          }`}
        >
          All (300)
        </button>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onCategoryChange(cat.name)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-black text-white shadow-xs'
                  : 'text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                  isActive ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Product Grid State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[400px]">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse h-80 flex flex-col">
              <div className="aspect-4/3 bg-slate-200" />
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                </div>
                <div className="h-4 bg-slate-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200">
          <p className="text-base font-semibold text-slate-800">No products match your active filters</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, price parameters, or category selection to view catalog items.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 text-xs font-bold text-white bg-black hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 pt-6">
              <div className="text-xs text-neutral-500">
                Showing{' '}
                <span className="font-semibold text-neutral-900 font-mono tabular-nums">
                  {(currentPage - 1) * pageSize + 1}
                </span>{' '}
                to{' '}
                <span className="font-semibold text-neutral-900 font-mono tabular-nums">
                  {Math.min(currentPage * pageSize, totalCount)}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-neutral-900 font-mono tabular-nums">{totalCount}</span> products
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="p-2 rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 7) {
                    if (currentPage > 4 && currentPage < totalPages - 2) {
                      pageNum = currentPage - 3 + i;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 6 + i;
                    }
                  }

                  const isCurrent = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 text-xs font-bold rounded-lg transition-colors tabular-nums cursor-pointer ${
                        isCurrent
                          ? 'bg-black text-white shadow-xs'
                          : 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
