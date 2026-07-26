import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Flame, Eye, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';
import { SneakerProduct, CartItem } from '../types/sneaker';
import { SNEAKER_CATALOG } from '../data/sneakersData';

interface SpotlightSliderProps {
  onOpenStudio: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const SpotlightSlider: React.FC<SpotlightSliderProps> = ({
  onOpenStudio,
  onAddToCart,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  // Pick spotlight sneakers from catalog including Solar Flare High as lead item
  const solarFlareItem = SNEAKER_CATALOG.find((item) => item.id === 'solar-flare-high') || SNEAKER_CATALOG[0];
  const spotlightItems = [
    solarFlareItem,
    SNEAKER_CATALOG[0],
    SNEAKER_CATALOG[1],
    SNEAKER_CATALOG[4],
    SNEAKER_CATALOG[6],
    SNEAKER_CATALOG[8],
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % spotlightItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, spotlightItems.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % spotlightItems.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + spotlightItems.length) % spotlightItems.length);
  };

  const currentItem = spotlightItems[currentSlide] || spotlightItems[0];

  const handleQuickBag = (item: SneakerProduct) => {
    const cartItem: CartItem = {
      id: `${item.id}-spotlight-${Date.now()}`,
      type: 'catalog',
      product: item,
      size: item.sizes[2] || 10,
      quantity: 1,
      price: item.price,
      name: item.name,
      subtitle: item.subtitle,
      image: item.image,
      addedAt: Date.now(),
    };
    onAddToCart(cartItem);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section id="spotlight" className="py-20 px-6 border-b-2 border-brand-black bg-brand-black text-brand-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#D2F800 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* Section Title Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-2 border-white/20 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-brand-black bg-brand-lime px-3 py-1 border border-brand-black shadow-[4px_4px_0px_0px_#ffffff] mb-3">
              <Flame className="w-3.5 h-3.5 fill-black" /> /// INTERACTIVE SPOTLIGHT CAROUSEL
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
              Future Concept <br />
              <span className="text-transparent text-stroke-white">Drop Radar</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Wireframe Toggle */}
            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              className={`px-4 py-2.5 font-mono text-xs font-bold uppercase border-2 transition-all flex items-center gap-2 ${
                wireframeMode 
                  ? 'bg-brand-lime text-black border-brand-lime shadow-[4px_4px_0px_0px_#ffffff]' 
                  : 'bg-transparent text-white border-white/60 hover:border-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{wireframeMode ? 'Wireframe Mode: ON' : 'Toggle X-Ray View'}</span>
            </button>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-12 h-12 bg-white text-black border-2 border-white hover:bg-brand-lime transition-colors flex items-center justify-center font-bold shadow-[4px_4px_0px_0px_#D2F800]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="font-mono text-xs font-bold px-3 py-2 bg-white/10 border border-white/30 whitespace-nowrap">
                0{currentSlide + 1} / 0{spotlightItems.length}
              </span>
              <button
                onClick={handleNext}
                className="w-12 h-12 bg-white text-black border-2 border-white hover:bg-brand-lime transition-colors flex items-center justify-center font-bold shadow-[4px_4px_0px_0px_#D2F800]"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Slide Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-brand-white text-brand-black border-4 border-brand-lime shadow-[12px_12px_0px_0px_rgba(210,248,0,1)] p-6 md:p-12 transition-all duration-500 relative overflow-hidden">
          
          {/* Top Left Slide Indicator Badge */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <span className="bg-brand-black text-brand-lime font-mono text-xs font-bold px-2.5 py-1 uppercase border border-black shadow-brutal-sm">
              REF: {currentItem.id.toUpperCase()}
            </span>
            <span className="bg-red-500 text-white font-mono text-xs font-bold px-2.5 py-1 uppercase border border-black shadow-brutal-sm animate-pulse">
              LIMITED PROTOTYPE
            </span>
          </div>

          {/* Left Column: Big Interactive Shoe Display */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[400px] lg:min-h-[500px] bg-brand-gray/50 border-2 border-brand-black p-8 overflow-hidden group">
            
            {/* Background Big Typography */}
            <span className="absolute text-[12vw] font-black text-black opacity-5 select-none italic pointer-events-none uppercase whitespace-nowrap">
              {currentItem.name.split(' ')[0]}
            </span>

            {/* Main Image with optional wireframe/xray filter effect */}
            <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
              <img
                src={currentItem.image}
                alt={currentItem.name}
                className={`w-full h-full object-contain drop-shadow-[10px_15px_20px_rgba(0,0,0,0.5)] rotate-[-10deg] transition-all duration-500 ${
                  wireframeMode ? 'invert brightness-125 contrast-200 hue-rotate-90' : ''
                }`}
              />
              
              {/* Interactive Hover Hotspot Stamp */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border-2 border-black p-2 font-mono text-xs font-bold uppercase shadow-brutal-sm flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-brand-lime text-black animate-bounce" />
                <span>Create™ Zero-Gravity Sole</span>
              </div>
            </div>

            {/* Thumbnail Dot Strip at bottom of image */}
            <div className="flex gap-2 mt-6 z-20">
              {spotlightItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setIsAutoPlaying(false); setCurrentSlide(idx); }}
                  className={`h-2.5 transition-all border border-black ${
                    currentSlide === idx ? 'w-10 bg-brand-lime shadow-brutal-sm' : 'w-2.5 bg-gray-300 hover:bg-black'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Deep Technical Breakdown & Instant Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline border-b-2 border-brand-black pb-4">
                <div>
                  <span className="font-mono text-xs text-gray-500 font-bold uppercase block">{currentItem.colorway}</span>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase italic leading-none">{currentItem.name}</h3>
                </div>
                <span className="font-mono font-black text-3xl text-brand-black bg-brand-lime px-2 py-0.5 border border-black shadow-brutal-sm whitespace-nowrap">
                  ${currentItem.price}
                </span>
              </div>

              <p className="font-mono text-xs sm:text-sm text-gray-700 leading-relaxed">
                {currentItem.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="bg-brand-gray p-4 border-2 border-brand-black space-y-2 font-mono text-xs">
                <div className="font-black uppercase text-black flex items-center justify-between border-b border-gray-400 pb-1.5 mb-2">
                  <span>/// Prototype Engineering Specs</span>
                  <span className="text-[10px] bg-black text-white px-1.5 py-0.5">GRADE-A</span>
                </div>
                {currentItem.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-lime border border-black flex-shrink-0" />
                    <span className="font-bold text-gray-800">{spec}</span>
                  </div>
                ))}
              </div>

              {/* Movement Profile Tag */}
              <div className="flex items-center justify-between bg-black text-white p-3 font-mono text-xs border border-black">
                <span className="text-brand-lime font-bold">Recommended Terrain:</span>
                <span className="uppercase font-bold">{currentItem.movementProfile}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t-2 border-brand-black">
              <button
                onClick={() => handleQuickBag(currentItem)}
                disabled={addedId === currentItem.id}
                className={`w-full py-4 font-black text-sm uppercase tracking-widest transition-all border-2 border-black shadow-brutal flex items-center justify-center gap-2 ${
                  addedId === currentItem.id 
                    ? 'bg-brand-lime text-black font-black scale-95' 
                    : 'bg-brand-black text-white hover:bg-brand-lime hover:text-black hover:translate-x-[2px] hover:translate-y-[2px]'
                }`}
              >
                <ShoppingBag className="w-5 h-5 fill-current" />
                <span>{addedId === currentItem.id ? '✓ Prototype Added To Bag!' : `Instant Claim — US ${currentItem.sizes[2] || 10} ($${currentItem.price})`}</span>
              </button>
              
              <button
                onClick={onOpenStudio}
                className="w-full bg-brand-white text-brand-black py-3.5 font-bold text-xs uppercase hover:bg-brand-gray transition-colors border-2 border-black flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-brand-lime text-black" />
                <span>Customize & Modify This Prototype in 3D Studio</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pt-2">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-black" /> 30-Day Easy Exchange</span>
              <span>⚡ Free Global Priority Shipping Included</span>
            </div>

          </div>

        </div>

        {/* Bottom Ticker Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/10 border border-white/30 p-4 text-center font-mono">
            <div className="text-2xl font-black text-brand-lime">45mm - 50mm</div>
            <div className="text-xs text-gray-400 uppercase">Average Elevation Boost</div>
          </div>
          <div className="bg-white/10 border border-white/30 p-4 text-center font-mono">
            <div className="text-2xl font-black text-brand-lime">0.18g / cm³</div>
            <div className="text-xs text-gray-400 uppercase">Create™ Foam Density</div>
          </div>
          <div className="bg-white/10 border border-white/30 p-4 text-center font-mono">
            <div className="text-2xl font-black text-brand-lime">14 Colorways</div>
            <div className="text-xs text-gray-400 uppercase">Available for Studio Build</div>
          </div>
          <div className="bg-white/10 border border-white/30 p-4 text-center font-mono">
            <div className="text-2xl font-black text-brand-lime">12-14 Days</div>
            <div className="text-xs text-gray-400 uppercase">Custom Production Turnaround</div>
          </div>
        </div>

      </div>
    </section>
  );
};
