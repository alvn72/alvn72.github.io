'use client'

import HeroSection from "@/components/HeroSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MedicalRecord } from "@/components/MedicalRecord";
import { AboutSection } from "@/components/About";
import { useEffect } from "react";
import { ContactSection } from "@/components/Contact";
import { ProjectsSection } from "@/components/Project";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)  // ← scroll ke atas saat halaman pertama dibuka
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ThemeToggle />
      <MedicalRecord/>
      <HeroSection />
      <AboutSection /> 
      <ProjectsSection/>
      <ContactSection />
    </main>
  );
}
