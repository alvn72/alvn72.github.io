'use client';

import React, { useState } from 'react';

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: 'Rian Pratama',
    role: 'Pelanggan Setia',
    rating: 5,
    comment: 'Pengiriman sangat cepat dan kualitas barang sesuai dengan deskripsi. Sangat memuaskan!',
    date: '10 Feb 2026',
  },
  {
    id: 2,
    name: 'Siti Aminah',
    role: 'Pembeli Pertama Kali',
    rating: 5,
    comment: 'Awalnya ragu, tapi ternyata kemasan rapi dan barang original. Recommended seller!',
    date: '18 Jan 2026',
  },
  {
    id: 3,
    name: 'Dimas Wijaya',
    role: 'Pelanggan Retail',
    rating: 4,
    comment: 'Pelayanan admin responsif sekali saat tanya-tanya ketersediaan stok.',
    date: '02 Mar 2026',
  },
];

export default function Testimony() {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const reviewObj = {
      id: Date.now(),
      name: newReview.name,
      role: 'Pelanggan Terverifikasi',
      rating: Number(newReview.rating),
      comment: newReview.comment,
      date: 'Baru saja',
    };

    setTestimonials([reviewObj, ...testimonials]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowAddForm(false);
  };

  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-l-4 border-black pl-4 gap-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ulasan & Testimoni (Testimony)</h2>
            <p className="text-gray-500 text-sm">Apa kata mereka yang telah berbelanja di tempat kami</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="self-start sm:self-auto px-3 py-1.5 border border-black text-xs font-medium rounded hover:bg-black hover:text-white transition cursor-pointer"
          >
            {showAddForm ? 'Tutup Formulir' : '+ Tulis Testimoni'}
          </button>
        </div>

        {/* Form Tambah Testimoni */}
        {showAddForm && (
          <form
            onSubmit={handleAddReview}
            className="border border-gray-300 p-4 rounded bg-gray-50 space-y-3"
          >
            <h3 className="font-semibold text-sm text-gray-900">Bagikan Pengalaman Belanja Anda</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-700 mb-1">Nama Anda</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Nama Anda"
                  className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm bg-white focus:outline-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 - Sangat Puas)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 - Puas)</option>
                  <option value={3}>⭐⭐⭐ (3 - Cukup)</option>
                  <option value={2}>⭐⭐ (2 - Kurang)</option>
                  <option value={1}>⭐ (1 - Kecewa)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-700 mb-1">Ulasan</label>
              <textarea
                rows={2}
                required
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Tulis ulasan Anda di sini..."
                className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-1.5 bg-black text-white text-xs rounded hover:bg-gray-800 cursor-pointer"
            >
              Kirim Testimoni
            </button>
          </form>
        )}

        {/* List Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="border border-gray-200 p-4 rounded bg-white flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                  <span>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>
                  <span>{t.date}</span>
                </div>
                <p className="text-sm text-gray-700 italic">“{t.comment}”</p>
              </div>
              <div className="border-t border-gray-100 pt-2 text-xs">
                <span className="font-semibold text-gray-900 block">{t.name}</span>
                <span className="text-gray-500">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
