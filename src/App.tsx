import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SkinQuizModal } from './components/SkinQuizModal';
import { InsideOutMatrix } from './components/InsideOutMatrix';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { EthosSection } from './components/EthosSection';
import { VideoTestimonials } from './components/VideoTestimonials';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import { ShopifyExportModal } from './components/ShopifyExportModal';

import { PRODUCTS } from './data/products';
import { REVIEWS } from './data/reviews';
import { Product, CategoryType, SkinConcern, CartItem } from './types';
import { Sparkles, Star, ShieldCheck, Filter, ArrowRight, HeartPulse } from 'lucide-react';

export default function App() {
  // Navigation & Category State
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Modal States
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Marine Collagen Peptides
      quantity: 1,
      isSubscription: true,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isShopifyExportOpen, setIsShopifyExportOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger Toast Notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add To Cart Handler
  const handleAddToCart = (product: Product, isSubscription = false, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        updated[existingIndex].isSubscription = isSubscription;
        return updated;
      } else {
        return [...prev, { product, quantity, isSubscription }];
      }
    });

    showToast(`Added ${quantity}x ${product.name} to your cart.`);
  };

  // Cart Management
  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleToggleSubscription = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, isSubscription: !item.isSubscription }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Filter Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory === 'inside' && product.type !== 'inside') return false;
      if (activeCategory === 'outside' && product.type !== 'outside') return false;
      if (activeCategory === 'bundles' && product.type !== 'bundle') return false;

      // Skin Concern filter
      if (selectedConcern !== 'All' && !product.concerns.includes(selectedConcern)) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesIng = product.keyIngredients.some((ing) =>
          ing.toLowerCase().includes(q)
        );
        return matchesName || matchesTagline || matchesIng;
      }

      return true;
    });
  }, [activeCategory, selectedConcern, searchQuery]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#212925] flex flex-col font-sans selection:bg-[#7C9F8A]/30">
      
      {/* Top Header */}
      <Header
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenShopifyExport={() => setIsShopifyExportOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* Main Hero Section */}
      <Hero
        onOpenQuiz={() => setIsQuizOpen(true)}
        onShopClick={() => {
          setActiveCategory('bundles');
          window.scrollTo({ top: 750, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 space-y-16 py-12">
        
        {/* SHOP STOREFRONT SECTION */}
        <section id="shop-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section Header & Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2DBD0] pb-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C9F8A]">
                The Yahreah Catalog
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#212925]">
                {activeCategory === 'inside'
                  ? 'Inside Supplements & Marine Collagen'
                  : activeCategory === 'outside'
                  ? 'Outside Topical Serums & Creams'
                  : activeCategory === 'bundles'
                  ? 'Dual-Action Synergy Systems'
                  : 'Curated Inside-Out Collection'}
              </h2>
              <p className="text-xs text-[#5C6760] max-w-xl">
                Every formulation is meticulously crafted in the USA to address skin vitality at the cellular level and surface stratum.
              </p>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#212925] text-white shadow-md'
                    : 'bg-white text-[#212925] border border-[#E2DBD0] hover:bg-[#F5F1E8]'
                }`}
              >
                All ({PRODUCTS.length})
              </button>
              <button
                onClick={() => setActiveCategory('inside')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === 'inside'
                    ? 'bg-[#7C9F8A] text-white shadow-md'
                    : 'bg-white text-[#212925] border border-[#E2DBD0] hover:bg-[#F5F1E8]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#7C9F8A]"></span>
                Inside (Supplements)
              </button>
              <button
                onClick={() => setActiveCategory('outside')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === 'outside'
                    ? 'bg-[#3B5A59] text-white shadow-md'
                    : 'bg-white text-[#212925] border border-[#E2DBD0] hover:bg-[#F5F1E8]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#A9C3C2]"></span>
                Outside (Topicals)
              </button>
              <button
                onClick={() => setActiveCategory('bundles')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === 'bundles'
                    ? 'bg-[#B7A79D] text-white shadow-md'
                    : 'bg-white text-[#212925] border border-[#E2DBD0] hover:bg-[#F5F1E8]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#B7A79D]"></span>
                Dual Systems
              </button>
            </div>
          </div>

          {/* Skin Concern Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-[#5C6760] whitespace-nowrap flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#7C9F8A]" /> Concern:
            </span>

            {(
              [
                'All',
                'Aging & Fine Lines',
                'Dullness & Radiance',
                'Skin Barrier & Redness',
                'Dryness & Dehydration',
                'Acne & Blemishes',
              ] as (SkinConcern | 'All')[]
            ).map((concern) => (
              <button
                key={concern}
                onClick={() => setSelectedConcern(concern)}
                className={`text-xs px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  selectedConcern === concern
                    ? 'bg-[#EEF4F0] text-[#2A3B30] font-bold border border-[#7C9F8A]'
                    : 'bg-white text-[#5C6760] border border-[#E2DBD0] hover:bg-[#F5F1E8]'
                }`}
              >
                {concern}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E2DBD0] space-y-4">
              <p className="font-serif text-lg text-[#212925]">
                No products found matching your current filter.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedConcern('All');
                  setSearchQuery('');
                }}
                className="bg-[#7C9F8A] text-white text-xs font-bold px-6 py-2.5 rounded-full"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p, sub) => handleAddToCart(p, sub, 1)}
                  onOpenDetail={(p) => setSelectedProductDetail(p)}
                />
              ))}
            </div>
          )}

        </section>

        {/* QUIZ CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#2A3B30] via-[#212925] to-[#2A3B30] text-[#FAF8F3] rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#7C9F8A]/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-xl text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 bg-[#7C9F8A] text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Routine Diagnostic</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Not sure where your skin journey starts?
              </h2>

              <p className="text-sm text-[#A9C3C2] leading-relaxed">
                Take our 60-second diagnostic quiz. We analyze your skin barrier health, intracellular hydration, and stress levels to recommend your exact "As Within, So Without" system.
              </p>
            </div>

            <div className="z-10 shrink-0">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="inline-flex items-center gap-2 bg-[#7C9F8A] hover:bg-[#6a8c78] text-white text-sm font-bold px-8 py-4 rounded-full shadow-xl transition-all transform hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Find Your Personal Routine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Ambient Blob */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#7C9F8A]/20 rounded-full blur-2xl pointer-events-none" />
          </div>
        </section>

        {/* INTERACTIVE SCIENCE & ETHOS MATRIX */}
        <InsideOutMatrix />

        {/* REAL CUSTOMER VIDEO STORIES */}
        <VideoTestimonials
          onOpenQuiz={() => setIsQuizOpen(true)}
          onShopClick={() => {
            setActiveCategory('all');
            const catalogEl = document.getElementById('shop-catalog');
            if (catalogEl) {
              catalogEl.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 600, behavior: 'smooth' });
            }
          }}
        />

        {/* CUSTOMER REVIEWS & VERIFIED RESULTS */}
        <section className="py-16 bg-[#F5F1E8] border-t border-[#E2DBD0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C9F8A]">
                Real Transformations
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#212925]">
                Verified Buyer Experiences
              </h2>
              <p className="text-xs text-[#5C6760]">
                Over 1,200+ women have experienced the difference of treating skin as a holistic inside-out ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-6 rounded-3xl border border-[#E2DBD0] shadow-sm flex flex-col justify-between space-y-4 alabaster-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      ★★★★★
                      <span className="text-[#5C6760] font-normal ml-auto text-[10px]">
                        {rev.date}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-[#212925]">
                      "{rev.title}"
                    </h4>

                    <p className="text-xs text-[#5C6760] leading-relaxed line-clamp-4">
                      {rev.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2DBD0]/60 space-y-1">
                    <div className="flex items-center gap-2">
                      {rev.userAvatar && (
                        <img
                          src={rev.userAvatar}
                          alt={rev.author}
                          className="w-6 h-6 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <span className="font-serif font-bold text-xs text-[#212925]">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span className="text-[9px] bg-[#EEF4F0] text-[#7C9F8A] font-extrabold px-1.5 py-0.5 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#5C6760]">
                      Product: <strong>{rev.productUsed}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* BRAND ETHOS STORY SECTION */}
        <EthosSection />

      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODALS & DRAWERS */}
      <ProductDetailModal
        product={selectedProductDetail}
        isOpen={Boolean(selectedProductDetail)}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={(product, sub, qty) => {
          handleAddToCart(product, sub, qty);
          setSelectedProductDetail(null);
        }}
      />

      <SkinQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={(product, isSubscription) => {
          handleAddToCart(product, isSubscription || false, 1);
          setIsCartOpen(true);
        }}
        onOpenProductDetail={(product) => setSelectedProductDetail(product)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleSubscription={handleToggleSubscription}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={(discountPct) => {
          setAppliedDiscount(discountPct);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountPercent={appliedDiscount}
        onClearCart={() => setCartItems([])}
      />

      <ShopifyExportModal
        isOpen={isShopifyExportOpen}
        onClose={() => setIsShopifyExportOpen(false)}
      />

      <NotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
