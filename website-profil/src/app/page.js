'use client'

import HeroSection from "@/app/heroSec/page";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MedicalRecord } from "@/app/med-rec/page";
import { AboutSection } from "@/app/about/page";
import { useEffect } from "react";
import { ContactSection } from "@/app/contact/page";
import { StoryTimeline } from "@/app/story/page";
import { ProjectsSection } from "@/app/projects/page";
import { Footer } from "@/app/footer/page";
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
        <StoryTimeline />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActionButton />
    </>
  );
}
