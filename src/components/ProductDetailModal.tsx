import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, HeartPulse, RefreshCw, Sparkles, Layers } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, isSubscription: boolean, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [isSubscription, setIsSubscription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage'>('benefits');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const currentUnitPrice = isSubscription ? product.subscriptionPrice : product.price;
  const totalPrice = currentUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, isSubscription, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#212925]/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FAF8F3] rounded-3xl shadow-2xl border border-[#E2DBD0] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-2.5 bg-white/80 hover:bg-white text-[#212925] rounded-full shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Image Gallery */}
            <div className="md:col-span-6 space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden bg-[#F5F1E8] border border-[#E2DBD0] shadow-md relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Type Tag Overlay */}
                <div className="absolute top-4 left-4 bg-[#7C9F8A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {product.categoryName}
                </div>
              </div>

              {product.secondaryImage && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-[#F5F1E8] border border-[#E2DBD0]">
                    <img
                      src={product.secondaryImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Product Details */}
            <div className="md:col-span-6 space-y-6">
              
              {/* Category & Title */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7C9F8A]">
                    {product.type === 'inside'
                      ? 'As Within (Cellular Supplement)'
                      : product.type === 'outside'
                      ? 'So Without (Topical Formula)'
                      : 'Dual Action System'}
                  </span>
                  <div className="flex items-center text-xs text-amber-500 font-bold ml-auto">
                    ★ {product.rating} <span className="text-[#5C6760] font-normal ml-1">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#212925]">
                  {product.name}
                </h1>

                <p className="text-sm font-medium text-[#7C9F8A]">
                  {product.tagline}
                </p>
              </div>

              {/* Price & Size */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-[#E2DBD0]">
                <span className="font-serif text-3xl font-bold text-[#212925]">
                  ${currentUnitPrice.toFixed(2)}
                </span>
                {isSubscription && (
                  <span className="text-sm text-[#5C6760] line-through">
                    ${product.price}
                  </span>
                )}
                <span className="text-xs text-[#5C6760] bg-[#F5F1E8] px-2.5 py-1 rounded-md border border-[#E2DBD0]/60 ml-auto">
                  {product.volumeOrCount}
                </span>
              </div>

              {/* As Within, So Without Synergy Box */}
              <div className="bg-[#EEF4F0] p-4 rounded-2xl border border-[#7C9F8A]/30 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2A3B30] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C9F8A]" />
                  <span>The Holistic Mechanism</span>
                </div>
                <p className="text-xs text-[#2A3B30] leading-relaxed">
                  {product.type === 'inside'
                    ? product.insideBenefit
                    : product.type === 'outside'
                    ? product.outsideBenefit
                    : 'Presents both internal amino acid rebuilders and topical moisture sealers for total systemic skin health.'}
                </p>
              </div>

              {/* Purchase Options Selector */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-bold text-[#212925] uppercase tracking-wider">
                  Purchase Preference
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubscription(false)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      !isSubscription
                        ? 'border-[#7C9F8A] bg-white ring-2 ring-[#7C9F8A]/20'
                        : 'border-[#E2DBD0] bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#212925]">One-Time Order</span>
                      <span className="text-xs font-serif font-bold">${product.price}</span>
                    </div>
                    <p className="text-[10px] text-[#5C6760] mt-1">Single shipment delivered once</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSubscription(true)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSubscription
                        ? 'border-[#7C9F8A] bg-[#EEF4F0] ring-2 ring-[#7C9F8A]/30'
                        : 'border-[#E2DBD0] bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#7C9F8A] flex items-center gap-1">
                        <span>Subscribe & Save</span>
                        <span className="bg-[#7C9F8A] text-white text-[9px] px-1 rounded">15%</span>
                      </span>
                      <span className="text-xs font-serif font-bold">${product.subscriptionPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-[#5C6760] mt-1">Delivered every 30 days • Cancel anytime</p>
                  </button>
                </div>
              </div>

              {/* Quantity Counter & Add to Cart */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border border-[#E2DBD0] rounded-full bg-white p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[#212925] hover:bg-[#F5F1E8]"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-[#212925]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[#212925] hover:bg-[#F5F1E8]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold py-3.5 px-6 rounded-full shadow-lg transition-all ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#7C9F8A] hover:bg-[#6a8c78] text-white'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (${totalPrice.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Information Tabs */}
              <div className="pt-4 space-y-3">
                <div className="flex border-b border-[#E2DBD0] text-xs font-bold">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`py-2 px-4 transition-colors ${
                      activeTab === 'benefits'
                        ? 'border-b-2 border-[#7C9F8A] text-[#7C9F8A]'
                        : 'text-[#5C6760] hover:text-[#212925]'
                    }`}
                  >
                    Key Benefits
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`py-2 px-4 transition-colors ${
                      activeTab === 'ingredients'
                        ? 'border-b-2 border-[#7C9F8A] text-[#7C9F8A]'
                        : 'text-[#5C6760] hover:text-[#212925]'
                    }`}
                  >
                    Ingredients
                  </button>
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`py-2 px-4 transition-colors ${
                      activeTab === 'usage'
                        ? 'border-b-2 border-[#7C9F8A] text-[#7C9F8A]'
                        : 'text-[#5C6760] hover:text-[#212925]'
                    }`}
                  >
                    How to Use
                  </button>
                </div>

                <div className="text-xs text-[#5C6760] leading-relaxed pt-2 min-h-[80px]">
                  {activeTab === 'benefits' && (
                    <div className="space-y-2">
                      <p>{product.description}</p>
                      <ul className="list-disc list-inside space-y-1 font-medium text-[#212925]">
                        {product.keyIngredients.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'ingredients' && (
                    <p className="bg-white p-3 rounded-xl border border-[#E2DBD0] text-[11px] font-mono leading-relaxed">
                      {product.fullIngredients}
                    </p>
                  )}

                  {activeTab === 'usage' && (
                    <div className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E2DBD0] space-y-1">
                      <p className="font-bold text-[#212925]">Application Ritual:</p>
                      <p>{product.howToUse}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Guarantees row */}
              <div className="pt-2 border-t border-[#E2DBD0]/60 grid grid-cols-3 gap-2 text-center text-[10px] text-[#5C6760]">
                <div>✓ 30-Day Money Back Guarantee</div>
                <div>✓ Made in CGMP USA Facility</div>
                <div>✓ Free Shipping over $60</div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
