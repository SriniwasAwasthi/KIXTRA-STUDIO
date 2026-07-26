import React, { useState, useEffect } from 'react';
import { Star, ShoppingBag, Menu, X, Flame, Bell, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenStudio: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenStudio,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartWiggle, setCartWiggle] = useState(false);
  const [dropTimeLeft, setDropTimeLeft] = useState('02:14:38');
  const [showDropAlarm, setShowDropAlarm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cart button when count changes
  useEffect(() => {
    if (cartCount > 0) {
      setCartWiggle(true);
      const timer = setTimeout(() => setCartWiggle(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Simulate countdown timer for VIP drop
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = 2 - (now.getHours() % 3);
      const mins = 59 - now.getMinutes();
      const secs = 59 - now.getSeconds();
      setDropTimeLeft(
        `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 bg-brand-white border-b-2 border-brand-black transition-all ${scrolled ? 'shadow-brutal-lg' : ''}`}>
      {/* Top Marquee */}
      <div className="bg-brand-lime text-brand-black overflow-hidden py-2 whitespace-nowrap relative border-b-2 border-brand-black z-50">
        <div className="inline-block animate-[marquee-left_20s_linear_infinite] font-bold uppercase tracking-wider text-xs md:text-sm">
          <span className="mx-4">+++ OPEN FOR NEW COLLECTION +++ NEW DROPS AVAILABLE NOW</span>
          <span className="mx-4">+++ FREE EXPRESS SHIPPING ON ORDERS OVER $200</span>
          <span className="mx-4">+++ 1-OF-1 CUSTOM SNEAKER BUILDER NOW LIVE</span>
          <span className="mx-4">+++ OPEN FOR NEW COLLECTION +++ NEW DROPS AVAILABLE NOW</span>
          <span className="mx-4">+++ FREE EXPRESS SHIPPING ON ORDERS OVER $200</span>
          <span className="mx-4">+++ 1-OF-1 CUSTOM SNEAKER BUILDER NOW LIVE</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-[1920px] mx-auto flex justify-between items-center h-16 pl-6 pr-2">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 bg-brand-black rounded-full flex items-center justify-center text-brand-white group-hover:bg-brand-lime group-hover:text-brand-black transition-colors border border-brand-black">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-brand-lime transition-colors bg-brand-black text-brand-white px-2 py-0.5">
            KIXTRA /// STUDIO
          </span>
        </a>

        {/* Drop Alarm Ticker (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 bg-brand-black text-brand-lime px-3 py-1 text-xs font-mono font-bold uppercase border border-brand-black shadow-brutal-sm cursor-pointer hover:bg-brand-white hover:text-brand-black transition-colors"
          onClick={() => setShowDropAlarm(!showDropAlarm)}
        >
          <Flame className="w-4 h-4 text-brand-lime animate-bounce" />
          <span>NEXT VIP DROP: {dropTimeLeft}</span>
          <Bell className="w-3.5 h-3.5 ml-1" />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center h-full">
          <button 
            onClick={onOpenStudio} 
            className="h-full flex items-center gap-1.5 px-5 hover:bg-brand-lime border-l-2 border-brand-black font-bold text-sm uppercase transition-colors text-brand-black group bg-brand-lime/20 animate-pulse hover:animate-none"
          >
            <Sparkles className="w-4 h-4 text-brand-black" />
            <span>3D Studio</span>
          </button>
          <button 
            onClick={() => handleNavClick('catalog')} 
            className="h-full flex items-center px-5 hover:bg-brand-lime border-l-2 border-brand-black font-bold text-sm uppercase transition-colors text-brand-black"
          >
            Catalog
          </button>
          <button 
            onClick={() => handleNavClick('spotlight')} 
            className="h-full flex items-center px-5 hover:bg-brand-lime border-l-2 border-brand-black font-bold text-sm uppercase transition-colors text-brand-black bg-brand-sky/20"
          >
            🔥 Spotlight
          </button>
          <button 
            onClick={() => handleNavClick('analytics')} 
            className="h-full flex items-center px-5 hover:bg-brand-lime border-l-2 border-brand-black font-bold text-sm uppercase transition-colors text-brand-black"
          >
            📊 Analytics
          </button>
          <button 
            onClick={() => handleNavClick('process')} 
            className="h-full flex items-center px-5 hover:bg-brand-lime border-l-2 border-brand-black font-bold text-sm uppercase transition-colors text-brand-black"
          >
            The Process
          </button>
          <button 
            onClick={() => handleNavClick('community')} 
            className="h-full flex items-center px-5 hover:bg-brand-lime border-l-2 border-brand-black font-bold text-sm uppercase transition-colors text-brand-black"
          >
            Community Wall
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className="h-full flex items-center px-5 hover:bg-brand-lime border-l-2 border-brand-black font-bold text-sm uppercase transition-colors text-brand-black"
          >
            Contact Us
          </button>
          
          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className={`h-full flex items-center gap-2 px-6 hover:bg-brand-lime border-l-2 border-brand-black font-bold text-sm uppercase transition-all bg-brand-white text-brand-black ${
              cartWiggle ? 'animate-bounce bg-brand-lime' : ''
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="bg-brand-black text-brand-white px-2 py-0.5 rounded-full text-xs font-mono font-bold border border-brand-black">
              {cartCount}
            </span>
          </button>

          {/* Shop All New CTA */}
          <button 
            onClick={() => handleNavClick('catalog')} 
            className="h-full bg-brand-black text-brand-white px-6 font-bold uppercase hover:bg-brand-lime hover:text-brand-black transition-colors border-l-2 border-brand-black ml-0 shadow-brutal active:translate-x-[2px] active:translate-y-[2px]"
          >
            Shop All New
          </button>
        </div>

        {/* Mobile Actions: Cart & Menu Toggle */}
        <div className="flex md:hidden items-center h-full">
          <button 
            onClick={onOpenCart}
            className="h-full flex items-center gap-1.5 px-4 hover:bg-brand-lime border-l-2 border-brand-black font-bold text-sm uppercase"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="bg-brand-black text-brand-white px-1.5 py-0.5 rounded text-xs font-mono font-bold">
              {cartCount}
            </span>
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="h-full p-4 border-l-2 border-brand-black hover:bg-brand-lime transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* VIP Drop Alarm Popup */}
      {showDropAlarm && (
        <div className="absolute top-16 right-4 w-80 bg-brand-white border-2 border-brand-black shadow-brutal-lg p-4 z-50 animate-in fade-in zoom-in duration-200">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-brand-black">
            <span className="font-bold uppercase text-xs tracking-widest text-brand-black flex items-center gap-1">
              <Flame className="w-4 h-4 text-red-500 fill-red-500" /> VIP Drop Alert
            </span>
            <button onClick={() => setShowDropAlarm(false)} className="hover:text-brand-lime">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h4 className="font-black uppercase text-lg italic leading-tight mb-1">Cyber Punk X Drop #04</h4>
          <p className="text-xs font-mono text-gray-600 mb-3">Limited to 250 pairs worldwide. Enter your email to get 15-minute early access code.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="YOUR@EMAIL.COM" className="w-full bg-brand-gray border border-brand-black p-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-lime" />
            <button 
              onClick={() => { alert('VIP Code: CYBERVIP2026 unlocked! Enjoy early access!'); setShowDropAlarm(false); }}
              className="bg-brand-black text-brand-white px-3 py-2 text-xs font-bold uppercase hover:bg-brand-lime hover:text-brand-black transition-colors whitespace-nowrap border border-brand-black"
            >
              Unlock
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-white border-b-2 border-brand-black absolute w-full left-0 top-16 shadow-brutal-lg z-50 animate-in slide-in-from-top-4 duration-200">
          <button 
            onClick={() => { onOpenStudio(); setMobileMenuOpen(false); }}
            className="w-full text-left p-4 border-b border-brand-gray font-black text-lg uppercase bg-brand-lime/30 hover:bg-brand-lime flex items-center justify-between"
          >
            <span>⚡ 1-of-1 Custom Studio</span>
            <Sparkles className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleNavClick('catalog')} 
            className="w-full text-left p-4 border-b border-brand-gray font-bold uppercase hover:bg-brand-lime"
          >
            New Collection & Catalog
          </button>
          <button 
            onClick={() => handleNavClick('spotlight')} 
            className="w-full text-left p-4 border-b border-brand-gray font-bold uppercase bg-brand-sky/20 hover:bg-brand-lime flex items-center justify-between"
          >
            <span>🔥 Prototype Spotlight Radar</span>
          </button>
          <button 
            onClick={() => handleNavClick('analytics')} 
            className="w-full text-left p-4 border-b border-brand-gray font-bold uppercase hover:bg-brand-lime flex items-center justify-between"
          >
            <span>📊 Live Streetwear Analytics Index</span>
          </button>
          <button 
            onClick={() => handleNavClick('process')} 
            className="w-full text-left p-4 border-b border-brand-gray font-bold uppercase hover:bg-brand-lime"
          >
            The Process
          </button>
          <button 
            onClick={() => handleNavClick('community')} 
            className="w-full text-left p-4 border-b border-brand-gray font-bold uppercase hover:bg-brand-lime"
          >
            Community Polaroid Wall
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className="w-full text-left p-4 border-b border-brand-gray font-bold uppercase hover:bg-brand-lime"
          >
            Contact & Updates
          </button>
          <button 
            onClick={() => { onOpenCart(); setMobileMenuOpen(false); }}
            className="w-full text-left p-4 bg-brand-black text-brand-white font-bold uppercase hover:bg-brand-lime hover:text-brand-black flex items-center justify-between"
          >
            <span>Shopping Bag ({cartCount})</span>
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
};
