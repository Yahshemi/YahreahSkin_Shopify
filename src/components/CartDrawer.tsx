import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onToggleSubscription: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedDiscountPercent: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onToggleSubscription,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  // Calculations
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.isSubscription
      ? item.product.subscriptionPrice
      : item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const freeShippingThreshold = 60;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = isFreeShipping || items.length === 0 ? 0 : 5.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WITHIN15') {
      setDiscountPercent(15);
      setPromoMessage({ text: '15% "As Within" Promo Applied!', isError: false });
    } else if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoMessage({ text: '10% Welcome Discount Applied!', isError: false });
    } else {
      setPromoMessage({ text: 'Invalid Code. Try "WITHIN15"', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#212925]/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F3] border-l border-[#E2DBD0] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-[#F5F1E8] border-b border-[#E2DBD0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#7C9F8A]" />
              <h2 className="font-serif font-bold text-lg text-[#212925]">
                Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#5C6760] hover:text-[#212925] rounded-full hover:bg-[#E2DBD0]/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#EEF4F0] px-6 py-3 border-b border-[#7C9F8A]/30 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#2A3B30]">
              {isFreeShipping ? (
                <span className="flex items-center gap-1 text-[#7C9F8A]">
                  <Sparkles className="w-3.5 h-3.5" /> You unlocked Free USA Shipping!
                </span>
              ) : (
                <span>
                  Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> for Free Shipping
                </span>
              )}
              <span>${freeShippingThreshold} Target</span>
            </div>
            <div className="w-full bg-[#E2DBD0] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#7C9F8A] h-2 transition-all duration-300 rounded-full"
                style={{
                  width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5F1E8] text-[#B7A79D] mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#212925]">
                  Your Cart is Empty
                </h3>
                <p className="text-xs text-[#5C6760] max-w-xs mx-auto">
                  Explore our "As Within, So Without" marine collagen, trace minerals, and ceramide serums.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#7C9F8A] text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-md hover:bg-[#6a8c78] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = item.isSubscription
                  ? item.product.subscriptionPrice
                  : item.product.price;
                return (
                  <div
                    key={item.product.id}
                    className="bg-white p-4 rounded-2xl border border-[#E2DBD0] flex gap-4 shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl bg-[#F5F1E8] shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 space-y-2 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#212925] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-[#7C9F8A] font-semibold uppercase">
                            {item.product.categoryName}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#5C6760] hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subscription Toggle pill */}
                      <button
                        onClick={() => onToggleSubscription(item.product.id)}
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border text-left flex items-center justify-between ${
                          item.isSubscription
                            ? 'bg-[#EEF4F0] border-[#7C9F8A] text-[#2A3B30]'
                            : 'bg-[#FAF8F3] border-[#E2DBD0] text-[#5C6760]'
                        }`}
                      >
                        <span>{item.isSubscription ? 'Auto-deliver (30 Days)' : 'One-time Order'}</span>
                        <span className="font-bold text-[#7C9F8A]">
                          {item.isSubscription ? '-15% Off' : 'Switch to Sub'}
                        </span>
                      </button>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-[#E2DBD0] rounded-lg bg-white">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-[#F5F1E8] text-[#212925]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#212925]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-[#F5F1E8] text-[#212925]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-sm text-[#212925]">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Calculations & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-[#F5F1E8] border-t border-[#E2DBD0] space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5C6760]" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. WITHIN15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#E2DBD0] rounded-xl text-xs uppercase focus:outline-none focus:border-[#7C9F8A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#212925] hover:bg-[#7C9F8A] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage && (
                  <p
                    className={`text-[11px] font-semibold ${
                      promoMessage.isError ? 'text-rose-600' : 'text-[#7C9F8A]'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Order Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C6760] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#212925]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#7C9F8A] font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-[#212925]">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#212925] pt-2 border-t border-[#E2DBD0]">
                  <span>Total Due</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onProceedToCheckout(discountPercent)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#7C9F8A] hover:bg-[#6a8c78] text-white font-bold text-sm py-3.5 rounded-full shadow-lg transition-all"
              >
                <span>Proceed to Shopify Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#5C6760] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7C9F8A]" />
                Secure 256-bit encrypted checkout
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
