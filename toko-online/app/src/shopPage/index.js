'use client';

import React from 'react';
import HeroSection from '../heroSection';
import Products from '../products';

export default function ShopPage({
  cart,
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
      {/* 1. Hero Section */}
      <HeroSection
        onShopNowClick={scrollToProducts}
        onInfoClick={onNavigateToInfo}
      />

      {/* 2. Products Section */}
      <Products
        cart={cart}
        onAddToCart={onAddToCart}
        onDirectCheckout={onDirectCheckout}
      />
    </div>
  );
}
