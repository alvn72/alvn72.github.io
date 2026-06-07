"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { Highlight } from "./Highlight";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 pt-20 overflow-hidden w-full max-w-[1440px] mx-auto">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-200/50 dark:bg-zinc-800/20 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-16 lg:gap-12">
        
        {/* KIRI: Teks & CTA */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center gap-2 w-max">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Tersedia untuk proyek baru
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 leading-[1.1]"
          >
            " Semoga Kita Semua <br />
            <span className="">
              <Highlight delay={300} duration={2500}>
                &nbsp;Menjadi Berkat&nbsp;
              </Highlight> 
             ".
          </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-xl leading-relaxed"
          >
            Halo, saya Alvin. Pengembang web yang merancang antarmuka minimalis nan elegan, memadukan estetika monokrom dengan performa tinggi.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 w-full sm:w-auto"
          >
            {/* Main Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium hover:scale-105 transition-transform duration-300 shadow-md">
                Mulai Proyek
                <ArrowRight size={18} />
              </button>
              
              <button className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-3.5 rounded-full glass dark:glass-dark font-medium hover:scale-105 transition-transform duration-300 group">
                <Sparkles size={18} className="text-zinc-500 dark:text-zinc-400 group-hover:text-amber-500 transition-colors" />
                Side Projects
              </button>
            </div>

            {/* Medical Record Button (Subtle but professional) */}
            <div className="mt-2 flex justify-center lg:justify-start">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
                <LockKeyhole size={16} className="group-hover:scale-110 transition-transform" />
                Private Medical Record
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* KANAN: Gambar Wajah */}
        <motion.div 
          className="flex-1 flex justify-center lg:justify-end w-full max-w-lg lg:max-w-none"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative group w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px]">
            {/* Glowing effect behind image */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-zinc-200 to-zinc-400 dark:from-zinc-800 dark:to-zinc-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition duration-700"></div>
            
            {/* Image Container with Glassmorphism Border */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden glass dark:glass-dark p-2 lg:p-3 shadow-2xl transform group-hover:-translate-y-2 transition duration-500 z-10">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                
                {/* Wajah - Background layer */}
                <Image
                  src="/alvinTransparan.png"
                  alt="Alvin Profile Picture"
                  fill
                  className="object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-105"
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