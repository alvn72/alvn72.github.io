import HeroSection from "@/components/HeroSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AboutSection } from "@/components/About";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ThemeToggle />
      <HeroSection />
      <AboutSection /> 
    </main>
  );
}
