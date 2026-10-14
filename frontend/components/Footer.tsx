import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

interface FooterProps {
  onCategorySelect: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onCategorySelect }) => {
  return (
    <footer className="bg-black text-neutral-300 border-t border-neutral-800 mt-16">
      {/* Trust Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-neutral-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Carbon-Neutral Shipping</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Complimentary express shipping on all purchases over ₹499.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day Hassle-Free Returns</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Simple prepaid return label included in every parcel.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">256-Bit Bank Security</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Payment credentials processed via TLS 1.3 encrypted protocol.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Direct concierge assistance for order status and styling.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-black text-sm">
                M
              </span>
              <span className="text-base font-bold text-white">MegaStore</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curated marketplace offering 300 distinctive items built with master craftsmanship, ethical materials, and enduring design.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Top Departments</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              {['Electronics', 'Fashion & Apparel', 'Home & Living', 'Beauty & Wellness'].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => onCategorySelect(c)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Specialty Curations</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              {['Sports & Outdoors', 'Audio & Music', 'Books & Workspace', 'Gourmet & Pantry'].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => onCategorySelect(c)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Coupon Codes</h5>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="font-mono font-bold text-white block">MEGASAVE10</span>
                <span className="text-[11px] text-neutral-400">Save 10% on your full bag</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="font-mono font-bold text-neutral-200 block">WELCOME20</span>
                <span className="text-[11px] text-neutral-400">20% welcome discount for new customers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 MegaStore Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
