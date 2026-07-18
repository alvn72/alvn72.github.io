import { Plus_Jakarta_Sans, Bodoni_Moda, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import TopographicBackground from "@/components/TopographicBackground";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Profil Portofolio | Monokrom",
  description: "Website profil bergaya monokrom dan glassmorphism",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${bodoniModa.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col selection:bg-zinc-800 selection:text-zinc-50 dark:selection:bg-zinc-200 dark:selection:text-zinc-900 transition-colors duration-300">
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TopographicBackground />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
