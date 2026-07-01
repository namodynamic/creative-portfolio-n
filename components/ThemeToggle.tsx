"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  variant?: "auto" | "icon" | "slider";
  className?: string;
}

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle({ variant = "auto", className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={className}
        aria-label="Toggle theme"
      >
        <IconSun />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const showSlider = variant === "slider";

  // for mobile
  if (showSlider) {
    return (
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={toggleTheme}
        className={cn(
          "bg-muted hover:bg-muted relative w-16 justify-start rounded-full p-1",
          className,
        )}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        <motion.div
          layout
          className="bg-background text-foreground flex size-5 items-center justify-center rounded-full shadow-sm transition-colors duration-300"
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
            <IconMoonStars className="size-3.5" />
          ) : (
            <IconSun className="size-3.5" />
          )}
        </motion.div>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex size-4 items-center justify-center"
      >
        {isDark ? <IconMoonStars /> : <IconSun />}
      </motion.div>
    </Button>
  );
}
