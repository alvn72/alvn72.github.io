'use client';

import React from 'react';

export default function HeroSection({ onShopNowClick, onInfoClick }) {
  return (
    <section className="border-b border-gray-200 py-16 px-4 sm:px-6 lg:px-8 text-center bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Selamat Datang di Toko Kami
        </h1>
        <p className="text-lg text-gray-600">
          Tempat belanja produk kebutuhan harian dengan kualitas terbaik, harga bersahabat, dan pelayanan cepat.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button
            onClick={onShopNowClick}
            className="px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition cursor-pointer"
          >
            Lihat Produk
          </button>
          <button
            onClick={onInfoClick}
            className="px-6 py-3 border border-gray-400 text-gray-800 font-medium rounded hover:bg-gray-100 transition cursor-pointer"
          >
            Pelajari Tentang Kami
          </button>
        </div>
      </div>
    </section>
  );
}
