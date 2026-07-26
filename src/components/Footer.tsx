import React, { useState } from 'react';
import { Star, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onOpenStudio: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSizeGuide,
  onOpenStudio,
  onNavigate,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address!');
      return;
    }
    setSubscribed(true);
  };

  return (
    <footer className="bg-brand-black text-brand-lime py-16 border-t-2 border-white relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Col 1: Brand Info */}
        <div>
          <div 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 mb-6 cursor-pointer group w-fit"
          >
            <div className="w-8 h-8 bg-brand-lime rounded-full flex items-center justify-center text-brand-black group-hover:bg-white transition-colors">
              <Star className="w-4 h-4 fill-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic text-white group-hover:text-brand-lime transition-colors">
              KIXTRA /// STUDIO
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 font-mono leading-relaxed mb-6">
            We reject the idea of a unified standard of fashion. Built with Create™ foam resin and customizable 3D modular architecture for urban creators.
          </p>
          <div className="text-xs font-mono text-gray-500 space-y-1">
            <div>© 2026 Kixtra Studio Inc. All rights reserved.</div>
            <div>Designed & Engineered for the bold.</div>
          </div>
        </div>

        {/* Col 2: Shop & Studio */}
        <div>
          <h4 className="font-black uppercase text-white mb-6 text-base tracking-wider border-b border-gray-800 pb-2">Shop & Studio</h4>
          <ul className="space-y-3 text-sm text-gray-400 font-mono">
            <li 
              onClick={onOpenStudio} 
              className="hover:text-brand-lime cursor-pointer flex items-center gap-1.5 text-brand-lime font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-of-1 Custom 3D Studio</span>
            </li>
            <li onClick={() => onNavigate('catalog')} className="hover:text-brand-lime cursor-pointer">New Arrivals & Heat</li>
            <li onClick={() => onNavigate('spotlight')} className="hover:text-brand-lime cursor-pointer text-white font-bold">🔥 Prototype Spotlight Radar</li>
            <li onClick={() => onNavigate('analytics')} className="hover:text-brand-lime cursor-pointer text-white font-bold">📊 Live Market Analytics Hub</li>
            <li onClick={() => onNavigate('catalog')} className="hover:text-brand-lime cursor-pointer">Platform Silhouettes</li>
            <li onClick={() => onNavigate('process')} className="hover:text-brand-lime cursor-pointer">How The Process Works</li>
          </ul>
        </div>

        {/* Col 3: Support & Fitting */}
        <div>
          <h4 className="font-black uppercase text-white mb-6 text-base tracking-wider border-b border-gray-800 pb-2">Support & Fit</h4>
          <ul className="space-y-3 text-sm text-gray-400 font-mono">
            <li onClick={onOpenSizeGuide} className="hover:text-brand-lime cursor-pointer text-white underline font-bold flex items-center gap-1">
              <span>/// Size Guide & CM Chart</span>
            </li>
            <li onClick={() => alert('30-Day Free Easy Returns & Size Exchanges on all orders!')} className="hover:text-brand-lime cursor-pointer">
              30-Day Easy Returns
            </li>
            <li onClick={() => alert('Custom 1-of-1 builds take 12-14 days. Standard silhouettes dispatch in 24 hours.')} className="hover:text-brand-lime cursor-pointer">
              Shipping & Track Order
            </li>
            <li onClick={() => onNavigate('contact')} className="hover:text-brand-lime cursor-pointer">Contact Master Studio</li>
            <li onClick={() => alert('All Create™ foam soles come with a lifetime delamination warranty!')} className="hover:text-brand-lime cursor-pointer">
              Lifetime Sole Warranty
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter & Drop Access */}
        <div>
          <h4 className="font-black uppercase text-white mb-6 text-base tracking-wider border-b border-gray-800 pb-2">VIP Newsletter</h4>
          <p className="text-xs font-mono text-gray-400 mb-4 leading-relaxed">
            Subscribe to get 15-minute early access to limited edition colorways and custom drop queues.
          </p>
          
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER EMAIL ADDRESS" 
                  className="bg-transparent border-2 border-brand-lime p-3 text-white w-full font-mono text-xs focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-600 uppercase"
                />
                <button 
                  type="submit" 
                  className="bg-brand-lime text-brand-black px-5 font-bold hover:bg-white transition-colors flex items-center justify-center border-y-2 border-r-2 border-brand-lime"
                  title="Subscribe"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <span className="text-[10px] font-mono text-gray-500 block">No spam. Only high-heat drops and custom studio alerts.</span>
            </form>
          ) : (
            <div className="bg-brand-white text-brand-black p-4 border-2 border-brand-lime space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 font-black uppercase text-xs">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> You Are On The VIP List!
              </div>
              <p className="font-mono text-[11px] text-gray-700 leading-tight">
                Use promo code <strong className="bg-brand-black text-brand-lime px-1.5 py-0.5">WELCOME10</strong> at checkout for 10% off your first bag!
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Ticker */}
      <div className="max-w-[1920px] mx-auto px-6 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-gray-500 gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-lime" />
          <span>100% Authentic Custom Manufacturing • Global Priority Shipping</span>
        </div>
        <div className="flex gap-6 uppercase">
          <span className="hover:text-brand-lime cursor-pointer" onClick={() => alert('Privacy Policy: We never sell your data.')}>Privacy Policy</span>
          <span className="hover:text-brand-lime cursor-pointer" onClick={() => alert('Terms of Service: Custom pairs are built to your exact specifications.')}>Terms of Service</span>
          <span className="hover:text-brand-lime cursor-pointer" onClick={onOpenSizeGuide}>Size Chart</span>
        </div>
      </div>
    </footer>
  );
};
