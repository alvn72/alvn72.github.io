"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LockKeyhole, X, ArrowRight, Activity, FileText, AlertCircle, Phone, Globe, Shield, Stethoscope } from "lucide-react";
import CryptoJS from "crypto-js";
import { ENCRYPTED_MEDICAL_DATA } from "../../data/medical-data.encrypted";
import { useLanguage } from "@/context/LanguageContext";

export function MedicalRecord() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const { lang, setLanguage, t } = useLanguage();

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
      const bytes = CryptoJS.AES.decrypt(ENCRYPTED_MEDICAL_DATA, password);
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

  // Data berdasarkan bahasa yang dipilih
  const currentData = patientData ? patientData[lang] : null;

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
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{t.medicalRecord.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-sm">
                  {t.medicalRecord.description}
                </p>

                <form onSubmit={handleSubmit} className="w-full">
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      placeholder={t.medicalRecord.placeholder}
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
                      {t.medicalRecord.error}
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
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        {t.medicalRecord.cardTitle}
                      </h2>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-0.5">{t.medicalRecord.cardSubtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {/* Language Toggle */}
                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg">
                      <button 
                        onClick={() => setLanguage("id")}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${lang === "id" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                      >
                        ID
                      </button>
                      <button 
                        onClick={() => setLanguage("en")}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${lang === "en" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                      >
                        EN
                      </button>
                    </div>
                    <div className="text-left sm:text-right hidden sm:block">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">{t.medicalRecord.recordId}</div>
                      <div className="font-mono text-zinc-900 dark:text-zinc-100">{currentData.recordId}</div>
                    </div>
                  </div>
                </div>

                {/* Konten Rekam Medis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Kolom Kiri: Biodata & Kontak */}
                  <div className="md:col-span-1 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider flex items-center gap-2 mb-4">
                        <FileText size={16} className="text-zinc-500" />
                        {t.medicalRecord.patientData}
                      </h3>
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-5 space-y-4 border border-zinc-100 dark:border-zinc-800/80">
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{t.medicalRecord.fullName}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{currentData.nama}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{t.medicalRecord.dob}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{currentData.tanggalLahir}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{t.medicalRecord.bloodType}</div>
                          <div className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold text-lg">
                            {currentData.golonganDarah}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{t.medicalRecord.heightWeight}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{currentData.tinggiBerat}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider flex items-center gap-2 mb-4">
                        <Phone size={16} className="text-zinc-500" />
                        {t.medicalRecord.emergencyContact}
                      </h3>
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-5 space-y-4 border border-zinc-100 dark:border-zinc-800/80">
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{t.medicalRecord.contactFather}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{currentData.kontakDaruratAyah}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{t.medicalRecord.contactMother}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{currentData.kontakDaruratIbu}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{t.medicalRecord.confirmationPassword}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{currentData.passwordKonfirmasi}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kolom Kanan: Detail Medis & Catatan */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider flex items-center gap-2 mb-4">
                        <AlertCircle size={16} className="text-zinc-500" />
                        {t.medicalRecord.medicalConditions}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">{t.medicalRecord.drugAllergies}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">- {currentData.alergiObat}</div>
                        </div>
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">{t.medicalRecord.foodAllergies}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">- {currentData.alergiMakanan}</div>
                        </div>
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:col-span-2">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">{t.medicalRecord.comorbid}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">- {currentData.kondisiPenyerta}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-4">
                        {t.medicalRecord.additionalNotes}
                      </h3>
                      <div className="prose dark:prose-invert prose-sm max-w-none text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
                        <p className="mb-2">{currentData.catatan}</p>
                        <p><strong>{t.medicalRecord.previousProcedures}</strong> {currentData.tindakanMedis}</p>
                      </div>
                    </div>

                    {/* Tambahan BPJS dan Dokter Pribadi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800/80">
                        <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                          <Shield size={14} className="text-[#c5a059] dark:text-[#d4af37]" />
                          {t.medicalRecord.healthInsurance}
                        </h3>
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">{currentData.noBPJS}</div>
                      </div>
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800/80">
                        <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                          <Stethoscope size={14} className="text-[#c5a059] dark:text-[#d4af37]" />
                          {t.medicalRecord.primaryCareDoctor}
                        </h3>
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">{currentData.dokterPribadi}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Rekam Medis */}
                <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
                  <div>{t.medicalRecord.lastUpdated} {currentData.lastUpdated}</div>
                  <div className="uppercase tracking-widest font-semibold">{t.medicalRecord.confidential}</div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}