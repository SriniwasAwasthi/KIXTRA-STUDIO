import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ShoppingBag, RotateCw, ShieldCheck, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COLOR_PALETTES, SILHOUETTE_BASES } from '../data/sneakersData';
import { CustomSneakerConfig, CartItem } from '../types/sneaker';

interface SneakerBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onOpenSizeGuide: () => void;
  initialConfig?: Partial<CustomSneakerConfig>;
}

export const SneakerBuilderModal: React.FC<SneakerBuilderModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
  initialConfig,
}) => {
  const [step, setStep] = useState<'base' | 'customize' | 'size'>('base');
  const [selectedBase, setSelectedBase] = useState(SILHOUETTE_BASES[0]);
  
  // Colors state
  const [baseColor, setBaseColor] = useState(COLOR_PALETTES[2]); // Pure White default
  const [upperColor, setUpperColor] = useState(COLOR_PALETTES[0]); // Acid Lime
  const [soleColor, setSoleColor] = useState(COLOR_PALETTES[1]); // Carbon Black
  const [lacesColor, setLacesColor] = useState(COLOR_PALETTES[2]); // Pure White
  const [heelStrapColor, setHeelStrapColor] = useState(COLOR_PALETTES[5]); // Electric Purple
  const [accentColor, setAccentColor] = useState(COLOR_PALETTES[0]); // Acid Lime
  
  // Text and Patch state
  const [customText, setCustomText] = useState('SOLE X');
  const [patchEmoji, setPatchEmoji] = useState('⚡');
  
  // Custom options state
  const [embroiderySize, setEmbroiderySize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [bagType, setBagType] = useState<'Basic Dust Bag' | 'Creator Premium Sling' | 'Waterproof Duffle (+$25)' | 'Collector Aluminum Briefcase (+$40)'>('Basic Dust Bag');
  
  // Addons state
  const [laceAddon, setLaceAddon] = useState(false);
  const [rushBox, setRushBox] = useState(false);
  const [size, setSize] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'baseBody' | 'upper' | 'sole' | 'laces' | 'strap' | 'accent'>('baseBody');
  const [showCelebration, setShowCelebration] = useState(false);

  // Sync initial config
  useEffect(() => {
    if (isOpen) {
      if (initialConfig) {
        if (initialConfig.baseSilhouetteId) {
          const foundBase = SILHOUETTE_BASES.find(b => b.id === initialConfig.baseSilhouetteId);
          if (foundBase) setSelectedBase(foundBase);
        }
        if (initialConfig.upperColor) setUpperColor(initialConfig.upperColor);
        if (initialConfig.soleColor) setSoleColor(initialConfig.soleColor);
        if (initialConfig.lacesColor) setLacesColor(initialConfig.lacesColor);
        if (initialConfig.heelStrapColor) setHeelStrapColor(initialConfig.heelStrapColor);
        if (initialConfig.accentColor) setAccentColor(initialConfig.accentColor);
        if (initialConfig.baseColor) setBaseColor(initialConfig.baseColor);
        if (initialConfig.customText) setCustomText(initialConfig.customText);
        if (initialConfig.patchEmoji) setPatchEmoji(initialConfig.patchEmoji);
        if (initialConfig.laceAddon !== undefined) setLaceAddon(initialConfig.laceAddon);
        if (initialConfig.size) setSize(initialConfig.size);
        if (initialConfig.embroiderySize) setEmbroiderySize(initialConfig.embroiderySize);
        if (initialConfig.bagType) setBagType(initialConfig.bagType);
      } else {
        // Defaults
        setSelectedBase(SILHOUETTE_BASES[0]);
        setUpperColor(COLOR_PALETTES[0]);
        setSoleColor(COLOR_PALETTES[1]);
        setLacesColor(COLOR_PALETTES[2]);
        setHeelStrapColor(COLOR_PALETTES[5]);
        setAccentColor(COLOR_PALETTES[0]);
        setBaseColor(COLOR_PALETTES[2]);
        setCustomText('SOLE X');
        setPatchEmoji('⚡');
        setLaceAddon(false);
        setRushBox(false);
        setSize(10);
        setEmbroiderySize('Medium');
        setBagType('Basic Dust Bag');
      }
      setStep('base');
      setActiveTab('baseBody');
    }
  }, [isOpen, initialConfig]);

  if (!isOpen) return null;

  const basePrice = selectedBase.basePrice;
  let bagPrice = 0;
  if (bagType === 'Waterproof Duffle (+$25)') bagPrice = 25;
  else if (bagType === 'Collector Aluminum Briefcase (+$40)') bagPrice = 40;
  
  const totalPrice = basePrice + (laceAddon ? 15 : 0) + (rushBox ? 20 : 0) + bagPrice;

  const handleSaveToBag = () => {
    // Trigger confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: [upperColor.hex, soleColor.hex, '#D2F800', '#0a0a0a', '#ffffff']
      });
    } catch {
      // fallback if canvas-confetti fails
    }

    const config: CustomSneakerConfig = {
      baseSilhouetteId: selectedBase.id,
      upperColor,
      soleColor,
      lacesColor,
      heelStrapColor,
      accentColor,
      customText: customText.trim() || 'CULTURE',
      patchEmoji,
      laceAddon,
      size,
      totalPrice,
      baseColor,
      embroiderySize,
      bagType,
    };

    const customCartItem: CartItem = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      customConfig: config,
      size,
      quantity: 1,
      price: totalPrice,
      name: `1-of-1 ${selectedBase.name}`,
      subtitle: `${baseColor.name} Base / ${upperColor.name} Trim / ${soleColor.name} Sole [Custom ${customText}] [Size ${embroiderySize}] [${bagType.split(' (')[0]}]`,
      image: selectedBase.image,
      addedAt: Date.now(),
    };

    onAddToCart(customCartItem);
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      onClose();
    }, 2200);
  };

  const getFontSize = () => {
    if (embroiderySize === 'Small') return { size: '13', y: '22' };
    if (embroiderySize === 'Large') return { size: '21', y: '25' };
    return { size: '17', y: '24' }; // Medium
  };
  const fontSettings = getFontSize();

  const emojis = ['⚡', '🔥', '💀', '👽', '🐍', '💎', '★', '👑'];
  const availableSizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-brand-white border-4 border-brand-black shadow-brutal-white w-full max-w-6xl max-h-[94vh] flex flex-col overflow-hidden relative my-auto">
        
        {/* Top Header */}
        <div className="bg-brand-black text-brand-white px-6 py-4 flex justify-between items-center border-b-2 border-brand-black flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-lime text-brand-black rounded-none flex items-center justify-center font-black text-lg border border-brand-white">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter leading-none">
                /// KIXTRA 1-OF-1 MASTER STUDIO
              </h2>
              <p className="text-xs font-mono text-gray-400">Design your personalized street silhouette with live material rendering.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-brand-white text-brand-black flex items-center justify-center border-2 border-brand-white hover:bg-brand-lime transition-colors font-bold shadow-brutal-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Navigation Bar */}
        <div className="bg-brand-gray border-b-2 border-brand-black grid grid-cols-3 text-center text-xs sm:text-sm font-black uppercase tracking-wider flex-shrink-0">
          <button 
            onClick={() => setStep('base')}
            className={`py-3 px-2 border-r-2 border-brand-black transition-colors ${
              step === 'base' ? 'bg-brand-lime text-brand-black' : 'hover:bg-white text-gray-600'
            }`}
          >
            1. Select Base
          </button>
          <button 
            onClick={() => setStep('customize')}
            className={`py-3 px-2 border-r-2 border-brand-black transition-colors ${
              step === 'customize' ? 'bg-brand-lime text-brand-black' : 'hover:bg-white text-gray-600'
            }`}
          >
            2. Color & Embroidery
          </button>
          <button 
            onClick={() => setStep('size')}
            className={`py-3 px-2 transition-colors ${
              step === 'size' ? 'bg-brand-lime text-brand-black' : 'hover:bg-white text-gray-600'
            }`}
          >
            3. Size & Bag (${totalPrice})
          </button>
        </div>

        {/* Main Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto min-h-[500px]">
          
          {/* Left/Top: Live Dynamic Sneaker Preview Canvas */}
          <div className="lg:col-span-6 bg-brand-sky/30 border-b-2 lg:border-b-0 lg:border-r-2 border-brand-black p-6 sm:p-10 flex flex-col items-center justify-center relative min-h-[380px] overflow-hidden">
            
            {/* Background Vibe Text */}
            <span className="absolute text-[8vw] font-black text-brand-black opacity-5 select-none italic pointer-events-none uppercase whitespace-nowrap">
              {selectedBase.name.split(' ')[0]}
            </span>

            {/* Dynamic Layered SVG Sneaker Representation */}
            <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
              
              {/* Base Photo Thumbnail in Background with dynamic blend */}
              <img 
                src={selectedBase.image} 
                alt={selectedBase.name}
                className="absolute inset-0 w-full h-full object-contain opacity-20 rotate-[-10deg] pointer-events-none select-none" 
              />

              {/* High-Impact Stylized SVG Interactive Sneaker Graphic */}
              <svg 
                viewBox="0 0 600 360" 
                className="w-full h-auto drop-shadow-[8px_12px_0px_rgba(10,10,10,0.8)] relative z-10 overflow-visible rotate-[-8deg] transition-all duration-300"
              >
                {/* Outsole / Midsole Unit */}
                <path 
                  d="M 60,280 Q 80,310 180,310 L 480,310 Q 550,300 560,260 Q 550,250 510,250 L 150,250 Q 80,250 60,280 Z" 
                  fill={soleColor.hex} 
                  stroke="#0a0a0a" 
                  strokeWidth="8" 
                  className="transition-colors duration-300"
                />
                {/* Midsole Tread Accents */}
                <circle cx="200" cy="285" r="12" fill="#0a0a0a" opacity="0.3" />
                <circle cx="280" cy="285" r="12" fill="#0a0a0a" opacity="0.3" />
                <circle cx="360" cy="285" r="12" fill="#0a0a0a" opacity="0.3" />
                <circle cx="440" cy="285" r="12" fill="#0a0a0a" opacity="0.3" />

                {/* Main Mesh/Canvas Upper */}
                <path 
                  d="M 90,250 C 90,140 140,80 230,80 L 320,80 C 370,80 430,120 500,190 L 520,250 Z" 
                  fill={baseColor.hex} 
                  stroke="#0a0a0a" 
                  strokeWidth="8" 
                  className="transition-colors duration-300"
                />

                {/* Heel Support Counter & Lockdown Strap */}
                <path 
                  d="M 80,250 C 75,180 90,130 140,110 L 140,250 Z" 
                  fill={heelStrapColor.hex} 
                  stroke="#0a0a0a" 
                  strokeWidth="6" 
                  className="transition-colors duration-300"
                />

                {/* Signature Dynamic Accent / Swoosh Stripe */}
                <path 
                  d="M 150,210 Q 280,230 460,160 Q 340,180 180,180 Z" 
                  fill={accentColor.hex} 
                  stroke="#0a0a0a" 
                  strokeWidth="5" 
                  className="transition-colors duration-300"
                />

                {/* Customizable Eyelets & Laces */}
                <g stroke={lacesColor.hex} strokeWidth="10" strokeLinecap="round">
                  <line x1="260" y1="90" x2="280" y2="130" />
                  <line x1="290" y1="100" x2="310" y2="140" />
                  <line x1="320" y1="110" x2="340" y2="150" />
                  <line x1="350" y1="120" x2="370" y2="160" />
                  <line x1="380" y1="140" x2="400" y2="180" />
                </g>

                {/* Tongue & Collar */}
                <path 
                  d="M 230,80 C 250,50 310,40 330,80 Z" 
                  fill={upperColor.hex} 
                  stroke="#0a0a0a" 
                  strokeWidth="6" 
                  className="brightness-90 transition-all duration-300"
                />

                {/* Custom Embro Embro Text Tag on Heel */}
                <g transform="translate(90, 160) rotate(-15)">
                  <rect x="0" y="0" width="110" height="36" fill="#0a0a0a" stroke="#ffffff" strokeWidth="2" rx="4" />
                  <text 
                    x="55" 
                    y={fontSettings.y} 
                    fill="#D2F800" 
                    fontFamily="'Space Mono', monospace" 
                    fontWeight="bold" 
                    fontSize={fontSettings.size} 
                    textAnchor="middle"
                    className="uppercase tracking-widest"
                  >
                    {customText || 'SOLE'}
                  </text>
                </g>

                {/* Emoji Patch Stamp on Quarter Panel */}
                <g transform="translate(360, 190)">
                  <circle cx="24" cy="24" r="28" fill="#ffffff" stroke="#0a0a0a" strokeWidth="4" />
                  <text x="24" y="33" fontSize="28" textAnchor="middle">{patchEmoji}</text>
                </g>
              </svg>
            </div>

            {/* Live Spec Breakdown Tags Below Shoe */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center z-20">
              <span className="px-2.5 py-1 bg-brand-white border border-brand-black font-mono text-xs font-bold shadow-brutal-sm">
                BASE: <span className="uppercase">{selectedBase.name}</span>
              </span>
              <span className="px-2.5 py-1 bg-brand-white border border-brand-black font-mono text-xs font-bold shadow-brutal-sm flex items-center gap-1.5">
                <span className="w-3 h-3 inline-block border border-black" style={{ backgroundColor: baseColor.hex }} />
                <span>BASE: {baseColor.name}</span>
              </span>
              <span className="px-2.5 py-1 bg-brand-white border border-brand-black font-mono text-xs font-bold shadow-brutal-sm flex items-center gap-1.5">
                <span className="w-3 h-3 inline-block border border-black" style={{ backgroundColor: upperColor.hex }} />
                <span>TRIM: {upperColor.name}</span>
              </span>
              <span className="px-2.5 py-1 bg-brand-white border border-brand-black font-mono text-xs font-bold shadow-brutal-sm flex items-center gap-1.5">
                <span className="w-3 h-3 inline-block border border-black" style={{ backgroundColor: soleColor.hex }} />
                <span>SOLE: {soleColor.name}</span>
              </span>
            </div>

            {/* Bag Packaging Badge */}
            <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black text-white px-2 py-0.5 border border-white uppercase font-bold z-20">
              Pkg: {bagType.split(' (')[0]}
            </span>

          </div>

          {/* Right/Bottom: Interactive Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-brand-white">
            
            {/* Step 1: Base Selection */}
            {step === 'base' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-2xl font-black uppercase italic mb-1">Step 1: Choose Your Silhouette</h3>
                  <p className="text-xs font-mono text-gray-600">Select the foundation for your 1-of-1 build. Each sole is engineered for distinct urban movements.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[290px] overflow-y-auto pr-1">
                  {SILHOUETTE_BASES.map((base) => (
                    <div 
                      key={base.id}
                      onClick={() => setSelectedBase(base)}
                      className={`p-3 border-2 border-brand-black cursor-pointer transition-all ${
                        selectedBase.id === base.id ? 'bg-brand-lime shadow-brutal' : 'bg-white hover:bg-gray-50 shadow-brutal-sm'
                      }`}
                    >
                      <div className="aspect-[4/3] bg-brand-gray mb-2 border border-brand-black overflow-hidden flex items-center justify-center p-1">
                        <img src={base.image} alt={base.name} className="w-full h-full object-contain transform hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-black uppercase text-sm leading-tight">{base.name}</h4>
                        <span className="font-mono font-bold text-xs bg-brand-black text-brand-white px-1.5 py-0.5">${base.basePrice}</span>
                      </div>
                      <p className="font-mono text-[10px] text-gray-700 leading-normal line-clamp-2">{base.description}</p>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setStep('customize')}
                  className="w-full bg-brand-black text-brand-white py-4 font-black text-base uppercase tracking-widest hover:bg-brand-lime hover:text-black transition-colors border-2 border-brand-black shadow-brutal flex items-center justify-center gap-2"
                >
                  <span>Proceed to Colors & Embroidery</span>
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Customization (Colors & Embroidery) */}
            {step === 'customize' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-black uppercase italic mb-0.5">Step 2: Material Colorways & Patches</h3>
                  <p className="text-[11px] font-mono text-gray-600">Click a zone tab below and pick your premium materials.</p>
                </div>

                {/* Zone Selector Tabs */}
                <div className="flex flex-wrap border-2 border-brand-black bg-brand-gray font-bold text-[10px] uppercase">
                  {(['baseBody', 'upper', 'sole', 'laces', 'strap', 'accent'] as const).map((zone) => (
                    <button
                      key={zone}
                      onClick={() => setActiveTab(zone)}
                      className={`flex-1 min-w-[70px] py-1.5 px-1 text-center transition-colors border-r last:border-r-0 border-brand-black ${
                        activeTab === zone ? 'bg-brand-black text-brand-lime' : 'hover:bg-white text-gray-700'
                      }`}
                    >
                      {zone === 'baseBody' ? 'Base Body' : zone === 'strap' ? 'Heel Strap' : zone}
                    </button>
                  ))}
                </div>

                {/* Color Swatch Grid for Active Zone */}
                <div className="bg-white border-2 border-brand-black p-3 shadow-brutal-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold uppercase text-[10px]">
                      Select {activeTab === 'baseBody' ? 'Base Body' : activeTab === 'strap' ? 'Heel Strap' : activeTab} Color:
                    </span>
                    <span className="font-mono font-bold text-[10px] bg-brand-black text-white px-2 py-0.5 uppercase">
                      {activeTab === 'baseBody' && baseColor.name}
                      {activeTab === 'upper' && upperColor.name}
                      {activeTab === 'sole' && soleColor.name}
                      {activeTab === 'laces' && lacesColor.name}
                      {activeTab === 'strap' && heelStrapColor.name}
                      {activeTab === 'accent' && accentColor.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 max-h-[110px] overflow-y-auto pr-1">
                    {COLOR_PALETTES.map((color) => {
                      const isSelected = 
                        (activeTab === 'baseBody' && baseColor.name === color.name) ||
                        (activeTab === 'upper' && upperColor.name === color.name) ||
                        (activeTab === 'sole' && soleColor.name === color.name) ||
                        (activeTab === 'laces' && lacesColor.name === color.name) ||
                        (activeTab === 'strap' && heelStrapColor.name === color.name) ||
                        (activeTab === 'accent' && accentColor.name === color.name);

                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => {
                            if (activeTab === 'baseBody') setBaseColor(color);
                            if (activeTab === 'upper') setUpperColor(color);
                            if (activeTab === 'sole') setSoleColor(color);
                            if (activeTab === 'laces') setLacesColor(color);
                            if (activeTab === 'strap') setHeelStrapColor(color);
                            if (activeTab === 'accent') setAccentColor(color);
                          }}
                          className={`group relative flex flex-col items-center p-1 border-2 border-brand-black transition-all ${
                            isSelected ? 'bg-brand-gray scale-105 shadow-brutal-sm ring-1 ring-brand-black' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div 
                            className="w-7 h-7 border border-brand-black mb-1"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-[8px] font-mono font-bold uppercase truncate w-full text-center">{color.name.split(' ')[0]}</span>
                          {isSelected && (
                            <span className="absolute top-0.5 right-0.5 bg-brand-black text-white p-0.5 rounded-full">
                              <Check className="w-1.5 h-1.5" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Embroidery & Emoji Patch Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border-2 border-brand-black p-2.5 bg-brand-gray/50 space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider block">Heel Tag Text (Max 8 Chars):</label>
                    <input 
                      type="text" 
                      maxLength={8}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                      placeholder="e.g. SOLE X" 
                      className="w-full border-2 border-brand-black p-1.5 bg-white font-mono text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-lime"
                    />
                  </div>

                  <div className="border-2 border-brand-black p-2.5 bg-brand-gray/50 space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider block">Quarter Panel Emoji Patch:</label>
                    <div className="flex gap-1 flex-wrap">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setPatchEmoji(emoji)}
                          className={`w-7 h-7 border border-brand-black text-xs flex items-center justify-center transition-all ${
                            patchEmoji === emoji ? 'bg-brand-lime shadow-brutal-sm scale-110' : 'bg-white hover:bg-gray-100'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* New: Embroidery Size & Bag Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border-2 border-brand-black p-2.5 bg-brand-gray/50 space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider block">Embroidery Size:</label>
                    <div className="flex gap-1.5">
                      {(['Small', 'Medium', 'Large'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setEmbroiderySize(sz)}
                          className={`flex-1 py-1 border border-brand-black font-mono text-[9px] font-bold uppercase transition-all ${
                            embroiderySize === sz ? 'bg-brand-lime text-black font-black' : 'bg-white hover:bg-gray-50'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-2 border-brand-black p-2.5 bg-brand-gray/50 space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider block">Creator Bag Packaging:</label>
                    <select
                      value={bagType}
                      onChange={(e) => setBagType(e.target.value as any)}
                      className="w-full border border-brand-black p-1 bg-white font-mono text-[9px] font-bold uppercase focus:outline-none focus:ring-1 focus:ring-brand-lime cursor-pointer"
                    >
                      <option value="Basic Dust Bag">Basic Dust Bag (+$0)</option>
                      <option value="Creator Premium Sling">Premium Sling Bag (+$0)</option>
                      <option value="Waterproof Duffle (+$25)">Waterproof Duffle (+$25)</option>
                      <option value="Collector Aluminum Briefcase (+$40)">Aluminum Collector Case (+$40)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button 
                    onClick={() => setStep('base')}
                    className="w-1/3 bg-brand-white text-brand-black py-3 font-bold uppercase border-2 border-brand-black hover:bg-gray-100 transition-colors text-xs"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep('size')}
                    className="w-2/3 bg-brand-black text-brand-white py-3 font-black uppercase tracking-widest hover:bg-brand-lime hover:text-black transition-colors border-2 border-brand-black shadow-brutal text-xs"
                  >
                    Next: Size & Add to Bag
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Size & Bag */}
            {step === 'size' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black uppercase italic mb-1">Step 3: Size & Add-ons</h3>
                    <p className="text-xs font-mono text-gray-600">100% True to size fit. Free size exchange within 30 days.</p>
                  </div>
                  <button 
                    onClick={onOpenSizeGuide}
                    className="flex items-center gap-1 bg-brand-white border border-brand-black px-2.5 py-1 font-mono text-xs font-bold uppercase hover:bg-brand-lime shadow-brutal-sm transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                {/* Size Grid */}
                <div>
                  <label className="text-xs font-black uppercase block mb-2.5">Select US Men's / Unisex Size:</label>
                  <div className="grid grid-cols-7 gap-2">
                    {availableSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`py-2.5 border-2 border-brand-black font-mono font-bold text-sm transition-all ${
                          size === s ? 'bg-brand-lime text-brand-black shadow-brutal-sm scale-105' : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        US {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Add-ons Checkboxes */}
                <div className="border-2 border-brand-black p-4 bg-brand-gray/50 space-y-3">
                  <span className="font-black uppercase text-xs tracking-wider block">VIP Custom Add-ons:</span>
                  <label className="flex items-center justify-between cursor-pointer p-2 bg-white border border-brand-black hover:bg-brand-sky/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={laceAddon}
                        onChange={(e) => setLaceAddon(e.target.checked)}
                        className="w-4 h-4 accent-brand-black"
                      />
                      <span className="font-bold text-xs uppercase">3-Pack Contrast Lace Bundle (Lime, Reflective, White)</span>
                    </div>
                    <span className="font-mono font-bold text-xs bg-brand-black text-white px-2 py-0.5">+$15</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer p-2 bg-white border border-brand-black hover:bg-brand-sky/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={rushBox}
                        onChange={(e) => setRushBox(e.target.checked)}
                        className="w-4 h-4 accent-brand-black"
                      />
                      <span className="font-bold text-xs uppercase">VIP Aluminum Collector Box & Rush Priority Build</span>
                    </div>
                    <span className="font-mono font-bold text-xs bg-brand-black text-white px-2 py-0.5">+$20</span>
                  </label>
                </div>

                {/* Price Breakdown */}
                <div className="bg-brand-black text-brand-white p-4 border-2 border-brand-black flex justify-between items-center">
                  <div>
                    <span className="text-xs font-mono text-gray-400 uppercase block">1-of-1 Build Total</span>
                    <span className="text-2xl font-black tracking-tight">${totalPrice} USD</span>
                  </div>
                  <div className="text-right font-mono text-xs text-brand-lime">
                    <div className="flex items-center gap-1 justify-end"><ShieldCheck className="w-3.5 h-3.5" /> Free Global Shipping</div>
                    <div>Est. Delivery: 12-14 Days</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep('customize')}
                    className="w-1/3 bg-brand-white text-brand-black py-4 font-bold uppercase border-2 border-brand-black hover:bg-gray-100 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleSaveToBag}
                    className="w-2/3 bg-brand-lime text-brand-black py-4 font-black text-base uppercase tracking-widest hover:bg-white transition-all border-2 border-brand-black shadow-brutal flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5 fill-current" />
                    <span>Save 1-of-1 & Add to Bag</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Guarantee Banner */}
            <div className="mt-6 pt-4 border-t border-brand-gray flex items-center justify-between text-xs font-mono text-gray-500">
              <span>⚡ Master Cobbler Verified</span>
              <span>🔒 256-Bit Secure Custom Order</span>
            </div>

          </div>
        </div>

      </div>

      {/* Instant Celebration Toast Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-brand-lime border-4 border-brand-black p-8 text-center max-w-md shadow-brutal-white space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-brand-black text-brand-lime rounded-full flex items-center justify-center mx-auto text-3xl font-black border-2 border-brand-white animate-bounce">
              ✓
            </div>
            <h3 className="text-3xl font-black uppercase italic leading-none">1-of-1 Build Saved!</h3>
            <p className="font-mono text-xs text-brand-black font-bold">
              Your custom <strong>{selectedBase.name}</strong> [Size US {size}] has been added to your shopping bag.
            </p>
            <div className="text-[11px] font-mono bg-brand-white p-2 border border-brand-black">
              Total: ${totalPrice} • Express Custom Production Queue #482
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
