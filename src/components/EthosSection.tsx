import React from 'react';
import { Heart, ShieldCheck, Sparkles, Compass, Leaf, Award } from 'lucide-react';
import { Logo } from './Logo';

export const EthosSection: React.FC = () => {
  return (
    <section id="ethos" className="py-20 bg-[#F5F1E8] border-t border-[#E2DBD0] relative overflow-hidden">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C9F8A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Main Brand Narrative Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2DBD0] shadow-xl alabaster-shadow max-w-4xl mx-auto space-y-8 text-center">
          
          <div className="flex flex-col items-center justify-center space-y-3">
            <Logo variant="full" size="lg" textColor="#212925" accentColor="#7C9F8A" />
            <div className="w-16 h-0.5 bg-[#7C9F8A] mx-auto rounded-full mt-2" />
          </div>

          <p className="text-base sm:text-lg text-[#5C6760] font-serif leading-relaxed text-center italic max-w-2xl mx-auto">
            "For health-conscious women seeking a natural path to radiant well-being, Yahreah Skin provides premium, USA-made natural supplements & topicals. We empower you to achieve deep vitality and beauty from within, backed by our unwavering commitment to proven efficacy and conscious quality."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E2DBD0]">
            
            {/* What We Do */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2DBD0]/60">
              <div className="w-8 h-8 rounded-full bg-[#EEF4F0] text-[#7C9F8A] flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-[#212925]">
                What We Do
              </h3>
              <p className="text-xs text-[#5C6760] leading-relaxed">
                We provide a curated range of premium, natural supplements and serums specifically formulated to enhance skin health, boost cellular energy, and support overall well-being.
              </p>
            </div>

            {/* How We Do It */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2DBD0]/60">
              <div className="w-8 h-8 rounded-full bg-[#E8F1F1] text-[#3B5A59] flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-[#212925]">
                How We Do It
              </h3>
              <p className="text-xs text-[#5C6760] leading-relaxed">
                Meticulously crafting USA-made formulations with transparent, high-quality ingredients backed by scientific rigor and bio-available trace minerals.
              </p>
            </div>

            {/* Why We Do It */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2DBD0]/60">
              <div className="w-8 h-8 rounded-full bg-[#F0EBE6] text-[#4A3E37] flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-[#212925]">
                Why We Do It
              </h3>
              <p className="text-xs text-[#5C6760] leading-relaxed">
                We exist to empower women to nurture their inner vitality, knowing that true beauty and well-being radiate from within.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
