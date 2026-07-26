import React from 'react';
import { X, HelpCircle, ShieldCheck } from 'lucide-react';
import { SIZE_GUIDE_DATA } from '../data/sneakersData';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white border-4 border-brand-black shadow-brutal-white w-full max-w-2xl overflow-hidden relative my-auto animate-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="bg-brand-black text-white px-6 py-4 flex justify-between items-center border-b-2 border-brand-black">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-lime" />
            <h3 className="font-black text-xl uppercase italic tracking-tight">/// KIXTRA /// STUDIO SIZE GUIDE & FIT</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold hover:bg-brand-lime border border-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          <div className="bg-brand-lime border-2 border-brand-black p-4 shadow-brutal-sm font-mono text-xs text-black">
            <div className="font-black uppercase mb-1 flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4" /> 100% True-To-Size Fit Guarantee
            </div>
            <p className="leading-relaxed">
              Our silhouettes are engineered with a zero-compression Create™ foam footbed. We recommend ordering your standard athletic sneaker size. If you are between sizes or prefer a wider toe box, size up by 0.5.
            </p>
          </div>

          {/* Table */}
          <div className="border-2 border-brand-black overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-brand-black text-brand-white uppercase font-bold text-[11px] border-b-2 border-brand-black">
                <tr>
                  <th className="p-3 border-r border-gray-700">US Men's / Unisex</th>
                  <th className="p-3 border-r border-gray-700">EU Size</th>
                  <th className="p-3 border-r border-gray-700">UK Size</th>
                  <th className="p-3 border-r border-gray-700">Foot Length (CM)</th>
                  <th className="p-3">Fit Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {SIZE_GUIDE_DATA.map((row, i) => (
                  <tr key={i} className={`hover:bg-brand-sky/20 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-3 font-black text-sm border-r border-gray-300">US {row.us}</td>
                    <td className="p-3 font-bold border-r border-gray-300">{row.eu}</td>
                    <td className="p-3 border-r border-gray-300">{row.uk}</td>
                    <td className="p-3 font-bold text-black border-r border-gray-300">{row.cm} cm</td>
                    <td className="p-3 text-green-700 font-bold">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="border border-brand-black p-3 bg-brand-gray">
              <div className="font-bold uppercase text-black mb-1">High-Top Silhouettes (Court High)</div>
              <p className="text-gray-600 text-[11px]">Includes custom padded ankle collar. Standard laces provide 2.5 inches of adjustment allowance.</p>
            </div>
            <div className="border border-brand-black p-3 bg-brand-gray">
              <div className="font-bold uppercase text-black mb-1">Platform Sole (Air Glider)</div>
              <p className="text-gray-600 text-[11px]">45mm to 50mm elevation with reinforced heel lockdown cage. Zero heel slippage guaranteed.</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-brand-black text-white py-3.5 font-bold uppercase text-xs hover:bg-brand-lime hover:text-black transition-colors border-2 border-black shadow-brutal-sm"
          >
            Got It, Back to Customizing
          </button>
        </div>

      </div>
    </div>
  );
};
