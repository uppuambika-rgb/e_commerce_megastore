import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, ShoppingBag, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ProductImage } from './ProductImage';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    totals,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    couponCode,
    couponMessage,
    setIsCheckoutOpen,
  } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    setCouponError(null);
    setIsApplyingCoupon(true);
    try {
      await applyCoupon(inputCoupon);
      setInputCoupon('');
    } catch (err: any) {
      setCouponError(err.message || 'Invalid coupon code');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleProceedCheckout = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totals.subtotal);
  const freeShippingProgress = Math.min(100, (totals.subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="text-base font-bold text-neutral-900">Your Shopping Bag</h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-black border border-neutral-200 font-mono tabular-nums">
              {totals.itemCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-neutral-400 hover:text-rose-600 transition-colors p-1"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        {items.length > 0 && (
          <div className="bg-neutral-50 px-5 py-3 border-b border-neutral-200 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-neutral-600">
                Add <span className="font-bold text-neutral-900 font-mono tabular-nums">₹{remainingForFreeShipping.toFixed(2)}</span> more to unlock <span className="font-bold text-black">Free Express Delivery</span>!
              </p>
            ) : (
              <p className="text-neutral-900 font-bold flex items-center gap-1.5">
                <span>🎉</span> You unlocked Free Express Delivery!
              </p>
            )}
            <div className="w-full h-1.5 bg-neutral-200 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Your bag is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our catalog of 300 curated electronics, apparel, and lifestyle items.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-3 px-5 py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => {
              const product = item.product;
              if (!product) return null;

              return (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-2xs"
                >
                  {/* Item Artwork Thumbnail (Real Object Photograph) */}
                  <div className="w-18 h-18 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    <ProductImage
                      imageUrl={product.imageUrl}
                      name={product.name}
                      category={product.category}
                      subcategory={product.subcategory}
                      visualGradient={product.visualGradient}
                      iconType={product.iconType}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors shrink-0 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 mt-0.5 space-x-1.5">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedSize && <span>· Size: {item.selectedSize}</span>}
                      </div>
                    </div>

                    {/* Stepper + Line Total */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center border border-slate-200 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-slate-500 hover:bg-slate-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono tabular-nums text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:bg-slate-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono tabular-nums text-neutral-900">
                        ₹{(product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer: Coupon Code & Order Totals */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon code (e.g. MEGASAVE10)"
                    className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black font-mono uppercase"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isApplyingCoupon}
                  className="px-3.5 py-2 text-xs font-bold bg-black hover:bg-neutral-800 text-white rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {couponMessage && (
                <p className="text-[11px] text-neutral-800 font-bold">{couponMessage}</p>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-neutral-900 font-semibold">₹{totals.subtotal.toFixed(2)}</span>
              </div>

              {totals.discount > 0 && (
                <div className="flex justify-between text-neutral-900 font-semibold">
                  <span>Discount ({couponCode})</span>
                  <span className="font-mono tabular-nums">-₹{totals.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono tabular-nums text-neutral-900">
                  {totals.shippingFee === 0 ? (
                    <span className="text-black font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    `₹${totals.shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-mono tabular-nums text-neutral-900">₹{totals.tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-extrabold text-neutral-900">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums text-black font-black">₹{totals.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Action */}
            <button
              onClick={handleProceedCheckout}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-black hover:bg-neutral-800 active:scale-98 shadow-md shadow-black/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {!isAuthenticated ? (
                <>
                  <Lock className="w-4 h-4 text-neutral-300" />
                  <span>Sign In to Checkout</span>
                </>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted 256-Bit SSL Checkout Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
