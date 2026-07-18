"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { lang, toggleLanguage, mounted } = useLanguage();

  if (!mounted) {
    return <div className="fixed top-6 right-20 w-[60px] h-10"></div>;
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 rounded-full glass dark:glass-dark hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center fixed top-6 right-20 z-50 shadow-md group"
      aria-label="Toggle Language"
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-50">
        {lang}
      </span>
    </button>
  );
}
