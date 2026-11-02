'use client';

import React, { useState } from 'react';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Kemeja Katun Casual',
    category: 'Pakaian',
    price: 150000,
    stock: 12,
    description: 'Bahan katun adem, nyaman dipakai untuk bekerja maupun santai.',
  },
  {
    id: 2,
    name: 'Sepatu Sneakers Putih',
    category: 'Sepatu',
    price: 320000,
    stock: 7,
    description: 'Desain minimalis dan sol empuk untuk aktivitas sehari-hari.',
  },
  {
    id: 3,
    name: 'Tas Ransel Laptop 15 Inch',
    category: 'Aksesoris',
    price: 240000,
    stock: 15,
    description: 'Tahan air (water resistant) dengan banyak kompartemen organizer.',
  },
  {
    id: 4,
    name: 'Botol Minum Stainless 750ml',
    category: 'Peralatan',
    price: 85000,
    stock: 20,
    description: 'Menjaga suhu minuman tetap dingin hingga 24 jam atau hangat 12 jam.',
  },
  {
    id: 5,
    name: 'Earphone Bluetooth TWS',
    category: 'Elektronik',
    price: 199000,
    stock: 9,
    description: 'Koneksi stabil Bluetooth 5.3 dengan daya tahan baterai hingga 20 jam.',
  },
  {
    id: 6,
    name: 'Kaos Polos Basic Cotton 30s',
    category: 'Pakaian',
    price: 65000,
    stock: 30,
    description: 'Bahan 100% combed cotton, jahitan rapi dan tidak menyusut.',
  },
];

const CATEGORIES = ['Semua', 'Pakaian', 'Sepatu', 'Aksesoris', 'Peralatan', 'Elektronik'];

export default function Products({ cart, onAddToCart, onDirectCheckout }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Semua' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatRupiah = (num) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <section id="products-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Katalog Produk</h2>
          <p className="text-sm text-gray-500">Pilih produk untuk beli via WhatsApp atau masukkan ke keranjang</p>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap gap-2 my-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Produk */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded">
          Tidak ada produk yang cocok dengan pencarian.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded p-4 flex flex-col justify-between hover:shadow-sm transition bg-white"
            >
              <div>
                <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400 rounded mb-3 text-xs uppercase tracking-wide">
                  [ Gambar: {item.category} ]
                </div>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-base font-bold text-gray-900">
                    {formatRupiah(item.price)}
                  </span>
                  <span className="text-xs text-gray-500">Stok: {item.stock}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="flex-1 py-1.5 px-2 border border-gray-300 text-xs text-gray-700 rounded hover:bg-gray-50 cursor-pointer text-center"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => onAddToCart && onAddToCart(item)}
                    className="flex-1 py-1.5 px-2 border border-black text-black text-xs rounded hover:bg-gray-100 cursor-pointer text-center"
                  >
                    + Keranjang
                  </button>
                </div>
                <button
                  onClick={() => onDirectCheckout && onDirectCheckout(item)}
                  className="w-full py-1.5 px-2 bg-green-600 hover:bg-green-700 text-white font-medium text-xs rounded transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>💬 Beli Langsung (WA)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail Produk */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded max-w-md w-full p-6 space-y-4 border border-gray-300 shadow-lg">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg text-gray-900">{selectedProduct.name}</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded text-sm">
              [ Preview Foto Produk ]
            </div>
            <p className="text-sm text-gray-600">{selectedProduct.description}</p>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Kategori:</strong> {selectedProduct.category}
              </p>
              <p>
                <strong>Harga:</strong> {formatRupiah(selectedProduct.price)}
              </p>
              <p>
                <strong>Sisa Stok:</strong> {selectedProduct.stock} unit
              </p>
            </div>
            <div className="space-y-2 pt-2 border-t">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    onAddToCart && onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-2 border border-black text-black rounded text-sm hover:bg-gray-50 cursor-pointer"
                >
                  + Keranjang
                </button>
              </div>
              <button
                onClick={() => {
                  const item = selectedProduct;
                  setSelectedProduct(null);
                  onDirectCheckout && onDirectCheckout(item);
                }}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold flex items-center justify-center gap-1 cursor-pointer transition"
              >
                <span>💬 Checkout via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
