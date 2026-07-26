import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, RotateCw, ShieldCheck, Zap } from 'lucide-react';
import { COLOR_PALETTES } from '../data/sneakersData';

interface HeroStudioProps {
  onOpenStudio: () => void;
}

export const HeroStudio: React.FC<HeroStudioProps> = ({ onOpenStudio }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [wishes, setWishes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [consultationRef, setConsultationRef] = useState('');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [heroAccentColor, setHeroAccentColor] = useState(COLOR_PALETTES[0]); // Acid Lime default
  const [shoeImageIdx, setShoeImageIdx] = useState(0);

  const shoeImages = [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop', // White/clean
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop', // Neon/vortex
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop', // Purple/cyber
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop', // Green/volt
    '/solar_flare.png', // Solar Flare Neon
    'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=1000&auto=format&fit=crop', // Hyper Strider
  ];

  const handleSubmitWishes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !wishes) {
      alert('Please enter your email and sneaker wishes to initiate your custom build consultation!');
      return;
    }
    const randomRef = 'SC-BUILD-' + Math.floor(1000 + Math.random() * 9000);
    setConsultationRef(randomRef);
    setFormSubmitted(true);
  };

  const hotspots = [
    { id: 1, title: 'Breathable Mesh Upper', desc: 'Ballistic aerodynamic weave engineered for 360° airflow and zero moisture build-up.', top: '40%', left: '30%' },
    { id: 2, title: 'Customizable Lace Loops', desc: 'Reinforced nylon webbing eyelets that can be color-matched or contrast-stitched.', top: '25%', left: '60%' },
    { id: 3, title: 'Impact Absorbing Sole', desc: 'Signature Create™ foam resin midsole delivers 40% more rebound than traditional rubber.', top: '60%', left: '80%' },
    { id: 4, title: 'Arch Support Technology', desc: 'Ergonomic carbon fiber shank plate aligns foot posture for all-day city endurance.', top: '80%', left: '45%' },
  ];

  return (
    <section id="hero" className="relative border-b-2 border-brand-black overflow-hidden bg-brand-white">
      {/* Background Cloud / Texture Accent */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none transition-all duration-700" 
        style={{
          backgroundImage: `radial-gradient(circle at 75% 50%, ${heroAccentColor.hex} 0%, transparent 60%), url('https://images.unsplash.com/photo-1594492215849-f554425dd943?q=80&w=2000&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[680px] relative z-10">
        
        {/* Left: Customization Wishes Form */}
        <div className="lg:col-span-5 p-6 md:p-14 lg:p-16 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-brand-black bg-white/90 backdrop-blur-md lg:bg-white/80">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-black text-brand-lime font-mono text-xs font-bold uppercase tracking-widest w-fit mb-6 border border-brand-black shadow-brutal-sm">
            <Zap className="w-3.5 h-3.5 fill-brand-lime" /> 1-of-1 Street Craftsmanship
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-black leading-[0.92] mb-8 uppercase tracking-tighter">
            Create your first <br />
            customizable <span className="text-stroke-black text-transparent bg-clip-text bg-brand-black">Sneakers</span>
          </h1>

          <p className="font-mono text-sm text-gray-700 mb-8 max-w-md leading-relaxed">
            Don't just wear what everyone else is wearing. Design your exact aesthetic using our modular brutalist sneaker platform.
          </p>

          {!formSubmitted ? (
            <form onSubmit={handleSubmitWishes} className="space-y-5 max-w-md relative z-20 bg-brand-white p-6 border-2 border-brand-black shadow-brutal">
              <div className="flex items-center justify-between border-b-2 border-brand-black pb-3 mb-2">
                <span className="font-black uppercase text-sm italic">Custom Wish Consult</span>
                <span className="text-[10px] font-mono bg-brand-lime px-2 py-0.5 font-bold border border-brand-black">FREE 3D PROTO</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider block">Your Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ALEX MERCER" 
                    className="w-full border-2 border-brand-black p-2.5 bg-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-lime"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider block">Email *</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ALEX@CULTURE.COM" 
                    className="w-full border-2 border-brand-black p-2.5 bg-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-lime"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider block">Tell us about your dream sneaker</label>
                <textarea 
                  rows={3} 
                  required
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="e.g., I want an acid green high-top with reflective silver laces and my initials 'AM' embroidered on the heel strap..." 
                  className="w-full border-2 border-brand-black p-2.5 bg-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-lime resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-brand-black text-brand-white py-4 font-bold uppercase tracking-widest hover:bg-brand-lime hover:text-brand-black transition-all border-2 border-brand-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm flex items-center justify-center gap-2"
              >
                <span>Send Wishes to Studio</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] font-mono text-gray-500">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-brand-black" /> 2-Week Turnaround</span>
                <span>•</span>
                <span>100% Fit Guarantee</span>
              </div>
            </form>
          ) : (
            <div className="bg-brand-lime border-2 border-brand-black p-6 shadow-brutal max-w-md space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-3 border-b-2 border-brand-black pb-3">
                <CheckCircle2 className="w-8 h-8 text-brand-black flex-shrink-0" />
                <div>
                  <h3 className="font-black text-lg uppercase italic leading-none">Consultation Initiated!</h3>
                  <span className="text-xs font-mono">Ref: {consultationRef}</span>
                </div>
              </div>
              <p className="font-mono text-xs text-brand-black leading-relaxed">
                Thank you <strong className="uppercase">{name || 'Creator'}</strong>! Our Master Cobbler AI & design team have received your wish specs. We sent a preliminary 3D mockup link to <strong>{email}</strong>.
              </p>
              <div className="bg-brand-white p-3 border border-brand-black font-mono text-xs space-y-1">
                <div className="font-bold uppercase text-gray-400 text-[10px]">Your Specification Preview:</div>
                <div className="italic">"{wishes}"</div>
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={onOpenStudio} 
                  className="flex-1 bg-brand-black text-brand-white py-3 px-4 font-bold uppercase text-xs hover:bg-white hover:text-brand-black border-2 border-brand-black shadow-brutal-sm transition-colors text-center"
                >
                  Launch 3D Builder Now
                </button>
                <button 
                  onClick={() => { setFormSubmitted(false); setWishes(''); }} 
                  className="bg-brand-white text-brand-black py-3 px-4 font-bold uppercase text-xs hover:bg-gray-100 border-2 border-brand-black"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Product Showcase & Interactive Studio Preview */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[500px] lg:min-h-[680px] bg-brand-sky/20 overflow-hidden p-6 md:p-12">
          
          {/* Big Background Text */}
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-brand-black opacity-10 select-none italic -rotate-12 pointer-events-none whitespace-nowrap">
            FUTURE
          </h2>

          {/* Interactive Mode Badge & Studio CTA at top right */}
          <div className="absolute top-6 right-6 z-30 flex flex-col sm:flex-row items-end sm:items-center gap-3">
            <button
              onClick={() => setShoeImageIdx((prev) => (prev + 1) % shoeImages.length)}
              className="bg-brand-white text-brand-black border-2 border-brand-black px-3 py-2 font-mono font-bold text-xs shadow-brutal-sm hover:bg-brand-lime transition-all flex items-center gap-1.5"
              title="Rotate Silhouette Base"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rotate View ({shoeImageIdx + 1}/{shoeImages.length})</span>
            </button>
            <button
              onClick={onOpenStudio}
              className="bg-brand-black text-brand-lime border-2 border-brand-black px-5 py-3 font-black text-sm uppercase tracking-wider shadow-brutal hover:bg-brand-lime hover:text-brand-black hover:shadow-brutal-lg transition-all flex items-center gap-2 animate-bounce hover:animate-none"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Launch 3D Custom Studio</span>
            </button>
          </div>

          {/* Main Shoe Image Container with Hotspots */}
          <div className="relative w-full max-w-xl mx-auto my-auto p-6 transition-transform duration-500">
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              <img 
                src={shoeImages[shoeImageIdx]} 
                alt="Sneaker Silhouette Preview" 
                className="w-full h-auto max-h-[420px] object-contain drop-shadow-2xl relative z-10 rotate-[-12deg] block select-none cursor-pointer"
                onClick={onOpenStudio}
              />

              {/* Hotspots */}
              {hotspots.map((spot) => (
                <div 
                  key={spot.id}
                  className="absolute z-20 group" 
                  style={{ left: spot.left, top: spot.top }}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                >
                  <div className="w-9 h-9 bg-brand-lime rounded-full border-2 border-brand-black flex items-center justify-center font-black text-sm cursor-pointer hover:scale-125 transition-transform shadow-brutal-sm text-brand-black animate-pulse group-hover:animate-none">
                    {spot.id}
                  </div>
                  
                  {/* Expanded Info Box */}
                  <div className={`absolute left-11 top-0 w-56 bg-brand-white border-2 border-brand-black p-3 text-xs font-bold uppercase transition-all duration-200 pointer-events-none shadow-brutal z-30 ${
                    activeHotspot === spot.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}>
                    <div className="text-brand-lime bg-brand-black px-1.5 py-0.5 inline-block text-[10px] mb-1 font-mono">
                      SPEC 0{spot.id}
                    </div>
                    <div className="font-black text-brand-black mb-1 leading-tight">{spot.title}</div>
                    <div className="font-mono text-[11px] text-gray-600 font-normal leading-normal">{spot.desc}</div>
                  </div>
                  <div className={`absolute right-full top-1/2 h-0.5 bg-brand-black transition-all duration-200 ${
                    activeHotspot === spot.id ? 'w-8' : 'w-0'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Floating text bubbles from template */}
          <div className="absolute top-12 left-6 lg:left-10 bg-white border-2 border-brand-black p-3 max-w-[200px] shadow-brutal rotate-[-3deg] hidden sm:block z-20 pointer-events-none">
            <p className="text-xs font-mono font-bold leading-tight">Create™: the lightweight foam resin that isn't rubber, isn't plastic.</p>
          </div>
          <div className="absolute bottom-24 right-6 lg:right-10 bg-white border-2 border-brand-black p-3 max-w-[200px] shadow-brutal rotate-[4deg] hidden sm:block z-20 pointer-events-none">
            <p className="text-xs font-mono font-bold leading-tight">Heel strap keeps this thing locked on your feet during urban sprints.</p>
          </div>

          {/* Interactive Color Switcher Dock at Bottom of Hero */}
          <div className="mt-auto z-30 bg-white/90 backdrop-blur-md border-2 border-brand-black p-3 sm:p-4 shadow-brutal w-full max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider whitespace-nowrap">Live Vibe Switcher:</span>
                <span className="text-xs font-mono px-2 py-0.5 bg-brand-black text-brand-white uppercase font-bold">
                  {heroAccentColor.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {COLOR_PALETTES.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setHeroAccentColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-7 h-7 rounded-none border-2 border-brand-black transition-transform ${
                      heroAccentColor.name === color.name ? 'scale-125 shadow-brutal-sm z-10' : 'hover:scale-110 opacity-80'
                    }`}
                    title={color.name}
                    aria-label={`Select accent color ${color.name}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
