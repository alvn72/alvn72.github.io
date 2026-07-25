"use client";

import { motion } from "framer-motion";
import {
  GitBranch,
  Star,
  Link2,
  Mail,
  MapPin,
  Phone,
  Heart,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
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
    href: "#",
    onClick: () => { alert("Coming soon!") }
  },
];

const contactItems = [
  {
    icon: Mail,
    label: "madealvin1333@gmail.com",
    href: "mailto:madealvin1333@gmail.com",
  },
  {
    icon: Phone,
    label: "+62 812 3836 4100",
    href: "https://wa.me/6281238364100",
  },
  {
    icon: MapPin,
    label: "Bali, Indonesia",
    href: null,
  },
];

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full mt-auto">
      {/* Glass separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />

      <motion.div
        className="w-full max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Main footer content — 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand / Description */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center shadow-md">
                <span className="text-sm font-bold text-zinc-50 dark:text-zinc-900 font-mono">
                  A
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Alvin Nugraha
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  alvn72
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              {t.footer.desc}
            </p>

            {/* Social links */}
            <div className="flex gap-2 mt-1">
              {socials.map(({ icon: Icon, label, href, onClick }) => (
                <a
                  key={label}
                  href={href}
                  onClick={onClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-500 hover:scale-110 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {t.footer.navTitle}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-zinc-900 dark:bg-zinc-100 transition-all duration-300" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {t.footer.contactTitle}
            </h3>
            <ul className="flex flex-col gap-3">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 group"
                    >
                      <Icon
                        size={14}
                        className="shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors"
                      />
                      {label}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                      <Icon
                        size={14}
                        className="shrink-0 text-zinc-400 dark:text-zinc-500"
                      />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div variants={itemVariants}>
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              © {currentYear} Alvin Nugraha. {t.footer.madeWith}
              <Heart
                size={12}
                className="text-red-400 dark:text-red-500 fill-red-400 dark:fill-red-500 animate-pulse"
              />
              {t.footer.inBali}
            </p>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 group"
            >
              {t.footer.backToTop}
              <span className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 group-hover:-translate-y-0.5 transition-all duration-300">
                <ArrowUp size={12} />
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
