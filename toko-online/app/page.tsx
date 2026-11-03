'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ShopPage from './src/shopPage';
import InfoPage from './src/infoPage';

export interface CartItem {
  id: number;
  name: string;
  category?: string;
  price: number;
  stock?: number;
  description?: string;
  quantity: number;
}

// Nomor WhatsApp tujuan penerima pesanan (Ganti sesuai nomor WA Anda, awali kode negara misal 62)
const DEFAULT_WA_NUMBER = '6281238364100';

export default function Home() {
  // Website dibuka langsung masuk ke shopPage secara default
  const [activePage, setActivePage] = useState<'shop' | 'info'>('shop');

  // Nomor WA Admin (dapat disesuaikan)
  const [adminWaNumber, setAdminWaNumber] = useState<string>(DEFAULT_WA_NUMBER);

  // State keranjang belanja
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // State untuk Modal Checkout WhatsApp
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [checkoutSource, setCheckoutSource] = useState<'cart' | 'single'>('cart');

  // Data formulir pemesan
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerPhone, setBuyerPhone] = useState<string>('');
  const [buyerAddress, setBuyerAddress] = useState<string>('');
  const [buyerNotes, setBuyerNotes] = useState<string>('');

  // Sistem Remember Me (Simpan data pemesan di localStorage)
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Muat data pemesan dari localStorage saat pertama kali dibuka
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('toko_buyer_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.name) setBuyerName(parsed.name);
        if (parsed.phone) setBuyerPhone(parsed.phone);
        if (parsed.address) setBuyerAddress(parsed.address);
        setRememberMe(true);
      }
    } catch (e) {
      console.error('Gagal memuat data tersimpan:', e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const formatRupiah = (num: number) => 'Rp ' + num.toLocaleString('id-ID');

  // Tambah produk ke keranjang
  const handleAddToCart = (product: any) => {
    setCartItems((prevItems: CartItem[]) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    showToast(`"${product.name}" ditambahkan ke keranjang.`);
  };

  // Ubah kuantitas produk di keranjang
  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems((prevItems: CartItem[]) => {
      return prevItems
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  // Direct checkout dari satu produk
  const handleDirectCheckout = (product: any) => {
    setCheckoutItems([{ ...product, quantity: 1 }]);
    setCheckoutSource('single');
    setIsCheckoutModalOpen(true);
  };

  // Checkout dari keranjang
  const handleCartCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutItems(cartItems);
    setCheckoutSource('cart');
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  // Ubah kuantitas di dalam modal checkout (khusus checkout langsung atau penyesuaian)
  const handleUpdateCheckoutQuantity = (productId: number, delta: number) => {
    setCheckoutItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Kirim pesanan ke WhatsApp
  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerName.trim()) {
      alert('Mohon masukkan nama pemesan.');
      return;
    }

    if (checkoutItems.length === 0) {
      alert('Tidak ada produk yang dipesan.');
      return;
    }

    const totalCheckoutPrice = checkoutItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Format list pesanan
    const itemsText = checkoutItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} (${item.quantity}x) = ${formatRupiah(
            item.price * item.quantity
          )}`
      )
      .join('\n');

    // Susun pesan WhatsApp (langsung berakhir di catatan tanpa kalimat halo admin)
    const message = `*PESANAN BARU - TOKO ONLINE*
----------------------------------------
*Nama Pemesan:* ${buyerName.trim()}
*Nomor WhatsApp/HP:* ${buyerPhone.trim() || '-'}
*Alamat Pengiriman:* ${buyerAddress.trim() || '-'}

*Daftar Pesanan:*
${itemsText}

*Total Pembayaran:* ${formatRupiah(totalCheckoutPrice)}
----------------------------------------
*Catatan:* ${buyerNotes.trim() || '-'}`;

    // Sistem Remember Me: simpan atau hapus data pemesan dari localStorage
    if (rememberMe) {
      try {
        localStorage.setItem(
          'toko_buyer_data',
          JSON.stringify({
            name: buyerName.trim(),
            phone: buyerPhone.trim(),
            address: buyerAddress.trim(),
          })
        );
      } catch (err) {
        console.error('Gagal menyimpan data ke localStorage:', err);
      }
    } else {
      localStorage.removeItem('toko_buyer_data');
    }

    // Buat URL wa.me
    const cleanWaNumber = adminWaNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(message)}`;

    // Buka WhatsApp di tab baru
    window.open(waUrl, '_blank');

    showToast('Pesanan berhasil dibuat! Membuka WhatsApp...');

    // Jika checkout dari keranjang, kosongkan keranjang
    if (checkoutSource === 'cart') {
      setCartItems([]);
    }

    // Tutup modal checkout & kosongkan catatan
    setIsCheckoutModalOpen(false);
    setBuyerNotes('');

    // Jika user TIDAK mencentang rememberMe, kosongkan juga identitas pemesan
    if (!rememberMe) {
      setBuyerName('');
      setBuyerPhone('');
      setBuyerAddress('');
    }
  };

  // Hitung total harga item di checkout modal
  const totalCheckoutPrice = checkoutItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Total item di keranjang
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white text-xs px-4 py-2.5 rounded shadow-lg z-50 animate-bounce">
          ✓ {toastMessage}
        </div>
      )}

      {/* 1. Header / Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Bar Pengaturan Nomor WhatsApp Tujuan */}
      <div className="bg-gray-100 border-b border-gray-200 py-1.5 px-4 text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <span>Halaman aktif:</span>
          <strong className="text-gray-900 uppercase">
            {activePage === 'shop' ? 'Shop Page' : 'Info Page'}
          </strong>
        </div>

        <div className="flex items-center gap-2">
          <span>Nomor WA Penerima Pesanan:</span>
          <input
            type="text"
            value={adminWaNumber}
            onChange={(e) => setAdminWaNumber(e.target.value)}
            title="Ubah nomor WA ini untuk menguji kirim ke nomor WhatsApp Anda sendiri"
            placeholder="628123456789"
            className="border border-gray-300 rounded px-2 py-0.5 text-xs bg-white text-gray-800 font-mono w-36 focus:outline-none"
          />
          <span className="text-[10px] text-gray-400">(Bisa diganti)</span>
        </div>
      </div>

      {/* 2. Konten Halaman */}
      <main className="flex-1">
        {activePage === 'shop' ? (
          <ShopPage
            cart={cartItems}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
            onNavigateToInfo={() => setActivePage('info')}
          />
        ) : (
          <InfoPage />
        )}
      </main>

      {/* 3. Modal Drawer Keranjang Belanja */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-xl">
            {/* Header Keranjang */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-bold text-lg text-gray-900">
                Keranjang Belanja ({totalCartCount})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-black text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* List Item Keranjang */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-sm">
                  Keranjang masih kosong. Silakan pilih produk di katalog!
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 p-3 rounded flex justify-between items-center bg-gray-50"
                  >
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500">
                        {formatRupiah(item.price)} x {item.quantity} ={' '}
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 border border-gray-300 rounded text-xs hover:bg-gray-200 font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 border border-gray-300 rounded text-xs hover:bg-gray-200 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Keranjang & Tombol Checkout */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-200 space-y-3 bg-gray-50">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>Total Belanja:</span>
                  <span className="text-base text-gray-900">{formatRupiah(totalCartPrice)}</span>
                </div>
                <button
                  onClick={handleCartCheckout}
                  className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>💬 Checkout Pesanan via WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Modal Formulir Checkout WhatsApp (Dipakai dari Produk langsung & Keranjang) */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-300">
            {/* Header Modal Checkout */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  Formulir Pemesanan via WhatsApp
                </h3>
                <p className="text-xs text-gray-500">
                  {checkoutSource === 'cart'
                    ? 'Memesan seluruh barang dari keranjang'
                    : 'Pemesanan langsung produk'}
                </p>
              </div>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Isi Form Checkout */}
            <form onSubmit={handleSendToWhatsApp} className="p-4 overflow-y-auto space-y-4">
              {/* Ringkasan Barang yang Dipesan */}
              <div className="border border-gray-200 rounded p-3 bg-gray-50 space-y-2">
                <span className="text-xs font-bold text-gray-700 uppercase">
                  Ringkasan Barang
                </span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {checkoutItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-xs border-b border-gray-200 pb-1.5"
                    >
                      <div className="flex-1 pr-2">
                        <span className="font-semibold text-gray-800">{item.name}</span>
                        <div className="text-gray-500">
                          {formatRupiah(item.price)} x {item.quantity}
                        </div>
                      </div>

                      {/* Kontrol kuantitas */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateCheckoutQuantity(item.id, -1)}
                          className="w-5 h-5 border border-gray-300 rounded text-[10px] font-bold hover:bg-gray-200 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-semibold text-xs min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateCheckoutQuantity(item.id, 1)}
                          className="w-5 h-5 border border-gray-300 rounded text-[10px] font-bold hover:bg-gray-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-gray-900 text-right min-w-20 pl-2">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs font-bold pt-1 text-gray-900">
                  <span>Total yang Harus Dibayar:</span>
                  <span className="text-sm text-green-700">
                    {formatRupiah(totalCheckoutPrice)}
                  </span>
                </div>
              </div>

              {/* Data Identitas Pembeli */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Nama Pemesan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Nomor WhatsApp / HP Anda
                  </label>
                  <input
                    type="tel"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Alamat Pengiriman
                  </label>
                  <textarea
                    rows={2}
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    placeholder="Alamat jalan, kelurahan, kota, kode pos..."
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Catatan Khusus (Ukuran, Warna, dsb)
                  </label>
                  <input
                    type="text"
                    value={buyerNotes}
                    onChange={(e) => setBuyerNotes(e.target.value)}
                    placeholder="Contoh: Warna hitam ukuran L"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                </div>

                {/* Fitur Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setRememberMe(checked);
                        if (!checked) {
                          localStorage.removeItem('toko_buyer_data');
                        }
                      }}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                    <span>Ingat data saya (Nama, No WA, Alamat)</span>
                  </label>

                  {(buyerName || buyerPhone || buyerAddress) && (
                    <button
                      type="button"
                      onClick={() => {
                        setBuyerName('');
                        setBuyerPhone('');
                        setBuyerAddress('');
                        localStorage.removeItem('toko_buyer_data');
                        showToast('Data tersimpan telah dibersihkan.');
                      }}
                      className="text-[11px] text-gray-400 hover:text-red-600 underline cursor-pointer"
                      title="Hapus data yang tersimpan di perangkat ini"
                    >
                      Hapus data
                    </button>
                  )}
                </div>
              </div>

              {/* Petunjuk info WA */}
              <div className="bg-green-50 border border-green-200 rounded p-2.5 text-xs text-green-800 space-y-1">
                <p className="font-semibold">ℹ️ Cara Kerja:</p>
                <p>
                  Setelah menekan tombol di bawah, aplikasi akan membuka WhatsApp dan
                  secara otomatis mengisi pesan berisi nama dan rincian pesanan ke nomor:{' '}
                  <strong>{adminWaNumber}</strong>.
                </p>
              </div>

              {/* Tombol Aksi */}
              <div className="flex gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="flex-1 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Kirim Pesanan ke WA</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
