import React, { useState, useEffect } from 'react';
import { X, PackageCheck, Truck, Calendar, DollarSign, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { apiFetchOrders } from '../services/api';
import { Order } from '../types';

export const OrderHistoryModal: React.FC = () => {
  const { isOrderHistoryOpen, setIsOrderHistoryOpen, lastCompletedOrder } = useCart();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!isOrderHistoryOpen) return;
      setIsLoading(true);
      try {
        const fetched = await apiFetchOrders();
        // If lastCompletedOrder is present and not yet in list, prepend it
        if (lastCompletedOrder && !fetched.some((o) => o.id === lastCompletedOrder.id)) {
          setOrders([lastCompletedOrder, ...fetched]);
        } else {
          setOrders(fetched);
        }
      } catch (err) {
        console.error('Failed to load orders:', err);
        if (lastCompletedOrder) {
          setOrders([lastCompletedOrder]);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadOrders();
  }, [isOrderHistoryOpen, lastCompletedOrder]);

  if (!isOrderHistoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-black" />
            <h2 className="text-base font-bold text-slate-900">Your Order History</h2>
          </div>
          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading past transactions...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <PackageCheck className="w-12 h-12 mx-auto text-slate-300" />
              <h3 className="text-sm font-bold text-slate-800">No orders placed yet</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Once you place an order, receipt details and live fulfillment progress will appear here.
              </p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 font-mono">{ord.orderNumber}</span>
                    <span className="text-slate-400 block text-[11px]">
                      {new Date(ord.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {ord.status}
                    </span>
                    <span className="font-mono font-bold text-sm text-neutral-900">
                      ₹{ord.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2 text-xs">
                  {ord.items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-neutral-700">
                      <span className="truncate pr-2">
                        {it.quantity}x {it.productName} {it.selectedColor ? `(${it.selectedColor})` : ''}
                      </span>
                      <span className="font-mono tabular-nums text-neutral-900 shrink-0">
                        ₹{it.itemTotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery & Destination info */}
                <div className="p-3 rounded-xl bg-slate-50 text-xs flex flex-col sm:flex-row justify-between gap-2 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                    <span>{ord.estimatedDelivery}</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    To: {ord.shippingAddress.city}, {ord.shippingAddress.state}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
