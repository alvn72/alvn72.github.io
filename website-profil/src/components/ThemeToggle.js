"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed top-6 right-6 w-10 h-10"></div>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-full glass dark:glass-dark hover:scale-110 transition-all duration-300 flex items-center justify-center fixed top-6 right-6 z-50 shadow-md group"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon size={20} className="text-zinc-600 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
