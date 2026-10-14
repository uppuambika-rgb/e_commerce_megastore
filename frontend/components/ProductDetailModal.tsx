import React, { useState, useEffect } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check, ShoppingBag, Send, Lock } from 'lucide-react';
import { Product, Review } from '../types';
import { ProductImage } from './ProductImage';
import { fetchProductById, submitProductReview } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product: initialProduct,
  onClose,
  onSelectProduct,
}) => {
  if (!initialProduct) return null;

  const { addToCart, setIsCartOpen, setIsCheckoutOpen } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [product, setProduct] = useState<Product>(initialProduct);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>(
    initialProduct.colors?.[0] || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    initialProduct.sizes?.[0] || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Review Form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);

  useEffect(() => {
    async function loadFullDetails() {
      if (!initialProduct) return;
      try {
        const data = await fetchProductById(initialProduct.id);
        setProduct(data.product);
        setReviews(data.reviews);
        setRelated(data.related);
        if (data.product.colors?.length) setSelectedColor(data.product.colors[0]);
        if (data.product.sizes?.length) setSelectedSize(data.product.sizes[0]);
        setQuantity(1);
      } catch (err) {
        console.error('Failed to load product details:', err);
      }
    }
    loadFullDetails();
  }, [initialProduct?.id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    setIsAdding(true);
    const success = await addToCart(product.id, quantity, selectedColor || undefined, selectedSize || undefined);
    setIsAdding(false);
    if (success) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    await addToCart(product.id, quantity, selectedColor || undefined, selectedSize || undefined);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    setIsSubmittingReview(true);
    try {
      const res = await submitProductReview(product.id, reviewAuthor, reviewRating, reviewComment);
      setReviews([res.review, ...reviews]);
      setReviewAuthor('');
      setReviewComment('');
      setReviewStatus('Review submitted successfully!');
      setTimeout(() => setReviewStatus(null), 3000);
    } catch (err: any) {
      setReviewStatus(err.message || 'Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Catalog</span>
            <span aria-hidden="true">/</span>
            <span>{product.category}</span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-800 font-medium truncate max-w-[200px]">{product.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Product Artwork Stage (Real Object Photograph) */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
                <ProductImage
                  imageUrl={product.imageUrl}
                  name={product.name}
                  category={product.category}
                  subcategory={product.subcategory}
                  visualGradient={product.visualGradient}
                  iconType={product.iconType}
                  className="w-full h-full"
                />

                {product.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-slate-900/90 text-white rounded-md backdrop-blur-xs">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Value Propositions Strip */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                  <Truck className="w-4 h-4 mx-auto text-neutral-800 mb-1" />
                  <span className="text-[11px] font-medium text-neutral-700 block">Fast Dispatch</span>
                  <span className="text-[10px] text-neutral-400">Within 24h</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                  <RotateCcw className="w-4 h-4 mx-auto text-neutral-800 mb-1" />
                  <span className="text-[11px] font-medium text-neutral-700 block">30-Day Returns</span>
                  <span className="text-[10px] text-neutral-400">Hassle-free</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                  <ShieldCheck className="w-4 h-4 mx-auto text-neutral-800 mb-1" />
                  <span className="text-[11px] font-medium text-neutral-700 block">2-Year Warranty</span>
                  <span className="text-[10px] text-neutral-400">Standard</span>
                </div>
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-neutral-900">
                  {product.brand} · {product.subcategory}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1 leading-snug">
                  {product.name}
                </h1>

                {/* Rating & In-stock badge */}
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-medium">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-neutral-900 font-mono tabular-nums">{product.rating}</span>
                    <span className="text-neutral-500">({product.reviewsCount} customer reviews)</span>
                  </div>
                  <span aria-hidden="true" className="text-neutral-300">·</span>
                  <span className={`font-semibold ${product.inStock ? 'text-neutral-900' : 'text-rose-600'}`}>
                    {product.inStock ? `In Stock (${product.stockCount} left)` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 py-3 border-y border-neutral-200">
                <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.discountPercent > 0 && (
                  <>
                    <span className="text-sm text-neutral-400 line-through font-mono tabular-nums">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-white bg-black px-2 py-0.5 rounded">
                      Save {product.discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Color Swatches (if available) */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-700 block">
                    Color: <span className="text-neutral-500 font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                          selectedColor === c
                            ? 'border-black bg-neutral-900 text-white shadow-xs'
                            : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 bg-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector (if available) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Size: <span className="text-slate-500 font-normal">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-10 h-9 text-xs font-bold rounded-lg border transition-all ${
                          selectedSize === s
                            ? 'border-black bg-black text-white shadow-xs'
                            : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 bg-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Buy Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden shadow-xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="p-2 text-neutral-500 hover:bg-neutral-100 disabled:opacity-40 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm font-mono tabular-nums text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                      disabled={quantity >= product.stockCount}
                      className="p-2 text-neutral-500 hover:bg-neutral-100 disabled:opacity-40 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs text-neutral-500 font-mono">
                    Total: ₹{(product.price * quantity).toFixed(2)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding || !product.inStock}
                    className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                      addedSuccess
                        ? 'bg-emerald-600 text-white'
                        : !isAuthenticated
                        ? 'bg-neutral-900 text-white hover:bg-black'
                        : 'bg-white border-2 border-black text-black hover:bg-neutral-100'
                    } active:scale-95 disabled:opacity-50 cursor-pointer`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : !isAuthenticated ? (
                      <>
                        <Lock className="w-4 h-4 text-neutral-300" />
                        <span>Sign In to Add</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="py-3 px-4 rounded-xl font-bold text-xs text-white bg-black hover:bg-neutral-800 active:scale-95 transition-all shadow-md shadow-black/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {!isAuthenticated ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Sign In to Buy Now</span>
                      </>
                    ) : (
                      <span>Buy Now</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Technical Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-neutral-200 pt-8">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-neutral-900">Product Overview</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{product.fullDescription}</p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Key Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((t) => (
                    <span key={t} className="text-xs text-neutral-700 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-md font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 space-y-4">
              <h3 className="text-base font-bold text-neutral-900">Technical Specifications</h3>
              <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-200 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between p-2.5 bg-white even:bg-neutral-50">
                    <span className="font-medium text-neutral-500">{key}</span>
                    <span className="font-semibold text-neutral-900 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="border-t border-neutral-200 pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Verified Customer Reviews</h3>
                <p className="text-xs text-neutral-500">
                  Based on authentic purchases of the {product.name}
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-neutral-900 text-sm font-mono">{product.rating}</span>
                <span className="text-xs text-neutral-500">/ 5.0</span>
              </div>
            </div>

            {/* Write Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Leave a Review</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Jordan Hayes"
                    className="w-full text-xs p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full text-xs p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars - Great)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars - Average)</option>
                    <option value={2}>⭐⭐ (2 Stars - Below expectations)</option>
                    <option value={1}>⭐ (1 Star - Disappointed)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">Feedback Comment</label>
                <textarea
                  required
                  rows={2}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience regarding material quality, fit, or daily performance..."
                  className="w-full text-xs p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              {reviewStatus && (
                <div className="text-xs font-semibold text-neutral-900">{reviewStatus}</div>
              )}

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="px-4 py-2 text-xs font-bold text-white bg-black hover:bg-neutral-800 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Review</span>
              </button>
            </form>

            {/* Reviews List */}
            <div className="space-y-3">
              {reviews.length === 0 ? (
                <p className="text-xs text-slate-500 py-3 italic">Be the first to leave a review for this item!</p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl border border-slate-100 bg-white space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{rev.authorName}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-slate-400 text-[11px]">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {related.length > 0 && (
            <div className="border-t border-slate-100 pt-8 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Related Products in {product.category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setProduct(rel);
                    }}
                    className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:border-black hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="aspect-4/3 rounded-lg overflow-hidden bg-neutral-100 mb-2">
                      <ProductImage
                        imageUrl={rel.imageUrl}
                        name={rel.name}
                        category={rel.category}
                        subcategory={rel.subcategory}
                        visualGradient={rel.visualGradient}
                        iconType={rel.iconType}
                        className="w-full h-full"
                        imgClassName="group-hover:scale-105"
                      />
                    </div>
                    <div className="text-xs font-semibold text-neutral-800 truncate group-hover:text-black">
                      {rel.name}
                    </div>
                    <div className="text-xs font-bold text-neutral-900 mt-1 font-mono tabular-nums">
                      ₹{rel.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
