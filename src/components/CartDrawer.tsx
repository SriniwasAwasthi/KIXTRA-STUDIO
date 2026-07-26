import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types/sneaker';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (discount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  let discount = 0;
  if (appliedPromo === 'HEAT2026') discount = 30;
  if (appliedPromo === 'BRUTAL10' || appliedPromo === 'WELCOME10') discount = Math.round(subtotal * 0.1);

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'HEAT2026' || code === 'BRUTAL10' || code === 'WELCOME10') {
      setAppliedPromo(code);
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid code! Try HEAT2026 or BRUTAL10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-brand-white border-l-4 border-brand-black shadow-brutal-white flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="bg-brand-black text-brand-white p-6 flex justify-between items-center border-b-2 border-brand-black flex-shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-lime" />
              <h2 className="text-xl font-black uppercase italic tracking-tighter">
                Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold hover:bg-brand-lime border border-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-brand-lime border-b-2 border-brand-black p-3 text-brand-black text-xs font-mono font-bold flex-shrink-0">
            <div className="flex justify-between items-center mb-1">
              <span>
                {subtotal >= freeShippingThreshold 
                  ? '🎉 FREE EXPRESS SHIPPING UNLOCKED!' 
                  : `Add $${amountNeeded} more for FREE Express Shipping`}
              </span>
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-2 bg-brand-white border border-brand-black overflow-hidden">
              <div 
                className="h-full bg-brand-black transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-brand-gray border-2 border-brand-black rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-black uppercase text-xl italic">Your Bag is Empty</h3>
                <p className="font-mono text-xs text-gray-600 max-w-xs mx-auto">
                  You haven't added any streetwear heat or custom builds to your bag yet.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-brand-black text-brand-white px-6 py-3 font-bold uppercase text-xs hover:bg-brand-lime hover:text-black border border-black shadow-brutal-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="bg-white border-2 border-brand-black p-4 shadow-brutal-sm flex gap-4 relative group">
                  
                  {/* Item Image */}
                  <div className="w-20 h-20 bg-brand-gray border border-brand-black flex-shrink-0 p-1.5 flex items-center justify-center relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-md" />
                    {item.type === 'custom' && (
                      <span className="absolute top-1 left-1 bg-brand-lime text-black text-[9px] font-mono px-1 font-bold border border-black">
                        1-OF-1
                      </span>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-black uppercase text-sm leading-tight truncate">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-mono text-[11px] text-gray-600 truncate mt-0.5 font-bold">{item.subtitle}</p>
                      
                      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono bg-brand-gray/50 px-1.5 py-0.5 border border-gray-300 w-fit">
                        <span>Size: US {item.size}</span>
                        {item.type === 'custom' && item.customConfig && (
                          <>
                            <span>•</span>
                            <span>Badge: {item.customConfig.patchEmoji}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-3">
                      {/* Quantity Adjuster */}
                      <div className="flex items-center border border-brand-black bg-white">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-brand-gray font-bold text-xs border-r border-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-brand-gray font-bold text-xs border-l border-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono font-black text-base text-brand-black">
                        ${item.price * item.quantity}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="bg-brand-gray border-t-2 border-brand-black p-6 space-y-4 flex-shrink-0">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="PROMO: HEAT2026 / BRUTAL10" 
                    className="w-full bg-white border border-brand-black pl-8 pr-2 py-2 font-mono text-xs uppercase focus:outline-none focus:ring-1 focus:ring-brand-lime"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-brand-black text-white px-3 py-2 font-bold font-mono text-xs uppercase hover:bg-brand-lime hover:text-black border border-black transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] font-mono text-red-600 leading-none">{promoError}</p>}
              {appliedPromo && (
                <div className="flex justify-between items-center bg-green-100 border border-green-600 px-2.5 py-1.5 text-[11px] font-mono text-green-800 font-bold">
                  <span>✓ PROMO '{appliedPromo}' APPLIED (-${discount})</span>
                  <button onClick={() => setAppliedPromo(null)} className="text-black hover:text-red-500 font-bold">✕</button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 font-mono text-xs border-t border-gray-300 pt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal} USD</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700 font-bold">
                    <span>Discount ({appliedPromo})</span>
                    <span>-${discount} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost} USD`}</span>
                </div>
                <div className="flex justify-between font-black text-base text-brand-black pt-2 border-t border-brand-black">
                  <span>Estimated Total</span>
                  <span className="text-xl text-brand-black">${total} USD</span>
                </div>
              </div>

              <button 
                onClick={() => onProceedToCheckout(discount, appliedPromo || '')}
                className="w-full bg-brand-lime text-brand-black py-4 font-black uppercase text-sm tracking-widest hover:bg-brand-black hover:text-white transition-all border-2 border-brand-black shadow-brutal flex items-center justify-center gap-2"
              >
                <span>Proceed To Brutal Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-gray-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-black" />
                <span>Encrypted checkout • Pay in 4x with Klarna available</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
