'use client';

import React from 'react';

export default function About() {
  return (
    <section className="py-10 border-b border-[#2a2a2a]">
      <div className="max-w-4xl mx-auto space-y-5">

        <div className="border-l-2 border-white pl-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Tentang Kami</h2>
          <p className="text-gray-500 text-xs mt-0.5">Mengenal profil dan dedikasi toko kami</p>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">
          Kami adalah platform toko online sederhana yang berfokus menyediakan berbagai kebutuhan harian berkualitas.
          Didirikan dengan komitmen untuk memberikan pengalaman belanja yang praktis, transparan, dan terpercaya
          bagi seluruh pelanggan di seluruh penjuru negeri.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-[#2a2a2a] p-4 rounded-lg bg-[#141414]">
            <h3 className="font-semibold text-white text-sm mb-1">Visi Kami</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Menjadi mitra belanja terpercaya yang menyediakan kemudahan akses terhadap produk berkualitas dengan harga yang terjangkau.
            </p>
          </div>
          <div className="border border-[#2a2a2a] p-4 rounded-lg bg-[#141414]">
            <h3 className="font-semibold text-white text-sm mb-1">Misi Kami</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Menghadirkan layanan ramah pelanggan, kecepatan pengiriman yang andal, dan kepastian kualitas barang di setiap transaksi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
