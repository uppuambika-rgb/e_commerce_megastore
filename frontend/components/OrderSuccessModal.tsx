import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, Truck, ArrowRight, Printer, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductSvgArt } from './ProductSvgArt';

export const OrderSuccessModal: React.FC = () => {
  const {
    isOrderSuccessOpen,
    setIsOrderSuccessOpen,
    lastCompletedOrder,
    setIsOrderHistoryOpen,
  } = useCart();

  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);

  useEffect(() => {
    if (isOrderSuccessOpen) {
      // Generate celebratory colorful confetti particles
      const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
      const parts = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[i % colors.length],
        size: Math.random() * 8 + 4,
      }));
      setParticles(parts);
    }
  }, [isOrderSuccessOpen]);

  if (!isOrderSuccessOpen || !lastCompletedOrder) return null;

  const handleContinueShopping = () => {
    setIsOrderSuccessOpen(false);
  };

  const handleViewOrders = () => {
    setIsOrderSuccessOpen(false);
    setIsOrderHistoryOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300">
      {/* Confetti Ambient Burst Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-80 animate-bounce"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              animationDuration: `${1.5 + (p.id % 5) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col z-10 animate-in zoom-in-95 duration-300">
        {/* Celebration Header with Gradient Backdrop */}
        <div className="bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white p-6 sm:p-8 text-center relative overflow-hidden border-b border-neutral-700">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-700 text-white mx-auto flex items-center justify-center shadow-xl mb-4 transform hover:scale-105 transition-transform">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-neutral-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
            <span>Order Confirmed & Payment Verified</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Order Placed Successfully!
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            Thank you, {lastCompletedOrder.customerName}. We have received your order and our fulfillment center is preparing your package.
          </p>

          <div className="mt-4 inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            <span className="text-xs text-neutral-300 font-medium">Order Reference: </span>
            <span className="text-sm font-bold font-mono tracking-wider text-white">
              {lastCompletedOrder.orderNumber}
            </span>
          </div>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Status & Estimated Delivery Card */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-900 block">Estimated Delivery</span>
                <span className="text-xs text-neutral-600 font-medium">{lastCompletedOrder.estimatedDelivery}</span>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
              <span className="text-xs text-slate-500 block">Confirmation Email</span>
              <span className="text-xs font-semibold text-slate-800">{lastCompletedOrder.customerEmail}</span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Purchased Items ({lastCompletedOrder.items.length})
            </h3>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {lastCompletedOrder.items.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 bg-white">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center text-white text-[10px] font-bold">
                      <Package className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.productName}</h4>
                      <p className="text-[11px] text-slate-500">
                        Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono tabular-nums text-neutral-900 shrink-0">
                    ₹{item.itemTotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment Receipt Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-neutral-200 bg-white space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Shipping Destination
              </span>
              <p className="font-semibold text-neutral-800">{lastCompletedOrder.shippingAddress.fullName}</p>
              <p className="text-neutral-600">{lastCompletedOrder.shippingAddress.street}</p>
              <p className="text-neutral-600">
                {lastCompletedOrder.shippingAddress.city}, {lastCompletedOrder.shippingAddress.state} {lastCompletedOrder.shippingAddress.postalCode}
              </p>
              <p className="text-neutral-500 text-[11px]">{lastCompletedOrder.shippingAddress.phone}</p>
            </div>

            <div className="p-3.5 rounded-xl border border-neutral-200 bg-white space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Payment & Billing
              </span>
              <div className="flex justify-between text-neutral-600">
                <span>Method:</span>
                <span className="font-semibold text-neutral-800">{lastCompletedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Status:</span>
                <span className="font-semibold text-emerald-600">{lastCompletedOrder.paymentStatus}</span>
              </div>
              <div className="flex justify-between text-neutral-900 font-bold pt-1 border-t border-neutral-100">
                <span>Total Charged:</span>
                <span className="font-mono tabular-nums text-black font-black">₹{lastCompletedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleViewOrders}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            View in Order History
          </button>

          <button
            onClick={handleContinueShopping}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-black hover:bg-neutral-800 active:scale-95 shadow-md shadow-black/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Shopping Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
