"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, MoonStar } from "lucide-react";
import { motion } from "motion/react";

interface ThemeToggleProps {
  variant?: "auto" | "icon" | "slider";
  className?: string;
}

export function ThemeToggle({ variant = "auto", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!mounted) {
    return (
      <button className="h-7 w-7 rounded-md p-1 text-white/70">
        <Sun className="h-full w-full" />
      </button>
    );
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(isDark ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const showSlider = variant === "slider" || (variant === "auto" && isMobile);

  // for mobile
  if (showSlider) {
    return (
      <button
        onClick={toggleTheme}
        className={`relative flex h-8 w-16 items-center rounded-full p-1 transition-colors duration-300 ${
          isDark ? "bg-slate-950" : "bg-gray-300"
        } ${className}`}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        <motion.div
          layout
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-300 ${
            isDark ? "text-slate-700" : "text-black-75"
          }`}
          animate={{
            x: isDark ? 32 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
        >
          {isDark ? (
            <MoonStar className="h-3 w-3" />
          ) : (
            <Sun className="h-3 w-3" />
          )}
        </motion.div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex h-7 w-7 items-center justify-center rounded-md p-1 text-black/70 transition-colors hover:bg-black/20 hover:text-white dark:text-white/70 dark:hover:text-white ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full w-full"
      >
        {isDark ? (
          <MoonStar className="h-full w-full" />
        ) : (
          <Sun className="h-full w-full" />
        )}
      </motion.div>
    </button>
  );
}
