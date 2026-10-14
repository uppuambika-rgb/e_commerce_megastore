import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CreditCard, DollarSign, Smartphone, Truck, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { apiCheckout } from '../services/api';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    totals,
    couponCode,
    clearCart,
    setLastCompletedOrder,
    setIsOrderSuccessOpen,
  } = useCart();

  const { user, isAuthenticated, openAuthModal } = useAuth();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Apple Pay' | 'Cash on Delivery'>('Credit Card');

  // Dummy Card Fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Autofill user details when authenticated
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      if (user.address) {
        setStreet(user.address.street || '');
        setCity(user.address.city || '');
        setState(user.address.state || 'CA');
        setPostalCode(user.address.postalCode || '');
        setPhone(user.address.phone || user.phone || '');
      } else if (user.phone) {
        setPhone(user.phone);
      }
    } else {
      // Default sample values for smooth testing
      setFullName('Alex Morgan');
      setEmail('alex@example.com');
      setStreet('742 Evergreen Terrace');
      setCity('Springfield');
      setState('OR');
      setPostalCode('97477');
      setPhone('+1 (555) 349-8201');
    }
  }, [user, isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isAuthenticated) {
      setErrorMessage('Please sign in or create an account to place an order.');
      openAuthModal('login');
      return;
    }

    if (items.length === 0) {
      setErrorMessage('Your bag is empty.');
      return;
    }

    if (!fullName.trim() || !email.trim() || !street.trim() || !city.trim() || !postalCode.trim()) {
      setErrorMessage('Please fill in all required shipping address fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          selectedColor: i.selectedColor,
          selectedSize: i.selectedSize,
        })),
        customerName: fullName,
        customerEmail: email,
        shippingAddress: {
          fullName,
          street,
          city,
          state,
          postalCode,
          country: 'United States',
          phone,
        },
        paymentMethod,
        couponCode: couponCode || undefined,
      };

      const res = await apiCheckout(orderPayload);
      await clearCart();
      setLastCompletedOrder(res.order);
      setIsCheckoutOpen(false);
      setIsOrderSuccessOpen(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Secure Order Checkout</h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handlePlaceOrder} className="overflow-y-auto p-6 space-y-6">
          {/* Guest / Auth reminder banner */}
          {!isAuthenticated && (
            <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between gap-3 text-xs">
              <span className="text-indigo-900 font-medium">
                Already have an account? Sign in for fast address retrieval and order history tracking.
              </span>
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="px-3 py-1.5 font-bold text-white bg-black hover:bg-neutral-800 rounded-lg whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Shipping & Payment Details */}
            <div className="md:col-span-7 space-y-6">
              {/* Shipping Address Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Truck className="w-4 h-4 text-neutral-900" />
                  <h3 className="text-sm font-bold text-slate-900">1. Shipping Destination</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 349-8201"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="742 Evergreen Terrace, Apt 4B"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Springfield"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="OR"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-black uppercase"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="97477"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <CreditCard className="w-4 h-4 text-neutral-900" />
                  <h3 className="text-sm font-bold text-slate-900">2. Payment Method</h3>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Credit Card', label: 'Credit Card', icon: CreditCard },
                    { id: 'Apple Pay', label: 'Apple / Pay', icon: Smartphone },
                    { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: DollarSign },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isActive = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          isActive
                            ? 'border-black bg-neutral-900 text-white font-bold ring-1 ring-black shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] font-medium leading-tight">{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Card Fields Preview if Credit Card */}
                {paymentMethod === 'Credit Card' && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">
                        Card Number (Demo Sandbox)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Cash on Delivery' && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
                    <p className="font-semibold">Cash on Delivery Notice:</p>
                    <p>
                      You will pay exactly <span className="font-bold font-mono">₹{totals.total.toFixed(2)}</span> in cash upon physical package receipt.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Items Summary & Final CTA */}
            <div className="md:col-span-5 space-y-5 bg-neutral-50 p-5 rounded-2xl border border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-900">Order Summary ({totals.itemCount} items)</h3>

              {/* Items Mini List */}
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div className="truncate pr-2">
                      <span className="font-medium text-neutral-800">{item.product?.name}</span>
                      <span className="text-neutral-500 block text-[11px]">
                        Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                      </span>
                    </div>
                    <span className="font-mono tabular-nums font-semibold text-neutral-900 shrink-0">
                      ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-neutral-900">₹{totals.subtotal.toFixed(2)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-neutral-900 font-medium">
                    <span>Coupon Discount</span>
                    <span className="font-mono tabular-nums">-₹{totals.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-mono tabular-nums text-neutral-900">
                    {totals.shippingFee === 0 ? 'FREE' : `₹${totals.shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Sales Tax (8%)</span>
                  <span className="font-mono tabular-nums text-neutral-900">₹{totals.tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-neutral-200 text-base font-extrabold text-neutral-900">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-black font-black">₹{totals.total.toFixed(2)}</span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Final Submit Button */}
              {!isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-black hover:bg-neutral-800 active:scale-98 transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-neutral-300" />
                  <span>Sign In to Complete Order (₹{totals.total.toFixed(2)})</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-black hover:bg-neutral-800 active:scale-98 transition-all shadow-lg shadow-black/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Securing Order...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Order (₹{totals.total.toFixed(2)})</span>
                    </>
                  )}
                </button>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-Day Money-Back Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
