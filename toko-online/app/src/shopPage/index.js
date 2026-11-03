'use client';

import React from 'react';
import HeroSection from '../heroSection';
import Products from '../products';

export default function ShopPage({
  onAddToCart,
  onDirectCheckout,
  onNavigateToInfo,
}) {
  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <HeroSection
        onShopNowClick={scrollToProducts}
        onInfoClick={onNavigateToInfo}
      />
      <Products
        onAddToCart={onAddToCart}
        onDirectCheckout={onDirectCheckout}
      />
    </div>
  );
}
