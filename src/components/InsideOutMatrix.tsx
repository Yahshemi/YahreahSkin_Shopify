import React, { useState } from 'react';
import { Sparkles, HeartPulse, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SkinConcern } from '../types';

interface ConcernMatrixItem {
  concern: SkinConcern;
  title: string;
  insideLabel: string;
  insideAction: string;
  insideIngredients: string;
  outsideLabel: string;
  outsideAction: string;
  outsideIngredients: string;
  synergyResult: string;
}

const CONCERN_MATRIX: ConcernMatrixItem[] = [
  {
    concern: 'Aging & Fine Lines',
    title: 'Cellular Collagen Rebuild',
    insideLabel: 'Dermal Matrix Synthesis (Inside)',
    insideAction: 'Wild Marine Collagen Peptides supply Type I & III amino acids directly to dermal fibroblasts, stimulating new collagen cross-linking.',
    insideIngredients: 'Hydrolyzed Marine Peptides, Vitamin C, Silica',
    outsideLabel: 'Epidermal Moisture Lock (Outside)',
    outsideAction: 'Olive-derived Squalane & Niacinamide plump fine expression lines and prevent moisture evaporation.',
    outsideIngredients: 'Olive Squalane, 5% Niacinamide, Hyaluronic Acid',
    synergyResult: '94% reported visibly firmer, bouncy skin with reduced depth of fine lines in 30 days.',
  },
  {
    concern: 'Skin Barrier & Redness',
    title: 'Lipid Mantle Restoration',
    insideLabel: 'Cellular Mineral Hydration (Inside)',
    insideAction: '72+ Ionic trace minerals balance intracellular hydration and calm systemic skin micro-flushing.',
    insideIngredients: 'Fulvic Acid, Bio-Magnesium, Zinc, Selenium',
    outsideLabel: 'Biomimetic Ceramide Shield (Outside)',
    outsideAction: 'Ceramides NP/AP/EOP repair microscopic cracks in the stratum corneum, shielding against pollutants and harsh weather.',
    outsideIngredients: 'Ceramides 1, 3, 6-II, Colloidal Oat, Sea Buckthorn',
    synergyResult: '88% experienced immediate reduction in sting, dryness, and reactive flushing.',
  },
  {
    concern: 'Dullness & Radiance',
    title: 'Bio-Luminous Micro-Circulation',
    insideLabel: 'Intracellular Detoxification (Inside)',
    insideAction: 'Trace minerals & antioxidants sweep free radicals and nourish capillary blood flow to skin tissue.',
    insideIngredients: 'Ionic Trace Elements, Acerola Vitamin C',
    outsideLabel: 'Enzymatic Surface Smoothness (Outside)',
    outsideAction: 'Centella Asiatica & Niacinamide fade dark spots and reflect light evenly across smooth surface texture.',
    outsideIngredients: 'Centella, Squalane, Brightening Vitamin C',
    synergyResult: '91% noticed an instant natural candle-lit glow without heavy makeup.',
  },
  {
    concern: 'Acne & Blemishes',
    title: 'Gut-Skin Harmony Protocol',
    insideLabel: 'Hormonal & Micro-Flora Clearance (Inside)',
    insideAction: 'Zinc picolinate and spore probiotics harmonize gut health and decrease sebum-stimulating hormones.',
    insideIngredients: 'Zinc Picolinate, DIM, Milk Thistle, 10B CFU Probiotics',
    outsideLabel: 'Non-Stripping Pore Purification (Outside)',
    outsideAction: 'Gentle pH 5.5 mineral wash lifts clogged impurities without damaging beneficial acid mantle bacteria.',
    outsideIngredients: 'Zinc PCA, Chamomile Hydrosol, Green Tea',
    synergyResult: 'Clearer, calm pores with zero flakiness or irritation after 21 days.',
  },
];

export const InsideOutMatrix: React.FC = () => {
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern>('Aging & Fine Lines');

  const activeItem = CONCERN_MATRIX.find((m) => m.concern === selectedConcern) || CONCERN_MATRIX[0];

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F3] border-t border-[#E2DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#EEF4F0] border border-[#7C9F8A]/30 px-4 py-1.5 rounded-full text-xs font-semibold text-[#2A3B30]">
            <Sparkles className="w-3.5 h-3.5 text-[#7C9F8A]" />
            <span>The Yahreah Science</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#212925]">
            How "As Within, So Without" Works
          </h2>

          <p className="text-base text-[#5C6760] leading-relaxed">
            Addressing skin issues at the surface alone is only half the cure. Select a skin concern below to explore how our inside-out formulations deliver long-lasting transformation.
          </p>
        </div>

        {/* Concern Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {CONCERN_MATRIX.map((item) => {
            const isSelected = item.concern === selectedConcern;
            return (
              <button
                key={item.concern}
                onClick={() => setSelectedConcern(item.concern)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#7C9F8A] text-white shadow-md'
                    : 'bg-white text-[#212925] border border-[#E2DBD0] hover:bg-[#F5F1E8]'
                }`}
              >
                {item.concern}
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Cards */}
        <div className="bg-white rounded-3xl border border-[#E2DBD0] p-6 sm:p-10 shadow-xl alabaster-shadow space-y-8 animate-fadeIn">
          
          <div className="text-center border-b border-[#E2DBD0] pb-6 space-y-1">
            <span className="text-xs font-semibold text-[#7C9F8A] uppercase tracking-wider">
              Selected Protocol
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#212925]">
              {activeItem.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
            
            {/* AS WITHIN (INSIDE) */}
            <div className="bg-[#EEF4F0] p-6 rounded-2xl border border-[#7C9F8A]/30 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#7C9F8A] text-white flex items-center justify-center">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#7C9F8A] block">
                      AS WITHIN
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#212925]">
                      {activeItem.insideLabel}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-[#2A3B30] leading-relaxed">
                  {activeItem.insideAction}
                </p>
              </div>

              <div className="pt-3 border-t border-[#7C9F8A]/20">
                <span className="text-[10px] font-bold text-[#7C9F8A] uppercase tracking-wider block">
                  Key Internal Actives
                </span>
                <p className="text-xs font-medium text-[#212925]">
                  {activeItem.insideIngredients}
                </p>
              </div>
            </div>

            {/* SO WITHOUT (OUTSIDE) */}
            <div className="bg-[#E8F1F1] p-6 rounded-2xl border border-[#A9C3C2]/50 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#3B5A59] text-white flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#3B5A59] block">
                      SO WITHOUT
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#212925]">
                      {activeItem.outsideLabel}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-[#2A3B30] leading-relaxed">
                  {activeItem.outsideAction}
                </p>
              </div>

              <div className="pt-3 border-t border-[#3B5A59]/20">
                <span className="text-[10px] font-bold text-[#3B5A59] uppercase tracking-wider block">
                  Key Topical Actives
                </span>
                <p className="text-xs font-medium text-[#212925]">
                  {activeItem.outsideIngredients}
                </p>
              </div>
            </div>

          </div>

          {/* Combined Outcome Bar */}
          <div className="bg-[#F5F1E8] p-5 rounded-2xl border border-[#E2DBD0] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#7C9F8A] shrink-0" />
            <div>
              <span className="text-xs font-bold text-[#212925] block">
                The Dual Synergy Outcome:
              </span>
              <p className="text-xs text-[#5C6760]">
                {activeItem.synergyResult}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
