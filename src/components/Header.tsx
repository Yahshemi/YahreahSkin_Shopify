import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Search, Menu, X, Heart, ShieldCheck, ChevronRight } from 'lucide-react';
import { CategoryType } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenShopifyExport?: () => void;
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenQuiz,
  onOpenShopifyExport,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E2DBD0]">
      {/* Announcement Bar */}
      <div className="bg-[#7C9F8A] text-[#FAF8F3] text-xs font-medium py-2 px-4 text-center flex items-center justify-center gap-2 tracking-wide">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#F5F1E8]" />
        <span>
          <strong>AS WITHIN, SO WITHOUT</strong> — Enjoy Free USA Shipping on orders over $60 & 15% off Subscriptions
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#212925] hover:text-[#7C9F8A] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#212925]">
            <button
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
              className={`hover:text-[#7C9F8A] transition-colors py-1 ${
                activeCategory === 'all' ? 'text-[#7C9F8A] font-semibold border-b-2 border-[#7C9F8A]' : ''
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => {
                onSelectCategory('inside');
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
              className={`hover:text-[#7C9F8A] transition-colors py-1 flex items-center gap-1.5 ${
                activeCategory === 'inside' ? 'text-[#7C9F8A] font-semibold border-b-2 border-[#7C9F8A]' : ''
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#7C9F8A]"></span>
              Inside (Supplements)
            </button>
            <button
              onClick={() => {
                onSelectCategory('outside');
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
              className={`hover:text-[#7C9F8A] transition-colors py-1 flex items-center gap-1.5 ${
                activeCategory === 'outside' ? 'text-[#7C9F8A] font-semibold border-b-2 border-[#7C9F8A]' : ''
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#A9C3C2]"></span>
              Outside (Topicals)
            </button>
            <button
              onClick={() => {
                onSelectCategory('bundles');
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
              className={`hover:text-[#7C9F8A] transition-colors py-1 flex items-center gap-1.5 ${
                activeCategory === 'bundles' ? 'text-[#7C9F8A] font-semibold border-b-2 border-[#7C9F8A]' : ''
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#B7A79D]"></span>
              Dual Systems
            </button>
            <a href="#ethos" className="hover:text-[#7C9F8A] transition-colors py-1">
              Our Ethos
            </a>
          </nav>

          {/* Brand Logo - Centered */}
          <div 
            className="flex flex-col items-center cursor-pointer group py-1" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo variant="full" size="md" textColor="#212925" accentColor="#7C9F8A" />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Skin Quiz CTA Button */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#F5F1E8] hover:bg-[#EEF4F0] text-[#2A3B30] text-xs font-semibold px-3.5 py-2 rounded-full border border-[#7C9F8A]/40 transition-all hover:border-[#7C9F8A] alabaster-shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7C9F8A]" />
              <span>Skin Quiz</span>
            </button>

            {/* Search Button Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full text-[#212925] hover:text-[#7C9F8A] hover:bg-[#F5F1E8] transition-colors"
              title="Search store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full bg-[#7C9F8A] text-white hover:bg-[#6a8c78] transition-all alabaster-shadow group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#B7A79D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF8F3] group-hover:scale-110 transition-transform">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {isSearchOpen && (
          <div className="pb-4 pt-1 px-2 border-t border-[#E2DBD0]/60 animate-fadeIn">
            <div className="relative max-w-xl mx-auto">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C6760]" />
              <input
                type="text"
                placeholder="Search marine collagen, squalane serum, trace minerals, ceramides..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E2DBD0] rounded-full text-sm focus:outline-none focus:border-[#7C9F8A] focus:ring-1 focus:ring-[#7C9F8A] placeholder-[#5C6760]/70"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#5C6760] hover:text-[#212925]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F3] border-b border-[#E2DBD0] px-6 py-5 space-y-4 shadow-xl">
          <div className="space-y-2">
            <button
              onClick={() => {
                onSelectCategory('all');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 font-medium text-[#212925] hover:text-[#7C9F8A]"
            >
              Shop All Products
            </button>
            <button
              onClick={() => {
                onSelectCategory('inside');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 font-medium text-[#212925] hover:text-[#7C9F8A]"
            >
              Inside (Supplements & Collagen)
            </button>
            <button
              onClick={() => {
                onSelectCategory('outside');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 font-medium text-[#212925] hover:text-[#7C9F8A]"
            >
              Outside (Serums & Creams)
            </button>
            <button
              onClick={() => {
                onSelectCategory('bundles');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 font-medium text-[#212925] hover:text-[#7C9F8A]"
            >
              Dual-Action Systems
            </button>
            <a
              href="#ethos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left py-2 font-medium text-[#212925] hover:text-[#7C9F8A]"
            >
              Our Ethos & Science
            </a>
          </div>

          <div className="pt-4 border-t border-[#E2DBD0]">
            <button
              onClick={() => {
                onOpenQuiz();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#7C9F8A] text-white py-3 rounded-xl font-semibold shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              Take Skin Routine Quiz
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
