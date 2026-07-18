'use client'

import HeroSection from "@/components/HeroSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MedicalRecord } from "@/components/MedicalRecord";
import { AboutSection } from "@/components/About";
import { useEffect } from "react";
import { ContactSection } from "@/components/Contact";
import { ProjectsSection } from "@/components/Project";
import { Footer } from "@/components/Footer";
import { FloatingActionButton } from "@/components/FloatingActionBtn";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)  // ← scroll ke atas saat halaman pertama dibuka
  }, [])
  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <ThemeToggle />
        <LanguageToggle />
        <MedicalRecord/>
        <HeroSection />
        <AboutSection /> 
        <ProjectsSection/>
        <ContactSection />
      </main>
      <Footer />
      <FloatingActionButton />
    </>
  );
}
