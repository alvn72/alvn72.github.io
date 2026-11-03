'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ShopPage from './src/shopPage';

// Lazy loading InfoPage agar hanya dimuat saat user membuka tab Info
const InfoPage = lazy(() => import('./src/infoPage'));

export interface CartItem {
  id: number;
  name: string;
  category?: string;
  price: number;
  stock?: number;
  description?: string;
  quantity: number;
}

// Nomor WhatsApp tujuan penerima pesanan (Awali kode negara 62)
const DEFAULT_WA_NUMBER = '6281238364100';

// Fungsi sanitasi teks untuk keamanan pesan WhatsApp
function sanitizeText(str: string): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
}

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

  // Ubah kuantitas di dalam modal checkout
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

    const cleanName = sanitizeText(buyerName);
    const cleanPhone = sanitizeText(buyerPhone);
    const cleanAddress = sanitizeText(buyerAddress);
    const cleanNotes = sanitizeText(buyerNotes);

    if (!cleanName) {
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

    // Pesanan langsung berakhir di catatan tanpa kata halo admin
    const message = `*PESANAN BARU - TOKO ONLINE*
----------------------------------------
*Nama Pemesan:* ${cleanName}
*Nomor WhatsApp/HP:* ${cleanPhone || '-'}
*Alamat Pengiriman:* ${cleanAddress || '-'}

*Daftar Pesanan:*
${itemsText}

*Total Pembayaran:* ${formatRupiah(totalCheckoutPrice)}
----------------------------------------
*Catatan:* ${cleanNotes || '-'}`;

    // Sistem Remember Me
    if (rememberMe) {
      try {
        localStorage.setItem(
          'toko_buyer_data',
          JSON.stringify({
            name: cleanName,
            phone: cleanPhone,
            address: cleanAddress,
          })
        );
      } catch (err) {
        console.error('Gagal menyimpan data ke localStorage:', err);
      }
    } else {
      localStorage.removeItem('toko_buyer_data');
    }

    // Nomor WA yang telah dibersihkan
    const cleanWaNumber = adminWaNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(message)}`;

    // Buka WhatsApp di tab baru dengan rel noopener noreferrer
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    showToast('Pesanan berhasil dibuat! Membuka WhatsApp...');

    if (checkoutSource === 'cart') {
      setCartItems([]);
    }

    setIsCheckoutModalOpen(false);
    setBuyerNotes('');

    if (!rememberMe) {
      setBuyerName('');
      setBuyerPhone('');
      setBuyerAddress('');
    }
  };

  const totalCheckoutPrice = checkoutItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f0f0f0] font-sans">
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-white text-black text-xs font-semibold px-4 py-2.5 rounded shadow-lg z-50 animate-bounce">
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
      <div className="bg-[#141414] border-b border-[#2a2a2a] py-1.5 px-4 text-xs text-gray-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span>Halaman aktif:</span>
          <strong className="text-white uppercase tracking-wider text-[11px]">
            {activePage === 'shop' ? 'Shop Page' : 'Info Page'}
          </strong>
        </div>

        <div className="flex items-center gap-2">
          <span>Nomor WA Tujuan:</span>
          <input
            type="text"
            value={adminWaNumber}
            onChange={(e) => setAdminWaNumber(e.target.value)}
            title="Nomor WhatsApp admin penerima pesanan"
            placeholder="628123456789"
            className="border border-[#333] rounded px-2 py-0.5 text-xs bg-[#0a0a0a] text-white font-mono w-36 focus:outline-none focus:border-white"
          />
          <span className="text-[10px] text-gray-500">(Bisa diganti)</span>
        </div>
      </div>

      {/* 2. Konten Halaman */}
      <main className="flex-1">
        {activePage === 'shop' ? (
          <ShopPage
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
            onNavigateToInfo={() => setActivePage('info')}
          />
        ) : (
          <Suspense
            fallback={
              <div className="py-24 text-center text-gray-400 text-sm">
                Memuat Informasi Toko...
              </div>
            }
          >
            <InfoPage />
          </Suspense>
        )}
      </main>

      {/* 3. Modal Drawer Keranjang Belanja */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex justify-end">
          <div className="bg-[#141414] border-l border-[#2a2a2a] w-full max-w-md h-full flex flex-col shadow-2xl">
            {/* Header Keranjang */}
            <div className="p-4 border-b border-[#2a2a2a] flex justify-between items-center">
              <h2 className="font-bold text-base text-white">
                Keranjang Belanja ({totalCartCount})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* List Item Keranjang */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-xs">
                  Keranjang masih kosong. Silakan pilih produk di katalog!
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#2a2a2a] p-3 rounded bg-[#0a0a0a] flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-white">{item.name}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {formatRupiah(item.price)} x {item.quantity} ={' '}
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 border border-[#333] rounded text-xs text-white hover:bg-[#222] font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold min-w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 border border-[#333] rounded text-xs text-white hover:bg-[#222] font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Keranjang */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-[#2a2a2a] space-y-3 bg-[#0a0a0a]">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-gray-400">Total Belanja:</span>
                  <span className="text-sm sm:text-base text-white">{formatRupiah(totalCartPrice)}</span>
                </div>
                <button
                  onClick={handleCartCheckout}
                  className="w-full py-2.5 bg-green-500 hover:bg-green-400 text-black text-xs sm:text-sm font-semibold rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>💬 Checkout Pesanan via WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Modal Formulir Checkout WhatsApp */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#141414] rounded-lg max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#2a2a2a]">
            {/* Header Modal Checkout */}
            <div className="p-4 border-b border-[#2a2a2a] flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">
                  Formulir Pemesanan via WhatsApp
                </h3>
                <p className="text-[11px] text-gray-400">
                  {checkoutSource === 'cart'
                    ? 'Memesan seluruh barang dari keranjang'
                    : 'Pemesanan langsung produk'}
                </p>
              </div>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Isi Form Checkout */}
            <form onSubmit={handleSendToWhatsApp} className="p-4 overflow-y-auto space-y-4">
              {/* Ringkasan Barang */}
              <div className="border border-[#2a2a2a] rounded p-3 bg-[#0a0a0a] space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Ringkasan Barang
                </span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {checkoutItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-xs border-b border-[#222] pb-1.5"
                    >
                      <div className="flex-1 pr-2">
                        <span className="font-semibold text-gray-200">{item.name}</span>
                        <div className="text-[11px] text-gray-500">
                          {formatRupiah(item.price)} x {item.quantity}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateCheckoutQuantity(item.id, -1)}
                          className="w-5 h-5 border border-[#333] rounded text-[10px] font-bold text-white hover:bg-[#222] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-semibold text-xs min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateCheckoutQuantity(item.id, 1)}
                          className="w-5 h-5 border border-[#333] rounded text-[10px] font-bold text-white hover:bg-[#222] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-white text-right min-w-20 pl-2">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs font-bold pt-1 text-white">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-green-400">
                    {formatRupiah(totalCheckoutPrice)}
                  </span>
                </div>
              </div>

              {/* Data Identitas Pembeli */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">
                    Nama Pemesan <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">
                    Nomor WhatsApp / HP Anda
                  </label>
                  <input
                    type="tel"
                    maxLength={20}
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">
                    Alamat Pengiriman
                  </label>
                  <textarea
                    rows={2}
                    maxLength={300}
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    placeholder="Alamat jalan, kelurahan, kota, kode pos..."
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">
                    Catatan Khusus (Ukuran, Warna, dsb)
                  </label>
                  <input
                    type="text"
                    maxLength={200}
                    value={buyerNotes}
                    onChange={(e) => setBuyerNotes(e.target.value)}
                    placeholder="Contoh: Warna hitam ukuran L"
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition"
                  />
                </div>

                {/* Fitur Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer select-none">
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
                      className="rounded border-[#333] text-green-500 focus:ring-green-400 cursor-pointer bg-[#0a0a0a]"
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
                      className="text-[11px] text-gray-500 hover:text-red-400 underline cursor-pointer"
                      title="Hapus data yang tersimpan di perangkat ini"
                    >
                      Hapus data
                    </button>
                  )}
                </div>
              </div>

              {/* Petunjuk info WA */}
              <div className="bg-[#1a1a1a] border border-[#333] rounded p-2.5 text-xs text-gray-400 space-y-1">
                <p className="font-semibold text-gray-300">ℹ️ Cara Kerja:</p>
                <p className="text-[11px] leading-relaxed">
                  Setelah menekan tombol di bawah, aplikasi akan membuka WhatsApp dan
                  secara otomatis mengisi pesan rincian pesanan ke nomor admin:{' '}
                  <strong className="text-white">{adminWaNumber}</strong>.
                </p>
              </div>

              {/* Tombol Aksi */}
              <div className="flex gap-2 pt-2 border-t border-[#2a2a2a]">
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="flex-1 py-2 border border-[#333] rounded text-sm text-gray-400 hover:text-white hover:bg-[#222] cursor-pointer transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-green-500 hover:bg-green-400 text-black rounded text-sm font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
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
