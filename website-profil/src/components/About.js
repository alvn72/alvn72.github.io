"use client";

import { motion } from "framer-motion";
import { Code2, Server, Cpu, Mail, Briefcase, GraduationCap } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const skills = [
  { icon: Code2, label: "JavaScript / TypeScript" },
  { icon: Server, label: "React & Node.js" },
  { icon: Cpu, label: "Python & Rust" },
];

const experiences = [
  {
    icon: Briefcase,
    title: "Senior Software Engineer",
    place: "XYZ Company",
    period: "Present",
  },
  {
    icon: GraduationCap,
    title: "Full Stack Developer",
    place: "ABC Firm",
    period: "20X7 – 20XX",
  },
];

export const AboutSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 py-24 overflow-hidden w-full max-w-[1440px] mx-auto">
      {/* Background decoration — sama seperti Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-200/50 dark:bg-zinc-800/20 rounded-full blur-3xl -z-10" />

      <motion.div
        className="w-full flex flex-col gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center gap-2 w-max">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Tentang Saya
          </span>

          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
            Siapa <span className="text-zinc-400">Alvin?</span>
          </h2>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            Saya adalah pengembang yang passionate di bidang rekayasa perangkat lunak — membangun produk yang bersih, cepat, dan bermakna.
          </p>
        </motion.div>

        {/* Skills & Experience — dua kolom di desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Skills */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Skills &amp; Expertise
            </h3>
            <ul className="flex flex-col gap-3">
              {skills.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
                >
                  <Icon size={16} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Experience */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Pengalaman Profesional
            </h3>
            <ul className="flex flex-col gap-3">
              {experiences.map(({ icon: Icon, title, place, period }) => (
                <li
                  key={title}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
                >
                  <Icon size={16} className="text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {title}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      {place} · {period}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium hover:scale-105 transition-transform duration-300 shadow-md"
          >
            Get in Touch
            <Mail size={16} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};