"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  MessageCircle,
  Mail,
  Phone,
  X,
  Send,
  GitBranch,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const fabActions = [
  {
    icon: Phone,
    label: "WhatsApp",
    href: "https://wa.me/6281238364100",
    color: "bg-green-500 hover:bg-green-600",
    textColor: "text-white",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:madealvin1333@gmail.com",
    color: "bg-blue-500 hover:bg-blue-600",
    textColor: "text-white",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    href: "https://github.com/alvn72",
    color: "bg-zinc-700 hover:bg-zinc-800 dark:bg-zinc-300 dark:hover:bg-zinc-200",
    textColor: "text-white dark:text-zinc-900",
  },
];

export const FloatingActionButton = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 400);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest("#fab-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div id="fab-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={scrollToTop}
            aria-label={t.fab.scrollTop}
            className="p-3 rounded-full glass dark:glass-dark shadow-lg hover:scale-110 transition-transform duration-300 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FAB action items */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 dark:bg-black/30 backdrop-blur-[2px] -z-10 sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            {fabActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.3, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3, y: 20 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 22,
                  delay: index * 0.06,
                }}
                className="flex items-center gap-3"
              >
                {/* Label tooltip */}
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: index * 0.06 + 0.1 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 shadow-lg whitespace-nowrap"
                >
                  {action.label}
                </motion.span>

                {/* Action button */}
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 ${action.color} ${action.textColor}`}
                  aria-label={action.label}
                >
                  <action.icon size={18} />
                </a>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={toggleMenu}
        aria-label={isOpen ? t.fab.closeMenu : t.fab.quickActions}
        className="relative p-4 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glowing ring effect */}
        <span className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-50 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 -z-10" />

        {/* Ping animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-50 animate-ping opacity-20" />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
