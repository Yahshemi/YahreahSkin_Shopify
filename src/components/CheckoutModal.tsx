import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountPercent: number;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountPercent,
  onClearCart,
}) => {
  const [step, setStep] = useState<'form' | 'receipt'>('form');
  const [formData, setFormData] = useState({
    email: 'yahshemi@gmail.com',
    firstName: 'Sarah',
    lastName: 'Vance',
    address: '742 Evergreen Terrace',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90210',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
  });

  if (!isOpen) return null;

  // Pricing
  const subtotal = items.reduce((sum, item) => {
    const price = item.isSubscription
      ? item.product.subscriptionPrice
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = subtotal >= 60 ? 0 : 5.99;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('receipt');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#212925]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF8F3] rounded-3xl shadow-2xl border border-[#E2DBD0] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-[#F5F1E8] border-b border-[#E2DBD0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl text-[#212925]">
              YAHREAH <span className="text-[#7C9F8A] font-normal italic">Skin</span>
            </span>
            <span className="text-xs bg-[#7C9F8A] text-white px-2.5 py-0.5 rounded-full font-bold">
              Shopify Checkout
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#5C6760] hover:text-[#212925] rounded-full hover:bg-[#E2DBD0]/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          
          {step === 'form' ? (
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              
              {/* Express Payment Options */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6760] block">
                  Express Checkout
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    className="bg-[#5A31F4] text-white font-bold py-2.5 rounded-xl text-xs hover:opacity-90 shadow-xs"
                  >
                    Shop Pay
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    className="bg-black text-white font-bold py-2.5 rounded-xl text-xs hover:opacity-90 shadow-xs"
                  >
                     Pay
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    className="bg-[#1A73E8] text-white font-bold py-2.5 rounded-xl text-xs hover:opacity-90 shadow-xs"
                  >
                    G Pay
                  </button>
                </div>
              </div>

              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E2DBD0]" />
                </div>
                <span className="relative bg-[#FAF8F3] px-3 text-xs text-[#5C6760]">
                  OR PAY WITH CREDIT CARD
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-sm text-[#212925]">
                  Contact Information
                </h3>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 bg-white border border-[#E2DBD0] rounded-xl text-xs focus:outline-none focus:border-[#7C9F8A]"
                  placeholder="Email Address"
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-sm text-[#212925]">
                  Shipping Address
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="p-3 bg-white border border-[#E2DBD0] rounded-xl text-xs focus:outline-none focus:border-[#7C9F8A]"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="p-3 bg-white border border-[#E2DBD0] rounded-xl text-xs focus:outline-none focus:border-[#7C9F8A]"
                    placeholder="Last Name"
                  />
                </div>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 bg-white border border-[#E2DBD0] rounded-xl text-xs focus:outline-none focus:border-[#7C9F8A]"
                  placeholder="Street Address"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="p-3 bg-white border border-[#E2DBD0] rounded-xl text-xs focus:outline-none focus:border-[#7C9F8A]"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="p-3 bg-white border border-[#E2DBD0] rounded-xl text-xs focus:outline-none focus:border-[#7C9F8A]"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="p-3 bg-white border border-[#E2DBD0] rounded-xl text-xs focus:outline-none focus:border-[#7C9F8A]"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>

              {/* Payment Card Details */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-sm text-[#212925] flex items-center justify-between">
                  <span>Payment Method</span>
                  <Lock className="w-3.5 h-3.5 text-[#7C9F8A]" />
                </h3>
                <div className="bg-white p-4 rounded-xl border border-[#E2DBD0] space-y-3">
                  <div className="relative">
                    <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5C6760]" />
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F3] border border-[#E2DBD0] rounded-lg text-xs font-mono"
                      placeholder="Card Number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={formData.expDate}
                      onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                      className="p-2 bg-[#FAF8F3] border border-[#E2DBD0] rounded-lg text-xs font-mono"
                      placeholder="MM/YY"
                    />
                    <input
                      type="text"
                      required
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="p-2 bg-[#FAF8F3] border border-[#E2DBD0] rounded-lg text-xs font-mono"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </div>

              {/* Summary Total Bar */}
              <div className="bg-[#F5F1E8] p-4 rounded-2xl border border-[#E2DBD0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#5C6760]">Total Order Amount:</span>
                  <p className="font-serif text-2xl font-bold text-[#212925]">
                    ${total.toFixed(2)}
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-[#7C9F8A] hover:bg-[#6a8c78] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
                >
                  Pay ${total.toFixed(2)} Now
                </button>
              </div>

            </form>
          ) : (
            
            /* ORDER RECEIPT MODE */
            <div className="text-center space-y-6 py-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#7C9F8A] text-white mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#7C9F8A]">
                  Order Confirmed • #YS-84920
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#212925]">
                  Thank You for Choosing Yahreah Skin
                </h2>
                <p className="text-sm text-[#5C6760] max-w-md mx-auto">
                  A confirmation email and tracking link have been sent to <strong>{formData.email}</strong>.
                </p>
              </div>

              <div className="bg-[#EEF4F0] p-6 rounded-3xl border border-[#7C9F8A]/30 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2A3B30] uppercase">
                  <Sparkles className="w-4 h-4 text-[#7C9F8A]" />
                  <span>Your Routine Preparation</span>
                </div>
                <p className="text-xs text-[#2A3B30] leading-relaxed">
                  Your "As Within, So Without" supplements and topicals are being hand-packed at our USA facility. Expected arrival: <strong>3-5 Business Days</strong>.
                </p>
              </div>

              <div>
                <button
                  onClick={onClose}
                  className="bg-[#212925] hover:bg-[#7C9F8A] text-white font-bold text-sm px-8 py-3 rounded-full shadow-md transition-colors"
                >
                  Return to Storefront
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
