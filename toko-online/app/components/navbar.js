'use client';

import React from 'react';

export default function Navbar({ activePage, setActivePage, cartCount = 0, onOpenCart }) {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('shop')}
            className="text-xl font-bold tracking-tight text-gray-900 cursor-pointer flex items-center gap-1.5"
          >
            <span className="p-1 bg-black text-white text-xs rounded">TOKO</span>
            <span>Online</span>
          </button>
        </div>

        {/* Menu Navigasi Antar Halaman */}
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setActivePage('shop')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition cursor-pointer ${
              activePage === 'shop'
                ? 'bg-black text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Shop Page
          </button>

          <button
            onClick={() => setActivePage('info')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition cursor-pointer ${
              activePage === 'info'
                ? 'bg-black text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Info Page
          </button>
        </nav>

        {/* Cart Button */}
        <div>
          <button
            onClick={onOpenCart}
            className="relative border border-gray-300 px-3 py-1.5 text-xs sm:text-sm rounded hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer"
          >
            <span>🛒 Keranjang</span>
            <span className="bg-black text-white text-xs font-bold rounded-full px-1.5 py-0.2">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
