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
    title: 'Peningkatan Layanan & Gudang',
    description: 'Mendirikan sistem inventaris terpusat untuk mempercepat proses pengemasan dan pengiriman barang.',
  },
  {
    year: '2026',
    title: 'Platform Web Mandiri',
    description: 'Meluncurkan website resmi untuk memberikan transparansi dan kemudahan transaksi langsung bagi pelanggan.',
  },
];

export default function HistoryCompany() {
  return (
    <section className="py-10 border-b border-gray-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-l-4 border-black pl-4">
          <h2 className="text-2xl font-bold text-gray-900">Perjalanan Perusahaan (Company History)</h2>
          <p className="text-gray-500 text-sm">Jejak langkah perkembangan toko kami dari masa ke masa</p>
        </div>

        <div className="space-y-4">
          {MILESTONES.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start border-l-2 border-gray-300 pl-4 py-1 ml-2">
              <span className="font-mono text-sm font-bold bg-black text-white px-2 py-0.5 rounded shrink-0">
                {item.year}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
