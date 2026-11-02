'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Mohon isi semua bidang formulir.');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
  };

  return (
    <section className="py-10 border-b border-gray-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-l-4 border-black pl-4">
          <h2 className="text-2xl font-bold text-gray-900">Hubungi Kami (Contact)</h2>
          <p className="text-gray-500 text-sm">Saluran informasi dan layanan pelanggan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Kontak */}
          <div className="space-y-4 border border-gray-200 p-5 rounded bg-gray-50">
            <h3 className="font-semibold text-gray-900">Informasi Kontak</h3>
            <div className="text-sm space-y-3 text-gray-700">
              <p>
                <strong>Alamat Kantor:</strong><br />
                Jl. Niaga Sentosa No. 12, Jakarta Selatan, Indonesia
              </p>
              <p>
                <strong>Email:</strong><br />
                support@tokoonline-demo.com
              </p>
              <p>
                <strong>WhatsApp / Telp:</strong><br />
                +62 812-3456-7890
              </p>
              <p>
                <strong>Jam Operasional:</strong><br />
                Senin - Sabtu: 08.00 - 17.00 WIB
              </p>
            </div>
          </div>

          {/* Form Kirim Pesan */}
          <div className="border border-gray-200 p-5 rounded bg-white">
            <h3 className="font-semibold text-gray-900 mb-3">Kirim Pesan</h3>

            {submitted ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded text-center space-y-2">
                <p className="text-green-800 font-medium text-sm">
                  ✓ Terima kasih, {formData.name}!
                </p>
                <p className="text-xs text-green-700">
                  Pesan Anda telah berhasil diterima oleh tim kami. Kami akan segera menghubungi via email ({formData.email}).
                </p>
                <button
                  onClick={handleReset}
                  className="mt-3 text-xs text-black underline font-semibold cursor-pointer"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Pesan / Pertanyaan
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pertanyaan atau kebutuhan Anda..."
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition cursor-pointer"
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
