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

/**
 * Sanitize input string dasar.
 */
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '');
}

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
    const cleanName = sanitize(newReview.name.trim());
    const cleanComment = sanitize(newReview.comment.trim());
    if (!cleanName || !cleanComment) return;

    const reviewObj = {
      id: Date.now(),
      name: cleanName,
      role: 'Pelanggan Terverifikasi',
      rating: Number(newReview.rating),
      comment: cleanComment,
      date: 'Baru saja',
    };

    setTestimonials([reviewObj, ...testimonials]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowAddForm(false);
  };

  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-l-2 border-white pl-4 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Testimoni</h2>
            <p className="text-gray-500 text-xs mt-0.5">Ulasan dari pelanggan kami</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="
              self-start px-3 py-1.5 border border-white
              text-xs font-medium rounded text-white
              hover:bg-white hover:text-black transition cursor-pointer
            "
          >
            {showAddForm ? 'Tutup' : '+ Tulis Testimoni'}
          </button>
        </div>

        {/* Add Review Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddReview}
            className="border border-[#2a2a2a] p-4 rounded-lg bg-[#141414] space-y-3"
          >
            <h3 className="font-semibold text-xs text-white">
              Bagikan Pengalaman Anda
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-gray-500 mb-1 uppercase tracking-wide">
                  Nama
                </label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Nama Anda"
                  className="
                    w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded
                    px-2.5 py-1.5 text-sm text-white placeholder-gray-600
                    focus:outline-none focus:border-[#444] transition
                  "
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 mb-1 uppercase tracking-wide">
                  Rating
                </label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="
                    w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded
                    px-2.5 py-1.5 text-sm text-white
                    focus:outline-none focus:border-[#444] transition
                  "
                >
                  <option value={5}>★★★★★ (5)</option>
                  <option value={4}>★★★★☆ (4)</option>
                  <option value={3}>★★★☆☆ (3)</option>
                  <option value={2}>★★☆☆☆ (2)</option>
                  <option value={1}>★☆☆☆☆ (1)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 mb-1 uppercase tracking-wide">
                Ulasan
              </label>
              <textarea
                rows={2}
                required
                maxLength={500}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Tulis ulasan Anda..."
                className="
                  w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded
                  px-2.5 py-1.5 text-sm text-white placeholder-gray-600
                  focus:outline-none focus:border-[#444] transition resize-none
                "
              />
            </div>
            <button
              type="submit"
              className="
                px-4 py-1.5 bg-white text-black text-xs font-medium
                rounded hover:bg-gray-200 transition cursor-pointer
              "
            >
              Kirim Testimoni
            </button>
          </form>
        )}

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="
                border border-[#2a2a2a] p-4 rounded-lg bg-[#141414]
                flex flex-col justify-between space-y-3
              "
            >
              <div>
                <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                  <span className="text-yellow-500">
                    {'★'.repeat(t.rating)}
                    <span className="text-[#333]">{'★'.repeat(5 - t.rating)}</span>
                  </span>
                  <span>{t.date}</span>
                </div>
                <p className="text-sm text-gray-300 italic leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>
              <div className="border-t border-[#1a1a1a] pt-2 text-xs">
                <span className="font-semibold text-white block">{t.name}</span>
                <span className="text-gray-600">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
