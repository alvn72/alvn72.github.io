'use client';

import React from 'react';

const MILESTONES = [
  {
    year: '2021',
    title: 'Awal Pendirian',
    description: 'Bermula dari toko rumahan kecil yang melayani pembelian produk kebutuhan lokal secara offline.',
  },
  {
    year: '2023',
    title: 'Ekspansi Digital',
    description: 'Mulai memperluas jangkauan ke platform digital untuk melayani pemesanan dari berbagai kota.',
  },
  {
    year: '2024',
    title: 'Peningkatan Layanan',
    description: 'Mendirikan sistem inventaris terpusat untuk mempercepat proses pengemasan dan pengiriman barang.',
  },
  {
    year: '2026',
    title: 'Platform Web Mandiri',
    description: 'Meluncurkan website resmi untuk transparansi dan kemudahan transaksi langsung bagi pelanggan.',
  },
];

export default function HistoryCompany() {
  return (
    <section className="py-10 border-b border-[#2a2a2a]">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="border-l-2 border-white pl-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Perjalanan Perusahaan</h2>
          <p className="text-gray-500 text-xs mt-0.5">Jejak perkembangan toko kami</p>
        </div>

        <div className="space-y-3">
          {MILESTONES.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 items-start border-l border-[#333] pl-4 py-2 ml-2"
            >
              <span className="font-mono text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded shrink-0">
                {item.year}
              </span>
              <div>
                <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
