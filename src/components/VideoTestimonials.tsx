import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ShoppingBag, 
  Quote, 
  Heart,
  Clock
} from 'lucide-react';

export interface VideoTestimonial {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  rating: number;
  location: string;
  verifiedBuyer: boolean;
  videoUrl: string;
  posterUrl: string;
  duration: string;
  quote: string;
  fullStory: string;
  skinConcern: string;
  productName: string;
  productId?: string;
  resultsTimeline: string;
  likesCount: number;
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vid-1',
    author: 'Elena Vance',
    handle: '@elena_glows',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    location: 'Austin, TX',
    verifiedBuyer: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-a-face-cream-41584-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1512290900673-70020192934b?q=80&w=800&auto=format&fit=crop',
    duration: '0:45',
    quote: 'My skin barrier repaired in 14 days! The internal + topical combo is unmatched.',
    fullStory: 'I used to struggle with severe winter redness and peeling cheeks. Pairing the Bio-Trace Mineral Drops inside with the Ceramide Barrier Cream outside transformed my skin texture completely. "As within so without" is real science!',
    skinConcern: 'Skin Barrier & Redness',
    productName: 'Radiance Synergy Dual System',
    productId: 'sys-dual-radiance',
    resultsTimeline: '14 Days',
    likesCount: 342,
  },
  {
    id: 'vid-2',
    author: 'Sophia Chen',
    handle: '@sophia.wellness',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    location: 'Seattle, WA',
    verifiedBuyer: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-applying-facial-cream-42866-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
    duration: '0:58',
    quote: 'Actual glass-skin bounce that doesn’t wash away at night.',
    fullStory: 'I was skeptical about collagen drinks until I tried Yahreah Atlantic Marine Collagen. Unlike heavy pills, it mixes instantly into my morning match tea and my fine lines around my eyes look noticeably plumper.',
    skinConcern: 'Aging & Fine Lines',
    productName: 'Wild Marine Collagen Elixir',
    productId: 'prod-marine-collagen',
    resultsTimeline: '21 Days',
    likesCount: 518,
  },
  {
    id: 'vid-3',
    author: 'Camilla Reyes',
    handle: '@camillareyes_bio',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    location: 'Miami, FL',
    verifiedBuyer: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-pouring-a-drop-of-serum-on-her-face-42867-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1608248597309-10056a0ae038?q=80&w=800&auto=format&fit=crop',
    duration: '1:12',
    quote: 'Restored my deep hydration without feeling greasy under makeup.',
    fullStory: 'As a dermatologist nurse, I inspect ingredient decks rigorously. Yahreah uses plant-derived squalane and 72+ fulvic ionic minerals with zero artificial fillers or fragrances. Highly recommended!',
    skinConcern: 'Dullness & Radiance',
    productName: 'Ceramide Barrier Recovery Serum',
    productId: 'prod-ceramide-serum',
    resultsTimeline: '7 Days',
    likesCount: 289,
  },
  {
    id: 'vid-4',
    author: 'Marcus Holloway',
    handle: '@marcus_holistic',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    location: 'Denver, CO',
    verifiedBuyer: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-touching-her-face-and-smiling-41228-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    duration: '0:38',
    quote: 'Cleared my hormonal breakouts when nothing else worked.',
    fullStory: 'After taking the 60-second diagnostic quiz, I started the Gut-Skin Harmony capsules along with the mineral drops. My deep jawline breakouts stopped swelling and healed twice as fast.',
    skinConcern: 'Acne & Blemishes',
    productName: 'Gut-Skin Harmony Botanical Capsules',
    productId: 'prod-gut-skin-harmony',
    resultsTimeline: '30 Days',
    likesCount: 410,
  },
];

interface VideoTestimonialsProps {
  onShopClick?: () => void;
  onOpenQuiz?: () => void;
}

