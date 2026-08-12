import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HeartPulse, 
  Leaf, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Droplets,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface HeroProps {
  onOpenQuiz: () => void;
  onShopClick: () => void;
}

interface Slide {
  id: string;
  badge: string;
  headlineMain: string;
  headlineHighlight: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaAction: 'quiz' | 'shop';
  secondaryCtaText: string;
  secondaryCtaAction: 'quiz' | 'shop';
  image: string;
  imageAlt: string;
  tag: string;
  tagSub: string;
  discountBadge?: string;
  badgeTopLeft: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
  };
  badgeBottomRight: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
  };
  gradientFrom: string;
  ambientColor: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'synergy-system',
    badge: 'Holistic Inside-Out Skincare',
    headlineMain: 'As Within, ',
    headlineHighlight: 'So Without.',
    subheadline: 'True skin longevity pairs wild marine collagen & 72+ bio-available trace minerals with botanical ceramide serums to repair cellular matrices and nourish surface mantles.',
    primaryCtaText: 'Take Routine Diagnostic Quiz',
    primaryCtaAction: 'quiz',
    secondaryCtaText: 'Shop Radiance Systems',
    secondaryCtaAction: 'shop',
    image: 'https://images.unsplash.com/photo-1512290900673-70020192934b?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Yahreah Skin Dual Synergy System',
    tag: 'Dual Synergy System',
    tagSub: 'Marine Collagen + Squalane Serum Duo',
    discountBadge: 'Save 20%',
    badgeTopLeft: {
      icon: HeartPulse,
      title: 'Cellular Vitality',
      subtitle: 'Deep collagen synthesis',
    },
    badgeBottomRight: {
      icon: ShieldCheck,
      title: 'Barrier Fortified',
      subtitle: '88% less surface redness',
    },
    gradientFrom: 'from-[#F5F1E8]',
    ambientColor: 'bg-[#7C9F8A]/15',
  },
  {
    id: 'collagen-elixir',
    badge: 'Bio-Available Ingestibles',
    headlineMain: 'Cellular Renewal ',
    headlineHighlight: 'In Every Sip.',
    subheadline: 'Unrivaled Type I & III hydrolyzed marine peptides infused with organic hyaluronic acid and fulvic trace minerals to kickstart your body’s natural collagen production.',
    primaryCtaText: 'Shop Marine Peptides',
    primaryCtaAction: 'shop',
    secondaryCtaText: 'Take Diagnostic Quiz',
    secondaryCtaAction: 'quiz',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Wild Marine Collagen Powder Elixir',
    tag: 'Ingestible Elixir',
    tagSub: 'Wild-Caught Atlantic Peptides & Minerals',
    discountBadge: 'Subscriber Favorite',
    badgeTopLeft: {
      icon: Droplets,
      title: 'Deep Hydration',
      subtitle: '+45% elasticity boost',
    },
    badgeBottomRight: {
      icon: CheckCircle2,
      title: '100% Bio-Available',
      subtitle: 'Micro-milled absorption',
    },
    gradientFrom: 'from-[#FAF6F0]',
    ambientColor: 'bg-[#A9C3C2]/20',
  },
  {
    id: 'botanical-serum',
    badge: 'Clinical Dermo-Therapy',
    headlineMain: 'Nourish Your ',
    headlineHighlight: 'Surface Mantle.',
    subheadline: 'Sustainably harvested plant ceramides, cold-pressed jojoba, and squalane seal in deep moisture while soothing environmental stress and redness.',
    primaryCtaText: 'Explore Topical Serums',
    primaryCtaAction: 'shop',
    secondaryCtaText: 'Match My Skin Type',
    secondaryCtaAction: 'quiz',
    image: 'https://images.unsplash.com/photo-1608248597309-10056a0ae038?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Ceramide Barrier Recovery Serum',
    tag: 'Barrier Repair Serum',
    tagSub: 'Botanical Ceramides + Squalane Oil',
    discountBadge: 'Dermatologist Approved',
    badgeTopLeft: {
      icon: ShieldCheck,
      title: 'Lipid Shield',
      subtitle: '24hr Moisture lock',
    },
    badgeBottomRight: {
      icon: Leaf,
      title: 'Pure Botanicals',
      subtitle: 'Cold-pressed active oils',
    },
    gradientFrom: 'from-[#F2ECE4]',
    ambientColor: 'bg-[#B7A79D]/20',
  },
  {
    id: 'complete-bundle',
    badge: 'The Complete Routine',
    headlineMain: '30-Day Complete ',
    headlineHighlight: 'Skin Transformation.',
    subheadline: 'Experience the clinically proven synergy of our internal marine collagen elixir coupled with our lipid restore barrier cream. Transform your skin texture in 4 weeks.',
    primaryCtaText: 'Shop Complete Bundle',
    primaryCtaAction: 'shop',
    secondaryCtaText: 'Find Your Custom Match',
    secondaryCtaAction: 'quiz',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Yahreah Skin Complete Transformation Ritual',
    tag: 'Full Inside-Out Ritual',
    tagSub: '3-Piece System for Maximum Glow',
    discountBadge: 'Bundle & Save 20%',
    badgeTopLeft: {
      icon: Award,
      title: 'Award Winning',
      subtitle: 'Best Holistic Skincare 2026',
    },
    badgeBottomRight: {
      icon: HeartPulse,
      title: 'Visible Glow',
      subtitle: 'Results in 21 days',
    },
    gradientFrom: 'from-[#F5F1E8]',
    ambientColor: 'bg-[#7C9F8A]/20',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz, onShopClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<number>(1); // 1 = next, -1 = prev
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = HERO_SLIDES[currentSlide];

  // Slide navigation handlers
  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-play interval handling
  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 7000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, currentSlide]);

  const handleCta = (action: 'quiz' | 'shop') => {
    if (action === 'quiz') {
      onOpenQuiz();
    } else {
      onShopClick();
    }
  };

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: [0.7, 0, 0.84, 0],
      },
    }),
  };

  const IconTopLeft = slide.badgeTopLeft.icon;
  const IconBottomRight = slide.badgeBottomRight.icon;

  return (
    <section 
      className={`relative overflow-hidden bg-gradient-to-b ${slide.gradientFrom} via-[#FAF8F3] to-[#FAF8F3] py-12 sm:py-16 md:py-24 lg:py-28 border-b border-[#E2DBD0]/60 transition-colors duration-700`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      aria-label="Hero Showcase Slider"
    >
      
      {/* Decorative ambient blurred blobs */}
      <div className={`absolute -top-24 -left-24 w-[30rem] h-[30rem] ${slide.ambientColor} rounded-full blur-3xl pointer-events-none transition-all duration-1000`} />
      <div className="absolute top-1/2 -right-24 w-[30rem] h-[30rem] bg-[#A9C3C2]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Slider Controls Bar Top */}
        <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-[#5C6760] font-sans">
          <div className="flex items-center gap-2.5">
            <span className="font-serif font-bold text-[#7C9F8A] text-base">0{currentSlide + 1}</span>
            <span className="text-[#B7A79D]">/</span>
            <span className="text-[#5C6760] font-medium">0{HERO_SLIDES.length}</span>
            <span className="hidden sm:inline-block text-[#B7A79D] mx-1">•</span>
            <span className="hidden sm:inline-block font-semibold text-[#212925] tracking-wide">{slide.badge}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-1.5 text-xs text-[#5C6760] hover:text-[#212925] bg-white/90 hover:bg-white px-3 py-1.5 rounded-full border border-[#E2DBD0] shadow-xs transition-colors"
              title={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#7C9F8A]" />
                  <span className="hidden sm:inline font-medium">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#7C9F8A]" />
                  <span className="hidden sm:inline font-medium">Auto-play</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#E2DBD0] flex items-center justify-center text-[#212925] shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#E2DBD0] flex items-center justify-center text-[#212925] shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Animated Slide Content Grid */}
        <div className="relative min-h-[560px] lg:min-h-[580px] xl:min-h-[620px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center"
            >
              
              {/* Left Text Content */}
              <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-center lg:text-left">
                
                {/* Tagline Badge */}
                <div className="inline-flex items-center gap-2 bg-[#EEF4F0] border border-[#7C9F8A]/30 px-4 py-1.5 rounded-full text-xs font-semibold text-[#2A3B30] shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C9F8A]" />
                  <span className="uppercase tracking-wider">{slide.badge}</span>
                </div>

                {/* Main Headline in Lora Serif */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#212925] leading-[1.12] tracking-tight">
                  {slide.headlineMain} <br className="hidden sm:inline" />
                  <span className="text-[#7C9F8A] italic font-normal">{slide.headlineHighlight}</span>
                </h1>

                {/* Sub-headline */}
                <p className="text-base sm:text-lg lg:text-xl text-[#5C6760] font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {slide.subheadline}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={() => handleCta(slide.primaryCtaAction)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#7C9F8A] hover:bg-[#6a8c78] text-white text-base sm:text-lg font-semibold px-9 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>{slide.primaryCtaText}</span>
                    <ArrowRight className="w-5 h-5 ml-0.5" />
                  </button>

                  <button
                    onClick={() => handleCta(slide.secondaryCtaAction)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F5F1E8] text-[#212925] border border-[#E2DBD0] text-base sm:text-lg font-semibold px-8 py-4 rounded-full transition-all alabaster-shadow"
                  >
                    <span>{slide.secondaryCtaText}</span>
                  </button>
                </div>

                {/* Micro Rating / Trust Social Proof */}
                <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-[#5C6760]">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500 font-bold text-sm">★★★★★</div>
                    <span className="font-bold text-[#212925]">4.9/5</span>
                    <span>(1,200+ Verified Buyers)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#2A3B30] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#7C9F8A]"></span>
                    <span>100% USA Formulated</span>
                  </div>
                </div>
              </div>

              {/* Right Visual Composition */}
              <div className="lg:col-span-6 relative">
                <div className="relative mx-auto max-w-lg sm:max-w-xl lg:max-w-none">
                  
                  {/* Main Image Frame with Soft Shadow */}
                  <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl border-4 sm:border-8 border-white aspect-[4/5] min-h-[440px] sm:min-h-[520px] lg:min-h-[580px] xl:min-h-[620px] bg-[#E8F1F1] group">
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Overlay Badge - Bottom Info */}
                    <div className="absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E2DBD0] shadow-xl">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-[#7C9F8A] block">
                            {slide.tag}
                          </span>
                          <p className="text-sm sm:text-base font-serif font-semibold text-[#212925] truncate mt-0.5">
                            {slide.tagSub}
                          </p>
                        </div>
                        {slide.discountBadge && (
                          <span className="bg-[#7C9F8A] text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shrink-0 shadow-xs">
                            {slide.discountBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Floating Pill - Top Left */}
                  <div className="absolute -top-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#E2DBD0] shadow-2xl flex items-center gap-3 animate-bounce-slow z-20">
                    <div className="w-9 h-9 rounded-full bg-[#EEF4F0] flex items-center justify-center text-[#7C9F8A] shrink-0">
                      <IconTopLeft className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#212925]">{slide.badgeTopLeft.title}</p>
                      <p className="text-[10px] sm:text-xs text-[#5C6760]">{slide.badgeTopLeft.subtitle}</p>
                    </div>
                  </div>

                  {/* Floating Pill - Bottom Right */}
                  <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#E2DBD0] shadow-2xl flex items-center gap-3 z-20">
                    <div className="w-9 h-9 rounded-full bg-[#E8F1F1] flex items-center justify-center text-[#3B5A59] shrink-0">
                      <IconBottomRight className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#212925]">{slide.badgeBottomRight.title}</p>
                      <p className="text-[10px] sm:text-xs text-[#5C6760]">{slide.badgeBottomRight.subtitle}</p>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicator Dots Bar */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {HERO_SLIDES.map((s, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`relative h-2.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-10 bg-[#7C9F8A] shadow-xs' 
                    : 'w-2.5 bg-[#E2DBD0] hover:bg-[#B7A79D]'
                }`}
              >
                {isActive && isAutoPlaying && (
                  <motion.span 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                    className="absolute inset-0 bg-[#5A7A67] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Brand Pillars Bar */}
        <div className="mt-12 pt-8 border-t border-[#E2DBD0]/60 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/60 alabaster-shadow border border-[#E2DBD0]/40 hover:bg-white/90 transition-colors">
            <Award className="w-6 h-6 text-[#7C9F8A] mb-2" />
            <h4 className="font-serif font-semibold text-sm text-[#212925]">USA Crafted</h4>
            <p className="text-xs text-[#5C6760] mt-0.5">Meticulously formulated in CGMP labs</p>
          </div>
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/60 alabaster-shadow border border-[#E2DBD0]/40 hover:bg-white/90 transition-colors">
            <Leaf className="w-6 h-6 text-[#7C9F8A] mb-2" />
            <h4 className="font-serif font-semibold text-sm text-[#212925]">100% Transparent</h4>
            <p className="text-xs text-[#5C6760] mt-0.5">Bio-available active ingredients</p>
          </div>
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/60 alabaster-shadow border border-[#E2DBD0]/40 hover:bg-white/90 transition-colors">
            <HeartPulse className="w-6 h-6 text-[#7C9F8A] mb-2" />
            <h4 className="font-serif font-semibold text-sm text-[#212925]">As Within, So Without</h4>
            <p className="text-xs text-[#5C6760] mt-0.5">Targeted internal & topical synergy</p>
          </div>
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/60 alabaster-shadow border border-[#E2DBD0]/40 hover:bg-white/90 transition-colors">
            <ShieldCheck className="w-6 h-6 text-[#7C9F8A] mb-2" />
            <h4 className="font-serif font-semibold text-sm text-[#212925]">Clinical Rigor</h4>
            <p className="text-xs text-[#5C6760] mt-0.5">Proven efficacy & non-comedogenic</p>
          </div>
        </div>

      </div>
    </section>
  );
};

