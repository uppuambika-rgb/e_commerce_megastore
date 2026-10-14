import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Truck } from 'lucide-react';

interface HeroBannerProps {
  onExplore: (category?: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
      {/* Subtle monochrome ambient light effects */}
      <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-neutral-800/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-neutral-700/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-neutral-800/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
              <span>MegaStore Collection — 300 Curated Essentials</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Curated Essentials in High Precision & Form
            </h1>

            <p className="text-neutral-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Explore 300 verified items across electronics, modern apparel, home architecture,
              studio acoustics, and premium pantry goods.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onExplore()}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm shadow-lg shadow-white/10 hover:shadow-white/20 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onExplore('Electronics')}
                className="px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold text-sm border border-neutral-700 transition-colors cursor-pointer"
              >
                Explore Electronics
              </button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800 text-neutral-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-300 shrink-0" />
                <span className="text-xs font-medium">Free Delivery ₹499+</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-300 shrink-0" />
                <span className="text-xs font-medium">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-neutral-300 shrink-0" />
                <span className="text-xs font-medium">Instant Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Visual Spotlight Banner */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-6 bg-neutral-950 border border-neutral-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="text-neutral-300 font-bold uppercase tracking-wider">Department Quick Jump</span>
                <span className="text-neutral-500">8 Departments</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Electronics', count: '40 Items', tag: 'bg-neutral-700' },
                  { name: 'Fashion & Apparel', count: '45 Items', tag: 'bg-neutral-600' },
                  { name: 'Home & Living', count: '45 Items', tag: 'bg-neutral-500' },
                  { name: 'Beauty & Wellness', count: '35 Items', tag: 'bg-neutral-400' },
                ].map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => onExplore(cat.name)}
                    className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800/90 border border-neutral-800 text-left transition-all group cursor-pointer hover:border-neutral-600"
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${cat.tag} mb-2`} />
                    <div className="font-semibold text-xs text-white group-hover:text-neutral-300 transition-colors">
                      {cat.name}
                    </div>
                    <div className="text-[11px] text-neutral-500">{cat.count}</div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-300 font-medium">Use code </span>
                    <span className="font-mono font-bold text-white bg-black border border-neutral-700 px-1.5 py-0.5 rounded">
                      MEGASAVE10
                    </span>
                  </div>
                  <span className="text-neutral-300 font-semibold">10% Off Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
