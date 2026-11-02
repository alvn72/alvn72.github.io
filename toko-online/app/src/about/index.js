'use client';

import React from 'react';

export default function About() {
  return (
    <section className="py-10 border-b border-gray-200">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="border-l-4 border-black pl-4">
          <h2 className="text-2xl font-bold text-gray-900">Tentang Kami (About)</h2>
          <p className="text-gray-500 text-sm">Mengenal profil dan dedikasi toko kami</p>
        </div>

        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          Kami adalah platform toko online sederhana yang berfokus menyediakan berbagai kebutuhan harian berkualitas.
          Didirikan dengan komitmen untuk memberikan pengalaman belanja yang praktis, transparan, dan terpercaya
          bagi seluruh pelanggan di seluruh penjuru negeri.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="border border-gray-200 p-4 rounded bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-1">Visi Kami</h3>
            <p className="text-sm text-gray-600">
              Menjadi mitra belanja terpercaya yang menyediakan kemudahan akses terhadap produk berkualitas dengan harga yang terjangkau.
            </p>
          </div>
          <div className="border border-gray-200 p-4 rounded bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-1">Misi Kami</h3>
            <p className="text-sm text-gray-600">
              Menghadirkan layanan ramah pelanggan, kecepatan pengiriman yang andal, dan kepastian kualitas barang di setiap transaksi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
