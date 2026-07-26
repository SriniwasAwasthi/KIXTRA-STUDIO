import React, { useState, useMemo } from 'react';
import { ShoppingBag, Eye, Star, Check, Sparkles, Filter, Search, X, ShieldCheck } from 'lucide-react';
import { SNEAKER_CATALOG } from '../data/sneakersData';
import { SneakerProduct, CartItem } from '../types/sneaker';

interface TrendingHeatProps {
  onAddToCart: (item: CartItem) => void;
  onOpenStudio: () => void;
}

export const TrendingHeat: React.FC<TrendingHeatProps> = ({ onAddToCart, onOpenStudio }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'New' | 'Hot' | 'Limited' | 'Platform' | 'Unisex'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<SneakerProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<number>(10);
  const [selectedAngleIdx, setSelectedAngleIdx] = useState(0);
  const [addedToastId, setAddedToastId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return SNEAKER_CATALOG.filter((p) => {
      const matchesTab = activeTab === 'All' || p.tags.includes(activeTab as any);
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.colorway.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [activeTab, searchQuery, sortBy]);

  const handleQuickAdd = (product: SneakerProduct, size: number) => {
    const item: CartItem = {
      id: `${product.id}-${size}-${Date.now()}`,
      type: 'catalog',
      product,
      size,
      quantity: 1,
      price: product.price,
      name: product.name,
      subtitle: product.subtitle,
      image: product.image,
      addedAt: Date.now(),
    };
    onAddToCart(item);
    setAddedToastId(product.id);
    setTimeout(() => setAddedToastId(null), 2000);
  };

  const handleOpenQuickView = (product: SneakerProduct) => {
    setQuickViewProduct(product);
    setSelectedSize(product.sizes[Math.floor(product.sizes.length / 2)] || 10);
    setSelectedAngleIdx(0);
  };

  const categories: ('All' | 'New' | 'Hot' | 'Limited' | 'Platform' | 'Unisex')[] = [
    'All', 'New', 'Hot', 'Limited', 'Platform', 'Unisex'
  ];

  return (
    <section id="catalog" className="py-20 px-6 border-b-2 border-brand-black bg-brand-gray/30 relative">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-brand-black mb-3 bg-brand-white px-3 py-1 border border-brand-black shadow-brutal-sm">
              <Filter className="w-3.5 h-3.5" /> /// IN-STOCK SILHOUETTES
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Trending <br />
              <span className="text-brand-lime bg-brand-black px-4 inline-block transform -rotate-2 shadow-brutal mt-1">Heat</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH SILHOUETTE..." 
                className="w-full bg-brand-white border-2 border-brand-black pl-9 pr-4 py-2.5 font-mono text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-brand-lime shadow-brutal-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-gray-500 hover:text-black" />
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-brand-white border-2 border-brand-black px-4 py-2.5 font-mono text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-brand-lime shadow-brutal-sm cursor-pointer"
            >
              <option value="featured">Sort: Featured Heat</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b-2 border-brand-black pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-3 font-black text-sm uppercase tracking-wider transition-all border-2 border-brand-black ${
                activeTab === cat 
                  ? 'bg-brand-black text-brand-lime shadow-brutal -translate-y-1' 
                  : 'bg-brand-white text-brand-black hover:bg-brand-lime shadow-brutal-sm'
              }`}
            >
              {cat === 'All' ? '⚡ All Silhouettes' : `# ${cat}`}
            </button>
          ))}
          <button
            onClick={onOpenStudio}
            className="ml-auto px-6 py-3 font-black text-sm uppercase tracking-wider bg-brand-lime text-brand-black border-2 border-brand-black shadow-brutal hover:bg-white transition-all flex items-center gap-2 animate-pulse hover:animate-none"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Design 1-of-1 Custom</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-brand-white border-2 border-brand-black p-12 text-center shadow-brutal max-w-xl mx-auto my-12">
            <h3 className="text-2xl font-black uppercase mb-2">No Heat Found</h3>
            <p className="font-mono text-xs text-gray-600 mb-6">No sneakers matched your search "{searchQuery}" in category #{activeTab}.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
              className="bg-brand-black text-brand-white px-6 py-3 font-bold uppercase text-xs hover:bg-brand-lime hover:text-brand-black border border-brand-black"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const isJustAdded = addedToastId === product.id;

              return (
                <div key={product.id} className="group flex flex-col h-full">
                  <div className="relative bg-white border-2 border-brand-black mb-4 overflow-hidden aspect-[4/5] shadow-brutal group-hover:shadow-brutal-lg group-hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                    
                    {/* Top Tag Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                      {product.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className={`border-2 border-brand-black px-2.5 py-1 text-[11px] font-black uppercase tracking-widest shadow-brutal-sm ${
                            tag === 'New' ? 'bg-brand-lime text-brand-black' :
                            tag === 'Hot' ? 'bg-brand-black text-brand-lime' :
                            tag === 'Limited' ? 'bg-red-500 text-white' :
                            'bg-white text-black'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Quick View Floating Button */}
                    <button 
                      onClick={() => handleOpenQuickView(product)}
                      className="absolute top-3 right-3 z-10 w-10 h-10 bg-brand-white border-2 border-brand-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-lime shadow-brutal-sm"
                      title="Quick View Specs"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {/* Main Shoe Image */}
                    <div 
                      onClick={() => handleOpenQuickView(product)}
                      className="flex-1 w-full flex items-center justify-center p-6 cursor-pointer bg-gradient-to-b from-transparent to-brand-gray/30"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-500 drop-shadow-xl" 
                      />
                    </div>

                    {/* Slide-Up Bottom Add to Bag / Customize Bar */}
                    <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 grid grid-cols-2 border-t-2 border-brand-black z-20">
                      <button 
                        onClick={() => handleQuickAdd(product, product.sizes[2] || 10)}
                        disabled={isJustAdded}
                        className={`py-3.5 px-2 font-bold text-xs uppercase flex items-center justify-center gap-1.5 border-r-2 border-brand-black transition-colors ${
                          isJustAdded ? 'bg-brand-lime text-brand-black font-black' : 'bg-brand-black text-white hover:bg-brand-lime hover:text-brand-black'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added!
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" /> + Bag
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => handleOpenQuickView(product)}
                        className="py-3.5 px-2 bg-brand-white text-brand-black font-bold text-xs uppercase hover:bg-gray-100 flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" /> Specs
                      </button>
                    </div>

                  </div>

                  {/* Product Info Below Card */}
                  <div className="flex justify-between items-start mt-auto">
                    <div className="flex-1 pr-2">
                      <h3 
                        onClick={() => handleOpenQuickView(product)}
                        className="font-black uppercase text-lg leading-tight group-hover:text-brand-lime bg-brand-black text-white px-1.5 py-0.5 inline-block transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 font-mono mt-1 uppercase font-bold">{product.subtitle}</p>
                      <div className="flex items-center gap-1 mt-1.5 text-[11px] font-mono text-gray-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-black">{product.rating}</span>
                        <span>({product.reviewsCount} reviews)</span>
                      </div>
                    </div>
                    <span className="font-mono font-black text-xl border-b-4 border-brand-lime pb-0.5 whitespace-nowrap">
                      ${product.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-brand-white border-4 border-brand-black shadow-brutal-white w-full max-w-4xl overflow-hidden relative my-auto animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-brand-black text-white px-6 py-4 flex justify-between items-center border-b-2 border-brand-black">
              <div className="flex items-center gap-2">
                <span className="bg-brand-lime text-black font-mono text-xs font-bold px-2 py-0.5 uppercase">SPEC VIEW</span>
                <h3 className="font-black text-xl uppercase italic tracking-tighter">{quickViewProduct.name} — {quickViewProduct.subtitle}</h3>
              </div>
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold hover:bg-brand-lime border border-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 gap-8 max-h-[80vh] overflow-y-auto">
              
              {/* Left: Gallery */}
              <div className="md:col-span-6 flex flex-col items-center">
                <div className="w-full aspect-square bg-brand-gray border-2 border-brand-black p-6 flex items-center justify-center mb-4 shadow-brutal-sm relative overflow-hidden">
                  <span className="absolute top-2 left-2 font-mono text-[10px] bg-white px-2 py-0.5 border border-black uppercase font-bold">
                    Angle 0{selectedAngleIdx + 1}
                  </span>
                  <img 
                    src={quickViewProduct.angleImages[selectedAngleIdx] || quickViewProduct.image} 
                    alt={quickViewProduct.name}
                    className="w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform"
                  />
                </div>
                {/* Angle Thumbnails */}
                {quickViewProduct.angleImages.length > 1 && (
                  <div className="flex gap-2 w-full">
                    {quickViewProduct.angleImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAngleIdx(idx)}
                        className={`flex-1 aspect-square bg-brand-gray border-2 border-brand-black p-1 transition-all ${
                          selectedAngleIdx === idx ? 'ring-2 ring-brand-lime scale-105 shadow-brutal-sm' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumb" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Specs & Actions */}
              <div className="md:col-span-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline border-b-2 border-brand-black pb-3">
                    <span className="font-mono text-xs font-bold text-gray-500 uppercase">{quickViewProduct.movementProfile}</span>
                    <span className="font-mono font-black text-3xl text-brand-black">${quickViewProduct.price}</span>
                  </div>

                  <p className="font-mono text-xs text-gray-700 leading-relaxed">{quickViewProduct.description}</p>

                  {/* Technical Specs List */}
                  <div className="bg-brand-gray/50 p-3 border border-brand-black space-y-1.5 font-mono text-xs">
                    <span className="font-bold uppercase text-black block mb-1">/// Engineered Specifications:</span>
                    {quickViewProduct.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-lime border border-black" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Size Selector */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-black uppercase">Select US Size:</label>
                      <span className="text-[11px] font-mono text-gray-500">In Stock for Immediate Dispatch</span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`py-2 border-2 border-brand-black font-mono font-bold text-xs transition-all ${
                            selectedSize === s ? 'bg-brand-lime text-brand-black shadow-brutal-sm scale-105' : 'bg-white hover:bg-gray-100'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="space-y-3 pt-4 border-t border-brand-gray">
                  <button
                    onClick={() => {
                      handleQuickAdd(quickViewProduct, selectedSize);
                      setQuickViewProduct(null);
                    }}
                    className="w-full bg-brand-black text-brand-white py-4 font-black text-sm uppercase tracking-widest hover:bg-brand-lime hover:text-brand-black transition-colors border-2 border-brand-black shadow-brutal flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5 fill-current" />
                    <span>Add to Bag — US {selectedSize} (${quickViewProduct.price})</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickViewProduct(null);
                      onOpenStudio();
                    }}
                    className="w-full bg-brand-white text-brand-black py-3 font-bold text-xs uppercase hover:bg-gray-100 border-2 border-brand-black flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Customize This Model in 3D Studio</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-brand-gray px-6 py-3 border-t-2 border-brand-black flex items-center justify-between text-[11px] font-mono text-gray-600">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-brand-black" /> 30-Day Easy Return Guarantee</span>
              <span>Express Shipping Available at Checkout</span>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
