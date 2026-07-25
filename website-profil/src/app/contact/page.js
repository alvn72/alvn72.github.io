"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Highlight } from "../../components/Highlight";
import { Mail, Phone, MapPin, Send, GitBranch, Star, Link2, HatGlasses } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "madealvin1333@gmail.com",
    href: "mailto:madealvin1333@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+62 812 3836 4100",
    href: "https://wa.me/6281238364100",
  },
  {
    icon: HatGlasses,
    label: "NGL",
    value: "Click to ask me anything :p",
    href: "https://ngl.link/alvn.72?",
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Bali, Indonesia",
    href: null,
  },
];

const socials = [
  {
    icon: GitBranch,
    label: "GitHub",
    href: "https://github.com/alvn72",
  },
  {
    icon: Star,
    label: "Instagram",
    href: "https://instagram.com/alvn.72",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    href: "#", // Tetap beri href agar tag <a> tidak rusak
    onClick: (e) => {
      e.preventDefault(); // Mencegah halaman reload atau lompat ke atas
      alert("LinkedIn profile coming soon");
    },
  }
];

export const ContactSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    const subject = `Pesan dari ${form.name}`;
    const body = `Nama: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`;
    window.open(`mailto:madealvin1333@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 py-16 overflow-hidden w-full max-w-[1440px] mx-auto"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-200/50 dark:bg-zinc-800/20 rounded-full blur-3xl -z-10" />

      <motion.div
        className="w-full flex flex-col gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >

        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center gap-2 w-max">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c5a059] dark:bg-[#d4af37]"></span>
            </span>
            {t.contact.badge}
          </span>

          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
            {t.contact.titlePrefix} {""}
            <Highlight delay={300} duration={1500}>
            &nbsp;{t.contact.titleHighlight}&nbsp;
            </Highlight>
          </h2>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed">
            {t.contact.description}
          </p>
        </motion.div>

        {/* Layout — kiri info, kanan form */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 items-start">

          {/* KOLOM KIRI — Info kontak & sosial */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">

            {/* Info kontak */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {t.contact.infoTitle}
              </h3>
              <ul className="flex flex-col gap-2">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors group"
                      >
                        <Icon size={18} className="text-zinc-400 dark:text-zinc-500 shrink-0 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-zinc-400 dark:text-zinc-500">{label}</span>
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{value}</span>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50">
                        <Icon size={18} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-zinc-400 dark:text-zinc-500">{label}</span>
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{value}</span>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sosial media */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {t.contact.socialTitle}
              </h3>
             <div className="flex gap-2">
  {/* Tambahkan onClick di dalam destrukturisasi di bawah ini */}
  {socials.map(({ icon: Icon, label, href, onClick }) => (
    <a
      key={label}
      href={href}
      onClick={onClick} // Pasang onClick di sini
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400 text-xs font-medium hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
    >
      <Icon size={16} />
      {label}
    </a>
  ))}
</div>
            </div>

          </motion.div>

          {/* KOLOM KANAN — Form */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {t.contact.formTitle}
            </h3>

            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50">

              {/* Nama & Email — 2 kolom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">{t.contact.formName}</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.contact.formNamePlaceholder}
                    className="px-4 py-3 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">{t.contact.formEmail}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.contact.formEmailPlaceholder}
                    className="px-4 py-3 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
                  />
                </div>
              </div>

              {/* Pesan */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-500 dark:text-zinc-400">{t.contact.formMessage}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.contact.formMessagePlaceholder}
                  rows={5}
                  className="px-4 py-3 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors resize-none"
                />
              </div>

              {/* Tombol kirim */}
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-medium hover:scale-105 transition-transform duration-300 shadow-md w-max"
              >
                {sent ? t.contact.btnSent : t.contact.btnSend}
                <Send size={14} />
              </button>

            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};