"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LockKeyhole, X, ArrowRight, Activity, FileText, AlertCircle, Phone } from "lucide-react";
import CryptoJS from "crypto-js";

// Payload terenkripsi. Tidak ada data sensitif dalam bentuk teks biasa.
const ENCRYPTED_PAYLOAD = "U2FsdGVkX1/pgwQZt5+/ITMfydX+3QHi47hZtmOqRoxyNZzevT72YckN8IJso6VkFuw9Eq4Wg7Ch+izlo9He4oVT+zUy4cwcnx9d96Uv81lLpTVS/zJQTifp7/il954QyJYlrjgo3hh5jRGLnwxGs0RGsh+WY4rsxXFEJ5XPI8doi3raZdYCxZs3TqRLGcd9mpIwrtz20DRXT3XpKYwuKnA5jnMz72wXIyAyTYPyav4LklObTfJg1G8PYOYcqnYgVqofA2rDf1bkt0PHSwSJ8vhrrlS9VHNISrIQQfEXrEL5mSEgP0JOXEmlbgVAOA8JReqGrzNvTBxooWeBpedsvmHVQpZkk2m3Dgjyzd/Vulh4XTTMPVVWYYk8SRJizQdBdMNJXU67ZvtLoy9dOl0PkeEwzV/+kOgnLuwUHOKUvpCME4L2g66QiNVXzv2rgcZkovCRA//y/umc2R+c1RmvQQxDSCHEM4PoNdw5kJ9zbd1gl4OrYTPCiVxQt+V4vFmw93rzzgv+4RkaBqPleNxeUQFUnNWGvWg4Cv2A3drxGzIdsJ1N+cNya+eGFsziJYv2RFqKhJklulvljssUVNBSIw/YGXkQw/NHLDYV72zWATlIAAsDjB2q669eXPfOkL32gSAXFscEmUXb8XUIhSFgWgecZtr6efHybFc+X7di4h5dS2eICxjYpUZNI4LQBAjhA2CbpPGLw6UjexILxCQkmHSexvyFYAp1KV36fcWkd2+nNu4SbOTVU+2GPw3H4GdUhlkme4uO8glnePY8cHZD4w==";

export function MedicalRecord() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    // Listener untuk membuka modal dari tombol di HeroSection
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openMedicalRecord", handleOpen);
    return () => window.removeEventListener("openMedicalRecord", handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Reset state setelah animasi penutupan selesai
    setTimeout(() => {
      setIsAuthenticated(false);
      setPassword("");
      setError(false);
      setPatientData(null);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Coba dekripsi payload dengan password yang dimasukkan
      const bytes = CryptoJS.AES.decrypt(ENCRYPTED_PAYLOAD, password);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      
      // Jika berhasil, tampilkan data
      setPatientData(decryptedData);
      setIsAuthenticated(true);
      setError(false);
    } catch (err) {
      // Jika gagal dekripsi atau parse JSON, berarti password salah
      setError(true);
      setPatientData(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className={`relative w-full max-h-[90vh] overflow-y-auto overflow-x-hidden bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 ${
              isAuthenticated ? "max-w-4xl" : "max-w-md"
            }`}
          >
            {/* Tombol Tutup (Close) */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {!isAuthenticated ? (
              // Halaman Form Password
              <div className="p-8 sm:p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 text-zinc-900 dark:text-zinc-100">
                  <LockKeyhole size={32} />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Private Medical Record</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-sm">
                  Bagian ini dilindungi enkripsi AES. Masukkan password untuk dekripsi data medis.
                </p>

                <form onSubmit={handleSubmit} className="w-full">
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(false);
                      }}
                      className={`w-full bg-zinc-50 dark:bg-zinc-900 border ${
                        error ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'
                      } rounded-full py-3.5 pl-6 pr-14 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all`}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 p-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 rounded-full hover:scale-105 transition-transform"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-3">
                      Password salah atau data gagal didekripsi.
                    </motion.p>
                  )}
                </form>
              </div>
            ) : (
              // Halaman Laporan Rekam Medis (Setelah Login)
              <div className="p-6 sm:p-10 relative">
                {/* Header Rekam Medis */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-6">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-xl flex items-center justify-center">
                      <Activity size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">KARTU REKAM MEDIS</h2>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-0.5">Confidential Medical Report</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Record ID</div>
                    <div className="font-mono text-zinc-900 dark:text-zinc-100">{patientData.recordId}</div>
                  </div>
                </div>

                {/* Konten Rekam Medis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Kolom Kiri: Biodata & Kontak */}
                  <div className="md:col-span-1 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider flex items-center gap-2 mb-4">
                        <FileText size={16} className="text-zinc-500" />
                        Data Pasien
                      </h3>
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-5 space-y-4 border border-zinc-100 dark:border-zinc-800/80">
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Nama Lengkap</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{patientData.nama}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Tanggal Lahir</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{patientData.tanggalLahir}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Golongan Darah</div>
                          <div className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold text-lg">
                            {patientData.golonganDarah}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Tinggi / Berat</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{patientData.tinggiBerat}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider flex items-center gap-2 mb-4">
                        <Phone size={16} className="text-zinc-500" />
                        Kontak Darurat
                      </h3>
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-5 space-y-4 border border-zinc-100 dark:border-zinc-800/80">
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Hubungan: {patientData.hubunganKontak}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{patientData.kontakDarurat}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kolom Kanan: Detail Medis & Catatan */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider flex items-center gap-2 mb-4">
                        <AlertCircle size={16} className="text-zinc-500" />
                        Kondisi Medis & Alergi
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Alergi Obat</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">- {patientData.alergiObat}</div>
                        </div>
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Alergi Makanan</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">- {patientData.alergiMakanan}</div>
                        </div>
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:col-span-2">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Kondisi Penyerta (Comorbid)</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">- {patientData.kondisiPenyerta}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-4">
                        Catatan Medis Tambahan
                      </h3>
                      <div className="prose dark:prose-invert prose-sm max-w-none text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
                        <p className="mb-2">{patientData.catatan}</p>
                        <p><strong>Tindakan Medis Sebelumnya:</strong> {patientData.tindakanMedis}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Rekam Medis */}
                <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
                  <div>Data terakhir diperbarui: {patientData.lastUpdated}</div>
                  <div className="uppercase tracking-widest font-semibold">Confidential</div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}