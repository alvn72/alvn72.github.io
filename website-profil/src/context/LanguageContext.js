"use client";

import { createContext, useContext, useState, useEffect } from "react";
import id from "../i18n/id.json";
import en from "../i18n/en.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "id" ? "en" : "id";
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  const setLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = lang === "id" ? id : en;

  // Render children normally, but prevent flash if possible. 
  // Since we rely on client context, we just return the provider.
  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
