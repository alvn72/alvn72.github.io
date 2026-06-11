"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, GitBranch, Folder } from "lucide-react";
import { Highlight } from "./Highlight";

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

const projects = [
  {
    title: "Website Profil",
    description:
      "Website portofolio personal dengan desain monokrom glassmorphism, animasi Framer Motion, dan fitur dark/light mode.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/alvn72/alvn72.github.io",
    live: "https://alvn72.github.io",
    status: "Live",
  },
  {
    title: "Pengaduan Alvin",
    description:
      "Aplikasi pengaduan berbasis web dengan fitur manajemen laporan, autentikasi pengguna, dan dashboard admin.",
    tags: ["Next.js", "Strapi", "SQLite"],
    github: "https://github.com/alvn72/UKKPengaduanAlvin",
    live: null,
    status: "Selesai",
  },
  {
    title: "AI Local Stack",
    description:
      "Setup AI lokal menggunakan Ollama, Open WebUI, dan SearXNG untuk inferensi model LLM secara offline.",
    tags: ["Ollama", "Docker", "Python"],
    github: null,
    live: null,
    status: "Ongoing",
  },
  {
    title: "Property Business",
    description:
      "Manajemen properti digital untuk pengelolaan aset, listing, dan monitoring bisnis properti.",
    tags: ["Digital Business", "Management"],
    github: null,
    live: null,
    status: "Ongoing",
  },
];

const statusColor = {
  Live: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
  Selesai: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700",
  Ongoing: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
};

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
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

        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center gap-2 w-max">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Projects
          </span>

          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
            Apa yang{" "}
            <Highlight delay={300} duration={1500}>
              &nbsp;Sudah Dibuat?&nbsp;
            </Highlight>
          </h2>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed">
            Kumpulan project yang pernah dikerjakan, mulai dari web app, tools, hingga bisnis digital.
          </p>
        </motion.div>

        {/* Grid project */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors group"
            >

              {/* Top — icon folder & status */}
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-700/50">
                  <Folder size={20} className="text-zinc-500 dark:text-zinc-400" />
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColor[project.status]}`}>
                  {project.status}
                </span>
              </div>

              {/* Judul & deskripsi */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-700/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                  >
                    <Code2 size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              {(project.github || project.live) && (
                <div className="flex gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700/50">
                  {project.github && (
                    
                      <a href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      <GitBranch size={13} />
                      Source Code
                    </a>
                  )}
                  {project.github && project.live && (
                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                  )}
                  {project.live && (
                    
                     <a href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      <ExternalLink size={13} />
                      Live Demo
                    </a>
                  )}
                </div>
              )}

            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};