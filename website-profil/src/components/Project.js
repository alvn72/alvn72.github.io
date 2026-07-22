"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, GitBranch, Folder, ArrowUpRight, Sparkles } from "lucide-react";
import { Highlight } from "./Highlight";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

export const ProjectsSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 py-16 overflow-hidden w-full max-w-[1440px] mx-auto"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-200/50 dark:bg-zinc-800/20 rounded-full blur-3xl -z-10" />

      <motion.div
        className="w-full flex flex-col gap-12 lg:gap-16"
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
            {t.project.badge}
          </span>

          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
            {t.project.titlePrefix}{" "}
            <Highlight delay={300} duration={1500}>
              &nbsp;{t.project.titleHighlight}&nbsp;
            </Highlight>
          </h2>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed">
            {t.project.description}
          </p>
        </motion.div>

        {/* Grid project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {t.project.items.map((project, i) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all duration-300 overflow-hidden hover:shadow-lg dark:hover:shadow-zinc-900/50 flex flex-col h-full"
            >
              {/* Project Image */}
              <div className="relative w-full shrink-0 aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900/50">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/60 dark:from-zinc-800/60 via-transparent to-transparent" />
                
                {/* Status badge on image */}
                <div className="absolute top-3 right-3">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                    project.status === "Live" 
                      ? "bg-green-100/90 dark:bg-green-900/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800" 
                      : project.status === "Ongoing" 
                      ? "bg-blue-100/90 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                      : "bg-zinc-100/90 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content area */}
              <div className="p-6 lg:p-8 flex flex-col gap-4 flex-1 min-w-0">
                {/* Title & description */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-700/50">
                      <Folder size={16} className="text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-700/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                    >
                      <Code2 size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {(project.github || project.live) && (
                  <div className="flex flex-wrap items-center gap-3 pt-5 mt-auto border-t border-zinc-200 dark:border-zinc-700/50">
                    {project.github && (
                      <a href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                      >
                        <GitBranch size={13} />
                        {t.project.links.source}
                      </a>
                    )}
                    {project.live && (
                      <button
                        onClick={() => {
                          if (project.live === "https://alvn72.github.io") {
                            alert(t.project.alreadyHereAlert);
                          } else {
                            window.open(project.live, "_blank", "noopener,noreferrer");
                          }
                        }}
                        className="group/btn relative inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md hover:shadow-lg"
                      >
                        {/* Animated gradient background */}
                        <span className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
                        
                        {/* Glow effect */}
                        <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#c5a059]/30 via-[#d4af37]/40 to-[#c5a059]/30 blur-sm" />
                        
                        {/* Pulse ring */}
                        <span className="absolute inset-0 rounded-lg ring-2 ring-[#d4af37]/0 group-hover/btn:ring-[#d4af37]/50 transition-all duration-300" />
                        
                        <span className="relative flex items-center gap-1.5 text-white dark:text-zinc-900">
                          <Sparkles size={12} className="animate-pulse" />
                          {t.project.links.live}
                          <ArrowUpRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </motion.div>

      {/* Shimmer animation keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};