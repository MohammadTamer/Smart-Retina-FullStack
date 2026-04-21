"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder for hydration
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center p-2 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 hover:animate-spin" />
      ) : (
        <Moon className="h-5 w-5 hover:animate-pulse" />
      )}
    </button>
  );
}
