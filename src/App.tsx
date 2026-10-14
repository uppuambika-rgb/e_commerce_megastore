/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from '../frontend/context/AuthContext';
import { CartProvider } from '../frontend/context/CartContext';
import { Navbar } from '../frontend/components/Navbar';
import { HeroBanner } from '../frontend/components/HeroBanner';
import { FeaturedSection } from '../frontend/components/FeaturedSection';
import { ProductList } from '../frontend/components/ProductList';
import { ProductDetailModal } from '../frontend/components/ProductDetailModal';
import { CartDrawer } from '../frontend/components/CartDrawer';
import { CheckoutModal } from '../frontend/components/CheckoutModal';
import { OrderSuccessModal } from '../frontend/components/OrderSuccessModal';
import { OrderHistoryModal } from '../frontend/components/OrderHistoryModal';
import { AuthModal } from '../frontend/components/AuthModal';
import { Toast } from '../frontend/components/Toast';
import { Footer } from '../frontend/components/Footer';
import { Product } from '../frontend/types';
import { X, Sparkles } from 'lucide-react';

function StoreApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showPromoBanner, setShowPromoBanner] = useState<boolean>(true);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'products' || sectionId === 'categories') {
      const el = document.getElementById('catalog-top');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'featured') {
      const el = document.getElementById('featured-deals');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (cat?: string) => {
    setSelectedCategory(cat || 'All');
    const el = document.getElementById('catalog-top');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Slim Dismissible Top Promotional Banner (<= 40px) */}
      {showPromoBanner && (
        <div className="bg-black text-neutral-200 text-[11px] sm:text-xs py-2 px-4 flex items-center justify-between text-center relative z-50 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>
              MegaStore Exclusive: Enjoy Free Express Delivery on orders over ₹499 + 10% off with coupon code{' '}
              <strong className="underline underline-offset-2 font-mono text-white">MEGASAVE10</strong>
            </span>
          </div>
          <button
            onClick={() => setShowPromoBanner(false)}
            className="text-neutral-400 hover:text-white p-0.5 ml-2 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Primary Top Bar Contract Navigation */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner onExplore={handleCategorySelect} />

        {/* Featured Deals Spotlight */}
        <FeaturedSection
          onSelectProduct={(p) => setSelectedProduct(p)}
          onExploreCatalog={() => handleCategorySelect('All')}
        />

        {/* 300 Products Catalog */}
        <ProductList
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      </main>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderHistoryModal />
      <AuthModal />
      <Toast />

      {/* Footer */}
      <Footer onCategorySelect={handleCategorySelect} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <StoreApp />
      </CartProvider>
    </AuthProvider>
  );
}
