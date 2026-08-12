import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, isSubscription: boolean) => void;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenDetail,
}) => {
  const [isSubscription, setIsSubscription] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, isSubscription);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const currentPrice = isSubscription ? product.subscriptionPrice : product.price;

  // Badge background color helper
  const getBadgeClass = (type: Product['type']) => {
    switch (type) {
      case 'inside':
        return 'bg-[#7C9F8A] text-white';
      case 'outside':
        return 'bg-[#A9C3C2] text-[#212925] font-semibold';
      case 'bundle':
        return 'bg-[#B7A79D] text-white';
      default:
        return 'bg-[#212925] text-white';
    }
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group bg-white rounded-3xl border border-[#E2DBD0] overflow-hidden hover:border-[#7C9F8A] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer alabaster-shadow"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square bg-[#F5F1E8] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Type Badge Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${getBadgeClass(
              product.type
            )}`}
          >
            {product.type === 'inside'
              ? 'Inside'
              : product.type === 'outside'
              ? 'Outside'
              : 'Dual System'}
          </span>
          {product.badge && (
            <span className="bg-[#FAF8F3]/90 backdrop-blur-md text-[#212925] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#E2DBD0]">
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick View Button Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(product);
          }}
          className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#212925] hover:bg-[#7C9F8A] hover:text-white transition-colors shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          title="Quick View Formula"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <div className="flex text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-bold text-[#212925]">{product.rating}</span>
            <span className="text-[#5C6760]">({product.reviewCount})</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif font-bold text-lg text-[#212925] group-hover:text-[#7C9F8A] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#5C6760] line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Key Ingredient Tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {product.keyIngredients.slice(0, 2).map((ing, i) => (
              <span
                key={i}
                className="text-[10px] bg-[#F5F1E8] text-[#2A3B30] font-medium px-2 py-0.5 rounded-md border border-[#E2DBD0]/60"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Purchase Options & Price */}
        <div className="pt-3 border-t border-[#E2DBD0]/60 space-y-3">
          
          {/* Subscribe Toggle */}
          <div className="flex items-center justify-between text-xs bg-[#FAF8F3] p-1.5 rounded-xl border border-[#E2DBD0]/80">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSubscription(false);
              }}
              className={`flex-1 py-1 rounded-lg font-medium transition-all text-center ${
                !isSubscription
                  ? 'bg-white font-bold text-[#212925] shadow-xs'
                  : 'text-[#5C6760] hover:text-[#212925]'
              }`}
            >
              One-time
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSubscription(true);
              }}
              className={`flex-1 py-1 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1 ${
                isSubscription
                  ? 'bg-[#7C9F8A] text-white font-bold shadow-xs'
                  : 'text-[#7C9F8A] hover:bg-white/50'
              }`}
            >
              <span>Auto-deliver</span>
              <span className="text-[9px] bg-white text-[#7C9F8A] font-extrabold px-1 rounded-sm">
                -15%
              </span>
            </button>
          </div>

          {/* Price & Add Button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif font-bold text-xl text-[#212925]">
                  ${currentPrice.toFixed(2)}
                </span>
                {isSubscription && (
                  <span className="text-xs text-[#5C6760] line-through">
                    ${product.price}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#5C6760] font-medium">
                {product.volumeOrCount}
              </p>
            </div>

            <button
              onClick={handleAdd}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-300 shadow-md ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#7C9F8A] hover:bg-[#6a8c78] text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
