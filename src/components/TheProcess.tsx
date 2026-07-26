import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCw, Zap, Camera } from 'lucide-react';
import { SILHOUETTE_BASES, COLOR_PALETTES } from '../data/sneakersData';

interface TheProcessProps {
  onOpenStudio: (config?: any) => void;
}

export const TheProcess: React.FC<TheProcessProps> = ({ onOpenStudio }) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [demoBaseIdx, setDemoBaseIdx] = useState(0);
  const [demoColorIdx, setDemoColorIdx] = useState(0);
  const [handle, setHandle] = useState('@alex_streetwear');
  const [generatedCard, setGeneratedCard] = useState(false);

  const steps = [
    {
      num: 1 as const,
      title: 'Select Base',
      desc: 'Choose from our 4 signature silhouettes designed for specific movement profiles and aesthetic preferences.',
      badge: 'Step 01 /// Engineering',
    },
    {
      num: 2 as const,
      title: 'Customize',
      desc: 'Upload your art, pick your materials, and define your color palette using our 3D builder.',
      badge: 'Step 02 /// 1-of-1 Studio',
    },
    {
      num: 3 as const,
      title: 'Flex It',
      desc: 'Receive your 1-of-1 pair in 2 weeks. Wear them, tag us, get featured on our homepage.',
      badge: 'Step 03 /// Community Fame',
    },
  ];

  return (
    <section id="process" className="bg-brand-black text-brand-white py-24 px-6 border-b-2 border-brand-black overflow-hidden relative">
      {/* Grid Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-brand-lime font-mono uppercase tracking-widest mb-3 text-sm font-bold flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 fill-brand-lime" /> /// Made For You
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-transparent text-stroke-white">
            The Process
          </h2>
          <p className="font-mono text-gray-400 text-xs sm:text-sm max-w-lg mx-auto mt-4">
            Click any step below to test-drive our interactive craftsmanship lab before building your official pair.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative mb-16">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-brand-lime border-y border-white -z-10 bg-[linear-gradient(90deg,_transparent_50%,_rgba(0,0,0,1)_50%)] bg-[length:20px_20px]" />

          {steps.map((step) => {
            const isActive = activeStep === step.num;

            return (
              <div 
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`relative group cursor-pointer p-6 border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-white/10 border-brand-lime shadow-[8px_8px_0px_0px_rgba(210,248,0,1)] -translate-y-2' 
                    : 'border-transparent hover:border-white/30 hover:bg-white/5'
                }`}
              >
                <div className={`w-24 h-24 border-4 text-4xl font-black rounded-full mx-auto mb-6 flex items-center justify-center transition-all ${
                  step.num === 1 ? 'bg-brand-lime border-white text-brand-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]' :
                  step.num === 2 ? 'bg-brand-black border-white text-brand-lime shadow-[8px_8px_0px_0px_rgba(210,248,0,1)]' :
                  'bg-brand-white border-brand-lime text-brand-black shadow-[8px_8px_0px_0px_rgba(150,150,150,1)]'
                } group-hover:scale-105`}>
                  {step.num}
                </div>
                
                <div className="text-center">
                  <span className="text-[10px] font-mono text-brand-lime bg-black/60 px-2 py-0.5 border border-brand-lime uppercase mb-2 inline-block font-bold">
                    {step.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase mb-3 italic">{step.title}</h3>
                  <p className="font-mono text-gray-400 text-xs sm:text-sm leading-relaxed px-2">{step.desc}</p>
                </div>

                {isActive && (
                  <div className="mt-4 text-center">
                    <span className="text-xs font-mono text-brand-lime underline uppercase font-bold animate-pulse">
                      /// ACTIVE LABORATORY DOWN BELOW ↓
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Step Demo Laboratory Panel */}
        <div className="bg-brand-white text-brand-black border-4 border-brand-lime p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(210,248,0,1)] max-w-4xl mx-auto transition-all duration-300">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-brand-black pb-4 mb-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-brand-lime border border-black animate-ping" />
              <h4 className="font-black uppercase italic text-lg sm:text-xl">
                {activeStep === 1 && 'Step 1 Lab /// Silhouette Base Tester'}
                {activeStep === 2 && 'Step 2 Lab /// Instant Material Swatch Blender'}
                {activeStep === 3 && 'Step 3 Lab /// Verified Flex Card Generator'}
              </h4>
            </div>
            <span className="font-mono text-xs bg-brand-black text-brand-white px-2.5 py-1 uppercase font-bold">
              INTERACTIVE DEMO 0{activeStep}
            </span>
          </div>

          {/* DEMO 1: Silhouette Base Switcher */}
          {activeStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 bg-brand-gray border-2 border-brand-black p-4 aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                <span className="absolute top-2 left-2 text-[10px] font-mono bg-white px-2 py-0.5 border border-black uppercase font-bold">
                  BASE REF #0{demoBaseIdx + 1}
                </span>
                <img 
                  src={SILHOUETTE_BASES[demoBaseIdx].image} 
                  alt="Base" 
                  className="w-full h-full object-contain drop-shadow-xl transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="md:col-span-7 space-y-4">
                <div>
                  <h5 className="font-black text-2xl uppercase italic leading-none">{SILHOUETTE_BASES[demoBaseIdx].name}</h5>
                  <span className="font-mono font-bold text-sm text-brand-black/70">Base Price: ${SILHOUETTE_BASES[demoBaseIdx].basePrice} USD</span>
                </div>
                <p className="font-mono text-xs text-gray-700 leading-relaxed">{SILHOUETTE_BASES[demoBaseIdx].description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {SILHOUETTE_BASES.map((b, i) => (
                    <button
                      key={b.id}
                      onClick={() => setDemoBaseIdx(i)}
                      className={`px-3 py-2 font-mono text-xs font-bold uppercase border-2 border-brand-black transition-all ${
                        demoBaseIdx === i ? 'bg-brand-lime text-black shadow-brutal-sm scale-105' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      {b.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => onOpenStudio({ baseSilhouetteId: SILHOUETTE_BASES[demoBaseIdx].id })} 
                  className="w-full bg-brand-black text-white py-3 font-bold uppercase text-xs hover:bg-brand-lime hover:text-black transition-colors border border-black shadow-brutal-sm mt-2 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Customize This Silhouette Now
                </button>
              </div>
            </div>
          )}

          {/* DEMO 2: Material Color Swatch Blender */}
          {activeStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 flex flex-col items-center">
                <div 
                  className="w-full aspect-[4/3] border-4 border-brand-black p-6 flex flex-col justify-between shadow-brutal transition-colors duration-500 relative overflow-hidden"
                  style={{ backgroundColor: COLOR_PALETTES[demoColorIdx].hex }}
                >
                  <div className="flex justify-between items-start">
                    <span 
                      className="font-black text-2xl uppercase italic tracking-tighter"
                      style={{ color: COLOR_PALETTES[demoColorIdx].textColor }}
                    >
                      CREATE™ FOAM
                    </span>
                    <span className="font-mono text-[10px] bg-black text-white px-2 py-0.5 uppercase">
                      SAMPLE PATCH
                    </span>
                  </div>
                  <div 
                    className="font-mono text-xs font-bold leading-tight"
                    style={{ color: COLOR_PALETTES[demoColorIdx].textColor }}
                  >
                    Colorway: {COLOR_PALETTES[demoColorIdx].name}<br />
                    Density: 0.18g/cm³ High Rebound
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 space-y-4">
                <h5 className="font-black uppercase text-xl italic">Test Live Colorway Swatches</h5>
                <p className="font-mono text-xs text-gray-700">
                  Click any swatch below to test how our Create™ foam resin and ballistic mesh absorb pigment in direct lighting.
                </p>
                <div className="grid grid-cols-5 gap-2.5">
                  {COLOR_PALETTES.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setDemoColorIdx(i)}
                      style={{ backgroundColor: c.hex }}
                      className={`h-12 border-2 border-brand-black transition-transform flex items-center justify-center font-mono text-[10px] font-bold ${
                        demoColorIdx === i ? 'scale-110 ring-2 ring-black shadow-brutal-sm z-10' : 'hover:scale-105 opacity-80'
                      }`}
                      title={c.name}
                    >
                      {demoColorIdx === i && <CheckCircle2 className="w-4 h-4 text-black bg-white/80 rounded-full" />}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveStep(3)} 
                  className="w-full bg-brand-black text-white py-3 font-bold uppercase text-xs hover:bg-brand-lime hover:text-black transition-colors border border-black shadow-brutal-sm mt-2 flex items-center justify-center gap-2"
                >
                  <span>Next: See How Creators Flex Their Pairs</span>
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* DEMO 3: Flex Card Generator */}
          {activeStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-4">
                <h5 className="font-black uppercase text-xl italic">Generate Your Official Community Tag</h5>
                <p className="font-mono text-xs text-gray-700">
                  Enter your social handle to preview your verified #SoleCulture flex badge that gets featured on our homepage when your custom pair drops.
                </p>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase block">Your Social Handle (@handle):</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="@alex_streetwear" 
                      className="flex-1 border-2 border-brand-black p-2.5 font-mono text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-brand-lime"
                    />
                    <button 
                      onClick={() => setGeneratedCard(true)}
                      className="bg-brand-black text-white px-4 font-bold uppercase text-xs hover:bg-brand-lime hover:text-black transition-colors border border-black"
                    >
                      Generate
                    </button>
                  </div>
                </div>
                {generatedCard && (
                  <div className="text-[11px] font-mono text-green-700 bg-green-50 p-2 border border-green-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Badge ready! Share this on Instagram or TikTok with #SoleCulture.
                  </div>
                )}
              </div>

              <div className="md:col-span-6 flex justify-center">
                <div className="w-full max-w-sm bg-white border-4 border-brand-black p-4 shadow-brutal rotate-2 hover:rotate-0 transition-transform">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-brand-black font-mono text-[10px] font-bold uppercase">
                    <span className="flex items-center gap-1"><Camera className="w-3.5 h-3.5" /> VERIFIED CREATOR</span>
                    <span className="bg-brand-lime px-1.5 py-0.5 border border-black">1-OF-1 MEMBER</span>
                  </div>
                  <div className="aspect-[4/3] bg-brand-gray mb-3 border border-brand-black overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" alt="Flex" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-1 font-mono text-[10px] font-bold uppercase">
                      #KIXTRA STUDIO HEAT
                    </div>
                  </div>
                  <div className="font-black text-base uppercase leading-tight">{handle || '@CREATOR'}</div>
                  <div className="font-mono text-[11px] text-gray-500">Custom Vortex Runner • Summer 2026 Edition</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Main CTA */}
        <div className="text-center mt-20">
          <button 
            onClick={onOpenStudio}
            className="bg-brand-lime text-brand-black px-12 sm:px-16 py-6 font-black uppercase tracking-widest text-lg sm:text-xl hover:bg-white transition-all border-4 border-white shadow-[8px_8px_0px_0px_#ffffff] hover:shadow-[12px_12px_0px_0px_#ffffff] hover:-translate-y-1 inline-flex items-center gap-3 animate-bounce hover:animate-none"
          >
            <Sparkles className="w-6 h-6 fill-current" />
            <span>Start Customizing Your Pair Now</span>
          </button>
        </div>

      </div>
    </section>
  );
};
