import React from 'react';
import { Check, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { notificationMessage, clearNotification, setIsCartOpen } = useCart();

  if (!notificationMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700 text-xs">
        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <Check className="w-3 h-3" />
        </div>
        <span className="font-medium">{notificationMessage}</span>
        <button
          onClick={() => {
            clearNotification();
            setIsCartOpen(true);
          }}
          className="ml-2 font-bold text-neutral-200 hover:text-white underline cursor-pointer"
        >
          View Bag
        </button>
        <button
          onClick={clearNotification}
          className="text-slate-400 hover:text-white ml-1 p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
