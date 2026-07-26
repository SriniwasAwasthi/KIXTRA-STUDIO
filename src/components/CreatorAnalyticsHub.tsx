import React, { useState } from 'react';
import { BarChart3, TrendingUp, Flame, Sparkles, Sliders, Trophy, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import { SILHOUETTE_BASES, COLOR_PALETTES } from '../data/sneakersData';
import { CustomSneakerConfig } from '../types/sneaker';

interface CreatorAnalyticsHubProps {
  onOpenStudio: (config?: Partial<CustomSneakerConfig>) => void;
}

export const CreatorAnalyticsHub: React.FC<CreatorAnalyticsHubProps> = ({ onOpenStudio }) => {
  const [selectedBaseIdx, setSelectedBaseIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // For Before/After comparison slider
  const [activeTab, setActiveTab] = useState<'heatmap' | 'comparison' | 'leaderboard'>('heatmap');

  const currentBase = SILHOUETTE_BASES[selectedBaseIdx] || SILHOUETTE_BASES[0];

  // State to make live trend matrix fully customizable
  const [popularityStats, setPopularityStats] = useState([
    { id: 'TREND-01', name: 'Acid Lime / Carbon', percentage: 42, color: '#D2F800', textColor: '#000000', change: '+14% this week', baseSilhouetteId: 'base-vortex', upperColorName: 'Acid Lime', soleColorName: 'Carbon Black' },
    { id: 'TREND-02', name: 'Triple Pure White', percentage: 24, color: '#ffffff', textColor: '#000000', change: '+5% this week', baseSilhouetteId: 'base-glider', upperColorName: 'Pure White', soleColorName: 'Pure White' },
    { id: 'TREND-03', name: 'Electric Violet X', percentage: 18, color: '#9D4EDD', textColor: '#ffffff', change: '+22% this week', baseSilhouetteId: 'base-court', upperColorName: 'Electric Purple', soleColorName: 'Concrete Gray' },
    { id: 'TREND-04', name: 'Lava Magma Red', percentage: 11, color: '#FF3300', textColor: '#ffffff', change: '+8% this week', baseSilhouetteId: 'base-trek', upperColorName: 'Lava Magma', soleColorName: 'Carbon Black' },
    { id: 'TREND-05', name: 'Biohazard Green', percentage: 5, color: '#00FF66', textColor: '#000000', change: 'NEW DROP', baseSilhouetteId: 'base-strider', upperColorName: 'Biohazard Green', soleColorName: 'Carbon Black' },
  ]);

  // Form states for adding new trends
  const [newTrendName, setNewTrendName] = useState('');
  const [newTrendPercentage, setNewTrendPercentage] = useState(15);
  const [newTrendChange, setNewTrendChange] = useState('+10% this week');
  const [newTrendColorName, setNewTrendColorName] = useState(COLOR_PALETTES[0].name);

  const handleAddNewTrend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrendName) return;
    const foundCol = COLOR_PALETTES.find(c => c.name === newTrendColorName) || COLOR_PALETTES[0];
    const newId = `TREND-0${popularityStats.length + 1}`;
    setPopularityStats([
      ...popularityStats,
      {
        id: newId,
        name: newTrendName,
        percentage: newTrendPercentage,
        color: foundCol.hex,
        textColor: foundCol.textColor,
        change: newTrendChange,
        baseSilhouetteId: currentBase.id,
        upperColorName: foundCol.name,
        soleColorName: 'Carbon Black'
      }
    ]);
    setNewTrendName('');
  };

  const handleCustomizeTrend = (stat: typeof popularityStats[0]) => {
    const foundUpper = COLOR_PALETTES.find(c => c.name === stat.upperColorName) || COLOR_PALETTES[0];
    const foundSole = COLOR_PALETTES.find(c => c.name === stat.soleColorName) || COLOR_PALETTES[1];
    
    // Open custom studio preloaded with these values
    onOpenStudio({
      baseSilhouetteId: stat.baseSilhouetteId || currentBase.id,
      upperColor: foundUpper,
      soleColor: foundSole,
      baseColor: foundUpper,
    });
  };

  const leaderboardCreators = [
    { rank: 1, handle: '@cyber_kai', build: 'Volt Strider X [Volt/Carbon]', likes: 1420, prize: 'FREE PAIR CLAIMED' },
    { rank: 2, handle: '@sarah_streetwear', build: 'Air Glider [Bubblegum Pink/Lime]', likes: 1184, prize: '$200 STUDIO CREDIT' },
    { rank: 3, handle: '@nova_runner', build: 'Hyper Strider [Lava Magma]', likes: 940, prize: '$100 STUDIO CREDIT' },
    { rank: 4, handle: '@marcus_kicks', build: 'Vortex Runner [Acid Lime/Carbon]', likes: 812, prize: 'VIP DROP ACCESS' },
  ];

  return (
    <section id="analytics" className="py-24 px-6 border-b-2 border-brand-black bg-brand-white relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-2 border-brand-black pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-brand-lime bg-brand-black px-3 py-1 border border-brand-black shadow-brutal-sm mb-3">
              <BarChart3 className="w-3.5 h-3.5 text-brand-lime" /> /// STREETWEAR HEAT ANALYTICS & MARKET INDEX
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Live Custom <br />
              <span className="text-brand-lime bg-brand-black px-4 inline-block transform -rotate-1 shadow-brutal mt-1">Trend Matrix</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto font-mono text-xs font-bold">
            <div className="bg-brand-gray border-2 border-brand-black p-3.5 shadow-brutal-sm flex items-center gap-3">
              <Activity className="w-5 h-5 text-green-600 animate-pulse" />
              <div>
                <span className="text-[10px] text-gray-500 block uppercase leading-none">Live Production Queue</span>
                <span className="text-sm font-black text-black">482 Custom Pairs In Progress</span>
              </div>
            </div>
            <div className="bg-brand-gray border-2 border-brand-black p-3.5 shadow-brutal-sm flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-brand-black" />
              <div>
                <span className="text-[10px] text-gray-500 block uppercase leading-none">Top Trending Silhouette</span>
                <span className="text-sm font-black text-black">Volt Strider X (+34%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Hub Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`flex-1 min-w-[200px] py-4 px-6 font-black text-sm uppercase tracking-wider transition-all border-2 border-brand-black flex items-center justify-center gap-2 ${
              activeTab === 'heatmap' 
                ? 'bg-brand-black text-brand-lime shadow-brutal -translate-y-1' 
                : 'bg-brand-gray text-brand-black hover:bg-white shadow-brutal-sm'
            }`}
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>1. Colorway Heatmap & Material Index</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex-1 min-w-[200px] py-4 px-6 font-black text-sm uppercase tracking-wider transition-all border-2 border-brand-black flex items-center justify-center gap-2 ${
              activeTab === 'comparison' 
                ? 'bg-brand-black text-brand-lime shadow-brutal -translate-y-1' 
                : 'bg-brand-gray text-brand-black hover:bg-white shadow-brutal-sm'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>2. Before vs. After Prototype Slider</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 min-w-[200px] py-4 px-6 font-black text-sm uppercase tracking-wider transition-all border-2 border-brand-black flex items-center justify-center gap-2 ${
              activeTab === 'leaderboard' 
                ? 'bg-brand-black text-brand-lime shadow-brutal -translate-y-1' 
                : 'bg-brand-gray text-brand-black hover:bg-white shadow-brutal-sm'
            }`}
          >
            <Trophy className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>3. Creator Weekly Champions</span>
          </button>
        </div>

        {/* TAB 1: COLORWAY HEATMAP & MATERIAL INDEX */}
        {activeTab === 'heatmap' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-brand-gray/40 border-4 border-brand-black p-6 md:p-10 shadow-brutal animate-in fade-in duration-200">
            
            {/* Left: Silhouette Picker */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-black uppercase text-2xl italic">Select Silhouette To Analyze:</h3>
              <p className="font-mono text-xs text-gray-700 leading-relaxed">
                Our AI market index tracks every material combination customized by users worldwide. Select a base model below to see real-time colorway demand.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {SILHOUETTE_BASES.map((base, idx) => (
                  <button
                    key={base.id}
                    onClick={() => setSelectedBaseIdx(idx)}
                    className={`p-3 border-2 border-brand-black text-left transition-all ${
                      selectedBaseIdx === idx 
                        ? 'bg-brand-lime shadow-brutal scale-102 ring-2 ring-black font-black' 
                        : 'bg-white hover:bg-gray-50 shadow-brutal-sm font-bold'
                    }`}
                  >
                    <div className="text-xs uppercase leading-tight">{base.name}</div>
                    <div className="font-mono text-[10px] text-gray-600 font-normal mt-1">Base: ${base.basePrice}</div>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-brand-black/20">
                <button
                  onClick={() => onOpenStudio({ baseSilhouetteId: currentBase.id })}
                  className="w-full bg-brand-black text-brand-lime py-4 font-black uppercase tracking-wider text-sm hover:bg-brand-lime hover:text-black transition-colors border-2 border-brand-black shadow-brutal flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Customize Trending {currentBase.name.split(' ')[0]} Now</span>
                </button>
              </div>
            </div>

            {/* Right: Live Animated Bar Chart Breakdown */}
            <div className="lg:col-span-7 bg-white border-2 border-brand-black p-6 sm:p-8 shadow-brutal-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b-2 border-brand-black pb-3 mb-6">
                  <div>
                    <span className="font-mono text-[10px] bg-black text-white px-2 py-0.5 uppercase font-bold">LIVE INDEX REPORT</span>
                    <h4 className="font-black text-xl uppercase italic mt-1">{currentBase.name} — Colorway Breakdown</h4>
                  </div>
                  <span className="font-mono text-xs text-green-700 font-bold bg-green-100 px-2.5 py-1 border border-green-600">
                    ● UPDATED 1 MIN AGO
                  </span>
                </div>

                {/* Bars */}
                <div className="space-y-5 font-mono text-xs">
                  {popularityStats.map((stat, i) => (
                    <div key={stat.id} className="space-y-1.5">
                      <div className="flex justify-between font-bold uppercase items-center">
                        <span className="flex items-center gap-2">
                          <button
                            onClick={() => handleCustomizeTrend(stat)}
                            className="bg-brand-black text-brand-lime px-2 py-0.5 border border-brand-black text-[10px] font-black uppercase hover:bg-brand-lime hover:text-black transition-colors shadow-brutal-sm"
                            title={`Customize preset ${stat.id}`}
                          >
                            {stat.id}
                          </button>
                          <span className="w-3 h-3 border border-black inline-block" style={{ backgroundColor: stat.color }} />
                          <span>{stat.name}</span>
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-gray-500 font-normal">{stat.change}</span>
                          <span className="text-black font-black">{stat.percentage}%</span>
                          <button
                            onClick={() => handleCustomizeTrend(stat)}
                            className="bg-brand-lime text-black border border-brand-black px-2.5 py-0.5 text-[10px] font-black hover:bg-black hover:text-brand-lime transition-all uppercase shadow-brutal-sm ml-2"
                          >
                            🎨 Customize Code
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-4 bg-brand-gray border-2 border-brand-black overflow-hidden relative">
                        <div
                          className="h-full transition-all duration-1000 border-r-2 border-black flex items-center justify-end pr-2 text-[10px] font-bold"
                          style={{ 
                            width: `${stat.percentage}%`, 
                            backgroundColor: stat.color,
                            color: stat.textColor
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-brand-gray flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-gray-600">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-black" /> Verified by 1,420 weekly custom submissions</span>
                <span className="font-bold text-black uppercase">Most Requested Accent: Neon Lime Thread</span>
              </div>
            </div>

            {/* Custom Trend Matrix Editor Panel */}
            <div className="lg:col-span-12 bg-white border-4 border-brand-black p-6 shadow-brutal mt-8">
              <div className="border-b-2 border-brand-black pb-3 mb-6">
                <h4 className="font-black text-xl uppercase italic">🎨 Customize Live Trend Matrix</h4>
                <p className="font-mono text-xs text-gray-600">Modify popularity values, edit metrics, or add custom trend entries below.</p>
              </div>

              {/* Rows Editor List */}
              <div className="space-y-3 mb-6 max-h-[250px] overflow-y-auto pr-1">
                {popularityStats.map((stat) => (
                  <div key={stat.id} className="flex flex-wrap items-center gap-4 bg-brand-gray/60 border-2 border-brand-black p-3 font-mono text-xs">
                    <div className="bg-brand-black text-brand-lime px-2.5 py-1 font-black">
                      {stat.id}
                    </div>
                    <div className="flex-1 min-w-[200px] grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-gray-500 font-bold block">TREND NAME</span>
                        <input 
                          type="text" 
                          value={stat.name} 
                          onChange={(e) => {
                            setPopularityStats(prev => prev.map(p => p.id === stat.id ? { ...p, name: e.target.value } : p));
                          }}
                          className="w-full border border-brand-black p-1 bg-white font-bold"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-gray-500 font-bold block">DEMAND %</span>
                        <input 
                          type="number" 
                          value={stat.percentage} 
                          onChange={(e) => {
                            setPopularityStats(prev => prev.map(p => p.id === stat.id ? { ...p, percentage: Number(e.target.value) } : p));
                          }}
                          className="w-full border border-brand-black p-1 bg-white font-bold"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-gray-500 font-bold block">CHANGE METRIC</span>
                        <input 
                          type="text" 
                          value={stat.change} 
                          onChange={(e) => {
                            setPopularityStats(prev => prev.map(p => p.id === stat.id ? { ...p, change: e.target.value } : p));
                          }}
                          className="w-full border border-brand-black p-1 bg-white font-bold"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-gray-500 font-bold block">COLOR PALETTE</span>
                        <select
                          value={stat.color}
                          onChange={(e) => {
                            const hex = e.target.value;
                            const foundCol = COLOR_PALETTES.find(c => c.hex === hex);
                            setPopularityStats(prev => prev.map(p => p.id === stat.id ? { ...p, color: hex, textColor: foundCol?.textColor || '#000000', upperColorName: foundCol?.name || p.upperColorName } : p));
                          }}
                          className="w-full border border-brand-black p-1 bg-white font-bold"
                        >
                          {COLOR_PALETTES.map(c => (
                            <option key={c.name} value={c.hex}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setPopularityStats(prev => prev.filter(p => p.id !== stat.id));
                      }}
                      className="bg-red-500 text-white font-bold px-3 py-2 border-2 border-brand-black shadow-brutal-sm hover:bg-red-600 text-xs uppercase"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Entry Form */}
              <form onSubmit={handleAddNewTrend} className="grid grid-cols-1 sm:grid-cols-5 gap-4 font-mono text-xs bg-brand-lime/10 border-2 border-dashed border-brand-black p-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold uppercase block">Trend Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newTrendName} 
                    onChange={(e) => setNewTrendName(e.target.value)}
                    placeholder="e.g. Cyber Pink / Slate" 
                    className="w-full border-2 border-brand-black p-2 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase block">Demand (%)</label>
                  <input 
                    type="number" 
                    required 
                    min={0} 
                    max={100}
                    value={newTrendPercentage} 
                    onChange={(e) => setNewTrendPercentage(Number(e.target.value))}
                    className="w-full border-2 border-brand-black p-2 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase block">Change Metric</label>
                  <input 
                    type="text" 
                    required 
                    value={newTrendChange} 
                    onChange={(e) => setNewTrendChange(e.target.value)}
                    placeholder="e.g. +12% this week" 
                    className="w-full border-2 border-brand-black p-2 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase block">Color Swatch</label>
                  <select
                    value={newTrendColorName}
                    onChange={(e) => setNewTrendColorName(e.target.value)}
                    className="w-full border-2 border-brand-black p-2 bg-white font-bold"
                  >
                    {COLOR_PALETTES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-5 flex justify-end">
                  <button 
                    type="submit"
                    className="bg-brand-black text-brand-lime px-8 py-3 border-2 border-brand-black font-black uppercase shadow-brutal hover:bg-brand-lime hover:text-black transition-colors"
                  >
                    Add Trend Row
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* TAB 2: BEFORE VS AFTER COMPARISON SLIDER */}
        {activeTab === 'comparison' && (
          <div className="bg-brand-black text-white border-4 border-brand-lime p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(210,248,0,1)] animate-in fade-in duration-200">
            
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="bg-brand-lime text-black font-mono text-xs font-bold px-3 py-1 uppercase border border-white inline-block mb-2">
                INTERACTIVE COMPARISON LABORATORY
              </span>
              <h3 className="text-3xl sm:text-5xl font-black uppercase italic leading-none">
                Raw Base <span className="text-brand-lime">VS</span> Custom 1-of-1
              </h3>
              <p className="font-mono text-xs sm:text-sm text-gray-400 mt-2">
                Drag the center handle horizontally to see how our Master Studio transforms a blank white silhouette into an armored neobrutalist masterpiece.
              </p>
            </div>

            {/* Comparison Container */}
            <div className="relative max-w-4xl mx-auto aspect-[16/9] sm:aspect-[2/1] bg-brand-gray/10 border-4 border-white overflow-hidden shadow-2xl select-none group">
              
              {/* IMAGE 1: AFTER (Custom Beast) */}
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-r from-brand-sky/20 via-transparent to-brand-lime/10">
                <img 
                  src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop" 
                  alt="After Custom Build" 
                  className="w-full h-full object-contain drop-shadow-2xl rotate-[-6deg]" 
                />
                <span className="absolute bottom-4 right-4 bg-brand-lime text-black font-mono font-black text-xs px-3 py-1.5 border-2 border-black shadow-brutal-sm uppercase">
                  AFTER /// CUSTOM 1-OF-1 ACID LIME ($185)
                </span>
              </div>

              {/* IMAGE 2: BEFORE (Raw White Base) with clip-path */}
              <div 
                className="absolute inset-0 flex items-center justify-center p-6 bg-white transition-all duration-75"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1000&auto=format&fit=crop" 
                  alt="Before Raw Base" 
                  className="w-full h-full object-contain drop-shadow-xl rotate-[-6deg] grayscale contrast-125" 
                />
                <span className="absolute bottom-4 left-4 bg-black text-white font-mono font-black text-xs px-3 py-1.5 border-2 border-white shadow-brutal-sm uppercase">
                  BEFORE /// RAW UNTREATED SILHOUETTE
                </span>
              </div>

              {/* DRAGGER HANDLE BAR */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-brand-lime border-x border-black cursor-ew-resize z-30 flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-10 h-10 bg-brand-lime text-black border-2 border-black rounded-full flex items-center justify-center font-black text-xs shadow-brutal transform -translate-x-1/2 hover:scale-125 transition-transform">
                  ↔
                </div>
              </div>

              {/* Range Input for drag support */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
                aria-label="Drag to compare before and after"
              />
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => onOpenStudio()}
                className="bg-brand-lime text-black px-12 py-4 font-black uppercase tracking-widest text-base hover:bg-white transition-colors border-2 border-white shadow-[6px_6px_0px_0px_#ffffff] inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 fill-current" />
                <span>Start Your Transformation in Studio</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: LEADERBOARD & WEEKLY CHAMPIONS */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white border-4 border-brand-black p-6 md:p-10 shadow-brutal animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-brand-black pb-6 mb-8 gap-4">
              <div>
                <span className="font-mono text-xs bg-amber-400 text-black px-2.5 py-0.5 border border-black uppercase font-bold">
                  👑 WEEK #28 DESIGN CHAMPIONS
                </span>
                <h3 className="font-black text-3xl sm:text-4xl uppercase italic mt-1">Creator Heat Leaderboard</h3>
              </div>
              <p className="font-mono text-xs text-gray-600 max-w-sm">
                Every Sunday, the top voted custom sneaker build wins a $200 studio credit or free physical production!
              </p>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-4">
              {leaderboardCreators.map((item) => (
                <div 
                  key={item.rank}
                  className={`p-4 sm:p-5 border-2 border-brand-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                    item.rank === 1 ? 'bg-brand-lime shadow-brutal ring-2 ring-black font-black' : 'bg-brand-gray/50 hover:bg-white shadow-brutal-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 border-2 border-black flex items-center justify-center font-black text-xl flex-shrink-0 ${
                      item.rank === 1 ? 'bg-black text-brand-lime shadow-brutal-sm' : 'bg-white text-black'
                    }`}>
                      #{item.rank}
                    </div>
                    <div>
                      <div className="font-black text-lg uppercase leading-tight">{item.handle}</div>
                      <div className="font-mono text-xs text-gray-700 font-bold mt-0.5">{item.build}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-300">
                    <div className="text-left sm:text-right font-mono">
                      <div className="text-xs text-gray-500 font-bold uppercase">Community Votes</div>
                      <div className="text-base font-black text-red-600 flex items-center gap-1">
                        <span>❤️ {item.likes} Likes</span>
                      </div>
                    </div>

                    <div className="bg-black text-white font-mono text-xs font-bold px-3 py-2 border border-black uppercase whitespace-nowrap">
                      {item.prize}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-brand-black flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs">
              <span>Want to compete? Design your pair in the 3D studio and post it to the community wall!</span>
              <button
                onClick={() => onOpenStudio()}
                className="bg-brand-black text-brand-lime px-6 py-3 font-bold uppercase hover:bg-brand-lime hover:text-black transition-colors border border-black shadow-brutal-sm flex items-center gap-2 whitespace-nowrap"
              >
                <span>Enter Next Week's Competition</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
