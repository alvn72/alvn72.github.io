'use client';

import React, { useState } from 'react';

/**
 * Sanitize user input untuk mencegah XSS saat ditampilkan.
 */
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>'"&]/g, (c) => ({
    '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;', '&': '&amp;',
  }[c] || c));
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Mohon isi semua bidang formulir.');
      return;
    }
    // Validasi email format sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Format email tidak valid.');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
  };

  return (
    <section className="py-10 border-b border-[#2a2a2a]">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="border-l-2 border-white pl-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Hubungi Kami</h2>
          <p className="text-gray-500 text-xs mt-0.5">Layanan pelanggan & informasi kontak</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Contact Info */}
          <div className="border border-[#2a2a2a] p-5 rounded-lg bg-[#141414] space-y-4">
            <h3 className="font-semibold text-white text-sm">Informasi Kontak</h3>
            <div className="text-xs space-y-3 text-gray-400">
              <div>
                <span className="text-gray-600 block mb-0.5">Alamat Kantor</span>
                Jl. Niaga Sentosa No. 12, Jakarta Selatan
              </div>
              <div>
                <span className="text-gray-600 block mb-0.5">Email</span>
                support@tokoonline-demo.com
              </div>
              <div>
                <span className="text-gray-600 block mb-0.5">WhatsApp / Telp</span>
                +62 812-3456-7890
              </div>
              <div>
                <span className="text-gray-600 block mb-0.5">Jam Operasional</span>
                Senin – Sabtu: 08.00 – 17.00 WIB
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-[#2a2a2a] p-5 rounded-lg bg-[#0a0a0a]">
            <h3 className="font-semibold text-white text-sm mb-3">Kirim Pesan</h3>

            {submitted ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded text-center space-y-2">
                <p className="text-green-400 font-medium text-sm">
                  ✓ Pesan terkirim!
                </p>
                <p className="text-xs text-green-500/80">
                  Terima kasih, {sanitizeInput(formData.name)}. Kami akan menghubungi via email.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-2 text-xs text-white underline cursor-pointer"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wide">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nama Anda"
                    className="
                      w-full bg-[#141414] border border-[#2a2a2a] rounded
                      px-3 py-1.5 text-sm text-white placeholder-gray-600
                      focus:outline-none focus:border-[#444] transition
                    "
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="
                      w-full bg-[#141414] border border-[#2a2a2a] rounded
                      px-3 py-1.5 text-sm text-white placeholder-gray-600
                      focus:outline-none focus:border-[#444] transition
                    "
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wide">
                    Pesan
                  </label>
                  <textarea
                    rows={3}
                    required
                    maxLength={1000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tulis pertanyaan atau kebutuhan Anda..."
                    className="
                      w-full bg-[#141414] border border-[#2a2a2a] rounded
                      px-3 py-1.5 text-sm text-white placeholder-gray-600
                      focus:outline-none focus:border-[#444] transition resize-none
                    "
                  />
                </div>
                <button
                  type="submit"
                  className="
                    w-full py-2 bg-white text-black text-sm font-medium
                    rounded hover:bg-gray-200 transition cursor-pointer
                  "
                >
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
