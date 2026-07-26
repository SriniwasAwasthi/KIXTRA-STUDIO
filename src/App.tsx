import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroStudio } from './components/HeroStudio';
import { SneakerBuilderModal } from './components/SneakerBuilderModal';
import { TrendingHeat } from './components/TrendingHeat';
import { SpotlightSlider } from './components/SpotlightSlider';
import { CreatorAnalyticsHub } from './components/CreatorAnalyticsHub';
import { TheProcess } from './components/TheProcess';
import { CommunityPolaroidWall } from './components/CommunityPolaroidWall';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { Footer } from './components/Footer';
import { CartItem, CustomSneakerConfig } from './types/sneaker';
import { SNEAKER_CATALOG } from './data/sneakersData';

export default function App() {
  // Initialize cart with 1 sample item so users immediately see Bag (1) and can test the drawer!
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'sample-vortex-10',
      type: 'catalog',
      product: SNEAKER_CATALOG[0],
      size: 10,
      quantity: 1,
      price: 185,
      name: SNEAKER_CATALOG[0].name,
      subtitle: SNEAKER_CATALOG[0].subtitle,
      image: SNEAKER_CATALOG[0].image,
      addedAt: Date.now(),
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');
  const [studioInitialConfig, setStudioInitialConfig] = useState<Partial<CustomSneakerConfig> | undefined>(undefined);

  const handleOpenStudio = (config?: Partial<CustomSneakerConfig>) => {
    setStudioInitialConfig(config);
    setIsStudioOpen(true);
  };

  const handleCloseStudio = () => {
    setIsStudioOpen(false);
    setStudioInitialConfig(undefined);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // If it's a catalog item with identical id & size, increment quantity
      if (newItem.type === 'catalog') {
        const existingIdx = prev.findIndex(
          (item) => item.type === 'catalog' && item.product?.id === newItem.product?.id && item.size === newItem.size
        );
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += newItem.quantity;
          return updated;
        }
      }
      return [newItem, ...prev];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = (discount: number, promo: string) => {
    setCheckoutDiscount(discount);
    setCheckoutPromoCode(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId === 'contact' ? 'community' : sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-black bg-brand-white selection:bg-brand-lime selection:text-brand-black">
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStudio={() => handleOpenStudio()}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero & Live Vibe Switcher */}
        <HeroStudio onOpenStudio={handleOpenStudio} />

        {/* New: Prototype Spotlight Carousel & Concept Drop Radar */}
        <SpotlightSlider
          onOpenStudio={handleOpenStudio}
          onAddToCart={handleAddToCart}
        />

        {/* Trending Heat & Full In-Stock Catalog */}
        <TrendingHeat
          onAddToCart={handleAddToCart}
          onOpenStudio={handleOpenStudio}
        />

        {/* New: Live Streetwear Market Index & Analytics Dashboard */}
        <CreatorAnalyticsHub
          onOpenStudio={handleOpenStudio}
        />

        {/* The Process Walkthrough & Interactive Laboratories */}
        <TheProcess onOpenStudio={handleOpenStudio} />

        {/* Community Polaroid Wall & Updates */}
        <CommunityPolaroidWall
          onOpenStudio={handleOpenStudio}
          onNavigateContact={() => handleNavigate('community')}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenStudio={() => handleOpenStudio()}
        onNavigate={handleNavigate}
      />

      {/* 1-of-1 Custom Studio Modal */}
      <SneakerBuilderModal
        isOpen={isStudioOpen}
        onClose={handleCloseStudio}
        initialConfig={studioInitialConfig}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => {
          handleCloseStudio();
          setIsSizeGuideOpen(true);
        }}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Brutalist Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Size Guide & Fitting Chart Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
