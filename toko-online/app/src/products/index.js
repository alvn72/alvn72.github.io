'use client';

import React, { useState, useMemo } from 'react';

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

/**
 * Sanitize string agar aman ditampilkan (basic XSS prevention)
 */
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default function Products({ onAddToCart, onDirectCheckout }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Memoize filtered products agar tidak re-compute setiap render
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return INITIAL_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Semua' || product.category === selectedCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const formatRupiah = (num) => 'Rp ' + num.toLocaleString('id-ID');

  return (
    <section
      id="products-section"
      className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#2a2a2a] gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Katalog Produk</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Beli langsung via WhatsApp atau masukkan ke keranjang
          </p>
        </div>

        <div className="w-full sm:w-56">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            maxLength={100}
            className="
              w-full bg-[#141414] border border-[#2a2a2a] rounded px-3 py-2
              text-sm text-white placeholder-gray-600
              focus:outline-none focus:border-[#444]
              transition
            "
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 my-5 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-3 py-1.5 text-xs rounded border cursor-pointer transition whitespace-nowrap
              ${selectedCategory === cat
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-gray-400 border-[#333] hover:border-[#555] hover:text-white'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-600 border border-dashed border-[#2a2a2a] rounded">
          Tidak ada produk yang cocok.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="
                bg-[#141414] border border-[#2a2a2a] rounded-lg
                p-4 flex flex-col justify-between
                hover:border-[#333] transition
              "
            >
              <div>
                {/* Image placeholder */}
                <div className="h-28 sm:h-32 bg-[#1a1a1a] flex items-center justify-center text-gray-600 rounded mb-3 text-[10px] uppercase tracking-widest">
                  {item.category}
                </div>

                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold text-white text-sm leading-snug">
                    {item.name}
                  </h3>
                  <span className="text-[10px] bg-[#1a1a1a] text-gray-500 px-1.5 py-0.5 rounded shrink-0">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-white">
                    {formatRupiah(item.price)}
                  </span>
                  <span className="text-[10px] text-gray-600">
                    Stok: {item.stock}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-[#1a1a1a] space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="
                      flex-1 py-1.5 text-xs text-gray-400
                      border border-[#333] rounded
                      hover:text-white hover:border-[#555] transition cursor-pointer
                    "
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => onAddToCart && onAddToCart(item)}
                    className="
                      flex-1 py-1.5 text-xs text-white
                      border border-white rounded
                      hover:bg-white hover:text-black transition cursor-pointer
                    "
                  >
                    + Keranjang
                  </button>
                </div>
                <button
                  onClick={() => onDirectCheckout && onDirectCheckout(item)}
                  className="
                    w-full py-1.5 text-xs font-medium text-black
                    bg-green-500 hover:bg-green-400 rounded
                    transition cursor-pointer flex items-center justify-center gap-1
                  "
                >
                  <span>💬</span>
                  <span>Beli Langsung (WA)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-[#141414] border border-[#2a2a2a] rounded-lg max-w-md w-full p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
              <h3 className="font-bold text-base text-white">
                {sanitize(selectedProduct.name)}
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-600 hover:text-white text-lg cursor-pointer transition"
              >
                ✕
              </button>
            </div>

            {/* Image placeholder */}
            <div className="h-36 bg-[#1a1a1a] flex items-center justify-center text-gray-600 rounded text-xs">
              Preview Foto Produk
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="space-y-1 text-sm text-gray-300">
              <p><span className="text-gray-500">Kategori:</span> {selectedProduct.category}</p>
              <p><span className="text-gray-500">Harga:</span> {formatRupiah(selectedProduct.price)}</p>
              <p><span className="text-gray-500">Stok:</span> {selectedProduct.stock} unit</p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-[#2a2a2a]">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-2 border border-[#333] rounded text-sm text-gray-400 hover:text-white hover:border-[#555] transition cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    onAddToCart && onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-2 border border-white text-white rounded text-sm hover:bg-white hover:text-black transition cursor-pointer"
                >
                  + Keranjang
                </button>
              </div>
              <button
                onClick={() => {
                  const p = selectedProduct;
                  setSelectedProduct(null);
                  onDirectCheckout && onDirectCheckout(p);
                }}
                className="w-full py-2 bg-green-500 hover:bg-green-400 text-black rounded text-sm font-semibold transition cursor-pointer"
              >
                💬 Checkout via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
