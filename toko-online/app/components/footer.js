'use client';

import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Toko Online Sederhana</h3>
            <p className="text-xs text-gray-500 mt-1">
              Prototipe website toko online sederhana dengan navigasi fungsional Shop & Info.
            </p>
          </div>

          <div className="flex space-x-4 text-xs font-medium text-gray-600">
            <button
              onClick={() => setActivePage('shop')}
              className="hover:text-black cursor-pointer underline"
            >
              Shop Page (Hero & Products)
            </button>
            <span>•</span>
            <button
              onClick={() => setActivePage('info')}
              className="hover:text-black cursor-pointer underline"
            >
              Info Page (About, History, Contact, Testimony)
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between text-xs text-gray-400 gap-2">
          <p>© 2026 Toko Online Demo. All rights reserved.</p>
          <p>Dibuat tanpa tema khusus untuk pengujian fungsi.</p>
        </div>
      </div>
    </footer>
  );
}
