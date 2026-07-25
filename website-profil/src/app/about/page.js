"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Cpu,
  Mail,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { Carousel } from "../../components/Carousel";
import { Highlight } from "../../components/Highlight";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const iconMap = { Code2, Server, Cpu, Mail, Briefcase, GraduationCap };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 1.2 },
  },
};

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
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
        {/* Header — lebih compact */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <span className="px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-semibold bg-transparent text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/60 flex items-center gap-3 w-max">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c5a059] dark:bg-[#d4af37]"></span>
            </span>
            {t.about.badge}
          </span>

          <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[1.05] font-heading">
            {t.about.titlePrefix}{" "}
            <Highlight delay={300} duration={1500}>
              &nbsp;{t.about.titleHighlight}&nbsp;
            </Highlight>
          </h2>

          <p className="text-md text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed">
            <span className="font-bold italic">{t.about.descriptionPart1}</span>{t.about.descriptionPart2}
            <span className="font-bold italic">{t.about.descriptionPart3}</span>{t.about.descriptionPart4}
          </p>

          {/* CTA */}
          <div className="flex flex-row">
            <a
              href="#contact"
              className="mt-4 lg:ml-2 inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-500 w-max"
            >
              {" "}
              {t.about.btnTouch}
              <Mail size={16} />
            </a>

            {/* creation */}
            <a
              href="#projects"
              className="mt-4 ml-3 inline-flex items-center gap-3 px-8 py-3.5 rounded-full glass dark:glass-dark text-sm font-medium transition-colors duration-500 group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 w-max"
            >
              
              {" "}
              {t.about.btnProjects}
              <Sparkles size={16} className="text-[#c5a059] dark:text-[#d4af37] opacity-80" />
            </a>
          </div>
        </motion.div>

        {/* Layout utama — 2 kolom di desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-start">

          {/* KOLOM KIRI — Skills & Experience digabung */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">

            {/* Skills */}
<div className="flex flex-col gap-4">
  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a059] dark:text-[#d4af37]">
    {t.about.skillsTitle}
  </h3>
  <ul className="flex flex-col gap-4">
    {t.about.skills.map(({ iconKey, label }) => {
      const Icon = iconMap[iconKey];
      return (
      <li
        key={label}
        className="flex items-center gap-4 px-6 py-5 rounded-2xl glass dark:glass-dark text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors duration-500"
      >
        <Icon size={20} className="text-[#c5a059] dark:text-[#d4af37] shrink-0" />
        {label}
      </li>
    )})}
  </ul>
</div>

{/* Experience */}
<div className="flex flex-col gap-4 mt-8">
  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a059] dark:text-[#d4af37]">
    {t.about.expTitle}
  </h3>
  <ul className="flex flex-col gap-4">
    {t.about.experiences.map(({ iconKey, title, place, period }) => {
      const Icon = iconMap[iconKey];
      return (
      <li
        key={title}
        className="flex items-start gap-4 px-6 py-5 rounded-2xl glass dark:glass-dark hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors duration-500"
      >
        <Icon size={20} className="text-[#c5a059] dark:text-[#d4af37] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {place} · {period}
          </span>
        </div>
      </li>
    )})}
  </ul>
</div>

          </motion.div>

          {/* KOLOM KANAN — Foto lebih besar */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 mt-8 lg:mt-0">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a059] dark:text-[#d4af37]">
              {t.about.photoTitle}
            </h3>
            <Carousel items={t.about.photos} aspectRatio="4/3" />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};