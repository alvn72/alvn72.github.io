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
import { Highlight } from "./Highlight";
import { Carousel } from "./Carousel";

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

const skills = [
  { icon: Cpu, label: "Digital Business" },
  { icon: Cpu, label: "Property Management & Owner" },
];
const experiences = [
  {
    icon: Briefcase,
    title: "High School Internship",
    place: "Teksa Digital",
    period: "Juni - Oktober 2025",
  },
  {
    icon: GraduationCap,
    title: "Wakil Ketua Event Jobfair",
    place: "SMK WIRA HARAPAN",
    period: "MEI - 2026",
  },
  {
    icon: GraduationCap,
    title: "Konten Kreator & Brand Owner",
    place: "alvn72",
    period: "Juli 2026 - Sekarang",
  },
  {
    icon: GraduationCap,
    title: "Property Business",
    place: "Management & Owner",
    period: "Februari 2026 - Sekarang",
  },
];

const fotoLapangan = [
  {
    src: "/images/lapangan-1.jpg",
    alt: "Foto lapangan 1",
    caption: "Jobfair SMK Wira Harapan",
  },
  {
    src: "/images/lapangan-2.jpg",
    alt: "Foto lapangan 2",
    caption: "Internship Teksa Digital",
  },
  {
    src: "/images/lapangan-3.jpg",
    alt: "Foto lapangan 3",
    caption: "Property Business",
  },
];

export const AboutSection = () => {
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
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center gap-2 w-max">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Tentang Saya
          </span>

          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
            Siapa{" "}
            <Highlight delay={300} duration={1500}>
              &nbsp;Alvin?&nbsp;
            </Highlight>
          </h2>

          <p className="text-md text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed">
            <span className="font-bold italic">Alvin Nugraha</span> atau sering
            dipanggil <span className="font-bold italic">alvn72</span> adalah
            mahasiswa lulusan ITB STIKOM BALI Jurusan Bisnis Digital yang
            memiliki latar belakang pendidikan formal perangkat lunak di SMK
            WIRA HARAPAN
          </p>

          {/* CTA */}
          <a
            href="#contact"
            className="mt-2 ml-12 lg:ml-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-medium hover:scale-105 transition-transform duration-300 shadow-md w-max"
          >
            {" "}
            Get in Touch
            <Mail size={14} />
          </a>
        </motion.div>

        {/* Layout utama — 2 kolom di desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-start">

          {/* KOLOM KIRI — Skills & Experience digabung */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">

            {/* Skills */}
<div className="flex flex-col gap-3">
  <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
    Skills &amp; Expertise
  </h3>
  <ul className="flex flex-col gap-3">
    {skills.map(({ icon: Icon, label }) => (
      <li
        key={label}
        className="flex items-center gap-3 px-5 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
      >
        <Icon size={18} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
        {label}
      </li>
    ))}
  </ul>
</div>

{/* Experience */}
<div className="flex flex-col gap-3">
  <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
    Pengalaman Profesional
  </h3>
  <ul className="flex flex-col gap-3">
    {experiences.map(({ icon: Icon, title, place, period }) => (
      <li
        key={title}
        className="flex items-start gap-3 px-5 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
      >
        <Icon size={18} className="text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
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
</div>

          </motion.div>

          {/* KOLOM KANAN — Foto lebih besar */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Foto Lapangan
            </h3>
            <Carousel items={fotoLapangan} aspectRatio="4/3" />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};