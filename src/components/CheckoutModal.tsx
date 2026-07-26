import React, { useState } from 'react';
import { X, ArrowRight, Lock, CreditCard, Smartphone, DollarSign, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types/sneaker';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  promoCode: string;
  onCompleteOrder: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  onCompleteOrder,
}) => {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [name, setName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex@soleculture.com');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Brooklyn');
  const [zip, setZip] = useState('11201');
  const [country, setCountry] = useState('USA');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'klarna' | 'crypto'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [orderRef, setOrderRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal >= 200 || subtotal === 0 ? 0 : 15;
  const cryptoDiscount = paymentMethod === 'crypto' ? Math.round(subtotal * 0.05) : 0;
  const total = Math.max(0, subtotal - discount - cryptoDiscount + shippingCost);

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomRef = 'SC-ORD-' + Math.floor(10000 + Math.random() * 90000) + '-2026';
      setOrderRef(randomRef);
      setStep('success');
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#D2F800', '#0a0a0a', '#ffffff', '#BDE0FE', '#FF007F'],
        });
      } catch {
        // fallback
      }
    }, 1200);
  };

  const handleFinish = () => {
    onCompleteOrder();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-brand-white border-4 border-brand-black shadow-brutal-white w-full max-w-3xl overflow-hidden relative my-auto">
        
        {/* Header */}
        <div className="bg-brand-black text-brand-white px-6 py-4 flex justify-between items-center border-b-2 border-brand-black">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-brand-lime" />
            <h2 className="text-xl font-black uppercase italic tracking-tighter">
              /// KIXTRA /// STUDIO SECURE CHECKOUT
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold hover:bg-brand-lime border border-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Tabs */}
        {step !== 'success' && (
          <div className="bg-brand-gray border-b-2 border-brand-black grid grid-cols-2 text-center text-xs font-black uppercase">
            <div className={`py-3 px-4 border-r border-black ${step === 'address' ? 'bg-brand-lime text-black' : 'text-gray-500'}`}>
              1. Shipping Address
            </div>
            <div className={`py-3 px-4 ${step === 'payment' ? 'bg-brand-lime text-black' : 'text-gray-500'}`}>
              2. Payment & Review (${total})
            </div>
          </div>
        )}

        {/* Step 1: Shipping Address */}
        {step === 'address' && (
          <form onSubmit={() => setStep('payment')} className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-brand-black pb-3">
              <h3 className="font-black uppercase text-lg italic">Where should we drop your heat?</h3>
              <span className="text-xs font-mono bg-brand-lime px-2 py-0.5 font-bold border border-black flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Express Dispatch
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase block">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-brand-black p-2.5 font-bold uppercase focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold uppercase block">Email Address * (For Tracking)</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-brand-black p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold uppercase block">Street Address *</label>
                <input 
                  type="text" 
                  required 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border-2 border-brand-black p-2.5 uppercase focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold uppercase block">City *</label>
                <input 
                  type="text" 
                  required 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border-2 border-brand-black p-2.5 uppercase focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold uppercase block">ZIP Code *</label>
                  <input 
                    type="text" 
                    required 
                    value={zip} 
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full border-2 border-brand-black p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-lime"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase block">Country *</label>
                  <input 
                    type="text" 
                    required 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border-2 border-brand-black p-2.5 uppercase focus:outline-none focus:ring-2 focus:ring-brand-lime"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-brand-gray">
              <button type="button" onClick={onClose} className="font-mono text-xs text-gray-500 hover:text-black uppercase underline font-bold">
                ← Return to Bag
              </button>
              <button 
                type="submit"
                className="bg-brand-black text-brand-lime px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-brand-lime hover:text-black transition-colors border-2 border-black shadow-brutal flex items-center gap-2"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment & Review */}
        {step === 'payment' && (
          <form onSubmit={handlePayNow} className="p-6 sm:p-8 space-y-6">
            <div className="border-b-2 border-brand-black pb-3">
              <h3 className="font-black uppercase text-lg italic">Select Payment Method</h3>
              <p className="text-xs font-mono text-gray-600">All transactions are encrypted with 256-bit SSL security.</p>
            </div>

            {/* Payment Methods Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label 
                onClick={() => setPaymentMethod('card')}
                className={`p-3 border-2 border-brand-black cursor-pointer flex items-center gap-3 transition-all ${
                  paymentMethod === 'card' ? 'bg-brand-lime shadow-brutal-sm font-bold' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => {}} className="accent-black w-4 h-4" />
                <CreditCard className="w-5 h-5" />
                <span className="font-mono text-xs uppercase">Credit / Debit Card</span>
              </label>

              <label 
                onClick={() => setPaymentMethod('apple')}
                className={`p-3 border-2 border-brand-black cursor-pointer flex items-center gap-3 transition-all ${
                  paymentMethod === 'apple' ? 'bg-brand-lime shadow-brutal-sm font-bold' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <input type="radio" name="pay" checked={paymentMethod === 'apple'} onChange={() => {}} className="accent-black w-4 h-4" />
                <Smartphone className="w-5 h-5" />
                <span className="font-mono text-xs uppercase">Apple Pay / Google Pay</span>
              </label>

              <label 
                onClick={() => setPaymentMethod('klarna')}
                className={`p-3 border-2 border-brand-black cursor-pointer flex items-center gap-3 transition-all ${
                  paymentMethod === 'klarna' ? 'bg-brand-lime shadow-brutal-sm font-bold' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <input type="radio" name="pay" checked={paymentMethod === 'klarna'} onChange={() => {}} className="accent-black w-4 h-4" />
                <DollarSign className="w-5 h-5" />
                <span className="font-mono text-xs uppercase">Klarna (4x ${Math.round(total / 4)} bi-weekly)</span>
              </label>

              <label 
                onClick={() => setPaymentMethod('crypto')}
                className={`p-3 border-2 border-brand-black cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'crypto' ? 'bg-brand-lime shadow-brutal-sm font-bold' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input type="radio" name="pay" checked={paymentMethod === 'crypto'} onChange={() => {}} className="accent-black w-4 h-4" />
                  <span className="font-mono text-xs uppercase">Web3 Crypto (ETH/SOL)</span>
                </div>
                <span className="bg-black text-white text-[10px] font-mono px-1.5 py-0.5">SAVE 5%</span>
              </label>
            </div>

            {/* Simulated Card Details */}
            {paymentMethod === 'card' && (
              <div className="bg-brand-gray/50 border-2 border-brand-black p-4 space-y-3 font-mono text-xs animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="font-bold uppercase block">Card Number</label>
                  <input 
                    type="text" 
                    value={cardNumber} 
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full border-2 border-brand-black p-2 bg-white font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold uppercase block">Expiry Date</label>
                    <input type="text" defaultValue="08 / 28" className="w-full border-2 border-brand-black p-2 bg-white font-bold text-center" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase block">CVC / CVV</label>
                    <input type="text" defaultValue="842" className="w-full border-2 border-brand-black p-2 bg-white font-bold text-center" />
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary Summary */}
            <div className="bg-brand-black text-brand-white p-4 border-2 border-brand-black font-mono text-xs space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Shipping To:</span>
                <span className="text-white uppercase font-bold">{name} ({city}, {country})</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Items Subtotal:</span>
                <span>${subtotal} USD</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-brand-lime">
                  <span>Promo Discount:</span>
                  <span>-${discount} USD</span>
                </div>
              )}
              {cryptoDiscount > 0 && (
                <div className="flex justify-between text-brand-lime">
                  <span>Web3 5% Discount:</span>
                  <span>-${cryptoDiscount} USD</span>
                </div>
              )}
              <div className="flex justify-between font-black text-base text-brand-lime pt-2 border-t border-gray-700">
                <span>Total to Pay:</span>
                <span className="text-xl">${total} USD</span>
              </div>
            </div>

            <div className="pt-3 flex justify-between items-center border-t border-brand-gray">
              <button type="button" onClick={() => setStep('address')} className="font-mono text-xs text-gray-500 hover:text-black uppercase underline font-bold">
                ← Back to Address
              </button>
              <button 
                type="submit"
                disabled={isProcessing}
                className="bg-brand-lime text-brand-black px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-all border-2 border-black shadow-brutal flex items-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing Payment... ⏳</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ${total} USD & Place Order</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Celebration Order Confirmation Screen */}
        {step === 'success' && (
          <div className="p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-brand-lime border-4 border-brand-black text-brand-black rounded-full flex items-center justify-center mx-auto text-4xl font-black shadow-brutal animate-bounce">
              ✓
            </div>

            <div>
              <span className="bg-brand-black text-brand-lime font-mono text-xs font-bold px-3 py-1 uppercase border border-black inline-block mb-2">
                ORDER CONFIRMED /// VIP PRIORITY QUEUE
              </span>
              <h3 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight leading-none">
                Thank You, {name.split(' ')[0]}!
              </h3>
              <p className="font-mono text-xs sm:text-sm text-gray-700 max-w-md mx-auto mt-2">
                Your order has been locked into our brutalist manufacturing line. A confirmation & tracking link has been sent to <strong>{email}</strong>.
              </p>
            </div>

            {/* Tracking Reference Box */}
            <div className="bg-brand-gray border-2 border-brand-black p-4 max-w-md mx-auto font-mono text-xs space-y-1 shadow-brutal-sm text-left">
              <div className="flex justify-between text-gray-500 text-[10px] uppercase font-bold">
                <span>Order Reference:</span>
                <span>Status: In Production</span>
              </div>
              <div className="font-black text-base text-black uppercase tracking-wider">{orderRef}</div>
              <div className="pt-2 text-gray-600 text-[11px] border-t border-gray-300 flex items-center justify-between">
                <span>Est. Delivery:</span>
                <span className="font-bold text-black">12-14 Business Days</span>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleFinish}
                className="bg-brand-black text-brand-white px-10 py-4 font-black uppercase text-sm tracking-widest hover:bg-brand-lime hover:text-black transition-all border-2 border-brand-black shadow-brutal"
              >
                Return to Kixtra Studio Hub 🚀
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
