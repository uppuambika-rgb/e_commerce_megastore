import React from 'react';
import { ShoppingBag, User as UserIcon, LogOut, PackageCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const { totals, setIsCartOpen, setIsOrderHistoryOpen } = useCart();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element, no subtitle) */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-xl font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 hover:text-neutral-600 transition-colors flex items-center gap-2 text-left"
        >
          <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-lg shadow-sm">
            M
          </span>
          <span className="tracking-tight">MegaStore</span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <button
            onClick={() => onNavigate('products')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 py-1 ${
              activeSection === 'products' ? 'text-black border-b-2 border-black font-bold' : ''
            }`}
          >
            All Products (300)
          </button>
          <button
            onClick={() => onNavigate('categories')}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 py-1"
          >
            Categories
          </button>
          <button
            onClick={() => onNavigate('featured')}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 py-1"
          >
            Featured Deals
          </button>
          {isAuthenticated && (
            <button
              onClick={() => setIsOrderHistoryOpen(true)}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 py-1 flex items-center gap-1.5"
            >
              <PackageCheck className="w-4 h-4 text-neutral-700" />
              <span>My Orders</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action cluster (Auth state + Cart trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOrderHistoryOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap border border-neutral-200"
                title="View past orders"
              >
                <UserIcon className="w-3.5 h-3.5 text-black" />
                <span className="truncate max-w-[120px]">{user?.fullName.split(' ')[0]}</span>
              </button>
              <button
                onClick={logout}
                className="p-2 text-neutral-500 hover:text-rose-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-3.5 py-2 text-xs font-bold text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors whitespace-nowrap border border-transparent hover:border-neutral-200 cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Primary Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-black hover:bg-neutral-800 active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
            aria-label={`Shopping Cart with ${totals.itemCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-neutral-800 text-neutral-200 text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
              {totals.itemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
