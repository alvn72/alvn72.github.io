"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { Highlight } from "./Highlight";
import { Tooltip } from './Tooltip';
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: [0.22, 1, 0.36, 1],
        duration: 1.2,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-16 lg:px-24 pt-24 pb-16 lg:py-16 overflow-hidden w-full max-w-[1440px] mx-auto">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-zinc-200/50 dark:bg-zinc-800/20 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-10 sm:gap-16 lg:gap-12">
        
        {/* KIRI: Teks & CTA */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <span className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold bg-transparent text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/60 flex items-center gap-2.5 sm:gap-3 w-max">
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c5a059] dark:bg-[#d4af37]"></span>
              </span>
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-center lg:text-left text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-6 leading-[1.1] font-heading w-full"
          >
            <span className="block sm:whitespace-nowrap">{t.hero.quoteLine1}</span>
            <span className="block mt-2 sm:mt-4">
              <span className="sm:whitespace-nowrap">
                <Highlight delay={300} duration={2500}>
                  &nbsp;{t.hero.quoteHighlight}&nbsp;
                </Highlight>
                {t.hero.quoteLine2}
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mb-8 sm:mb-10 max-w-xl leading-relaxed px-2 sm:px-0"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 w-full sm:w-auto items-center lg:items-start"
          >
            {/* Main Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-center w-full sm:w-auto">
              <button onClick={() => {
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }} className="w-full sm:w-auto flex justify-center items-center gap-3 px-7 sm:px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-500 text-sm sm:text-base">
                {t.hero.btnTalk}
                <ArrowRight size={18} />
              </button>

              <button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }}
              className="w-full sm:w-auto flex justify-center items-center gap-3 px-7 sm:px-8 py-3.5 rounded-full glass dark:glass-dark font-medium transition-colors duration-500 group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-sm sm:text-base">
                <Sparkles size={16} className="text-[#c5a059] dark:text-[#d4af37] opacity-80" />
                {t.hero.btnTrack}
              </button>
            </div>

            {/* Medical Record Button (Subtle but professional) */}
            <div className="mt-1 sm:mt-2 flex justify-center lg:justify-start w-full sm:w-auto">
             <Tooltip text={t.hero.medicalTooltip} position={{ base: 'top', md: 'right' }} maxWidth={240}>
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group" onClick={() => {
                window.dispatchEvent(new Event('openMedicalRecord'))
              }}> 
                <LockKeyhole size={16} className="group-hover:scale-110 transition-transform" />
                {t.hero.btnMedical}
              </button>
            </Tooltip>
            </div>
          </motion.div>
        </motion.div>

        {/* KANAN: Gambar Wajah */}
        <motion.div 
          className="flex-1 flex justify-center lg:justify-end w-full max-w-lg lg:max-w-none"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            filter: "blur(0px)",
            y: [0, -6, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8, ease: "easeOut" },
            scale: { duration: 0.8, ease: "easeOut" },
            filter: { duration: 0.8, ease: "easeOut" },
            y: {
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }
          }}
        >
          <div className="relative group w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px]">
            {/* Glowing effect behind image */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            {/* Image Container with Glassmorphism Border */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden glass dark:glass-dark p-2 lg:p-3 shadow-2xl transform lg:group-hover:-translate-y-2 transition duration-500 z-10">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                
                {/* Wajah - Background layer */}
                <Image
                  src="/alvinTransparan.png"
                  alt="Alvin Profile Picture"
                  fill
                  className="object-cover transition duration-700 lg:grayscale lg:group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 450px"
                  priority
                />
                
                {/* Nametag - Floating INSIDE the frame, at the top */}
                <motion.div 
                  className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-32 sm:w-40 lg:w-48 h-auto z-20 drop-shadow-2xl"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: [0, -8, 0], opacity: 1 }}
                  transition={{ 
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                    opacity: { delay: 0.2, duration: 0.8 }
                  }}
                >
                  <Image
                    src="/nametagBaru.png"
                    alt="Alvin Nametag"
                    width={200}
                    height={80}
                    className="object-contain w-full h-auto"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}