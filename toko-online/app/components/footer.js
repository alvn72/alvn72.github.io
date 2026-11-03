'use client';

import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0a0a0a] mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-white text-base">Toko Online</h3>
            <p className="text-xs text-gray-500 mt-1">
              Belanja mudah, kirim pesanan langsung via WhatsApp.
            </p>
          </div>

          <div className="flex gap-4 text-xs font-medium text-gray-500">
            <button
              onClick={() => setActivePage('shop')}
              className="hover:text-white cursor-pointer transition"
            >
              Shop
            </button>
            <span className="text-[#2a2a2a]">|</span>
            <button
              onClick={() => setActivePage('info')}
              className="hover:text-white cursor-pointer transition"
            >
              Info
            </button>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-4 text-xs text-gray-600 text-center sm:text-left">
          <p>&copy; 2026 Toko Online. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
