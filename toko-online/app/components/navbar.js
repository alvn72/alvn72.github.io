'use client';

import React from 'react';

export default function Navbar({
  activePage,
  setActivePage,
  cartCount = 0,
  onOpenCart,
}) {
  return (
    <header className="border-b border-[#2a2a2a] bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Brand */}
        <button
          onClick={() => setActivePage('shop')}
          className="flex items-center gap-1.5 cursor-pointer group"
        >
          <span className="px-1.5 py-0.5 bg-white text-black text-[10px] sm:text-xs font-bold rounded tracking-wider">
            TOKO
          </span>
          <span className="text-base sm:text-lg font-semibold text-white group-hover:text-gray-300 transition">
            Online
          </span>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActivePage('shop')}
            className={`
              px-3 py-1.5 text-xs sm:text-sm font-medium rounded transition cursor-pointer
              ${activePage === 'shop'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}
            `}
          >
            Shop
          </button>
          <button
            onClick={() => setActivePage('info')}
            className={`
              px-3 py-1.5 text-xs sm:text-sm font-medium rounded transition cursor-pointer
              ${activePage === 'info'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}
            `}
          >
            Info
          </button>
        </nav>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="
            relative border border-[#333] px-2.5 py-1.5
            text-xs sm:text-sm rounded
            hover:bg-[#1a1a1a] hover:border-[#444]
            flex items-center gap-1.5 cursor-pointer transition
          "
        >
          <span className="hidden sm:inline">🛒</span>
          <span>Keranjang</span>
          {cartCount > 0 && (
            <span className="bg-white text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
