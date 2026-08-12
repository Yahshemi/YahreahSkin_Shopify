import React, { useState } from 'react';
import { Sparkles, Mail, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#212925] text-[#FAF8F3] pt-16 pb-12 border-t border-[#7C9F8A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter Card */}
        <div className="bg-[#2A3B30] p-8 sm:p-12 rounded-3xl border border-[#7C9F8A]/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C9F8A] flex items-center justify-center lg:justify-start gap-1.5">
              <Sparkles className="w-4 h-4" /> Join The Inner Circle
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Receive 15% Off Your First Order
            </h3>
            <p className="text-xs sm:text-sm text-[#A9C3C2] leading-relaxed">
              Subscribe to holistic wellness insights, cellular skin protocols, and exclusive subscriber rituals.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {isSubscribed ? (
              <div className="bg-[#7C9F8A] text-white p-4 rounded-2xl flex items-center gap-3">
                <Check className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-bold text-xs">Welcome to Yahreah Skin!</p>
                  <p className="text-[11px]">Use code <strong className="underline">WITHIN15</strong> at checkout.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#212925] border border-[#7C9F8A]/40 rounded-full text-xs text-white placeholder-[#5C6760] focus:outline-none focus:border-[#7C9F8A]"
                />
                <button
                  type="submit"
                  className="bg-[#7C9F8A] hover:bg-[#6a8c78] text-white font-bold text-xs px-6 py-3 rounded-full transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-[#7C9F8A]/20">
          
          {/* Brand Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col items-start">
              <Logo variant="full" size="md" textColor="#FAF8F3" accentColor="#7C9F8A" className="!items-start" />
            </div>
            <p className="text-xs text-[#A9C3C2] leading-relaxed max-w-sm">
              Premium, USA-made natural supplements & topicals formulated to enhance skin health from within. As within, so without.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#7C9F8A] font-semibold">
              <span>🇺🇸 Formulated in USA</span>
              <span>•</span>
              <span>Cruelty Free</span>
              <span>•</span>
              <span>CGMP Certified</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-[#7C9F8A] uppercase tracking-wider mb-2.5">
                Follow Our Rituals
              </p>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yahreah Skin on Instagram"
                  className="w-9 h-9 rounded-full bg-[#2A3B30] hover:bg-[#7C9F8A] text-[#A9C3C2] hover:text-white border border-[#7C9F8A]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yahreah Skin on Pinterest"
                  className="w-9 h-9 rounded-full bg-[#2A3B30] hover:bg-[#7C9F8A] text-[#A9C3C2] hover:text-white border border-[#7C9F8A]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yahreah Skin on Facebook"
                  className="w-9 h-9 rounded-full bg-[#2A3B30] hover:bg-[#7C9F8A] text-[#A9C3C2] hover:text-white border border-[#7C9F8A]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yahreah Skin on TikTok"
                  className="w-9 h-9 rounded-full bg-[#2A3B30] hover:bg-[#7C9F8A] text-[#A9C3C2] hover:text-white border border-[#7C9F8A]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.05a8.16 8.16 0 0 0 4.91 1.62V7.22a4.85 4.85 0 0 1-1-.53z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Collections</h4>
            <ul className="space-y-2 text-xs text-[#A9C3C2]">
              <li><a href="#" className="hover:text-white transition-colors">Inside Supplements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Outside Serums</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dual-Action Systems</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marine Collagen</a></li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Skin Rituals</h4>
            <ul className="space-y-2 text-xs text-[#A9C3C2]">
              <li><a href="#" className="hover:text-white transition-colors">Diagnostic Skin Quiz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">As Within Science</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Results</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ingredient Glossary</a></li>
            </ul>
          </div>

          {/* Navigation Column 3 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Customer Care</h4>
            <p className="text-xs text-[#A9C3C2]">
              Have questions about your diagnostic routine? We're here to help.
            </p>
            <p className="text-xs font-semibold text-[#7C9F8A]">
              support@yahreahskin.com
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#7C9F8A]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C6760] gap-4">
          <p>© {new Date().getFullYear()} Yahreah Skin. All rights reserved. Powered by Shopify.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-[#A9C3C2]">Privacy Policy</a>
            <a href="#" className="hover:text-[#A9C3C2]">Terms of Service</a>
            <a href="#" className="hover:text-[#A9C3C2]">Shipping & Returns</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