export const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({
  onShopClick,
  onOpenQuiz,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    VIDEO_TESTIMONIALS.forEach((item) => {
      map[item.id] = item.likesCount;
    });
    return map;
  });
  const [userLikedMap, setUserLikedMap] = useState<Record<string, boolean>>({});

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const categories = ['All', 'Skin Barrier & Redness', 'Aging & Fine Lines', 'Dullness & Radiance', 'Acne & Blemishes'];

  const filteredTestimonials = activeCategory === 'All'
    ? VIDEO_TESTIMONIALS
    : VIDEO_TESTIMONIALS.filter((item) => item.skinConcern === activeCategory);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleOpenVideoModal = (video: VideoTestimonial) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setIsMuted(false);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserLikedMap((prev) => {
      const currentlyLiked = prev[id];
      const newLikedState = !currentlyLiked;
      
      setLikesMap((likes) => ({
        ...likes,
        [id]: likes[id] + (newLikedState ? 1 : -1),
      }));

      return {
        ...prev,
        [id]: newLikedState,
      };
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF8F3] via-[#F5F1E8]/50 to-[#FAF8F3] border-b border-[#E2DBD0]/60 relative overflow-hidden" id="video-testimonials">
      
      {/* Background ambient accents */}
      <div className="absolute -top-32 right-10 w-80 h-80 bg-[#7C9F8A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-80 h-80 bg-[#A9C3C2]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#EEF4F0] border border-[#7C9F8A]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2A3B30]">
              <Sparkles className="w-3.5 h-3.5 text-[#7C9F8A]" />
              <span className="uppercase tracking-wider">Real Customer Video Stories</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#212925] tracking-tight">
              Unfiltered Results, <br className="hidden sm:inline" />
              <span className="text-[#7C9F8A] italic font-normal">Real Transformations</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5C6760] font-sans max-w-xl">
              Watch real verified customers share their inside-out skincare journeys and daily Yahreah Skin rituals.
            </p>
          </div>

          {/* Social Proof Stats + Scroll Arrows */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E2DBD0] flex items-center gap-3 shadow-xs">
              <div className="flex text-amber-500 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#212925]">4.9 / 5 Rating</span>
                <span className="text-[#5C6760] block text-[10px]">From 1,400+ Video Reviews</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#EEF4F0] border border-[#E2DBD0] flex items-center justify-center text-[#212925] shadow-xs hover:shadow-md transition-all active:scale-95"
                aria-label="Previous Testimonials"
              >
                <ChevronLeft className="w-5 h-5 text-[#212925]" />
              </button>

              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#EEF4F0] border border-[#E2DBD0] flex items-center justify-center text-[#212925] shadow-xs hover:shadow-md transition-all active:scale-95"
                aria-label="Next Testimonials"
              >
                <ChevronRight className="w-5 h-5 text-[#212925]" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#7C9F8A] text-white shadow-md'
                  : 'bg-white text-[#5C6760] border border-[#E2DBD0] hover:bg-[#EEF4F0] hover:text-[#212925]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Testimonials Cards Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {filteredTestimonials.map((item) => {
            const isLiked = !!userLikedMap[item.id];
            const currentLikes = likesMap[item.id] || item.likesCount;

            return (
              <div
                key={item.id}
                onClick={() => handleOpenVideoModal(item)}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-white border border-[#E2DBD0] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group relative hover:-translate-y-1"
              >
                {/* Video Card Thumbnail Frame (9:16 aspect) */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#212925] group">
                  <img
                    src={item.posterUrl}
                    alt={item.author}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                  {/* Top Bar: Author & Verified Badge */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-5 h-5 rounded-full object-cover border border-white/60"
                      />
                      <span className="text-[11px] font-semibold text-white truncate max-w-[100px]">
                        {item.author}
                      </span>
                      {item.verifiedBuyer && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7C9F8A] shrink-0" />
                      )}
                    </div>

                    <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-[10px] text-white/90 font-mono flex items-center gap-1 border border-white/10">
                      <Clock className="w-3 h-3 text-[#7C9F8A]" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-[#212925] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#7C9F8A] group-hover:text-white transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Video Overlay Info */}
                  <div className="absolute bottom-3 inset-x-3 z-10 space-y-2">
                    {/* Skin Concern Tag */}
                    <div className="inline-block bg-[#7C9F8A]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.skinConcern}
                    </div>

                    {/* Quote Excerpt */}
                    <p className="text-xs font-serif italic text-white line-clamp-2 leading-snug drop-shadow-sm">
                      "{item.quote}"
                    </p>

                    {/* Timeline Pill */}
                    <div className="flex items-center justify-between text-[10px] text-white/80 pt-1 border-t border-white/20">
                      <span>Result in <strong>{item.resultsTimeline}</strong></span>
                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-md border transition-all ${
                          isLiked
                            ? 'bg-rose-500/90 text-white border-rose-400'
                            : 'bg-black/40 text-white/90 border-white/20 hover:bg-black/60'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${isLiked ? 'fill-white text-white' : ''}`} />
                        <span className="font-mono">{currentLikes}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Footer Detail */}
                <div className="p-4 bg-white flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#5C6760] mb-1">
                      <span className="font-semibold text-[#212925]">{item.location}</span>
                      <div className="flex text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs font-bold text-[#212925] flex items-center gap-1.5 truncate">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#7C9F8A] shrink-0" />
                      <span className="truncate">{item.productName}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="w-full py-2 bg-[#EEF4F0] hover:bg-[#7C9F8A] text-[#2A3B30] hover:text-white rounded-xl text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3 h-3" />
                    <span>Watch Full Story</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Section Bottom CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#E2DBD0] alabaster-shadow flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif font-bold text-xl text-[#212925]">
              Ready to create your own inside-out skin transformation story?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6760]">
              Take our 60-second diagnostic quiz to get matched with your personalized routine system.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenQuiz && (
              <button
                onClick={onOpenQuiz}
                className="bg-[#7C9F8A] hover:bg-[#6a8c78] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Take Skin Diagnostic Quiz →
              </button>
            )}

            {onShopClick && (
              <button
                onClick={onShopClick}
                className="bg-[#FAF8F3] hover:bg-[#F5F1E8] text-[#212925] border border-[#E2DBD0] text-xs sm:text-sm font-semibold px-5 py-3 rounded-full transition-all"
              >
                Shop Formulations
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Video Testimonial Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative bg-[#1A201C] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12">
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center border border-white/20 transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Video Player */}
            <div className="md:col-span-7 bg-black relative flex items-center justify-center aspect-[9/16] md:aspect-auto max-h-[60vh] md:max-h-full overflow-hidden">
              <video
                ref={videoRef}
                src={selectedVideo.videoUrl}
                poster={selectedVideo.posterUrl}
                autoPlay
                playsInline
                loop
                className="w-full h-full object-cover"
                onClick={togglePlayPause}
              />

              {/* Video Overlay Controls */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between z-20">
                <button
                  onClick={togglePlayPause}
                  className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Right Column: Story & Product Details */}
            <div className="md:col-span-5 p-6 sm:p-8 bg-[#212925] text-[#FAF8F3] flex flex-col justify-between space-y-6 overflow-y-auto">
              
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedVideo.avatar}
                    alt={selectedVideo.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#7C9F8A]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-serif font-bold text-base text-white">{selectedVideo.author}</h4>
                      <CheckCircle2 className="w-4 h-4 text-[#7C9F8A]" />
                    </div>
                    <p className="text-xs text-[#FAF8F3]/60">{selectedVideo.handle} • {selectedVideo.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-y border-white/10 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(selectedVideo.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="bg-[#7C9F8A]/20 text-[#7C9F8A] px-2.5 py-0.5 rounded-full font-semibold border border-[#7C9F8A]/30">
                    {selectedVideo.skinConcern}
                  </span>
                </div>

                {/* Quote & Story */}
                <div className="space-y-2">
                  <Quote className="w-6 h-6 text-[#7C9F8A] opacity-60" />
                  <p className="font-serif italic text-base text-emerald-100 leading-snug">
                    "{selectedVideo.quote}"
                  </p>
                  <p className="text-xs text-[#FAF8F3]/80 leading-relaxed font-sans pt-2">
                    {selectedVideo.fullStory}
                  </p>
                </div>
              </div>

              {/* Featured Product Box */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                <span className="text-[10px] uppercase font-bold text-[#7C9F8A] tracking-wider block">
                  Product Used In Video
                </span>
                <p className="font-serif font-bold text-sm text-white">{selectedVideo.productName}</p>
                <p className="text-xs text-[#FAF8F3]/70">
                  Visible skin barrier results achieved in <strong>{selectedVideo.resultsTimeline}</strong>.
                </p>

                <button
                  onClick={() => {
                    handleCloseModal();
                    if (onShopClick) onShopClick();
                  }}
                  className="w-full py-3 bg-[#7C9F8A] hover:bg-[#6a8c78] text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Featured System</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
